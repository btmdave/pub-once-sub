var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Redis = require('ioredis');

/**
 * Expose PubSub.
 */
module.exports = PubSub;

function PubSub(options) {

  this.pub = new Redis(options);
  this.sub = new Redis(options);
  this.redis = new Redis(options);

  var self = this;

  this.sub.on('message', function(channel, message) { 
    self.redis.blpop(channel, 0, function(err, res) {
      if (res) {
        self.emit(channel, message);
      }
    });
  });

  return this;

};

/**
 * Inherit from 'EventEmitter.prototype'.
 */
util.inherits(PubSub, EventEmitter);


PubSub.prototype.subscribe = function(channel) {
  this.sub.subscribe(channel);
}

PubSub.prototype.publish = function(channel, message) {
  var self = this;
  self.redis.lpush(channel, message, function(err, res) {
    self.pub.publish(channel, message);
  });
}

