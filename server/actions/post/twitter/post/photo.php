<?php

use Abraham\TwitterOAuth\TwitterOAuth;
class TwitterPostPhoto extends RestWork {

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

	    $media1 = $connection->upload('media/upload', array('media' => $source));
	    $parameters = array(
	        'status' => $final,
	        'media_ids' => implode(',', array($media1->media_id_string)),
	    );
	    $result = $connection->post('statuses/update', $parameters);
	    if($connection->getLastHttpCode() == 200){
	      $this->generateSuccessResponse("Successfully posted photo");
	    } else {
	      $this->generateSuccessResponse("Error posting photo");
	    }

	}

}

return new TwitterPostPhoto();