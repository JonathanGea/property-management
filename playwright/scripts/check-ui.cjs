const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE_PATH || "playwright",
);
const baseURL = process.env.BASE_URL || "http://127.0.0.1:4200";
const resultsDirectory = path.join(__dirname, "..", "results");
const screenshots = path.join(resultsDirectory, "screenshots");
fs.mkdirSync(screenshots, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(baseURL);
  await page.locator("main h1").waitFor();
  await page.locator(".payment-total").waitFor();
  const firstVisit = await page.evaluate(() => ({
    properties: JSON.parse(localStorage.getItem("rentora-owner-mvp-v1") || "{}")
      .properties?.length,
    occupied: document.querySelectorAll(".property-link").length,
    paid: document.querySelectorAll(".overview-card dd")[1]?.textContent.trim(),
    progress: document.querySelector(".payment-total")?.textContent.trim(),
  }));
  await page.screenshot({
    path: path.join(screenshots, "first-visit-mobile.png"),
    fullPage: true,
  });
  await page.reload();
  await page.locator(".payment-total").waitFor();
  firstVisit.persisted =
    (await page.locator(".overview-card dd").first().textContent())?.trim() ===
    "3";
  const properties = [
    {
      id: 1,
      name: "Taman Raya Residence",
      location: "Jakarta Selatan",
      rooms: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        number: String(i + 1).padStart(2, "0"),
        tenantName:
          i < 3
            ? ["Sari Kusumawardani", "Budi Santoso", "Dewi Lestari"][i]
            : "",
        tenantPhone: i < 3 ? "081234567890" : "",
        tenancyId: "tenant-" + i,
        monthlyRent: 1500000,
        dueDay: i === 0 ? 1 : 10 + i,
      })),
    },
    {
      id: 2,
      name: "Melati",
      location: "Bandung",
      rooms: [
        {
          id: 1,
          number: "01",
          tenantName: "Andi Wijaya",
          tenantPhone: "",
          tenancyId: "t-andi",
          monthlyRent: 2000000,
          dueDay: 8,
        },
      ],
    },
  ];
  await page.evaluate(
    (data) =>
      localStorage.setItem("rentora-owner-mvp-v1", JSON.stringify(data)),
    { properties, payments: [] },
  );
  const results = [];
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/",
      "/properti",
      "/keuangan",
      "/lainnya",
      "/penghuni",
      "/properti/1",
      "/properti/baru",
    ]) {
      await page.goto(baseURL + route);
      await page.locator("main h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const nav = document.querySelector(".bottom-nav"),
          r = nav.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          navVisible: getComputedStyle(nav).display !== "none",
          gapBottom: innerHeight - r.bottom,
          navHeight: r.height,
          activeLabelVisible: [
            ...nav.querySelectorAll("a.active .nav-label"),
          ].every((x) => getComputedStyle(x).opacity === "1"),
          inputs: [...document.querySelectorAll("input")].map(
            (x) => getComputedStyle(x).fontSize,
          ),
        };
      });
      results.push({ width, route, ...result });
      if (width === 390 || width === 1280) {
        await page.screenshot({
          path: path.join(
            screenshots,
            `${route === "/" ? "home" : route.replaceAll("/", "-")}-${width}.png`,
          ),
          fullPage: true,
        });
      }
      if (width === 390 && route === "/")
        await page.screenshot({
          path: path.join(screenshots, "dashboard-mobile.png"),
          fullPage: true,
        });
      if (width === 390 && route === "/keuangan")
        await page.screenshot({
          path: path.join(screenshots, "finance-mobile.png"),
          fullPage: true,
        });
      if (width === 1280 && route === "/")
        await page.screenshot({
          path: path.join(screenshots, "dashboard-desktop.png"),
          fullPage: true,
        });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL);
  await page.locator(".statistics-toggle").click();
  await page.locator(".statistics.is-open").waitFor();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: path.join(screenshots, "statistics-mobile.png"),
    fullPage: true,
  });
  await page.locator(".statistics-toggle").scrollIntoViewIfNeeded();
  const contentClear = await page
    .locator(".statistics-toggle")
    .evaluate(
      (el) =>
        el.getBoundingClientRect().bottom <=
        document.querySelector(".bottom-nav").getBoundingClientRect().top,
    );
  await page.goto(baseURL + "/keuangan");
  await page.locator(".link-row").first().click();
  await page.getByRole("button", { name: "Catat pembayaran" }).first().click();
  await page.locator(".payment-row span.paid").first().waitFor();
  await page.locator(".back-link").click();
  await page.getByRole("heading", { name: "Riwayat pembayaran" }).waitFor();
  await page.locator(".history .transaction").first().waitFor();
  const recorded = await page.locator(".history .transaction").count();
  const report = {
    testedAt: new Date().toISOString(),
    browser: "Chromium",
    firstVisit,
    results,
    recorded,
    contentClear,
    errors,
  };
  fs.writeFileSync(
    path.join(resultsDirectory, "browser-report.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
  if (
    firstVisit.properties !== 3 ||
    firstVisit.paid !== "1/3" ||
    firstVisit.progress !== "33%" ||
    !firstVisit.persisted ||
    results.some(
      (x) =>
        x.overflow ||
        x.navVisible !== x.width < 768 ||
        (x.width < 768 && !x.activeLabelVisible),
    ) ||
    errors.length ||
    !contentClear ||
    recorded !== 1
  )
    process.exitCode = 1;
})();
