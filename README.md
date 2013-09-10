# generator-flightangular [![Build Status](https://secure.travis-ci.org/OddEssay/generator-flightangular.png?branch=master)](https://travis-ci.org/OddEssay/generator-flightangular)

A generator for [Yeoman](http://yeoman.io).


## Yeoman FlightPHP and AngularJS Generators

This Yeoman generator builds simple AngularJS webapps with a FlightPHP REST API at the server side. (Using MongoDB as storage)

To install generator-flightangular from npm, run:

```
$ git clone git@github.com:OddEssay/generator-flightangular.git
$ cd generator-flightangular
$ sudo npm link
```

Then, initiate the generator from your desired deployment location.

```
$ yo flightangular
```

Anything in the "public" directory is exposed to the webserver.


To create a new set of CRUD routes:

```
$ yo flightangular:crud 
```

Angular Routes created will be:
/<pluralName>/ - List all models in the db.
/<singleName>/create - Create a new item.
/<singleName>/:id - Display an item.
/<singleName>/:id/edit - Edit an existing item.

## Tests
To run PHPUnit tests, ensure you have run composer to deploy PHP components and have "./composer/bin" in your path so the executable can be found, or that PHPUnit is globally available from somewhere else.


## Created By
Paul Freeman (@OddEssay). Made in Liverpool.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
