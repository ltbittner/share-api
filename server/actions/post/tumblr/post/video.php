<?php

class TumblrPostVideo extends RestWork {

	function action() {

		$config = include("keys.php");
	    $client = new Tumblr\API\Client($config['tumblr_consumer_key'], $config['tumblr_consumer_secret']);
	    $client->setToken($_SESSION['tumblr_token'], $_SESSION['tumblr_secret']);

	    if(!isset($_POST['source']) || $_POST['source'] == ""){
	      $this->generateErrorResponse("Missing required param: data");
	      exit;
	    }

	    if(!isset($_POST['blogName']) || $_POST['blogName'] == ""){
	      $this->generateErrorResponse("Missing required param: blogName");
	      exit;
	    }

	    $data = $_POST['source']; //base64_encode(file_get_contents($_POST['source']));

	    $blogName = $_POST['blogName'];

	    $data = array(
	      "type" => "video",
	      "data" => $data,
	    );

	    if(isset($_POST['caption']) && $_POST['caption'] != ""){
	      $data['caption'] = $_POST['caption'];
	    }

	    try {
	      $client->createPost($blogName, $data);
	    } catch (Exception $ex) {
	      $this->generateErrorResponse($ex->getMessage());
	    }
	    

	    $this->generateSuccessResponse("Successfully created video post");

	}

}

return new TumblrPostVideo();