var Reqwest = require('reqwest');

class Twitter {

	constructor(path) { 
		
		this.pathToServer = path;
		this.loggedIn = false;
		this.loginLink = "";

		this.checkTwitterLogin();

	}



	checkTwitterLogin(callback) {

	
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/twitter/check/loggedin`,
			method: "GET",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(data.response == 'yes') {
						if(callback) callback();
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
				this.checkTwitterLogin(callback);
				clearInterval(int);			
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

	postVideo(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.video(params, success, error)});

		} else {

			this.video(params, success, error);

		}

	}

	video(params, successCallback, errorCallback) {

		if(!params.source)
			throw "Missing 'source' param";

		Reqwest({
			url: `${this.pathToServer}/twitter/post/video`,
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

	intent(params) {
		

		let baseURL = 'http://twitter.com/intent/tweet?';

		if(params.text)
			baseURL += `text=${params.text}&`;

		if(params.url)
			baseURL += `url=${escape(params.url)}&`;

		if(params.hashtags)
			baseURL += `hashtags=${params.hashtags}`;

		baseURL = baseURL.slice(0, -1);

		window.open(baseURL);



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
					if(errorCallback) {
						this.loggedin = false;
					}
				}
			}
		});

	}

}

module.exports = Twitter;