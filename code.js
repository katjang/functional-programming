let convert = {};
let sha256 = require('js-sha256');

convert.textToASCIArray = function(string){
    let charCodes = [];
    for (let i = 0; i < string.length; i++) {
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
    let arrays = [];
    let goalSize = 10;
    for(let i = 0; i < array.length; i += goalSize){
        let newArray = array.slice(i, i+goalSize);
        newArray = convert.complementArrayToTenValues(newArray, goalSize);
        arrays.push(newArray);
    }
    return arrays;
};

convert.complementArrayToTenValues = function(array, goalSize){
    let complementaryArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return array.concat(complementaryArray.slice(0, goalSize-array.length));
};

convert.mod10AddArray = function(ar1, ar2, index = 0, current = []){
    if(index > ar1.length - 1){
        return current;
    }
    current.push((parseInt(ar1[index]) + parseInt(ar2[index])) %10);
    return convert.mod10AddArray(ar1, ar2, index+1, current);
};

convert.mod10AddArrayRecursive = function(arrays, index, previousArray){
    if(arrays[index+1] == undefined){
        return previousArray;
    }
    return convert.mod10AddArrayRecursive(arrays, index+1, convert.mod10AddArray(arrays[index+1], previousArray));
};

convert.mod10 = function(str){
    let array = convert.textToASCIArray(convert.withoutSpaces(str));
    let sepValues = convert.separateAllValues(array);
    let arrays = convert.splitAndComplementPerTenValues(sepValues);

    let mod10Array = convert.mod10AddArrayRecursive(arrays, 1, convert.mod10AddArray(arrays[0], arrays[1]));

    return mod10Array.join('');
};

convert.generateValidHash = function(str){
    return sha256(convert.mod10(str));
};

module.exports = convert;