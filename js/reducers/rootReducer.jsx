import { combineReducers } from 'redux';
import homePageData from './homePageReducer';

const rootReducer = combineReducers({
	homePageData,
})

export default rootReducer;