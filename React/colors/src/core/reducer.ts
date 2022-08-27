import {TState} from 'core/defs';
import {baseColors} from 'core/base-colors';

import {produce} from 'immer';
import {ColorsManager} from 'core/colors-manager';



type TReducer = (base: any, action: [string, any?]) => any;



export function createReducer (cm: ColorsManager): TReducer {
	let reducer = produce((draft: any, action: [string, any?]): any => {
		const state = draft as TState;

		let actionType: string = action[0];
		let p: any             = (action[1] !== undefined ? action[1] : null);
		let e: any             = p?.e || null;

		let run: Record<string, ()=>void> = {
			filterButtonChange () {
				let button = state.filter.colors[p.colorCode];
				button.isActive = !button.isActive;
				cm.filterColors({state});
			},
			filterClear () {
				if (state.filter.clear.isActive) {
					for (let button of Object.values(state.filter.colors)) {
						button.isActive = false;
					}
					cm.filterColors({state});
				}
			},
			colorAdd () {
				cm.allColors.pushRandom();
				cm.updateFilterColorCounts({state});
				cm.filterColors({state});
			},
			regeneration () {
				cm.emptyAllColors();
				for (let colorId = 1; colorId <= 20; colorId++) {
					cm.allColors.pushRandom();
				}
				cm.updateFilterColorCounts({state});
				cm.filterColors({state});
			},
			clickedColorChange () {
				cm.editColor({state, colorId: p.colorId, colorCode: e.target.value});
			},
			colorTextChange () {
				let text: string = e.target.value;
				let color = state.colors.getById(p.colorId);

				if (color) {
					color.text = text;
				}
				if (baseColors[text]) {
					cm.editColor({state, colorId: p.colorId, colorCode: text});
				}
			},
			colorTextKeyPress () {
				if (e.key == 'Enter') {
					e.currentTarget.blur();
					cm.editColor({state, colorId: p.colorId});
				}
			},
			colorTextBlur () {
				cm.editColor({state, colorId: p.colorId});
			},
			colorDelete () {
				cm.allColors.delete(p.colorId);
				cm.updateFilterColorCounts({state});
				cm.filterColors({state});
			}
		};

		run?.[actionType]?.();
	});

	return reducer;
}
