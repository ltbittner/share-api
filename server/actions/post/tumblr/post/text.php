<?php

class TumblrPostBlog extends RestWork {

	function action() {

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $client->setToken($_SESSION['tumblr_token'], $_SESSION['tumblr_secret']);

	    if(!isset($_POST['message']) || $_POST['message'] == ""){
	    	$this->generateErrorResponse("Missing required param: message");
	    }

	    if(!isset($_POST['blogName']) || $_POST['blogName'] == ""){
	    	$this->generateErrorResponse("Missing required param: blogName");
	    }

	    $blogName = $_POST['blogName'];

	    $data = array(
	      "body"=> $_POST['message']
	    );

	    if(isset($_POST['title'])){
	        $data['title'] = $_POST['title'];
	    }

	    try {
	      $client->createPost($blogName, $data);
	    } catch (Exception $ex) {
	      $this->generateErrorResponse("That blog does not exist");
	    }

	    $this->generateSuccessResponse("Successfully made blog post");

	}

}

return new TumblrPostBlog();