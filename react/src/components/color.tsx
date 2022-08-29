import {TColor, TComponentParams} from 'core/defs';
import {baseColorEntries} from 'core/base-colors';


export function Color ({state, dispatch, color}: TComponentParams & {color: TColor}) {
	return (
	<div key={color.id} className={`color color_${color.code}`}>
		<div className="color__block">
			<select className="select-input" value={color.code} onChange={e => dispatch('clickedColorChange', {colorId: color.id, e})}>
				{baseColorEntries.map(([colorCode, colorName]) =>
					<option key={colorCode} value={colorCode}>{colorName}</option>
				)}
			</select>
		</div>
		<form className="color__block">
			{baseColorEntries.map(([colorCode, colorName]) =>
			<label key={colorCode}>
				<input type="radio" name="color" value={colorCode} checked={colorCode == color.code} onChange={e => dispatch('clickedColorChange', {colorId: color.id, e})}/> {colorName}
			</label>
			)}
		</form>
		<div className="color__block">
			<input
				className="color__text text-input" type="text" value={color.text}
				onChange   = {e => dispatch('colorTextChange',   {colorId: color.id, e})}
				onKeyPress = {e => dispatch('colorTextKeyPress', {colorId: color.id, e})}
				onBlur     = {e => dispatch('colorTextBlur',     {colorId: color.id})}
			/>
		</div>
		<div className="color__delete" onClick={e => dispatch('colorDelete', {colorId: color.id})}></div>
	</div>
	);
}
