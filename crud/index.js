'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');
var clc = require('cli-color');

var domino = require('domino');
var Zepto = require('zepto-node');

var CrudGenerator = module.exports = function CrudGenerator(args, options, config) {
	  yeoman.generators.Base.apply(this, arguments);

	this.appName = 'testApp';
};
util.inherits(CrudGenerator, yeoman.generators.Base);
CrudGenerator.prototype.getDetails = function getDetails(){
	var cb = this.async();

	var prompts = [{
		name: 'crudSingle',
		message: 'What is the singular variable name?'
	},{
		name: 'crudPlural',
		message: 'What is the plural variable name?'
	},{
		name: 'addToNav',
		message: 'Add a link to the list view into the Nav menu?',
		type: 'confirm',
		default: true
	}];
	this.prompt(prompts, function (props) {
		this.crudSingle = props.crudSingle;
		this.crudPlural = props.crudPlural;
		this.addToNav = props.addToNav;
		cb();
	}.bind(this));
}
CrudGenerator.prototype.addPHPFiles = function addPHPFiles() {
	this.mkdir('server/lib/' + _.capitalize(this.crudSingle));
	this.template('controller.php', 'server/lib/' + _.capitalize(this.crudSingle) + '/Controller.php');
	this.template('storage.php', 'server/lib/' + _.capitalize(this.crudSingle) + '/Storage.php');
}

CrudGenerator.prototype.addFlightRoutes = function addFlightRoutes() {
	var routeText = [
	"Flight::route('GET /" + this.crudPlural + "', array('" + _.capitalize(this.crudSingle) + "_Controller','all') ); ",
	"Flight::route('PUT /" + this.crudSingle + "', array('" + _.capitalize(this.crudSingle) + "_Controller','create') ); ",
	"Flight::route('GET /" + this.crudSingle + "/@id', array('" + _.capitalize(this.crudSingle) + "_Controller','findOne') ); ",
	"Flight::route('PUT /" + this.crudSingle + "/@id', array('" + _.capitalize(this.crudSingle) + "_Controller','update') ); ",
	"Flight::route('DELETE /" + this.crudSingle + "/@id', array('" + _.capitalize(this.crudSingle) + "_Controller','remove') ); ",
	"//RouteInsertReference"
	];
	var indexFile = this.readFileAsString('public/index.php');
	indexFile = indexFile.replace('//RouteInsertReference',routeText.join('\n'));
	this.write('public/index.php',indexFile);
}

CrudGenerator.prototype.addAngularRoutes = function addAngularRoutes() {
	var routeText = [
		".",
		"\t\t\twhen('/" + this.crudPlural + "', {templateUrl: 'partials/" + this.crudSingle + "/list.html', controller: '" + this.crudSingle + "ListCtrl'}).",
		"\t\t\twhen('/" + this.crudSingle + "/create', {templateUrl: 'partials/" + this.crudSingle + "/create.html', controller: '" + this.crudSingle + "Ctrl'}).",
		"\t\t\twhen('/" + this.crudSingle + "/:id', {templateUrl: 'partials/" + this.crudSingle + "/detail.html', controller: '" + this.crudSingle + "Ctrl'}).",
		"\t\t\twhen('/" + this.crudSingle + "/:id/edit', {templateUrl: 'partials/" + this.crudSingle + "/edit.html', controller: '" + this.crudSingle + "Ctrl'}); //RouteInsertReference"
	];
	var appFile = this.readFileAsString('js-src/app.js');
	appFile = appFile.replace('; //RouteInsertReference',routeText.join('\n'));
	
	// Angular Needs to include the new module.
	appFile = appFile.replace('//ModuleInsertReference',"'" + this.crudSingle + "',\n\t\t//ModuleInsertReference");

	this.write('js-src/app.js',appFile);
}
CrudGenerator.prototype.addAngularFiles = function addAngularFiles() {
	this.template('list.html','public/partials/' + this.crudSingle + '/list.html');
	this.template('create.html','public/partials/' + this.crudSingle + '/create.html');
	this.template('detail.html','public/partials/' + this.crudSingle + '/detail.html');
	this.template('edit.html','public/partials/' + this.crudSingle + '/edit.html');
	this.template('module.js','js-src/' + this.crudSingle + '/' + this.crudSingle + '.js');
	this.template('singleController.js','js-src/' + this.crudSingle + '/' + this.crudSingle + 'Controller.js');
	this.template('storageService.js','js-src/' + this.crudSingle + '/' + this.crudSingle + 'Storage.js');
	this.template('listController.js','js-src/' + this.crudSingle + '/' + this.crudSingle + 'ListController.js');
	
}
CrudGenerator.prototype.editNavPartial = function editNavPartial() {
	if(this.addToNav === true) {
		var navPartial = this.readFileAsString('public/partials/nav.html');
		var window = domino.createWindow(navPartial);

		var $ = Zepto(window);

		$('.nav').append('<li><a href="#/' + this.crudPlural   + '">' +  _.capitalize(this.crudPlural) + '</a></li>');
		navPartial = $.document.body.innerHTML;

		this.write('public/partials/nav.html',navPartial);
	}
}
CrudGenerator.prototype.rememberGrunt = function rememberGrunt(){
	console.log(clc.yellowBright('Remember you need to run grunt because app.js has changed!'));
}
