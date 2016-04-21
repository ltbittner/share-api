<?php

class TumblrUserBlogs extends RestWork {

	function action() {

		if(!isset($_SESSION['tumblr_token'])) {
			$this->generateErrorResponse("User is not logged in!");
			die();
		}

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $client->setToken($_SESSION['tumblr_token'], $_SESSION['tumblr_secret']);
	    $r = array();

	    foreach ($client->getUserInfo()->user->blogs as $blog) {
	      array_push($r, $blog->name);
	    }

	    $this->generateSuccessResponse($r);

	}

}

return new TumblrUserBlogs();