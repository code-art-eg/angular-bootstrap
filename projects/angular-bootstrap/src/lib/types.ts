import { Observable } from 'rxjs';
import { THEMES } from './themes';

/**
 * Theme type. Either 'light' or 'dark'.
 */
export type Theme = (typeof THEMES)[number];

/**
 * Interface for theme providers.
 * A theme provider stores and provides the current theme.
 * And it emits an observable for theme changes.
 */
export interface ThemeProvider {
	/**
	 * The current theme. Null is for Auto (based on system preference).
	 */
	theme: Theme | null;

	/**
	 * Observable for theme changes.
	 */
	readonly theme$: Observable<Theme | null>;
}

/**
 * Picker option for use by {@link PickerComponent}.
 */
export interface PickerOption {
	readonly value: unknown;
	readonly label: string;
	readonly icon?: string;
}
