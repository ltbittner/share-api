<?php

class FacebookPostVideo extends RestWork {

	function action() {

	    if(!isset($_POST['source']) ||  $_POST['source'] == ""){
	      $this->generateErrorResponse("Missing required param");
	      exit;
	    }

	    $config = include("keys.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $config['app_id'],
	      'app_secret' => $config['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);

	    if(!$this->fileExists($_POST['source'])) {
	    	$this->generateErrorResponse("File does not exist");
	    }

	    $data = [
	      'source' => $fb->videoToUpload($_POST['source']),
	    ];

	    if(isset($_POST['description']) && $_POST['description'] != ""){
	        $data['description'] = $_POST['description'];
	    }


	    try {
	      $response = $fb->post('/me/videos', $data, $_SESSION['facebook_access_token']);
	    } catch(Facebook\Exceptions\FacebookResponseException $e) {
	      // When Graph returns an error
	      echo 'Graph returned an error: ' . $e->getMessage();
	      exit;
	    } catch(Facebook\Exceptions\FacebookSDKException $e) {
	      // When validation fails or other local issues
	      echo 'Facebook SDK returned an error: ' . $e->getMessage();
	      exit;
	    }

	    $this->generateSuccessResponse("Successfully posted video");

	}

}


return new FacebookPostVideo();