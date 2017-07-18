'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({port: 3000});

    

server.register({
    register: require('elasticsearch-hapi-plugin'),
    host: 'http://localhost:9200'
}, (err) => {
    if (err) return;
    server.start();
});