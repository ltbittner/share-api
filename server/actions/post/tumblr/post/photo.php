<?php

class TumblrPostPhoto extends RestWork {

	function action() {

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $client->setToken($_SESSION['tumblr_token'], $_SESSION['tumblr_secret']);

	    if(!isset($_POST['source']) || $_POST['source'] == ""){
	      $this->generateErrorResponse("Missing required param: source");
	      exit;
	    }

	    if(!isset($_POST['blogName']) || $_POST['blogName'] == ""){
	      $this->generateErrorResponse("Missing required param: blogName");
	      exit;
	    }

	    $blogName = $_POST['blogName'];

	    $data = array(
	      "type" => "photo",
	      "source" => $_POST['source'],
	    );

	    if(isset($_POST['link']) && $_POST['link'] != ""){
	      $data['link'] = $_POST['link'];
	    }

	    if(isset($_POST['caption']) && $_POST['caption'] != ""){
	      $data['caption'] = $_POST['caption'];
	    }

	    try {
	      $client->createPost($blogName, $data);
	    } catch (Exception $ex) {
	      $this->generateErrorResponse("That blog does not exist");
	    }
	    

	    $this->generateSuccessResponse("Successfully created photo post");

	}

}

return new TumblrPostPhoto();