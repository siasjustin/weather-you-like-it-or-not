import * as types from './actionTypes';
import HomePageApi from '../api/HomePageApi';

export function loadHomePageSuccess(data) {
	return {type: types.LOAD_HOMEPAGE_DATA_SUCCESS, data};
}

// export function loadHomePageFail(data) {
//   return {type: types.LOAD_HOMEPAGE_DATA_FAIL};
// }

export function loadHomePageData(zip) {
	return function(dispatch) {
    console.log("dispatching homepage data from homepageActions.js")
		return HomePageApi.getAllHomePageData(zip).then(data => {
      // if(response.ok) {
        dispatch(loadHomePageSuccess(data));
      // } else {
      //   dispatch(loadHomePageFail(data));
      // }
			
		}).catch(error => {
       console.error("dispatching error homepageActions.js")
    
			throw(error);
		});
	};
}