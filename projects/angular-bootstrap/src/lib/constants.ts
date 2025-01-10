import { inject, InjectionToken } from '@angular/core';
import { LocalStorageThemeProviderService } from './local-storage-theme-provider.service';
import { Observable } from 'rxjs';

const CONFIG_PREFIX = 'angular-bootstrap';
export const DEFAULT_APP_THEME_KEY = CONFIG_PREFIX + '.theme';

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];
export const DEFAULT_APP_THEME: Theme = 'light';

/**
 * Interface for theme providers.
 * A theme provider stores and provides the current theme.
 * And it emits an observable for theme changes.
 */
export interface ThemeProvider {
	/**
	 * The current theme.
	 */
	theme: Theme | null;

	/**
	 * Observable for theme changes.
	 */
	readonly theme$: Observable<Theme | null>;
}

/**
 * Injection token for the theme storage key.
 */
export const THEME_STORAGE_KEY_TOKEN = new InjectionToken<string>(
	'theme-storage-key',
	{ providedIn: 'root', factory: () => DEFAULT_APP_THEME_KEY }
);

/**
 * Injection token for the default theme.
 */
export const DEFAULT_THEME_TOKEN = new InjectionToken<Theme>('default-theme', {
	providedIn: 'root',
	factory: () => DEFAULT_APP_THEME,
});

/**
 * Injection token for the theme provider.
 */
export const THEME_PROVIDER_TOKEN = new InjectionToken<ThemeProvider>(
	'theme-provider',
	{
		providedIn: 'root',
		factory: () => inject(LocalStorageThemeProviderService),
	}
);
