var Hapi = require('hapi');
 
var server = new Hapi.Server();
 
server.pack.register({
  plugin: require('elasticsearch-hapi-plugin'),
  options: {
    host: "http://localhost:9200"
  }
}, (err) => {
  if (err) return;
 
  server.start();
});