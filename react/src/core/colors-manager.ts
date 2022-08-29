import {TFilterParams, TState} from 'core/defs';
import {Colors} from 'core/colors';



export class ColorsManager {
	private _allColors: Colors;

	constructor () {
		this._allColors = new Colors();
	}

	get allColors (): Colors {
		return this._allColors;
	}

	emptyAllColors () {
		this._allColors = new Colors();
	}



	init (state: TState) {
		this.updateFilterColorCounts({state});
	}



	updateFilterColorCounts ({state} : {state: TState}): void {
		for (let button of Object.values(state.filter.colors)) {
			button.amount = 0;
		}
		for (let color of this._allColors) {
			let button = state.filter.colors[color.code];
			button.amount++;
		}
	}



	filterColors ({state} : {state: TState}) {
		let colorCodesList = [];
		for (let button of Object.values(state.filter.colors)) {
			if (button.isActive) {
				colorCodesList.push(button.code);
			}
		}
		state.colors.replace(this.getColors({filter: {colorCodesList}}).list);
		state.filter.clear.isActive = (colorCodesList.length > 0);
	}



	editColor ({state, colorId, colorCode} : {state: TState, colorId: number, colorCode?: string}): void {
		let color = this._allColors.getById(colorId);

		if (!color) {
			return;
		}
		if (colorCode && color.code === colorCode && color.text === colorCode) {
			return;
		}

		if (colorCode === undefined) {
			colorCode = color.code;
		}

		color.code = colorCode;
		color.text = colorCode;

		this.updateFilterColorCounts({state});
		this.filterColors({state});
	}



	getColors ({filter} : {filter?: TFilterParams} = {}): Colors {
		let inColors: Colors = JSON.parse(JSON.stringify(this._allColors));
		let outColors = new Colors();

		if ((filter?.colorCodesList?.length ?? 0) > 0) {
			if (filter?.colorCodesList) {
				let filterColorsMap: Record<string, boolean> = {};
				for (let colorCode of filter.colorCodesList) {
					filterColorsMap[colorCode] = true;
				}
				for (let color of inColors.list) {
					if (filterColorsMap[color.code]) {
						outColors.push(color);
					}
				}
			}
		} else {
			outColors.replace(inColors);
		}

		return outColors;
	}
}
