import { inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { THEME_PROVIDER_TOKEN, THEMES } from './constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
const APP_THEME_ATTR = 'data-bs-theme';

@Injectable({
	providedIn: 'root',
})
export class ThemeService implements OnDestroy {
	readonly #document = inject(DOCUMENT);
	#matcher: MediaQueryList | null = null;

	readonly #themeProvider = inject(THEME_PROVIDER_TOKEN);
	readonly #listener: (e: MediaQueryListEvent) => void;

	constructor() {
		this.#listener = this.#themeListener.bind(this);
		this.#themeProvider.theme$
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.#applyTheme());
	}

	ngOnDestroy(): void {
		if (this.#matcher) {
			this.#matcher.removeEventListener('change', this.#listener);
			this.#matcher = null;
		}
	}

	#applyTheme(): void {
		if (!this.#document) {
			return;
		}
		let theme = this.#themeProvider.theme;
		if (!theme) {
			if (!this.#matcher) {
				this.#matcher = this.#document.defaultView!.matchMedia(
					`(prefers-color-scheme: ${THEMES[1]})`
				);
				this.#matcher.addEventListener('change', this.#listener);
			}
			theme = this.#matcher.matches ? THEMES[1] : THEMES[0];
		} else if (this.#matcher) {
			this.#matcher.removeEventListener('change', this.#listener);
			this.#matcher = null;
		}
		this.#document.body.setAttribute(APP_THEME_ATTR, theme);
	}

	#themeListener(): void {
		this.#applyTheme();
	}
}
