<?php
require_once 'PHPUnit/Autoload.php';
require_once __DIR__.'/../composer/mikecao/flight/flight/Flight.php';
class IndexTest extends PHPUnit_Framework_TestCase {
	function setUp(){
		Flight::init();
		Flight::set('flight.views.path', __DIR__.'/../server/views');
	}
	function testAppView(){
		Flight::render('app');
		$this->expectOutputRegex('/<div ng-app="<%= appName %>">/');
	}
	function testFullLayout(){
		Flight::render('app', array(), 'body');
		Flight::render('layout');
		$this->expectOutputRegex('/<div ng-app="<%= appName %>">/');
	}
	function testVendorJSIncluded(){
		Flight::render('app', array(), 'body');
		Flight::render('layout');
		$this->expectOutputRegex('/<script type="text\/javascript" src="\/js\/vendor.js"><\/script>/');

	}
	function testAppJSIncluded(){
		Flight::render('app', array(), 'body');
		Flight::render('layout');
		$this->expectOutputRegex('/<script type="text\/javascript" src="\/js\/app.js"><\/script>/');
	}
}
