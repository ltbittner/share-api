<?php

class FacebookUserPicture extends RestWork {

	function action() {

		$config = include("keys.php");
		$fb = new Facebook\Facebook([
			'app_id' => $config['app_id'],
			'app_secret' => $config['app_secret'],
			'default_graph_version' => 'v2.4',
		]);
	

		$path = '/me?fields=picture';

		if(isset($_GET['width'])) {
			$path .= ".width( " . $_GET['width'] . ")";
		}


		try {
			$response = $fb->get($path, $_SESSION['facebook_access_token']  );
		} catch(Facebook\Exceptions\FacebookResponseException $e) {
			$this->generateErrorResponse($e->getMessage());
			exit;
		} catch(Facebook\Exceptions\FacebookSDKException $e) {
			$this->generateErrorResponse($e->getMessage());
			exit;
		}

		$user = $response->getGraphObject();

		$this->generateSuccessResponse($user);

	}

}

return new FacebookUserPicture();