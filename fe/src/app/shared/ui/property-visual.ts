import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-property-visual',
  template: `
    <svg viewBox="0 0 320 180" fill="none" aria-hidden="true" focusable="false">
      <path class="sky" d="M0 0h320v180H0z" />
      <circle class="sun" cx="264" cy="36" r="17" />
      <path
        class="cloud"
        d="M24 40h66M40 32h28M210 61h73"
        stroke-width="7"
        stroke-linecap="round"
      />
      <path class="ground" d="M0 143h320v37H0z" />
      @switch (variant()) {
        @case (0) {
          <path class="wall" d="M64 65h191v86H64z" />
          <path class="accent" d="m53 66 107-43 107 43H53Z" />
          <path class="shade" d="M171 65h84v86h-84z" />
          <path
            class="window"
            d="M82 82h24v22H82zM121 82h24v22h-24zM185 82h23v22h-23zM221 82h19v22h-19zM82 117h24v23H82zM185 117h23v23h-23zM221 117h19v23h-19z"
          />
          <path class="door" d="M124 116h27v35h-27z" />
          <path class="trim" d="M63 110h193M94 82v22m39-22v22m63-22v22m34-22v22" />
        }
        @case (1) {
          <path class="shade" d="M65 72h77v79H65zM216 85h39v66h-39z" />
          <path class="wall" d="M135 38h83v113h-83z" />
          <path class="accent" d="M128 32h97v12h-97zM58 66h77v10H58zM216 79h46v10h-46z" />
          <path
            class="window"
            d="M151 56h20v20h-20zM183 56h20v20h-20zM151 88h20v20h-20zM183 88h20v20h-20zM80 88h20v21H80zM110 88h15v21h-15zM80 120h20v20H80zM232 104h13v22h-13z"
          />
          <path class="door" d="M164 120h25v31h-25z" />
          <path class="trim" d="M145 81h63m-63 32h63" />
        }
        @default {
          <path class="wall" d="M62 71h94v80H62zM165 58h92v93h-92z" />
          <path class="shade" d="M145 71h20v80h-20zM238 58h19v93h-19z" />
          <path class="accent" d="m54 71 55-31 55 31H54Zm103-13 54-30 54 30H157Z" />
          <path
            class="window"
            d="M78 87h23v22H78zM117 87h23v22h-23zM182 75h22v23h-22zM217 75h22v23h-22zM182 111h22v23h-22z"
          />
          <path class="door" d="M108 120h24v31h-24zM217 114h22v37h-22z" />
          <path class="trim" d="M89 87v22m39-22v22m65-34v23m35-23v23" />
        }
      }
      <path class="path" d="M135 151h37l19 29h-75l19-29Z" />
      <path class="tree-trunk" d="M38 120v35m244-40v40" stroke-width="5" stroke-linecap="round" />
      <path
        class="tree"
        d="M22 118c-7-17 6-34 16-34s24 17 16 34c-6 12-25 12-32 0Zm243-9c-5-17 7-32 17-32s23 15 17 32c-6 16-28 16-34 0Z"
      />
      <path class="trim" d="M21 155h278" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .sky {
        fill: var(--color-property-sky);
      }
      .sun {
        fill: var(--color-property-sun);
      }
      .cloud {
        stroke: var(--color-surface);
      }
      .ground {
        fill: var(--color-property-ground);
      }
      .wall {
        fill: var(--color-surface);
      }
      .shade {
        fill: var(--color-property-shade);
      }
      .accent {
        fill: var(--color-brand);
      }
      .window {
        fill: var(--color-property-window);
      }
      .door {
        fill: var(--color-brand-strong);
      }
      .trim {
        stroke: var(--color-property-line);
        stroke-width: 2;
      }
      .path {
        fill: var(--color-property-shade);
      }
      .tree {
        fill: var(--color-property-tree);
      }
      .tree-trunk {
        stroke: var(--color-property-line);
      }
    `,
  ],
})
export class PropertyVisual {
  readonly identity = input.required<string>();
  readonly variant = computed(
    () =>
      Array.from(this.identity()).reduce((hash, character) => hash + character.charCodeAt(0), 0) %
      3,
  );
}
