/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('flightangular generator', function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('flightangular:app', [
				'../../app'
			]);
			done();
		}.bind(this));
	});
	it('creates expected files', function (done) {
		var expected = [
			// add files you expect to exist here.
			'public/index.php',
			'public/partials/index.html',
			'js-src/app.js',
			'Gruntfile.js',
			'package.json',
			'bower.json',
			'composer.json',
			'server/views/app.php',
			'server/views/layout.php'
		];
		helpers.mockPrompt(this.app, {
			'installBootstrap': true,
			'installFontAwesome': true
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});
});
