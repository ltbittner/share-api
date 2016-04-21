<?php

$config = include('config/settings.php');

$http_origin = $_SERVER['HTTP_ORIGIN'];
header('Access-Control-Allow-Origin: ' . $http_origin);
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Credentials: true');


if(!session_id()) {
    session_start();
}

require_once 'vendor/autoload.php';

require_once('classes/restwork.php');
require_once('classes/request.php');
require_once('classes/utility.php');

$requestHandler = new RequestHandler();

$requestHandler->handleRequest();

//Won't make it past here if the request is sketchy


$endpoint = $requestHandler->getEndpoint();

$api = require($endpoint);
$api->action();







