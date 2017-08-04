import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function homePageReducer(state = initialState.homePageData, action) {
	switch(action.type) {
		case types.LOAD_HOMEPAGE_DATA_SUCCESS:
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
}
