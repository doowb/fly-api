'use strict';

var Fly = require('./');
var fly = new Fly(require('./tmp/token.json'));

var data = {
  "data": {
    "attributes": {
       "hostname": "bar.doowb.com"
    }
  }
}

fly.post('sites/doowb/hostnames', data, function(err, res) {
  if (err) {
    console.error(err);
    return;
  }

  fly.get('sites/doowb/hostnames', {}, function(err, res) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res.body.data);
  });
});
