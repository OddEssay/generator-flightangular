# generator-flightangular [![Build Status](https://secure.travis-ci.org/OddEssay/generator-flightangular.png?branch=master)](https://travis-ci.org/OddEssay/generator-flightangular)

A generator for [Yeoman](http://yeoman.io).


## Yeoman FlightPHP and AngularJS Generators

This Yeoman generator builds simple AngularJS webapps with a FlightPHP REST API at the server side. (Using MongoDB as storage)

To install generator-flightangular from npm, run:

```
$ sudo npm install -g generator-flightangular 
```

Then, initiate the generator from your desired deployment location.

```
$ yo flightangular
```

Anything in the "public" directory is exposed to the webserver.

The "server" directory contains PHP, "server/lib" is the default include path supplied to the autoloader.

The directories "js-src" and "less-src" are the default source locations looked at by Grunt for JavaScript and LESS files.

## CRUD SubGenerator
To create a new set of CRUD routes, Controllers and Storage.

```
$ yo flightangular:crud 
```

You'll be asked for a "singleName" and "pluralName" - The singleName is most often used, and refers to individual versions of the models and most class names, pluralName is used for lists/arrays of items. 

Angular Routes created will be:

/*pluralName*/ - List all models in the db.

/*singleName*/create - Create a new item.

/*singleName*/:id - Display an item.

/*singleName*/:id/edit - Edit an existing item.

REST routes will be added for FlightPHP in  "public/index.php"

PHP Controller and Storage model will be created in "server/lib/*SingleName*"

We don't do any validation on data going in or out of Mongo so to add more fields to your model, just add the inputs to the create and/or edit forms in /public/partials/*singleName*/create.html and /public/partials/*singleName*/edit.html and then they'll be available by magic.

## Tests
To run PHPUnit tests, ensure you have run composer to deploy PHP components and have "./composer/bin" in your path so the executable can be found, or that PHPUnit is globally available from somewhere else.


## Created By
Paul Freeman (@OddEssay). Made in Liverpool.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
