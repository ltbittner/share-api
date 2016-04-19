<?php

class TumblrPostLink extends RestWork {

	function action() {

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $client->setToken($_SESSION['tumblr_token'], $_SESSION['tumblr_secret']);

	    if(!isset($_POST['url']) || $_POST['url'] == ""){
	      $this->generateErrorResponse("Missing required param: url");
	      exit;
	    }

	    if(!isset($_POST['blogName']) || $_POST['blogName'] == ""){
	      $this->generateErrorResponse("Missing required param: blogName");
	      exit;
	    }

	    $blogName = $_POST['blogName'];

	    $data = array(
	      "type" => "link",
	      "url" => $_POST['url'],
	    );

	    if(isset($_POST['title']) && $_POST['title'] != ""){
	      $data['title'] = $_POST['title'];
	    }

	    if(isset($_POST['description']) && $_POST['description'] != ""){
	      $data['description'] = $_POST['description'];
	    }

	    if(isset($_POST['thumbnail']) && $_POST['thumbnail'] != ""){
	      $data['thumbnail'] = $_POST['thumbnail'];
	    }

	    try {
	      $client->createPost($blogName, $data);
	    } catch (Exception $ex) {
	      $this->generateErrorResponse("That blog does not exist");
	    }
	    

	    $this->generateSuccessResponse("Successfully created link post");

	}

}

return new TumblrPostLink();