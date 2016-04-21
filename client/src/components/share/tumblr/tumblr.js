import Reqwest from 'reqwest';

export default class Tumblr {

	constructor(path) { 
		
		this.pathToServer = path;
		this.loggedIn = false;
		this.loginLink = "";

		this.checkTumblrLogin();

		this.blogs = null;

	}

	checkTumblrLogin(callback) {
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/tumblr/check/loggedin`,
			method: "GET",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					if(data.response == 'yes') {
						self.loggedIn = true;
						self.getBlogsNormal();
					} else {
						self.loggedIn = false;
						self.getTumblrLogin();
					}	
				}
			}
		});
	}

	getTumblrLogin() {
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/tumblr/auth/login`,
			method: "POST",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					self.loginLink = data.response;
				}
			},
		});
	}

	getBlogsNormal() {
		let self = this;
		Reqwest({
			url: `${this.pathToServer}/tumblr/user/blogs`,
			method: "GET",
			withCredentials: true,
			success: (resp) => {
				let data = JSON.parse(resp);
				if(data.status == 'success') {
					self.blogs = data.response;
				}
			}
		});
	}


	getBlogs() {
		let self = this;
		return new Promise((resolve, reject) => {
			if(self.blogs != null){
				resolve(self.blogs);
				return;

			}

			let w = window.open(this.loginLink);
			var int = setInterval(() => {
				if(w.closed) {
					this.loggedIn = true;
					clearInterval(int);
					
					Reqwest({
						url: `${this.pathToServer}/tumblr/user/blogs`,
						method: "GET",
						withCredentials: true,
						success: (resp) => {
							let data = JSON.parse(resp);
							if(data.status == 'success') {
								self.blogs = data.response;
								resolve(self.blogs);
							
							} else {
								self.blogs = null;
								self.getTumblrLogin();
								reject();
							}
						},
						error: (resp) => {
							self.blogs = null;
							self.getTumblrLogin();
							reject();

						},
					});
				}
			}, 500); 
		});
	}

	postText(params, success, error) {

		if(this.blogs == null) {

			throw 'Must get user blogs before you can try to post';

		} else {

			this.text(params, success, error);

		}

	}

	postPhoto(params, success, error) {

		if(this.blogs == null) {

			throw 'Must get user blogs before you can try to post';

		} else {
			this.photo(params, success, error);
		}

	}

	postLink(params, success, error) {

		if(this.blogs == null) {
			throw 'Must get user blogs before you can try to post';
		} else {
			this.link(params, success, error);
		}

	}

	postVideo(params, success, error) {
		if(this.blogs == null) {
			throw 'Must get user blogs before you can try to post';
		} else {
			this.video(params, success, error);
		}
	}

	video(params, successCallback, errorCallback) {

		if(!params.source)
			throw "Missing 'source' param";

		if(!params.blogName)
			throw "Missing 'blogName' param";

		Reqwest({
			url: `${this.pathToServer}/tumblr/post/video`,
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

	link(params, successCallback, errorCallback) {

		if(!params.url)
			throw "Missing 'url' param";

		if(!params.blogName)
			throw "Missing 'blogName' param";

		Reqwest({
			url: `${this.pathToServer}/tumblr/post/link`,
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

		if(!params.blogName)
			throw "Missing 'blogName' param";

		Reqwest({
			url: `${this.pathToServer}/tumblr/post/photo`,
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

	text(params, successCallback, errorCallback) {

		if(!params.message)
			throw "Missing 'message' param";

		if(!params.blogName)
			throw "Missing 'blogName' param";

		Reqwest({
			url: `${this.pathToServer}/tumblr/post/text`,
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