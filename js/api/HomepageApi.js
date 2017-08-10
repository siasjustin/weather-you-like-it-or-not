import 'whatwg-fetch'; 
class HomePageApi {
	static getAllHomePageData(zip){
    console.log("api fetch call");
    const errorNotFound = `We're sorry but you have chosen an invalid US zipcode`;
		return fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=43304b46c6c67520672e3a97c1bf3f18')
      .then(response => {
        console.log("The response: ", response);
        return response.json();
  		}).catch(error => {
  			return error;
  		});
	}
}

export default HomePageApi;