import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { PickerOption } from '../types';

interface Button {
	id: number;
	label: string;
	icon?: string;
	value: unknown;
	active: boolean;
}

@Component({
	selector: 'bs-picker',
	imports: [],
	templateUrl: './picker.component.html',
	styleUrl: './picker.component.scss',
})
export class PickerComponent {
	show = false;
	buttons: Button[] = [];
	#value: unknown;

	@Input() set value(newVal: unknown) {
		this.show = false;
		if (this.#value === newVal) {
			return;
		}
		this.#value = newVal;
		let valueFound = false;
		this.buttons.forEach(button => {
			if (button.value === newVal && !valueFound) {
				valueFound = true;
				button.active = true;
			} else {
				button.active = false;
			}
		});

		this.valueChange.emit(newVal);
	}

	get value(): unknown {
		return this.#value;
	}

	@Output() valueChange = new EventEmitter<unknown>();
	@Input() selectionIcon: string | undefined;
	@Input() set selections(options: PickerOption[]) {
		let valueFound = false;
		this.buttons = options.map((option, index) => {
			let active = false;
			if (!valueFound && option.value === this.value) {
				valueFound = true;
				active = true;
			}
			return {
				id: index,
				label: option.label,
				icon: option.icon,
				value: option.value,
				active,
			};
		});

		if (!valueFound) {
			this.value = this.buttons[0].value;
		}
	}

	getActiveIcon(): string {
		return (
			this.buttons.find(button => button.active)?.icon ??
			this.selectionIcon ??
			''
		);
	}
}
