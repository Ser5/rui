import {useState} from 'react';
import {produce, current} from 'immer';

import {TFilterParams, TState, TFilter, TDispatch} from 'core/defs';
import {baseColors, baseColorEntries, colorCodesList} from 'core/base-colors';
import {Colors} from 'core/colors';



let filterState: TFilter = {
	colors: {},
	clear:  {text: 'Очистить фильтр', isActive: false},
};
for (let [colorCode, colorName] of baseColorEntries) {
	filterState.colors[colorCode] = {
		code:     colorCode,
		text:     colorName,
		amount:   0,
		isActive: false,
	};
}



let allColors = new Colors();
for (let [index, code] of colorCodesList.entries()) {
	let id = index + 1;
	allColors.push({id, code, text: code});
}



function init (state: TState) {
	updateFilterColorCounts({state});
}



function updateFilterColorCounts ({state} : {state: TState}): void {
	for (let button of Object.values(state.filter.colors)) {
		button.amount = 0;
	}
	for (let color of allColors) {
		let button = state.filter.colors[color.code];
		button.amount++;
	}
}



function filterColors ({state} : {state: TState}) {
	let colorCodesList = [];
	for (let button of Object.values(state.filter.colors)) {
		if (button.isActive) {
			colorCodesList.push(button.code);
		}
	}
	state.colors.replace(getColors({filter: {colorCodesList}}).list);
	state.filter.clear.isActive = (colorCodesList.length > 0);
}



function editColor ({state, colorId, colorCode} : {state: TState, colorId: number, colorCode?: string}): void {
	let color = allColors.getById(colorId);

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

	updateFilterColorCounts({state});
	filterColors({state});
}



function getColors ({filter} : {filter?: TFilterParams} = {}): Colors {
	let inColors: Colors = JSON.parse(JSON.stringify(allColors));
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



let reducer = produce((draft: any, action: [string, any?]): any => {
	const state = draft as TState;

	let actionType: string = action[0];
	let p: any             = (action[1] !== undefined ? action[1] : null);
	let e: any             = p?.e || null;

	let run: Record<string, ()=>void> = {
		filterButtonChange () {
			let button = state.filter.colors[p.colorCode];
			button.isActive = !button.isActive;
			filterColors({state});
		},
		filterClear () {
			if (state.filter.clear.isActive) {
				for (let button of Object.values(state.filter.colors)) {
					button.isActive = false;
				}
				filterColors({state});
			}
		},
		colorAdd () {
			allColors.pushRandom();
			updateFilterColorCounts({state});
			filterColors({state});
		},
		regeneration () {
			allColors = new Colors();
			for (let colorId = 1; colorId <= 20; colorId++) {
				allColors.pushRandom();
			}
			updateFilterColorCounts({state});
			filterColors({state});
		},
		clickedColorChange () {
			editColor({state, colorId: p.colorId, colorCode: e.target.value});
		},
		colorTextChange () {
			let text: string = e.target.value;
			let color = state.colors.getById(p.colorId);

			if (color) {
				color.text = text;
			}
			if (baseColors[text]) {
				editColor({state, colorId: p.colorId, colorCode: text});
			}
		},
		colorTextKeyPress () {
			if (e.key == 'Enter') {
				e.currentTarget.blur();
				editColor({state, colorId: p.colorId});
			}
		},
		colorTextBlur () {
			editColor({state, colorId: p.colorId});
		},
		colorDelete () {
			allColors.delete(p.colorId);
			updateFilterColorCounts({state});
			filterColors({state});
		}
	};

	run?.[actionType]?.();
});



let initState: TState = {
	filter: filterState,
	colors: getColors(),
};

init(initState);



export function useStore (): [TState, TDispatch] {
	const [state, setState] = useState(initState);

	let dispatch: TDispatch = function (type, data?) {
		setState(reducer(state, [type, data]))
	}

	return [state, dispatch];
}
