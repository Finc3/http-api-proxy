# node-api-proxy

A reverse proxy designed for use with rate limited APIs.

## Installation

    npm install http-api-proxy

## Usage

Any requests to the proxy must have the `Host` header set to the upstream host.
Any requests to an upstream host that the proxy has not been configured for will return errors unless a default interval is set.

To start a proxy:

    http-api-proxy

Configuration is made with environment variables.

* `HTTP_PORT`: The port on which the HTTP proxy server should listen. Default: 8080
  The server on this port will only proxy sites where the protocol is HTTP.
* `PORT` (optional): If set, listen on this port and proxy sites where the protocol is HTTPS. Default: 8081
  Note that the proxy server itself still uses HTTP rather than HTTPS.
* `SITES`: A JSON encoded list (array) of sites that the proxy can delegate requests to.
  If a request is made for a site that is not referenced here,
  the proxy will respond with a 500 error.
  Each element should have the following properties:
  * Name of the element should be your upstream such as `http://example.com` or `http://example.com:8080`.
  * The value of the element should be the interval. Ensure that at least `interval` milliseconds elapse between each request to this site.
* `CACHE_AGE` (optional): If set, successful GET requests will be cached for `cacheAge` milliseconds.
* `CACHE_PATH` (optional): If set, the specified path will be used to persist the cache.

## Examples

Suppose you want to access the particular API https://example.com at most once per second:

    SITES='{"https://example.com": 1000, "https://test.com:8098": 55}' PORT=9000 http-api-proxy



Then, to use the proxy:

    curl http://localhost:9000/ -H"Host: example.com"
