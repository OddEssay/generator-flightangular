'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var CrudGenerator = module.exports = function CrudGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the crud subgenerator with the argument ' + this.name + '.');
};

util.inherits(CrudGenerator, yeoman.generators.NamedBase);

CrudGenerator.prototype.addPHPFiles = function addPHPFiles() {
	this.mkdir('server/crudSingle');
	this.template('controller.php', 'server/crudSingle/Controller.php');
	this.template('storage.php', 'server/crudSingle/Storage.php');
}

CrudGenerator.prototype.addFlightRoutes = function addFlightRoutes() {
	var routeText = [
	"Flight::route('GET /crudPlural', array('crudSingle_Controller','all') ); ",
	"Flight::route('PUT /crudSingle', array('crudSingle_Controller','create') ); ",
	"Flight::route('GET /crudSingle/@id', array('crudSingle_Controller','findOne') ); ",
	"Flight::route('POST /crudSingle/@id', array('crudSingle_Controller','update') ); ",
	"Flight::route('DELETE /crudSingle/@id', array('crudSingle_Controller','delete') ); ",
	"//RouteInsertReference"
	];
	var indexFile = this.readFileAsString('public/index.php');
	indexFile = indexFile.replace('//RouteInsertReference',routeText.join('\n'));
	this.write('public/index.php',indexFile);
}

CrudGenerator.prototype.addAngularRoutes = function addAngularRoutes() {
	var routeText = [
		".",
		"\t\t\twhen('crudPlural', {templateUrl: 'partials/crudSingle/list.html', controller: 'crudSingleListCtrl'}).",
		"\t\t\twhen('crudSingle/new', {templateUrl: 'partials/crudSingle/new.html', controller: 'crudSingleCtrl'}).",
		"\t\t\twhen('crudSingle/:id', {templateUrl: 'partials/crudSingle/detail.html', controller: 'crudSingleCtrl'}).",
		"\t\t\twhen('crudSingle/:id/edit', {templateUrl: 'partials/crudSingle/edit.html', controller: 'crudSingleCtrl'}); //RouteInsertReference"
	];
	var appFile = this.readFileAsString('js-src/app.js');
	appFile = appFile.replace('; //RouteInsertReference',routeText.join('\n'));
	this.write('js-src/app.js',appFile);
}
