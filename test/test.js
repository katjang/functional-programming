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

describe('mod10', function() {
    it('successfully converts into a mod10 string', function() {
        assert.equal(convert.mod10("text"), "2762245768");
    });
});

describe('Sha256', function() {
    it('successfully encrypts the output message', function() {
        assert.equal(sha256('2762245768'), "d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079");
    });
});

describe('GenerateValidHashFromText', function() {
    it('successfully encrypts the output message', function() {
        assert.equal(convert.generateValidHash('text'), "d0b3cb0cc9100ef243a1023b2a129d15c28489e387d3f8b687a7299afb4b5079");
    });
});