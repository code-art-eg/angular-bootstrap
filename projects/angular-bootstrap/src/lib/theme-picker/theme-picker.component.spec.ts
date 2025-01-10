import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemePickerComponent } from './theme-picker.component';
import { Theme, THEME_PROVIDER_TOKEN, ThemeProvider } from '../constants';
import { BehaviorSubject } from 'rxjs';

class MockThemeProvider {
	readonly theme$ = new BehaviorSubject<Theme | null>(null);
	#theme: Theme | null = null;

	// noinspection JSUnusedGlobalSymbols
	get theme(): Theme | null {
		return this.#theme;
	}

	// noinspection JSUnusedGlobalSymbols
	set theme(theme: Theme | null) {
		this.#theme = theme;
		this.theme$.next(theme);
	}
}

describe('ThemePickerComponent', () => {
	let component: ThemePickerComponent;
	let fixture: ComponentFixture<ThemePickerComponent>;
	let mockThemeProvider: ThemeProvider;

	beforeEach(async () => {
		mockThemeProvider = new MockThemeProvider();

		await TestBed.configureTestingModule({
			providers: [
				{ provide: THEME_PROVIDER_TOKEN, useValue: mockThemeProvider },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ThemePickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with correct active button', () => {
		expect(
			component.buttons.find(button => button.theme === null)?.active
		).toBe(true);
		expect(
			component.buttons.find(button => button.theme === 'light')?.active
		).toBe(false);
		expect(
			component.buttons.find(button => button.theme === 'dark')?.active
		).toBe(false);
	});

	it('should initialize buttons with correct labels', () => {
		expect(component.getLabel('light')).toBe('Light');
		expect(component.getLabel('dark')).toBe('Dark');
		expect(component.getLabel(null)).toBe('Auto');
	});

	it('should show non-default labels', () => {
		component.lightLabel = 'Light Theme';
		component.darkLabel = 'Dark Theme';
		component.autoLabel = 'Auto Theme';
		expect(component.getLabel('light')).toBe('Light Theme');
		expect(component.getLabel('dark')).toBe('Dark Theme');
		expect(component.getLabel(null)).toBe('Auto Theme');
	});

	it('should change theme and hide the menu', () => {
		component.show = true;
		component.changeTheme('dark');
		expect(mockThemeProvider.theme).toBe('dark');
		expect(component.show).toBe(false);
	});

	it('should update active button on theme change', () => {
		mockThemeProvider.theme = 'dark';
		fixture.detectChanges();
		expect(
			component.buttons.find(button => button.theme === 'dark')?.active
		).toBe(true);
		expect(
			component.buttons.find(button => button.theme !== 'dark')?.active
		).toBe(false);
	});

	it('should return the correct active icon', () => {
		mockThemeProvider.theme = 'dark';
		fixture.detectChanges();
		expect(component.getActiveIcon()).toBe('moon-stars-fill');
	});
});
