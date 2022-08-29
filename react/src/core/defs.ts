import {Colors} from 'core/colors';



export type TState = {
	filter: TFilter,
	colors: Colors,
}

export type TColors = {
	list:  TColorsList,
	index: TColorsIndex,
	maxId: number,
}

export type TColorsList  = TColor[];
export type TColorsIndex = Record<number, number>;

export type TColor = {
	id:   number,
	code: string,
	text: string,
}



export type TFilter = {
	colors: TFilterColorButtons,
	clear:  TFilterButton,
}

export type TFilterColorButtons = {
	[key: string]: TFilterColorButton,
}

export type TFilterButton = {
	text:     string,
	isActive: boolean,
}

export type TFilterColorButton = TFilterButton & {
	code:   string,
	amount: number,
}



export type TComponentParams = {
	state:    TState,
	dispatch: TDispatch,
}



export enum ActionTypeEnum {
	createColor, editColor, deleteColor,
	toggleFilter, clearFilter,
}

export type TFilterParams = {
	colorCodesList: string[],
}

export type TEditColorData = {
	id:    number,
	color: string,
}



export type TDispatch = (type: string, data?: any) => void;
