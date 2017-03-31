var url = require("url");

var apiProxy = require("./");

{"http://example.com": 55}
exports.run = function() {
  if (process.env.SITES) {
    var config = JSON.parse(process.env.SITES);
    var sites = [];
    for (var prop in config) {
      sites.push({
        interval: prop,
        upstream: url.parse(config[prop])
      });
    }
    var options = {
        cacheAge: process.env.CACHE_AGE,
        cachePath: process.env.CACHE_PATH,
        httpPort: parseInt(process.env.HTTP_PORT) || 8080,
        httpsPort: parseInt(process.env.PORT) || 8081,
        defaultInterval: parseInt(DEFAULT_INTERVAL) || 55
    };
    return apiProxy.startServer(sites, options);
  } else {
    console.error('SITES not set in environment. Exiting.');
    process.exit(1);
  }
};
