<?php

abstract class RestWork {

	abstract protected function action();

	public function generateSuccessResponse($response){

		$response = array(
			"status" => "success",
			"response" => $this->_formatForResponse($response)
		);

		echo json_encode($response);
		die();
	}

	public function fileExists($source) {
		if(strpos($source, 'http') !== false) {
	    	$file = @get_headers($source);
	    	if($file[0] == 'HTTP/1.1 404 Not Found') {
	    		return false;
	    	}
	    } else {
	    	if(!file_exists($source)) {
	    		return false;
	    	}
	    }

	    return true;
	}

	public function generateErrorResponse($response){
		$this->_setHeaders();
		$response = array(
			"status" => "error",
			"response" => $this->_formatForResponse($response)
		);
		

		echo json_encode($response);
		die();
	}

	public function getAccessToken() {
		$token = $this->_generateToken();
		$_SESSION['access_token'] = $token;
		return $token;
	}

	public function checkAccessToken($token) {
		if($_SESSION['access_token'] == $token) {
			return true;
		}

		return false;
	}

	private function _setHeaders() {
		$config = include('config/settings.php');
		if($config['cross_domain']) {
			header('Access-Control-Allow-Origin: ' . $config['requesting_domain']);
			header('Access-Control-Allow-Headers: X-Requested-With');
			header('Access-Control-Allow-Credentials: true');
		} 
	}

	private function _formatForResponse($d) {
	    if (is_array($d)) 
	        foreach ($d as $k => $v) 
	            $d[$k] = $this->_formatForResponse($v);

	     else if(is_object($d))
	        foreach ($d as $k => $v) 
	            $d->$k = $this->_formatForResponse($v);

	     else 
	        return utf8_encode($d);

	    return $d;
	}

	private function _generateToken() {
		$possible = str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
		$s = "";

		for($i = 0; $i < 15; $i++) {
			$s .= $possible[rand(0, count($possible))];
		}

		return $s;
	}

	public function getRandomString() {
		return $this->_generateToken();
	}

	//TEST
	public function createTempFile($file, $name) {
		if(!file_exists('/shareTemp')) {
 			mkdir('/shareTemp');
 		}

 		$file = fopen('/shareTemp/' . $name, 'w');

 		$source = file_get_contents($file);

 		fwrite($file, $source);

 		return '/shareTemp/' . $name;
	}

	//TEST
	public function deleteTempFile($name) {
		unlink('/shareTemp/' . $name);

		return true;
	}

	//TODO
	public function checkForHTTP($file) {

	}

}













