var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/splitwiseAuth', function(req, res, next) {
    var AuthApi = require('splitwise-node');
    var ConsumerKey = "o5zyoGbdvTni1rUw4OU4WbHQb94kPhJbui0NThYY";
    var ConsumerSecret = "OgAl8B6IE7loMWO0oyqyO4HEOGQAvtLKXIO5THBR";
    var userOAuthToken, userOAuthTokenSecret;
    var authApi = new AuthApi(ConsumerKey, ConsumerSecret);
    var userAuthUrl = authApi.getOAuthRequestToken()
    .then(({ oAuthToken, oAuthTokenSecret }) => {
        [userOAuthToken, userOAuthTokenSecret] = [oAuthToken, oAuthTokenSecret];
        return api.getUserAuthorisationUrl(oAuthToken);
    });

    var splitwiseAPI = authApi.getSplitwiseApi(userOAuthToken, userOAuthTokenSecret);

  res.render('index', { title: 'Express' });
});

module.exports = router;