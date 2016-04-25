var Reqwest = require('reqwest');
var Facebook = require('./facebook/facebook');
var Twitter = require('./twitter/twitter');
var Tumblr = require('./tumblr/tumblr');

class Share {

	constructor(config) {

		if(!config.pathToServer) {
			this.throwMissingParamException('pathToServer');
		}

		this.pathToServer = config.pathToServer;

		this.facebookEnabled = config.facebookEnabled || true;	
		this.twitterEnabled = config.twitterEnabled || true;
		this.tumblrEnabled = config.tumblrEnabled || true;


		if(this.facebookEnabled) {
			this.facebook = new Facebook(this.pathToServer, config.facebookAppId);
		}

		if(this.twitterEnabled) {
			this.twitter = new Twitter(this.pathToServer);
		}

		if(this.tumblrEnabled) {
			this.tumblr = new Tumblr(this.pathToServer);
		}

	}

	postFacebookStatus(params, callback, error) {

		if(!this.facebookEnabled)  error("Facebook is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookStatus(params, callback, error);
	}

	postFacebookLink(params, success, error) {

		if(!this.facebookEnabled) error("Facebook is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookLink(params, success, error);
	}

	postFacebookPhoto(params, success, error) { 

		if(!this.facebookEnabled) error("Facebook is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookPhoto(params, success, error);
	}

	postFacebookVideo(params, success, error) {

		if(!this.facebookEnabled) error("Facebook is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookVideo(params, success, error)
	}

	facebookIntent(params) {

		if(!this.facebookEnabled) error("Facebook is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.facebook.intent(params);
	}

	getFacebookProfilePicture(params, success, error) {

		if(!this.facebookEnabled) error("Facebook is not enabled");

		this.facebook.getProfilePicture(params, success, error);

	}

	postTwitterTweet(params, success, error) {

		if(!this.twitterEnabled) error("Twitter is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.twitter.postTweet(params, success, error)

	}

	postTwitterPhoto(params, success, error) {

		if(!this.twitterEnabled) error("Twitter is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.twitter.postPhoto(params, success, error)

	}

	postTwitterVideo(params, success, error) {
		if(!this.twitterEnabled) error("Twitter is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.twitter.postVideo(params, success, error)
	}

	twitterIntent(params) {

		if(!params)
			this.throwMissingParamException();

		this.twitter.intent(params);

	}

	getTumblrBlogs(callback) {

		let i = this.tumblr.getBlogs("Tumblr is not enabled");
		i.then((val) => {
			callback(val);
		});

	}

	postTumblrText(params, success, error) {

		if(!this.tumblrEnabled) error("Tumblr is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postText(params, success, error);

	}

	postTumblrPhoto(params, success, error) {

		if(!this.tumblrEnabled) error("Tumblr is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postPhoto(params, success, error);

	}

	postTumblrLink(params, success, error) {

		if(!this.tumblrEnabled) error("Tumblr is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postLink(params, success, error);

	}

	postTumblrVideo(params, success, error) {

		if(!this.tumblrEnabled) error("Tumblr is not enabled");

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postVideo(params, success, error);
	}

	throwMissingParamException(missing) {

		if(missing) {
			throw `Missing required param: ${missing}`;
		} else {
			throw "Missing required param.";
		}
	}

}


module.exports = Share;














