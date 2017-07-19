'use strict';

var superagent = require('superagent');
var extend = require('extend-shallow');

/**
 * Create a new Fly instance using the given options.
 *
 * ```js
 * var fly = new Fly({token: 'xxxx'});
 * ```
 * @param {Object} `options` Options for setting authentication token and api url.
 * @param {String} `options.token` Authentication token for fly.io api.
 * @param {String} `options.url` fly.io api url. Defaults to (https://fly.io/api/v1/)
 * @api public
 */

function Fly(options) {
  if (!(this instanceof Fly)) {
    return new Fly(options);
  }
  this.options = extend({}, options);
  this.url = this.options.url || 'https://fly.io/api/v1/';
}

/**
 * Send a GET request to the specified `path` at the fly.io api url.
 *
 * ```js
 * fly.get('sites/doowb/hostnames', {}, function(err, result) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *   console.log(result);
 *   //=> {
 *   //=>   "data": {
 *   //=>     "attributes": {
 *   //=>        "hostname": "foo.doowb.com"
 *   //=>     }
 *   //=>   }
 *   //=> }
 * });
 * ```
 * @param  {String} `path` Path to use after the api url
 * @param  {Object} `options` Options
 * @param  {Function} `cb` Callback function that takes an `err` and `result` parameters.
 * @api public
 */

Fly.prototype.get = function(path, options, cb) {
  superagent.get(this.url + path)
    .set('Authorization', 'Bearer ' + this.options.token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end(cb);
};

/**
 * Send a POST request to the specified `path` at the fly.io api url.
 *
 * ```js
 * var options = {
 *   data: {
 *     attributes: { hostname: 'bar.doowb.com' }
 *   }
 * };
 *
 * fly.post('sites/doowb/hostnames', options, function(err, result) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *   console.log(result);
 *   //=> {
 *   //=>   "data": {
 *   //=>     "attributes": {
 *   //=>        "hostname": "bar.doowb.com"
 *   //=>     }
 *   //=>   }
 *   //=> }
 * });
 * ```
 * @param  {String} `path` Path to use after the api url
 * @param  {Object} `data` The payload to send in the post.
 * @param  {Function} `cb` Callback function that takes an `err` and `result` parameters.
 * @api public
 */

Fly.prototype.post = function(path, data, cb) {
  superagent.post(this.url + path)
    .set('Authorization', 'Bearer ' + this.options.token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(data)
    .end(cb);
};

/**
 * Expose `Fly`
 */

module.exports = Fly;
