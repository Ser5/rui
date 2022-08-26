import {TComponentParams} from 'core/defs';


export function Filter ({state, dispatch}: TComponentParams) {
	return (
	<div className="filter">
		<form className="filter__buttons">
			{Object.values(state.filter.colors).map(button =>
				<label key={button.code} className={`filter__button button button_${button.code}`}>
					<div className="button-text">{button.text}</div>
					<div className="button-more">
						<div className="button-more__item filter__amount">{button.amount}</div>
						<input className="hidden" type="checkbox" name="color" value={button.code} checked={button.isActive} onChange={e => dispatch('filterButtonChange', {colorCode: button.code})}/>
						<div className={`button-more__item checkbox ${button.isActive ? 'active' : ''}`}></div>
					</div>
				</label>
			)}
		</form>
		<div className="filter__buttons">
			<button className="filter__button button" onClick={e => dispatch('filterClear')} disabled={!state.filter.clear.isActive}>Очистить фильтр</button>
		</div>
	</div>
	);
}
