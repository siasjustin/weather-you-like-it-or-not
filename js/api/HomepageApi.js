import 'whatwg-fetch'; 
class HomePageApi {
	static getAllHomePageData(){
		return fetch('/api-homepage').then(response => {
			return response.json();
		}).catch(error => {
			return error;
		});
	}
}

export default HomePageApi;