import Reqwest from 'reqwest';

export default class Twitter {

	constructor(path) { 
		
		this.pathToServer = path;
		this.loggedIn = false;
		this.loginLink = "";

		this.checkTwitterLogin();

	}



	checkTwitterLogin() {

	
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/twitter/check/loggedin`,
			method: "GET",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(data.response == 'yes') {
						self.loggedIn = true;
					} else {
						self.loggedIn = false;
						self.getTwitterLogin();
					}	
				}
			}
		});
	}

	getTwitterLogin() {

		let self = this;
		Reqwest({
			url: `${this.pathToServer}/twitter/auth/login`,
			method: "POST",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					self.loginLink = data.response;
				}
			}
		});
	}

	login(callback) {
		let w = window.open(this.loginLink);

		var int = setInterval(() => {
			if(w.closed) {
				this.loggedIn = true;
				clearInterval(int);
				callback();
			}
		}, 500);
	}

	postTweet(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.tweet(params, success, error)});

		} else {

			this.tweet(params, success, error);

		}

	}

	postPhoto(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.photo(params, success, error)});

		} else {

			this.photo(params, success, error);

		}

	}

	photo(params, successCallback, errorCallback) {

		if(!params.source)
			throw "Missing 'source' param";

		Reqwest({
			url: `${this.pathToServer}/twitter/post/photo`,
			method: "POST",
			data: params,
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(successCallback)
						successCallback();
				} else {
					if(errorCallback)
						errorCallback();
				}
			}
		});

	}

	tweet(params, successCallback, errorCallback) {

		if(!params.message)
			throw "Missing 'message' param";

		Reqwest({
			url: `${this.pathToServer}/twitter/post/tweet`,
			method: "POST",
			data: params,
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(successCallback)
						successCallback();
				} else {
					if(errorCallback)
						errorCallback();
				}
			}
		});

	}

}