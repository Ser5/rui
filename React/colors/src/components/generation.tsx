import {TState, TDispatch} from 'core/defs';



export function Generation ({state, dispatch}: {state: TState, dispatch: TDispatch}) {
	return (
	<div className="gen">
		<button className="gen__button button" onClick={e => dispatch('colorAdd')}>Добавить</button>
		<button className="gen__button button" onClick={e => dispatch('regeneration')}>Пересоздать</button>
	</div>
	);
}
