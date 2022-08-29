import 'assets/styles/reset.css';
import 'assets/styles/styles.css';

import {baseColorEntries}  from 'core/base-colors';
import {ColorStyles}       from 'components/color-styles';
import {useStore}          from 'core/store';

import {Filter}     from 'components/filter';
import {Generation} from 'components/generation';
import {Color}      from 'components/color';



function App () {
	const [state, dispatch] = useStore();


	return (
	<div className="app">
		<ColorStyles/>
		<div className="controls">
			<Filter     {...{state, dispatch}}/>
			<Generation {...{state, dispatch}}/>
		</div>
		<div className="colors">
				{state.colors.list.map(color =>
					<Color key={color.id} {...{state, dispatch, color}}/>
				)}
		</div>
	</div>
	)
}

export default App;
