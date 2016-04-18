<?php

class TumblrUserBlogs extends RestWork {

	function action() {

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