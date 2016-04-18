<?php

class FacebookAuthSuccess extends RestWork {

	function action() {

		$config = include("keys.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $config['app_id'],
	      'app_secret' => $config['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);

	
	    $helper = $fb->getRedirectLoginHelper();
	    try {
	      $accessToken = $helper->getAccessToken();
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