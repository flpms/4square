var https = require('https');
var querystring = require('querystring');

var Foursquare = function(authConfig) {

    this.data = {
        protocol: 'https://',
        host: 'api.foursquare.com',
        basePath: '/v2/',
        clientSecret: authConfig.clientSecret,
        clientId: authConfig.clientId,
        locale: authConfig.locale
    };

    this._get = function(resource, params, callback) {

        var req,
            options = {
                hostname: this.data.host,
                method: 'GET',
                path: this.data.basePath + resource,
                headers : {
                    "Content-Type" : "application/json"
                }
            };

        options.path += params ? '?' + querystring.stringify(params) : '';
        options.path += '\&client_id\=' + this.data.clientId + '\&client_secret\=' + this.data.clientSecret;
        options.path += '\&v\=20140806\&m\=foursquare\&locale\=' + this.data.locale;

        req = https.request(options, function(res) {
            console.log('- - - 29');
            var body = '';

            res.setEncoding('utf8');

            res.on('data', function(data) {

                body += data;
            });

            res.on('end', function(data) {

                callback(null, JSON.parse(body));
            });

            res.on('error', function(e) {

                console.log(e);

                callback(e);
            })
        });

        req.end();
        req.on('error', function(e) {

            callback(e);
        });
    };
        
    this.search = function(params, type,callback) {
console.log('- 61');
        this._get(type + '/search', params, callback);
    };

    return this;
};

module.exports = {
    init: function(oAuthConfig) {

        return new Foursquare(oAuthConfig);
    }
};
