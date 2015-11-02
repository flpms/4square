var assert = require('assert');
var assertChai = require('chai').assert;
var expect = require('chai').expect;
var Foursquare = require('../../lib/foursquare.js');

 var oauthInfo = {
    clientId: 'R1QRCTI2BURVR1DFY5LZMG4WHCSOC5IKDSW1VVASR00DOLXU',
    clientSecret: 'SV4CYDQOYL4CZRJNH555O31XPCTDLSQ4EURYYPKA51ZW2WQH',
    locale: 'pt'
};

describe('Test for Foursquare Wrapper', function() {

    it('Call foursquare', function() {

        var foursquare = Foursquare.init(oauthInfo);

        assert.equal(typeof foursquare, 'object');
        expect(foursquare.data).to.have.property('clientSecret');
        expect(foursquare.data).to.have.property('clientId');
        expect(foursquare).to.have.property('search');
        expect(foursquare).to.have.property('_get');
    });

    it('Expected search method in Foursquare object', function() {

        var foursquare = Foursquare.init(oauthInfo);

        assertChai.isFunction(foursquare.search);
    });

    it('Expected a Venue from foursquare', function(done) {

        this.timeout(20000);

        var foursquare = Foursquare.init(oauthInfo);

        var callback = function(err, sucess) {
            console.log(err);
            console.log(sucess);

            done();
        };

        var params =  {
            limit: 10,
            query: 'restaurantes',
            near: 'Santo André, SP'
        }

        foursquare.search(params, 'venues', callback)     

        assertChai
    });
});