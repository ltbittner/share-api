<?php
use Abraham\TwitterOAuth\TwitterOAuth;
class TwitterAuthSuccess extends RestWork {

	function action() {
		$config = include("keys.php");
		$settings = include("config/settings.php");

		$request_token = [];
	    $request_token['oauth_token'] = $_SESSION['oauth_token'];
	    $request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

	    if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
	        return false;
	    }

	    $connection = new TwitterOAuth($config['twitter_consumer_key'], $config['twitter_consumer_secret'], $request_token['oauth_token'], $request_token['oauth_token_secret']);
	    $access_token = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));
	    if($connection->getLastHttpCode() == 200){
	      $_SESSION['access_token'] = $access_token;
	    } else {
	    }

	    echo "<script>window.close();</script>";
       	die();

	}

}


return new TwitterAuthSuccess();