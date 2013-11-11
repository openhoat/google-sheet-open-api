var readline = require('readline')
  , googleapis = require('googleapis')
  , rl, oauth2Config, scope, OAuth2Client, oauth2Client;

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

oauth2Config = {
  clientId: '493132920876-cavdt3nsv8rg5qjli94r81j3vq8u30og.apps.googleusercontent.com',
  clientSecret: 'D9kIsXKlALR-xkkqK06Hsrc0'
};
scope = 'https://spreadsheets.google.com/feeds';

OAuth2Client = googleapis.OAuth2Client;

function getAccessToken(oauth2Client, callback) {
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
  });
  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function (code) {
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      callback(null, tokens.access_token);
    });
  });
}

oauth2Client = new OAuth2Client(oauth2Config.clientId, oauth2Config.clientSecret, scope);
getAccessToken(oauth2Client, function (err, accessToken) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('accessToken :', accessToken);
  process.exit(0);
});
