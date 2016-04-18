<?php

class RequestHandler {
	private $endpoint = "";

	public function handleRequest() {
		$config = include('config/settings.php');

		if($config['enable_request_limiting'] == true) {
			$this->_checkRequestLimits();
		} else {
			unset($_SESSION['number_of_requests']);
			unset($_SESSION['initial_client_request']);
		}

		$this->_setEndpoint($this->_getRoutes());
		$this->handleEndpoints();

	}

	public function handleEndpoints() {
		if(!$this->_endPointExists()) {
			$this->_endpointDoesntExist();
		}
	}

	private function _checkRequestLimits() {


		$config = include('config/settings.php');
		if(!isset($_SESSION['number_of_requests'])) {
			$_SESSION['number_of_requests'] = 1;
			$_SESSION['initial_client_request'] = Time::getTimeStamp();
		} else {
			$currentTime = Time::getTimeStamp();

			if(Time::timeDifference($currentTime, $_SESSION['initial_client_request']) > 60) {
				$_SESSION['number_of_requests'] = 1;
				$_SESSION['initial_client_request'] = Time::getTimeStamp();
			} else {
				if($_SESSION['number_of_requests'] >= $config['max_requests_per_hour']) {
					$this->_maxAmountOfRequests();
				} else {
					$_SESSION['number_of_requests'] += 1;


				}
			}
		}
	}

	private function _endpointDoesntExist() {
		$response = array(
			"status" => "error",
			"response" => "API endpoint does not exist"
		);

		echo json_encode($response);
		die();
	}

	private function _maxAmountOfRequests() {
		$response = array(
			"status" => "error",
			"response" => "You have reached your max amount of requests for this hour",
		);

		echo json_encode($response);
		die();
	}

	private function _endPointExists() {
		if(file_exists($this->getEndpoint())) {
			return true;
		}
		return false;
	}

	public function getEndpoint(){

		return $this->endpoint;
	}

	private function _setEndpoint($params) {
		$pathBase = 'actions/' . $_SERVER['REQUEST_METHOD'] . '/';
		$endpoint = "";
		foreach($params as $path) {
			$endpoint .= $path . '/';
		}

		$trimmedEndpoint = rtrim($endpoint, '/');
		$this->endpoint = $pathBase . $trimmedEndpoint . '.php';
	}

	private function _isPreflight() {
		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

			return true;
		}

		return false;
	}

	private function _setPreflightHeaders() {
		$config = include('config/settings.php');


		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {

				header('Access-Control-Allow-Origin: ' . $config['requesting_domain']);
				header('Access-Control-Allow-Headers: X-Requested-With');
				header('Access-Control-Allow-Credentials: true');

		}
		exit;
		die();
	}

	private function _getRoutes() {
		$base_url = $this::_getCurrentUri();
		$params = array();
		$routes = explode('/', $base_url);
		foreach($routes as $route){
		  if(trim($route) != '')
		    array_push($params, $route);
		}

		return $params;
	}


	private function _getCurrentUri(){
		$basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
		$uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
		if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
		$uri = '/' . trim($uri, '/');
		return $uri;
	}
}