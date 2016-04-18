<?php

class Time {
	public static function getTimeStamp() {
		date_default_timezone_set('UTC');
		return time();
	}

	public static function timeDifference($time1, $time2) {
		date_default_timezone_set('UTC');
		return round(abs($time2 - $time1) / 60,2);
	}
}