'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var clc = require('cli-color');


var FlightangularGenerator = module.exports = function FlightangularGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] },function(a){this._finalMessages();},function(a){this._finalMessages();} );
		this._finalMessages();
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FlightangularGenerator, yeoman.generators.Base);

FlightangularGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		name: 'appName',
		message: 'What is this app\'s short name?',
		default: 'my-app'
	}, {
		name: 'domainName',
		message: 'What is this app\'s domain name?',
		default: 'localhost'
	}, {
		type: 'confirm',
		name: 'installBootstrap',
		message: 'Would you like to include Twitter Bootstrap?',
		default: true
	}, {
		type: 'confirm',
		name: 'installFontAwesome',
		message: 'Would you like to include Font Awesome?',
		default: true
	} ];

	this.prompt(prompts, function (props) {
		this.appName = props.appName;
		this.domainName = props.domainName;
		this.installBootstrap = props.installBootstrap;
		this.installFontAwesome = props.installFontAwesome;
		cb();
	}.bind(this));
};

FlightangularGenerator.prototype.app = function app() {
	this.mkdir('js-src'); // JavaScript Source files, Grunt builds from here.
	this.mkdir('js-src/directives');
	this.mkdir('js-src/filters');

	this.template('_app.js', 'js-src/app.js');

	this.mkdir('less-src'); // Less files go in here.

	this.mkdir('server'); // PHP source files
	this.mkdir('server/lib');
	this.mkdir('server/views');
	this.template('_layout.php', 'server/views/layout.php');
	this.template('_app.php', 'server/views/app.php');

	this.copy('_composer.phar', 'composer.phar');
	this.copy('_composer.json', 'composer.json');

	this.template('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
	this.template('_Gruntfile.js', 'Gruntfile.js');

	this.mkdir('public'); // Apache points into here.
	this.mkdir('public/js'); // Grunt builds JavaScript files into here
	this.mkdir('public/css'); // Grunt builds CSS into here
	this.mkdir('public/media'); // A directory to put images etc

	this.template('_index.php', 'public/index.php');
	this.mkdir('public/partials');
	this.template('partials/index.html', 'public/partials/index.html');

	this.copy('_htaccess', 'public/.htaccess');

	this.template('_apache.conf', 'conf/' + this.domainName + '.conf');
};

FlightangularGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
	this.copy('_gitignore', '.gitignore');
};

FlightangularGenerator.prototype.installWithBower = function installWithBower() {
	this.bowerInstall([ 'jquery', 'underscore' ], { save: true });
	this.bowerInstall(['https://github.com/angular/bower-angular.git','https://github.com/angular/bower-angular-resource.git'], { save: true });
	if (this.installBootstrap === true) {
		this.bowerInstall(['bootstrap'], {save: true});
	}
	if (this.installFontAwesome === true) {
		this.bowerInstall(['font-awesome'], { save: true });
	}
};

FlightangularGenerator.prototype._finalMessages = function finalMessages() {
	this.log
		.write()
		.write('Don\'t forget to run: ')
		.write(clc.yellowBright('php composer.phar install'))
		.write();
};
