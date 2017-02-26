var express = require('express');
var crypto = require('crypto');
var OAuth = require('oauth-1.0a');
var request = require('request');

/* GET home page. */
let splitwiseAuth = function(req, res) {
    var oauth = OAuth({
        consumer: {
            key: 'o5zyoGbdvTni1rUw4OU4WbHQb94kPhJbui0NThYY',
            secret: 'OgAl8B6IE7loMWO0oyqyO4HEOGQAvtLKXIO5THBR'
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function(base_string, key) {
            return crypto.createHmac('sha1', key).update(base_string).digest('base64');
        }
    });
    var request_data = {
        url: 'https://secure.splitwise.com/api/v3.0/get_request_token',
        method: 'POST',
        data: {
            status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
        }
    };

    request({
        url: request_data.url,
        method: request_data.method,
    }, function(error, response, body) {
        
    res.render('index', { title: 'Express' });
    });
};

module.exports = splitwiseAuth;