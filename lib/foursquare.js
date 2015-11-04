var https = require('https');
var querystring = require('querystring');
var OAuth = require('oauth');

var Foursquare = function(authConfig) {

    this.data = {
        protocol: 'https://',
        host: 'api.foursquare.com',
        basePath: '/v2/',
        clientSecret: authConfig.clientSecret,
        clientId: authConfig.clientId,
        locale: authConfig.locale,
        token: authConfig.needToken
    };

    this._getToken = function() {
        var OAuth2 = OAuth.OAuth2;

        this.oauth2 = new OAuth2(this.data.clientSecret, this.data.clientId,
                        this.data.protocol + this.data.host, null, '/oauth2/access_token', null);
    };

    this._request = function(options, callback){

        req = https.request(options, function(res) {

            var body = '', isValid;

            res.setEncoding('utf8');

            res.on('data', function(data) {

                body += data;
            });

            res.on('end', function(data) {

                isValid = JSON.parse(body)

                if (isValid.meta.code !== 200) {

                    callback(isValid);
                } else {

                    callback(null, isValid);
                }
            });

            res.on('error', function(e) {

                callback(e);
            })
        });

        req.end();
        req.on('error', function(e) {

            callback(e);
        });
    };

    this._get = function(resource, params, callback) {

        var req,
            self = this,
            options = {
                hostname: this.data.host,
                method: 'GET',
                path: this.data.basePath + resource,
                headers : {
                    "Content-Type" : "application/json"
                }
            };

        options.path += params ? '?' + querystring.stringify(params) : '';
        options.path += '\&v\=20140806\&m\=foursquare\&locale\=' + this.data.locale;

        if(!this.data.token) {

            options.path += '\&client_id\=' + this.data.clientId + '\&client_secret\=' + this.data.clientSecret;

            this._request(options, callback);
        } else {

            this.oauth2.getOAuthAccessToken('' , 
                { 'grant_type' : 'authorization_code' }, 
                function (e, access_token, refresh_token, results) {
console.log(' - - e ', e);
console.log(' - - at ', access_token);
console.log(' - - rft ', refresh_token);
console.log(' - - re ', results);
                    if (e) {
                        callback(e);
                    } else {

                        options.path += '&oauth_token=' + access_token;
                        self._request(options, callback);
                    }
                }
            );
        }
    };
        
    this.search = function(params, type,callback) {

        this._get(type + '/search', params, callback);
    };

    this.venue = function(id, callback) {

        this._get('venues/' + id, null, callback);
    };

    if(authConfig.needToken) {

        this._getToken();
    }

    return this;
};

module.exports = {
    init: function(oAuthConfig) {

        return new Foursquare(oAuthConfig);
    }
};
