var util = require('hw-util')
  , gsoa = require('../lib/gsoa');

function fetch(req, res, next, accessToken, googleLogin, googlePwd) {
  var gdocKey, sheetIndex;
  gdocKey = req.params['gdocKey'];
  sheetIndex = req.params['sheetIndex'];
  gsoa.googleSheetToJson(gdocKey, accessToken, googleLogin, googlePwd, sheetIndex, function (err, doc) {
    if (err) {
      return next(err);
    }
    res.send(doc);
  });
}

exports.get = function (req, res, next) {
  fetch(req, res, next, req.query['accessToken'], req.query['login'], req.query['pwd']);
};

exports.post = function (req, res, next) {
  fetch(req, res, next, req.body['accessToken'], req.body['login'], req.body['pwd']);
};

exports.options = function (req, res, next) {
  var config, apiRootUri, doc;
  config = util.config;
  apiRootUri = util.format('/%s/%s', config.apiUrlPrefix, config.apiVersionUrlPrefix);
  doc = [
    {
      path: apiRootUri + '/sheet/{gdocKey}/{sheetIndex}',
      method: 'GET',
      description: 'Fetch a Google doc spreadsheet',
      'uri-parameters': {
        'gdocKey': {
          type: 'string',
          description: 'Google doc key.',
          required: true
        },
        'sheetIndex': {
          type: 'number',
          description: 'Spreadsheet index.',
          required: true
        }
      },
      'query-parameters': {
        'login': {
          type: 'string',
          description: 'Google account login.',
          required: false
        },
        'pwd': {
          type: 'string',
          description: 'Google account password.',
          required: false
        },
        'accessToken': {
          type: 'string',
          description: 'Google OAuth2 access token.',
          required: false
        }
      },
      example: {
        'gdocKey': '0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE',
        'sheetIndex': 0,
        'login': 'johndoe@google.com',
        'pwd': 'mysecret',
        'command': 'curl http://google-sheet.app.nodeshub.com/0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE/0?login=johndoe@google.com&pwd=mysecret'
      }
    },
    {
      path: apiRootUri + '/sheet/{gdocKey}/{sheetIndex}',
      method: 'POST',
      description: 'Fetch a Google doc spreadsheet',
      'uri-parameters': {
        'gdocKey': {
          type: 'string',
          description: 'Google doc key.',
          required: true
        },
        'sheetIndex': {
          type: 'number',
          description: 'Spreadsheet index.',
          required: true
        }
      },
      'form-parameters': {
        'login': {
          type: 'string',
          description: 'Google account login.',
          required: false
        },
        'pwd': {
          type: 'string',
          description: 'Google account password.',
          required: false
        },
        'accessToken': {
          type: 'string',
          description: 'Google OAuth2 access token.',
          required: false
        }
      },
      example: {
        'gdocKey': '0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE',
        'sheetIndex': 1,
        'login': 'johndoe@google.com',
        'pwd': 'mysecret',
        'command': 'curl --data "login=johndoe@google.com&pwd=mysecret" http://google-sheet.app.nodeshub.com/0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE/1'
      }
    }
  ];
  res.send(doc);
};
