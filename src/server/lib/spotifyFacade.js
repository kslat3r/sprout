'use strict';

var _ = require('lodash');
var nconf = require('nconf');
var logger = require('winston');
var Promise = require("bluebird");
var Spotify = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Cache = mongoose.model('Cache');

var SpotifyFacade = function(args) {
  this.api = new Spotify(args);

  this.cache = function(cacheKey, resp, resolve) {
    Cache.findOneAndUpdate({
      key: cacheKey,
      spotifyProfileId: args.spotifyProfileId || null
    }, {
      key: cacheKey,
      spotifyProfileId: args.spotifyProfileId || null,
      data: resp
    }, {
      upsert: true
    }, function() {
      logger.log('debug', 'CACHE: Updated ' + cacheKey);
      return resolve(resp);
    });
  };

  this.apiResponse = function(cacheKey, apiPromise, resolve, reject) {
    apiPromise.then(function(resp) {
      logger.log('debug', 'API: Serving ' + cacheKey);
      this.cache(cacheKey, resp, resolve);
    }.bind(this), function(err) {
      return reject(err);
    });
  };

  this.cacheResponse = function(cacheKey, apiPromise, resolve, reject) {
    Cache.findOne({key: cacheKey, spotifyProfileId: args.spotifyProfileId || null}, function(err, FoundCache) {
      if (err) {
        return reject(err);
      }

      if (FoundCache) {
        apiPromise = undefined;

        logger.log('debug', 'CACHE: Serving ' + cacheKey);
        return resolve(FoundCache.get('data'));
      }

      logger.log('debug', 'CACHE: Could not find ' + cacheKey);
      return this.apiResponse(cacheKey, apiPromise, resolve, reject);
    }.bind(this));
  };

  this.execute = function(funcName) {
    return function() {
      var initArgs = arguments;
      var cacheKey = funcName + JSON.stringify(initArgs);

      return new Promise(function(resolve, reject) {
        var apiPromise = this.api[funcName].apply(this.api, initArgs);

        if (apiPromise) {
          if (!nconf.get('cache')) {
            logger.log('debug', 'API: Attempting to serve ' + cacheKey);
            return this.apiResponse(cacheKey, apiPromise, resolve, reject);
          }
          else {
            logger.log('debug', 'CACHE: Attempting to serve ' + cacheKey);
            return this.cacheResponse(cacheKey, apiPromise, resolve, reject);
          }
        }
      }.bind(this));
    }.bind(this);
  };

  _.forEach(this.api, function(func, funcName) {
    if (typeof(func) === 'function') {
      this[funcName] = this.execute(funcName);
    }
  }.bind(this));
};

module.exports = SpotifyFacade;