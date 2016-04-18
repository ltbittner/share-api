<?php

use Abraham\TwitterOAuth\TwitterOAuth;
class TwitterPostTweet extends RestWork {

	function action() {

		if(!isset($_POST['message'])){
	      $this->generateErrorResponse("Missing required param: message");
	      
	    }

	    $final = $_POST['message'];	    

	    $access_token = $_SESSION['access_token'];
	    $config = include("keys.php");
	    $connection = new TwitterOAuth($config['twitter_consumer_key'], $config['twitter_consumer_secret'], $access_token['oauth_token'], $access_token['oauth_token_secret']);
	    $user = $connection->post("statuses/update", array("status" => $final));
	    if($connection->getLastHttpCode() == 200){
	      $this->generateSuccessResponse('Successfully posted tweet');
	    } else {
	      $this->generateErrorResponse('Could not post tweet');
	    }

	}

}

return new TwitterPostTweet();