import {
  afterEveryRender,
  Component,
  DestroyRef,
  ElementRef,
  PendingTasks,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { marked } from 'marked';

@Component({
  selector: 'app-prd-preview',
  imports: [RouterLink],
  templateUrl: './prd-preview.html',
  styleUrl: './prd-preview.css',
})
export class PrdPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly controller = new AbortController();
  private fragment = this.route.snapshot.fragment;
  private anchors: string[] = [];
  readonly isPages = this.route.snapshot.url[0]?.path === 'pages';
  readonly filename = this.isPages ? 'PAGES.md' : 'PRD.md';
  readonly content = signal('');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly headings = signal<{ id: string; title: string; level: number }[]>([]);

  constructor() {
    afterEveryRender(() => {
      // Angular strips id from innerHTML. Restore only document anchor identifiers
      // on the already sanitized DOM; never bypass HTML sanitization.
      this.anchors.forEach((id, index) => {
        const node = this.element.nativeElement.querySelector(`.prd-anchor-${index}`);
        if (node) node.id = id;
      });
    });
    this.destroyRef.onDestroy(() => this.controller.abort());
    this.route.fragment.pipe(takeUntilDestroyed()).subscribe((fragment) => {
      this.fragment = fragment;
      this.scrollToFragment();
    });
    void inject(PendingTasks).run(() => this.load());
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      const response = await fetch(new URL(`prd-docs/${this.filename}`, document.baseURI), {
        signal: this.controller.signal,
        cache: 'no-store',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      if (/^\s*<!doctype html/i.test(markdown)) throw new Error('Dokumen tidak ditemukan');
      // Keep Angular's normal innerHTML sanitization; never trust raw Markdown HTML.
      const parsed = new DOMParser().parseFromString(await marked.parse(markdown), 'text/html');
      const ids = new Set(Array.from(parsed.querySelectorAll('[id]'), (node) => node.id));
      const headings = Array.from(parsed.querySelectorAll('h1, h2, h3, h4')).map((node) => {
        const title = node.textContent ?? '';
        const base = title
          .toLowerCase()
          .normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-');
        let id = base || 'bagian';
        for (let suffix = 1; ids.has(id); suffix++) id = `${base}-${suffix}`;
        node.id = id;
        ids.add(id);
        return { id, title, level: Number(node.tagName.slice(1)) };
      });
      for (const link of parsed.querySelectorAll('a[href]')) {
        const href = link.getAttribute('href') ?? '';
        const match = /^(PRD|PAGES)\.md(#.*)?$/.exec(href);
        if (match)
          link.setAttribute('href', `/prd${match[1] === 'PAGES' ? '/pages' : ''}${match[2] ?? ''}`);
      }
      for (const table of parsed.querySelectorAll('table')) {
        const wrapper = parsed.createElement('div');
        wrapper.className = 'table-scroll';
        wrapper.setAttribute('tabindex', '0');
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', 'Tabel dokumen, geser untuk melihat seluruh kolom');
        table.replaceWith(wrapper);
        wrapper.append(table);
      }
      this.anchors = Array.from(parsed.querySelectorAll('[id]'), (node, index) => {
        const id = node.id;
        node.classList.add(`prd-anchor-${index}`);
        node.removeAttribute('id');
        return id;
      });
      this.headings.set(headings);
      this.content.set(parsed.body.innerHTML);
      this.scrollToFragment();
    } catch (error) {
      if (!this.controller.signal.aborted) {
        this.error.set(
          `Tidak dapat memuat ${this.filename}. Jalankan frontend dalam mode development, lalu coba lagi.`,
        );
      }
    } finally {
      this.loading.set(false);
    }
  }

  private scrollToFragment(): void {
    // Wait for Angular to render innerHTML before locating explicit PRD anchors.
    requestAnimationFrame(() => {
      if (this.destroyRef.destroyed || !this.fragment) return;
      const target = Array.from(this.element.nativeElement.querySelectorAll('[id]')).find(
        (node) => node.id === this.fragment,
      );
      target?.scrollIntoView?.({ block: 'start' });
    });
  }
}
