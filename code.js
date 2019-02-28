let convert = {};
var sha256 = require('js-sha256');

convert.textToASCIArray = function(string){
    var charCodes = [];
    for (var i = 0; i < string.length; i++) {
        if(isNaN(string[i])){
            charCodes.push(string.charCodeAt(i));
        }else{
            charCodes.push(string[i]);
        }
    }
    return charCodes;
};

convert.withoutSpaces = function(string){
    return string.replace(/ /g, '');
};

convert.separateAllValues = function(array){
    return array.join('').split('');
};

convert.splitAndComplementPerTenValues = function(array) {
    var arrays = [];
    var goalSize = 10;
    for(var i = 0; i < array.length; i += goalSize){
        var newArray = array.slice(i, i+goalSize);
        newArray = convert.complementArrayToTenValues(newArray, goalSize);
        arrays.push(newArray);
    }
    return arrays;
};

convert.complementArrayToTenValues = function(array, goalSize){
    var complementaryArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return array.concat(complementaryArray.slice(0, goalSize-array.length));
};

convert.mod10AddArray = function(ar1, ar2){
    var newArray = [];
    for(var i = 0; i < ar1.length; i ++){
        newArray.push((parseInt(ar1[i]) + parseInt(ar2[i]))%10);
    }
    return newArray;
};

convert.mod10 = function(str){
    var array = convert.textToASCIArray(convert.withoutSpaces(str));
    var sepValues = convert.separateAllValues(array);
    var blocks = convert.splitAndComplementPerTenValues(sepValues);

    var mod10Array = convert.mod10AddArray(blocks[0], blocks[1]);
    for(var i = 2; i < blocks.length; i ++){
        mod10Array = convert.mod10AddArray(mod10Array, blocks[i]);
    }

    return mod10Array.join('');
};

convert.generateValidHash = function(str){
    return sha256(convert.mod10(str));
};

module.exports = convert;