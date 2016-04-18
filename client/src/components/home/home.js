import './home.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as global from '../../redux/actions/action-global';

import Share from '../share/share';

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

	fbIntent() {

		this.share.facebookIntent({picture: 'http://wallpapercave.com/wp/kaSVIDm.jpg', caption: "TEST"});

	}

	success() {
		alert("DID IT!");
	}

	render() {
		return (
			<div className='content home'>
				<div onClick={this.fbShare.bind(this)}>FACEBOOK SHARE</div>

				<div onClick={this.fbLink.bind(this)}>FACEBOOK LINK</div>

				<div onClick={this.fbPhoto.bind(this)}>FACEBOOK PHOTO</div>

				<div onClick={this.fbIntent.bind(this)}>FACEBOOK INTENT</div>
			</div>
		);
	}
}

