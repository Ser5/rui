import {current, immerable} from 'immer';
import {TColors, TColor, TColorsList, TColorsIndex} from 'core/defs';
import {colorCodesList} from 'core/base-colors';



export class Colors {
	[immerable] = true;

	list:  TColorsList  = [];
	index: TColorsIndex = {};
	maxId: number       = -1;

	constructor (colors: Colors | TColorsList | null = null) {
		if (colors instanceof Colors) {
			this.list = colors.list;
		} else if (Array.isArray(colors)) {
			this.list = colors;
		} else {
			this.list = [];
		}
	}


	getById (id: number): TColor {
		return this.list[this.index?.[id]] ?? null;
	}


	push (color: TColor): void {
		this.list.push(color);
		this.index[color.id] = this.list.length - 1;
		this.maxId           = Math.max(this.maxId, color.id);
	}


	pushRandom (): void {
		this.maxId++;
		let colorCode = colorCodesList[Math.floor(Math.random() * 3)];
		let color     = {id: this.maxId, code: colorCode, text: colorCode};
		this.push(color);
		this.index[color.id] = this.list.length - 1;
	}


	replace (newColors: Colors | TColorsList): void {
		this.maxId = -1;
		this.list.splice(0, this.list.length, ...(Array.isArray(newColors) ? newColors : newColors.list));
		this._regenerateIndex();
	}


	delete (colorId: number): void {
		let index = this.index[colorId];
		this.list.splice(index, 1);
		this._regenerateIndex();
	}


	private _regenerateIndex (): void {
		for (let key of Object.keys(this.index)) {
			delete this.index[+key];
		}
		for (let [index, color] of this.list.entries()) {
			this.index[color.id] = index;
			this.maxId           = Math.max(this.maxId, color.id);
		}
	}


	*[Symbol.iterator] (): Iterator<TColor> {
		for (let color of this.list) {
			yield color;
		}
	}
}
