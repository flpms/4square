var OAuth = require('oauth');

var _fourData = {
    protocol: 'https://',
    host: 'api.foursquare.com',
    basePath: 'v2'
};

var _foursquare = function(authConfig, userlessAuth) {
    
    if (userlessAuth) {
        return this;
    }

    var self = this;
    var OAuth2 = OAuth.OAuth2;

    this.secret = authConfig.clientSecret;
    this.clientId = authConfig.clientId;

    var address = _fourData.protocol + _fourData.host + _fourData.basePath;

    this.oAuth2 = new OAuth2(this.clientId, this.secret, address, null);

    return this;
};

module.exports = {
    createClient: function(oAuthConfig) {
        return new _foursquare(oAuthConfig);
    },
    getResource: function() {
        return new _foursquare(null, true);
    }
};