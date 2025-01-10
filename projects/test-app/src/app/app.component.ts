import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	ThemePickerComponent,
	ThemeService,
} from '@code-art-eg/angular-bootstrap';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, ThemePickerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	#themeService = inject(ThemeService);

	title = 'test-app';

	constructor() {
		console.log(this.#themeService);
	}
}
