import { Component, inject, Input } from '@angular/core';
import { Theme, THEME_PROVIDER_TOKEN } from '../constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Button {
	id: number;
	icon: string;
	theme: Theme | null;
	active: boolean;
}

@Component({
	selector: 'bs-theme-picker',
	imports: [],
	templateUrl: './theme-picker.component.html',
	styleUrl: './theme-picker.component.scss',
})
export class ThemePickerComponent {
	readonly #themeProvider = inject(THEME_PROVIDER_TOKEN);

	@Input() lightLabel = 'Light';
	@Input() darkLabel = 'Dark';
	@Input() autoLabel = 'Auto';

	show = false;
	buttons: Button[] = [
		{
			id: 1,
			icon: 'sun-fill',
			theme: 'light',
			active: false,
		},
		{
			id: 2,
			icon: 'moon-stars-fill',
			theme: 'dark',
			active: false,
		},
		{
			id: 3,
			icon: 'circle-half',
			theme: null,
			active: false,
		},
	];

	constructor() {
		this.#themeProvider.theme$
			.pipe(takeUntilDestroyed())
			.subscribe(theme => this.#onThemeChanged(theme));
	}

	changeTheme(theme: Theme | null): void {
		this.#themeProvider.theme = theme;
		this.show = false;
	}

	getLabel(theme: Theme | null): string {
		switch (theme) {
			case 'light':
				return this.lightLabel;
			case 'dark':
				return this.darkLabel;
			default:
				return this.autoLabel;
		}
	}

	getActiveIcon(): string {
		return this.buttons.find(button => button.active)?.icon ?? '';
	}

	#onThemeChanged(theme: Theme | null): void {
		this.buttons.forEach(button => {
			button.active = button.theme === theme;
		});
	}
}
