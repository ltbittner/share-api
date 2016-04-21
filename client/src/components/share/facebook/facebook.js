import Reqwest from 'reqwest';

export default class Facebook {

	constructor(path, id) { 
		this.pathToServer = path;
		this.loggedIn = false;
		this.loginLink = "";

		this.checkFacebookLogin();

		if(id) {
			this.id = id;
			this.injectUIScript();
		}
	}

	injectUIScript() {

		var id = this.id;

		window.fbAsyncInit = function() {
			FB.init({
				appId      : id,
				xfbml      : true,
				version    : 'v2.5'
			});
			FB.getLoginStatus( function( response ) {
	            window.fbStatus = response.status;
	        });
		};

		(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));
	}

	checkFacebookLogin(callback) {
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/facebook/check/loggedin`,
			method: "GET",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(data.response == 'yes') {
						if(callback)
							callback();
						self.loggedIn = true;
					} else {
						self.loggedIn = false;
						self.getFacebookLogin();
					}	
				}
			}
		});
	}

	getFacebookLogin() {
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/facebook/auth/login`,
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
					this.checkFacebookLogin(callback);
					clearInterval(int);
					
				}
			}, 500);

	}

	postFacebookStatus(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.status(params, success, error)});
			
		} else {

			this.status(params, success, error);

		}

	}

	postFacebookLink(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.link(params, success, error)});

		} else {

			this.link(params, success, error);

		}

	}

	postFacebookPhoto(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.photo(params, success, error)});

		} else {

			this.photo(params, success, error);

		}

	}

	postFacebookVideo(params, success, error) {

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
			url: `${this.pathToServer}/facebook/post/video`,
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
			url: `${this.pathToServer}/facebook/post/photo`,
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

	link (params, successCallback, errorCallback) {

		if(!params.link)
			throw "Missing 'link' param";

		Reqwest({
			url: `${this.pathToServer}/facebook/post/link`,
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

	status (params, successCallback, errorCallback) {
		if(!params.message)
			throw "Missing 'message' param";

		Reqwest({
			url: `${this.pathToServer}/facebook/post/status`,
			method: "POST",
			data: {
				message: params.message
			},
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

	//picture, caption, link
	intent(params) {

		if(navigator.userAgent.match('CriOS')) {
			let link = `https://facebook.com/dialog/feed?app_id=${this.id}`;

			if(params.picture)
				link += `&picture=${params.picture}`;

			if(params.caption)
				link += `&caption=${params.caption}`;

			if(params.link)
				link += `&link=${params.link}`;



			let url = encodeURI(link);
			window.open(url);
			return;

		} else {
			let temp = {method: 'feed'};

			Object.assign(params, temp);

			FB.ui(params);
		}
	}

	getProfilePicture(params, success, error) {

		if(this.loggedIn == false) {

			this.login(() => {this.profilePicture(params, success, error)});

		} else {

			this.profilePicture(params, success, error);

		}

	}

	profilePicture(params, successCallback, errorCallback) {

		Reqwest({
			url: `${this.pathToServer}/facebook/user/picture`,
			method: "GET",
			data: params,
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(successCallback)
						successCallback(data.response.picture.url);
				} else {
					if(errorCallback)
						errorCallback();
				}
			}
		});

	}

}









