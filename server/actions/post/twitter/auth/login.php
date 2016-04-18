<?php
use Abraham\TwitterOAuth\TwitterOAuth;
class TwitterAuthLogin extends RestWork {

	function action() {
		$this->generateSuccessResponse($this->generateLoginLink());
	}


	public function generateLoginLink() {

		$config = include("keys.php");
		$settings = include("config/settings.php");
		$callback = $settings['domain'] . '/twitter/auth/success';

	    $connection = new TwitterOAuth($config['twitter_consumer_key'], $config['twitter_consumer_secret']);
	    $request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => $callback));
	    $_SESSION['oauth_token'] = $request_token['oauth_token'];
	    $_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
	    $url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));

	    return $url;	    

	}

}

return new TwitterAuthLogin();