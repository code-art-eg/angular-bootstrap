import { Component, inject } from '@angular/core';
import { PopupService } from '@code-art-eg/angular-bootstrap';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	#popupService = inject(PopupService);

	openPopup() {
		this.#popupService.showAlert('Hello, World!', 'Welcome to Globalite!');
	}
}
