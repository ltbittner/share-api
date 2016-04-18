<?php

class TumblrCheckLoggedin extends RestWork {

	function action() {

    	if(isset($_SESSION['tumblr_token']) && isset($_SESSION['tumblr_secret'])) {

			$this->generateSuccessResponse('yes');

		} else {

			$this->generateSuccessResponse('no');

		}

	}

}

return new TumblrCheckLoggedin();