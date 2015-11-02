var assert = require('assert');
var Foursquare = require('../../lib/foursquare.js');
console.log(Foursquare);
describe('Test for Foursquare Wrapper', function() {
    
    it('Expected skyp OAuth flow for endpoints that don\'t OAuth Token', function() {

        var foursquare = Foursquare.getResource({
            clientId: 'R1QRCTI2BURVR1DFY5LZMG4WHCSOC5IKDSW1VVASR00DOLXU',
            clientSecret: 'SV4CYDQOYL4CZRJNH555O31XPCTDLSQ4EURYYPKA51ZW2WQH'
        });

        assert.equal(typeof foursquare, 'object');
    });

    it('Expected deal with erros from get a token API');

    it('Expected a token for Foursquare API');

    it('Expected deal with erros with information');

    it('Expected place information from Foursquare');

    it('Expected deal with error in JSON response');

    it('Expected a correct JSON from Foursquare')
});