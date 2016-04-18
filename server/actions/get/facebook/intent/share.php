<?php

class FacebookIntent extends RestWork {

	function action() {

		$config = include('keys.php');

		$base = "https://facebook.com/dialog/feed?app_id=" . $config['app_id'];

		if(!empty($_GET['caption'])) {
			$base .= '&caption=' . $_GET['caption'];
		}

		if(!empty($_GET['picture'])) {
			$base .= '&picture=' . $_GET['picture'];
		}

		if(!empty($_GET['link'])) {
			$base .= '&link=' . $_GET['link'];
		}

		$this->generateSuccessResponse($base);

	}

}

return new FacebookIntent();