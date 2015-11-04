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

    it('Expected a list Venues from foursquare', function(done) {

        this.timeout(30000);

        var foursquare = Foursquare.init(oauthInfo);

        var callback = function(err, sucess) {

            expect(sucess).to.have.property('meta');
            expect(sucess).to.have.property('response');
            expect(sucess.meta).to.have.property('code');
            expect(sucess.meta.code).to.be.equal(200);
            expect(sucess.response).to.have.property('venues');
            expect(sucess.response.venues).to.be.a('array');
            expect(sucess.response.venues.length).to.equal(20);

            done();
        };

        var params =  {
            limit: 20,
            query: 'mazza restaurante',
            near: 'Santo André, SP'
        };

        foursquare.search(params, 'venues', callback);
    });

    it('Expected a error when search for venue from foursquare', function(done){
        this.timeout(30000);

        var foursquare = Foursquare.init(oauthInfo);

        var callback = function(err, sucess) {

            expect(err).to.have.property('meta');
            expect(err.meta).to.have.property('code');
            expect(err.meta.code).to.be.equal(400);

            done();
        };

        foursquare.venue('4c20fd99ebe52d7fef7b3178', callback);
    });

    it('Expected a sucess when search for venue from foursquare', function(done){
        this.timeout(30000);

        var foursquare = Foursquare.init(oauthInfo);

        var callback = function(err, sucess) {

            expect(sucess).to.have.property('meta');
            expect(sucess.meta).to.have.property('code');
            expect(sucess.meta.code).to.be.equal(200);

            done();
        };

        foursquare.venue('4c20fd99ebe52d7fef7b3178', callback);
    });
});