var PubSub = require('../');

var pubSub = new PubSub();
pubSub.subscribe('test');

pubSub.publish('test', 'one');
pubSub.publish('test', 'two');
pubSub.publish('test', 'three');

pubSub.on('test', function(data) {
  console.log(data);
});

var pubSub2 = new PubSub();
pubSub2.subscribe('test');

pubSub2.on('test', function(data) {
  console.log(data);
});

