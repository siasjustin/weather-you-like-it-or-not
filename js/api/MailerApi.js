import 'whatwg-fetch';
import axios from 'axios';

class MailerApi {
	static sendToMailer(contactFormInfo){
		console.log("Contact Form info: ", contactFormInfo);
		return fetch(`/api/mailer/${contactFormInfo.sentFrom}`, {
			method: 'POST',
			body: JSON.stringify(contactFormInfo),
			headers: {
				"Content-Type": "application/json"
			},
		})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		})
	};
}


export default MailerApi;