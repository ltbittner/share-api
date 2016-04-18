<?php

class FacebookPostLink extends RestWork {

	function action() {

		if(!isset($_POST['link']) || $_POST['link'] == ""){
	      $this->generateErrorResponse("Missing required param: 'link'");
	      exit;
	    }

	    $keys = include("keys.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $keys['app_id'],
	      'app_secret' => $keys['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);

	    $linkData = [
	      'link' => $_POST['link'],
	      ];

	    if(isset($_POST['message']) && $_POST['message'] != ""){
	        $linkData['message'] = $_POST['message'];
	    }

	    try {
	      $response = $fb->post('/me/feed', $linkData, $_SESSION['facebook_access_token'] );
	    } catch(Facebook\Exceptions\FacebookResponseException $e) {
	      return 'Graph returned an error: ' . $e->getMessage();
	      exit;
	    } catch(Facebook\Exceptions\FacebookSDKException $e) {
	      return 'Facebook SDK returned an error: ' . $e->getMessage();
	      exit;
	    }

	    $this->generateSuccessResponse("Successfully posted link");

	}

}

return new FacebookPostLink();