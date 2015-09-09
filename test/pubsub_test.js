var should = require('should');
var assert = require('assert');
var PubSub = require('../');

describe('PubSub', function () {

  var pubSub = null;
  var pubSub2 = null;

  before(function (done) {
    pubSub = new PubSub();
    pubSub2 = new PubSub();
    done();
  });

  it ('should subscribe to channel', function(done) {
      pubSub.subscribe('test');
      pubSub2.subscribe('test');
      done();
  });

  it ('should publish to channel', function(done) {
    pubSub.publish('test', 'data');
    done();
  })
 
  it ('should only be to received by a single subscriber', function(done) {
    
    pubSub.on('test', function(data) {
      done();
    });
   
    pubSub2.on('test', function(data) {
      done();
    });

  });

});