<?php

class TumblrAuthLogin extends RestWork {

	function action() {

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $requestHandler = $client->getRequestHandler();
	    $requestHandler->setBaseUrl('https://www.tumblr.com/');

	    $resp = $requestHandler->request('POST', 'oauth/request_token', array());

	    $out = $result = $resp->body;
	    $data = array();
	    parse_str($out, $data);

	    $callback = $config['domain'] . "/tumblr/login/success/";
	    $_SESSION['tumblr_temp_token'] = $data['oauth_token'];
	    $_SESSION['tumblr_temp_secret'] = $data['oauth_token_secret'];
	    
	    $final = 'https://www.tumblr.com/oauth/authorize?oauth_token=' . $data['oauth_token'] . "&oauth_callback=" . $callback;

	    $this->generateSuccessResponse($final);

	}

}

return new TumblrAuthLogin();