<?php

class FacebookAuthLogin extends RestWork {

	function action() {
		$this->generateSuccessResponse($this->generateLoginLink());
	}


	public function generateLoginLink() {

		$config = include("keys.php");
		$settings = include("config/settings.php");
	    $fb = new Facebook\Facebook([
	      'app_id' => $config['app_id'],
	      'app_secret' => $config['app_secret'],
	      'default_graph_version' => 'v2.4',
	    ]);


	    $helper = $fb->getRedirectLoginHelper();
	    $permissions = array();

	    foreach (explode(',', $config['facebook_permissions']) as $v) {
	        array_push($permissions, $v);
	    }
	   
	  
   		$loginUrl = $helper->getLoginUrl($settings['domain'] . '/facebook/auth/success', $permissions);

	    $this->generateSuccessResponse($loginUrl);
	    

	}

}

return new FacebookAuthLogin();