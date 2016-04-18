<?php

class FacebookPostPhoto extends RestWork {

	function action() {

		 if(!isset($_POST['source']) || $_POST['source'] == ""){
	      $this->generateErrorResponse("Missing required param: 'source'");
	      exit;
	    }

	    $config = include("keys.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $config['app_id'],
	      'app_secret' => $config['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);

	    $data = [
	      'source' => $fb->fileToUpload($_POST['source']),
	    ];

	    if(isset($_POST['message']) && $_POST['message'] != ""){
	        $data['message'] = $_POST['message'];
	    }


	    try {
	      // Returns a `Facebook\FacebookResponse` object
	      $response = $fb->post('/me/photos', $data, $_SESSION['facebook_access_token']);
	    } catch(Facebook\Exceptions\FacebookResponseException $e) {
	      return 'Graph returned an error: ' . $e->getMessage();
	      exit;
	    } catch(Facebook\Exceptions\FacebookSDKException $e) {
	      return 'Facebook SDK returned an error: ' . $e->getMessage();
	      exit;
	    }

	    $this->generateSuccessResponse("Successfully posted photo");

	}

}

return new FacebookPostPhoto();