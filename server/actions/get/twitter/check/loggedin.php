<?php

class TwitterCheckLoggedin extends RestWork {

	function action() {

		if(isset($_SESSION['access_token'])) {

			$this->generateSuccessResponse('yes');

		} else {

			$this->generateSuccessResponse('no');

		}

	}

}

return new TwitterCheckLoggedin();