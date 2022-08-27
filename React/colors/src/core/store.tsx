import {useState} from 'react';

import {TFilterParams, TState, TFilter, TDispatch} from 'core/defs';
import {baseColors, baseColorEntries, colorCodesList} from 'core/base-colors';
import {Colors} from 'core/colors';

import {colorsManager as cm} from 'core/dic';
import {reducer} from 'core/dic';



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



for (let [index, code] of colorCodesList.entries()) {
	let id = index + 1;
	cm.allColors.push({id, code, text: code});
}



let initState: TState = {
	filter: filterState,
	colors: cm.getColors(),
};

cm.init(initState);



export function useStore (): [TState, TDispatch] {
	const [state, setState] = useState(initState);

	let dispatch: TDispatch = function (type, data?) {
		setState(reducer(state, [type, data]))
	}

	return [state, dispatch];
}
