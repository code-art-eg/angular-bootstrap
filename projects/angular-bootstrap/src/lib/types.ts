import { Observable } from 'rxjs';
import { THEMES } from './themes';

export type Theme = (typeof THEMES)[number];

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

export interface PickerOption {
	readonly value: unknown;
	readonly label: string;
	readonly icon?: string;
}
