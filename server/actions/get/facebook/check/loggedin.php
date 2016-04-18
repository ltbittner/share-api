<?php

class FacebookCheckLoggedin extends RestWork {

	function action() {

		if(isset($_SESSION['facebook_access_token'])) {

			$this->generateSuccessResponse('yes');

		} else {

			$this->generateSuccessResponse('no');

		}

	}

}

return new FacebookCheckLoggedin();