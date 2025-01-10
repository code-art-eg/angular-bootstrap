import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularBootstrapComponent } from '@code-art-eg/angular-bootstrap';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, AngularBootstrapComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'test-app';
}
