'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
const elasticsearch = require('elasticsearch-hapi-plugin');
server.connection({port: 3000});

/**
 * Register plugin
 */
server.register({
    register: elasticsearch,
    host: 'http://192.168.0.14:9200' // default ip may vary 
}, (err) => {
    
    if (err) { 
        console.log('Error connecting to Elasticsearch');
        return;
    };

    server.start();


    // Basic uses

    //**  get reference to plugin */
    let client = server.plugins['elasticsearch-hapi-plugin'].es;
    
    console.log(client);

    /**
     * Ping 
     */
    client.ping({
      requestTimeout: 30000,
    }, error => {
        if (error) {
            console.error('Elasticsearch with hapi is down! :(');
            console.log(error);
        } else {
            console.log('Elasticsearch with hapi is great! :)');
        }
    });

    /**
     * Search
     */
    client.search({
      q: 'pants'
    }).then( body => console.log(body.hits.hits)
    , error => console.trace(error.message)
    );

   /**
    * In mac
    * 1. Install elasticsearch with brew
    * 2. Edit file in path: /usr/local/etc/elasticsearch/elasticsearch.yml (optional, for changes of ip and port , etc.)
    * 3. Restart mac and after run elasticsearch (not background alternative)
    * Use nodejs v8, install dependences and run command: "node ."
    */


    console.log('#### CTRL-C for exit ####');

});