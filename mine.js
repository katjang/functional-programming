#!/usr/bin/env node

var convert = require('./code');
const axios = require('axios');

var found = false;

axios.get('http://145.24.222.232:8000/api/blockchain/next').then(function(res){
    var response = res['data'];
    if(response['open']){
        var previous = response['blockchain']['data'][0];
        var newBlock = response['transactions'][0];

        var str = response['blockchain']['hash'] + previous['from'] + previous['to'] + previous['amount'] + previous['timestamp'] + response['blockchain']['timestamp'] + response['blockchain']['nonce'];
        console.log(str);
        var hashed = convert.generateValidHash(str);

        var newStr = hashed+newBlock['from']+newBlock['to']+newBlock['amount']+newBlock['timestamp'] + response['timestamp'];

        console.log("--------------------------------BEGIN MINING--------------------------------------------");
        for(var i = 0; i < 500000; i ++){ //no idea how high it goes but want some kind of ceiling
            if(found) break;

            tryMine(newStr, i);
        }

    } else {
        console.log('Block is not open for mining, try again later.')
    }
});

function tryMine(str, nonce){
    var hash = convert.generateValidHash(str+nonce);

    console.log("Trying with nonce: "+ nonce);
    console.log("hash that was generated: " + hash);
    console.log("-------------------------------------------------------------------------------------------------");

    if(hash.charAt(0) == "0" && hash.charAt(1) == "0" && hash.charAt(2) == "0" && hash.charAt(3) == "0"){
        printPoggers();


        console.log('found a legit nonce! : ' + nonce);
        found = true;
    }
}

function printPoggers(){
    console.log('⠄⠄⠄⠄⠄⠄⣀⣀⣀⣤⣶⣿⣿⣶⣶⣶⣤⣄⣠⣴⣶⣿⣿⣿⣿⣶⣦⣄⠄⠄ ');
    console.log('⠄⠄⣠⣴⣾⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦ ');
    console.log('⢠⠾⣋⣭⣄⡀⠄⠄⠈⠙⠻⣿⣿⡿⠛⠋⠉⠉⠉⠙⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⡎⣾⡟⢻⣿⣷⠄⠄⠄⠄⠄⡼⣡⣾⣿⣿⣦⠄⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⣿⣿ ');
    console.log('⡇⢿⣷⣾⣿⠟⠄⠄⠄⠄⢰⠁⣿⣇⣸⣿⣿⠄⠄⠄⠄⠄⠄⠄⣠⣼⣿⣿⣿⣿ ');
    console.log('⢸⣦⣭⣭⣄⣤⣤⣤⣴⣶⣿⣧⡘⠻⠛⠛⠁⠄⠄⠄⠄⣀⣴⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠄⢉⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⢰⡿⠛⠛⠛⠛⠻⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠸⡇⠄⠄⢀⣀⣀⠄⠄⠄⠄⠄⠉⠉⠛⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠄⠈⣆⠄⠄⢿⣿⣿⣿⣷⣶⣶⣤⣤⣀⣀⡀⠄⠄⠉⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠄⠄⣿⡀⠄⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠂⠄⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠄⠄⣿⡇⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠄⠄⣿⡇⠄⠠⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ');
    console.log('⠄⠄⣿⠁⠄⠐⠛⠛⠛⠛⠉⠉⠉⠉⠄⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿ ');
    console.log('⠄⠄⠻⣦⣀⣀⣀⣀⣀⣀⣤⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄ ');
}

// console.log(convert.generateValidHash(process.argv[2]));