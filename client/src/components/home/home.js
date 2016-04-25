import './home.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as global from '../../redux/actions/action-global';

import Share from 'tb-share-client';
// import Share from '../share/share';

export default class Home extends Component {
	constructor() {
		super();
	}

	componentDidMount() {

		this.share = new Share({
			pathToServer: "http://share2.api",
			facebookAppId: '452484801614654'
		});

	}

	fbShare() {

		this.share.postFacebookStatus({message: "HELLO!"}, this.success.bind(this));

	}

	fbLink() {

		this.share.postFacebookLink({link: 'http://thinkingbox.ca', message: "TEST LINK"}, this.success.bind(this));

	}

	fbPhoto() {

		this.share.postFacebookPhoto({source: 'http://wallpapercave.com/wp/kaSVIDm.jpg', message: 'TEST PHOTO'}, this.success.bind(this));

	}

	fbVideo() {
		this.share.postFacebookVideo({source: "/Users/logan/Desktop/synopsis.mp4", description: "TEST"}, this.success.bind(this));
	}

	fbIntent() {

		this.share.facebookIntent({picture: 'http://wallpapercave.com/wp/kaSVIDm.jpg', caption: "TEST"});

	}

	fbProfilePicture() {

		this.share.getFacebookProfilePicture(null, this.successTwo.bind(this));

	}

	twTweet() {

		this.share.postTwitterTweet({message: "TEST TWEET YO"}, this.success.bind(this));

	}

	twPhoto() {

		this.share.postTwitterPhoto({source: "http://wallpapercave.com/wp/kaSVIDm.jpg", message: "TEST PHOTO"}, this.success.bind(this));

	}

	twVideo() {
		
		this.share.postTwitterVideo({source: '/Users/logan/Desktop/synopsis.mp4', message: "TEST"}, this.success.bind(this));

	}

	twIntent() {

		this.share.twitterIntent({text: "TEST", url: "http://criminal.movie"});

	}

	tumblrText() {
		
		this.share.getTumblrBlogs(this.tumblrTextCallback.bind(this));

	}

	tumblrTextCallback(blogs) {

		this.share.postTumblrText({message: "TEST", blogName: blogs[0], title: "TEST" }, this.success.bind(this));

	}

	tumblrPhoto() {

		this.share.getTumblrBlogs(this.tumblrPhotoCallback.bind(this));

	}

	tumblrPhotoCallback(blogs) {

		this.share.postTumblrPhoto({source: "http://wallpapercave.com/wp/kaSVIDm.jpg", blogName: blogs[0], caption: "TEST"}, this.success.bind(this));

	}

	tumblrLink() {

		this.share.getTumblrBlogs(this.tumblrLinkCallback.bind(this));
	}

	tumblrLinkCallback(blogs) {

		this.share.postTumblrLink({url: 'http://criminal.movie', title: 'CRIMINAL MOVIE', blogName: blogs[0]}, this.success.bind(this));
	}

	tumblrVideo() {

		this.share.getTumblrBlogs(this.tumblrVideoCallback.bind(this));

	}

	tumblrVideoCallback(blogs) {

		this.share.postTumblrVideo({source: "/Users/logan/Desktop/synopsis.mp4", caption: "TEST VIDEO", blogName: blogs[0]}, this.success.bind(this));
	}

	success() {
		alert("DID IT!");
	}

	successTwo(resp) {
		console.log(resp);
	}

	render() {
		return (
			<div className='content home'>
				<div onClick={this.fbShare.bind(this)}>FACEBOOK SHARE</div>

				<div onClick={this.fbLink.bind(this)}>FACEBOOK LINK</div>

				<div onClick={this.fbPhoto.bind(this)}>FACEBOOK PHOTO</div>

				<div onClick={this.fbVideo.bind(this)}>FACEBOOK VIDEO</div>

				<div onClick={this.fbIntent.bind(this)}>FACEBOOK INTENT</div>

				<div onClick={this.fbProfilePicture.bind(this)}>FACEBOOK PICTURE</div>

				<br/><br/>

				<div onClick={this.twTweet.bind(this)}>TWITTER TWEET</div>

				<div onClick={this.twPhoto.bind(this)}>TWITTER PHOTO</div>

				<div onClick={this.twIntent.bind(this)}>TWITTER INTENT</div>

				<div onClick={this.twVideo.bind(this)}>TWITTER VIDEO</div>

				<br/><br/>

				<div onClick={this.tumblrText.bind(this)}>TUMBLR TEXT</div>
				
				<div onClick={this.tumblrPhoto.bind(this)}>TUMBLR PHOTO</div>

				<div onClick={this.tumblrLink.bind(this)}>TUMBLR LINK</div>

				<div onClick={this.tumblrVideo.bind(this)}>TUMBLR VIDEO</div>
			</div>
		);
	}
}

