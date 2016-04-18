<?php

class TumblrAuthSuccess extends RestWork {

	function action() {

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $requestHandler = $client->getRequestHandler();
	    $requestHandler->setBaseUrl('https://www.tumblr.com/');
	    $client->setToken($_SESSION['tumblr_temp_token'],  $_SESSION['tumblr_temp_secret']);
	    $verifier = $_GET['oauth_verifier'];
	  
	    $resp = $requestHandler->request('POST', 'oauth/access_token', array('oauth_verifier' => $verifier));
	    $out = $result = $resp->body;
	    $data = array();
	    parse_str($out, $data);

	    $token = $data['oauth_token'];
	    $secret = $data['oauth_token_secret'];
	    $_SESSION['tumblr_token'] = $token;
	    $_SESSION['tumblr_secret'] = $secret;

	    echo "<script>window.close();</script>";

	}

}

return new TumblrAuthSuccess();