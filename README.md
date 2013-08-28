# generator-flightangular [![Build Status](https://secure.travis-ci.org/OddEssay/generator-flightangular.png?branch=master)](https://travis-ci.org/OddEssay/generator-flightangular)

A generator for [Yeoman](http://yeoman.io).


## Yeoman FlightPHP and AngularJS Generators

This Yeoman generator builds simple AngularJS webapps with a FlightPHP REST API at the server side. (Using MongoDB as storage)

To install generator-flightangular from npm, run:

```
$ git clone git@github.com:OddEssay/generator-flightangular.git
$ cd generatoe-flightangular
$ sudo npm link
```

Then, initiate the generator:

```
$ yo flightangular
```

To create a new set of CRUD routes:

```
$ yo flightangular:crud "<singleEntityName>"
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
