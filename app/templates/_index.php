<?php
require __DIR__ . '/../composer/mikecao/flight/flight/Flight.php';
Flight::path( __DIR__ . '/../server/lib' ); # Let the autoloaded know where to find class files.
Flight::set('flight.views.path', __DIR__ . '/../server/views' );

Flight::route('/', function(){
	Flight::render('app', array(), 'body');
	Flight::render('layout', array());
});
//RouteInsertReference
Flight::start();
