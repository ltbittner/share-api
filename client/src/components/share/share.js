import Reqwest from 'reqwest';
import Facebook from './facebook/facebook';

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



	throwMissingParamException(missing) {

		if(missing) {
			throw `Missing required param: ${missing}`;
		} else {
			throw "Missing required param.";
		}

	}

}














