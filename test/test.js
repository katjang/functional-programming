var assert = require('assert');
var convert = require('../code');
var sha256 = require('js-sha256');
require('./../code');


describe('textToASCIArray', function() {
    it('converts text to ASCI values', function() {
        assert.deepEqual(convert.textToASCIArray("text"), [116,101,120,116]);
        assert.deepEqual(convert.textToASCIArray("te9t"), [116,101,9,116]);
    });
});

describe('withoutSpaces', function() {
    it('returns string without any spaces', function() {
        assert.equal(convert.withoutSpaces("text text"), "texttext");
        assert.equal(convert.withoutSpaces("text text text"), "texttexttext");
    });
});

describe('separateAllValues', function() {
    it('returns all the given values fully seperated', function() {
        assert.deepEqual(convert.separateAllValues([116,101,120,116]), [1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6]);
        assert.deepEqual(convert.separateAllValues([116,101,9,116]), [1, 1, 6, 1, 0, 1, 9, 1, 1, 6]);
    });
});

describe('splitAndComplementTenValues', function() {
    it('return arrays with 10 values, when there are not enough values given -> fill the rest with 0,1,2,3,4,5,6,7,8,9', function() {
        assert.deepEqual(convert.splitAndComplementPerTenValues([1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6]),[[1, 1, 6, 1, 0, 1, 1, 2, 0, 1], [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]]);
    });
});

describe('mod10AddArrayRecursive', function() {
    it('recursively adds%10 all values of every array', function() {
        var arrays = [[1, 1, 6, 1, 0, 1, 1, 2, 0, 1], [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]];
        convert.mod10AddArrayRecursive(arrays, 2, convert.mod10AddArray(arrays[0], arrays[1]));
        assert.deepEqual(convert.mod10AddArrayRecursive(arrays, 1, convert.mod10AddArray(arrays[0], arrays[1])), [2, 7, 6, 2, 2, 4, 5, 7, 6, 8]);
    });
});

describe('mod10', function() {
    it('successfully converts into a mod10 string', function() {
        assert.equal(convert.mod10("text"), "2762245768");
    });
});

describe('Sha256', function() {
    it('successfully hashes the input message to SHA256', function() {
        assert.equal(sha256('2762245768'), "d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079");
    });
});

describe('GenerateValidHashFromText', function() {
    it('successfully encrypts the output message', function() {
        assert.equal(convert.generateValidHash('text'), "d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079");
    });

    it('successfully encrypts the output message', function() {
        assert.equal(convert.generateValidHash('000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312'), "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf");
    });

    it('successfully encrypts the output message', function() {
        assert.equal(convert.generateValidHash('00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cfCMGT Mining CorporationBas BOOTB1154874773326115487481013963926'), "000068fe4cbbe34a1efaffb8959758fde8da0bdb82aad9e8b78815a22823afd4");
    });
});