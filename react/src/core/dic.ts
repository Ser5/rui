import {ColorsManager} from 'core/colors-manager';
import {createReducer} from 'core/reducer';



export const colorsManager = new ColorsManager();

export const reducer = createReducer(colorsManager);
