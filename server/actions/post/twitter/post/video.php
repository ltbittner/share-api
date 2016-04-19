<?php

use Abraham\TwitterOAuth\TwitterOAuth;
class TwitterPostVideo extends RestWork {

	function action() {

		if(!isset($_POST['source']) || $_POST['source'] == ""){
	      $this->generateErrorResponse("Missing required param: source");
	    }
	    $config = include("keys.php");
	    $source = $_POST['source'];
	    $final = "";
	    
	    if(isset($_POST['message'])){
	     	$final = $_POST['message'];
	    }

	    $access_token = $_SESSION['access_token'];
	   	$connection = new TwitterOAuth($config['twitter_consumer_key'], $config['twitter_consumer_secret'], $access_token['oauth_token'], $access_token['oauth_token_secret']);
	   	// $connection->setTimeouts(5, 60);

	    $media1 = $connection->upload('media/upload', array('media' => $source, 'media_type' => 'video/mp4'), true);

	    $parameters = array(
	        'status' => $final,
	        'media_ids' => $media1->media_id_string,
	    );

	    $result = $connection->post('statuses/update', $parameters);

	    if($connection->getLastHttpCode() == 200){
	      $this->generateSuccessResponse("Successfully posted video");
	    } else {
	      $this->generateErrorResponse("Error posting video");
	    }

	}

}

return new TwitterPostVideo();