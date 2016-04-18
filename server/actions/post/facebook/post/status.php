<?php

class FacebookPostStatus extends RestWork {

	function action() {

		if(!isset($_SESSION['facebook_access_token'])) {
			$this->generateErrorResponse("User is not logged in");
		}

	    if(!isset($_POST['message']) || $_POST['message'] == ""){
	      $this->generateErrorResponse("Missing required param: message");
	    }

	    $config = include("keys.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $config['app_id'],
	      'app_secret' => $config['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);

	    $linkData = [
	      'message' => $_POST['message'],
	      ];

	    try {
	      // Returns a `Facebook\FacebookResponse` object
	      $response = $fb->post('/me/feed', $linkData, $_SESSION['facebook_access_token'] );
	    } catch(Facebook\Exceptions\FacebookResponseException $e) {
	      return 'Graph returned an error: ' . $e->getMessage();
	      exit;
	    } catch(Facebook\Exceptions\FacebookSDKException $e) {
	      return 'Facebook SDK returned an error: ' . $e->getMessage();
	      exit;
	    }

	    $graphNode = $response->getGraphNode();

	    $this->generateSuccessResponse('Successfully posted to timeline');
		
	}

}

return new FacebookPostStatus();