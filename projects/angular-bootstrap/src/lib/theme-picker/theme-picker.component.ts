import {
	Component,
	inject,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { THEME_PROVIDER_TOKEN } from '../constants';
import type { PickerOption } from '../types';
import { PickerComponent } from '../picker/picker.component';

@Component({
	selector: 'bs-theme-picker',
	templateUrl: './theme-picker.component.html',
	imports: [PickerComponent],
})
export class ThemePickerComponent implements OnChanges {
	readonly themeProvider = inject(THEME_PROVIDER_TOKEN);

	@Input() lightLabel = 'Light';
	@Input() darkLabel = 'Dark';
	@Input() autoLabel = 'Auto';

	options: PickerOption[] = this.#getPickerOptions();

	show = false;

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes['lightLabel'] ||
			changes['darkLabel'] ||
			changes['autoLabel']
		) {
			this.options = this.#getPickerOptions();
		}
	}

	#getPickerOptions(): PickerOption[] {
		return [
			{
				icon: 'sun-fill',
				value: 'light',
				label: this.lightLabel,
			},
			{
				icon: 'moon-stars-fill',
				value: 'dark',
				label: this.darkLabel,
			},
			{
				icon: 'circle-half',
				value: null,
				label: this.autoLabel,
			},
		];
	}
}
