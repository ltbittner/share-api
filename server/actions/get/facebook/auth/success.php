<?php

class FacebookAuthSuccess extends RestWork {

	function action() {
		date_default_timezone_set('UTC');
		$config = include("keys.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $config['app_id'],
	      'app_secret' => $config['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);

	    $settings = include("config/settings.php");
	
	    $helper = $fb->getRedirectLoginHelper();
	    try {
	      $accessToken = $helper->getAccessToken($settings['domain'] . '/facebook/auth/success');
	    } catch(Facebook\Exceptions\FacebookResponseException $e) {
	      echo 'Graph returned an error: ' . $e->getMessage();
	      exit;
	    } catch(Facebook\Exceptions\FacebookSDKException $e) {
	      echo 'Facebook SDK returned an error: ' . $e->getMessage();
	      exit;
	    }

	    if (isset($accessToken)) {
	       $_SESSION['facebook_access_token'] = (string) $accessToken;
       	}

       	echo "<script>window.close();</script>";
       	die();
       	

	}

}

return new FacebookAuthSuccess();