import Reqwest from 'reqwest';
import Facebook from './facebook/facebook';
import Twitter from './twitter/twitter';
import Tumblr from './tumblr/tumblr';

export default class Share {

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

		if(!this.facebookEnabled)  return;

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookStatus(params, callback, error);
	}

	postFacebookLink(params, success, error) {

		if(!this.facebookEnabled) return;

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookLink(params, success, error);
	}

	postFacebookPhoto(params, success, error) { 

		if(!this.facebookEnabled) return;

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookPhoto(params, success, error);
	}

	postFacebookVideo(params, success, error) {

		if(!this.facebookEnabled) return;

		if(!params)
			this.throwMissingParamException();

		this.facebook.postFacebookVideo(params, success, error)
	}

	facebookIntent(params) {

		if(!this.facebookEnabled) return;

		if(!params)
			this.throwMissingParamException();

		this.facebook.intent(params);
	}

	postTwitterTweet(params, success, error) {

		if(!this.twitterEnabled) return;

		if(!params)
			this.throwMissingParamException();

		this.twitter.postTweet(params, success, error)

	}

	postTwitterPhoto(params, success, error) {

		if(!this.twitterEnabled) return;

		if(!params)
			this.throwMissingParamException();

		this.twitter.postPhoto(params, success, error)

	}

	twitterIntent(params) {

		if(!params)
			this.throwMissingParamException();

		this.twitter.intent(params);

	}

	getTumblrBlogs(callback) {

		let i = this.tumblr.getBlogs();
		i.then((val) => {
			callback(val);
		});

	}

	postTumblrText(params, success, error) {

		if(!this.tumblrEnabled) error();

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postText(params, success, error);

	}

	postTumblrPhoto(params, success, error) {

		if(!this.tumblrEnabled) error();

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postPhoto(params, success, error);

	}

	postTumblrLink(params, success, error) {

		if(!this.tumblrEnabled) error();

		if(!params)
			this.throwMissingParamException();

		this.tumblr.postLink(params, success, error);

	}

	throwMissingParamException(missing) {

		if(missing) {
			throw `Missing required param: ${missing}`;
		} else {
			throw "Missing required param.";
		}
	}

}














