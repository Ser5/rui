import {baseColors} from 'core/base-colors';

let cssBackgroundColorsMap: Record<string, string> = {
	red:   '#ecc',
	green: '#cec',
	blue:  '#cde',
};
let stylesHtml = `
	${['.button_$', '.color_$ .color__block'].map(template => {
		return Object.keys(baseColors).map(colorCode => {
			let selector = template.replace('$', colorCode);
			let cssColor = cssBackgroundColorsMap[colorCode];
			return `${selector} {background: ${cssColor};}`;
		}).join('');
	}).join('')}
`;

export function ColorStyles (prop: any, context: any): JSX.Element {
	return (<style dangerouslySetInnerHTML={{__html: stylesHtml}}></style>);
}
