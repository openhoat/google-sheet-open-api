## Google spreadsheet RESTful app

Provides JSON data based on a Google doc spreadsheet, powered by nodejs.

[![Build Status](https://travis-ci.org/openhoat/google-sheet-open-api.png?branch=master)](https://travis-ci.org/openhoat/google-sheet-open-api)

### Usage

    $ npm install
    $ npm start

Get JSON from the first worksheet of this [sample public spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE) :

    $ curl http://localhost:3000/api/v1/sheet/0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE/0

Supports public sheets and private sheets with login/pwd or access_token.

### Examples

    $ curl http://localhost:3000/api/v1/sheet/0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE/0?login=johndoe@google.com&pwd=mySecret
    $ curl --data "login=johndoe@google.com&pwd=mySecret" http://localhost:3000/api/v1/sheet/0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE/0
    $ curl --data "accessToken=ya29.AHES6ZSCtiBXt30ZWFTyGB6D-iUqxfASbXJi7wHsQI4Iy_ND4w" http://localhost:3000/api/v1/sheet/0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE/0

To get an access_token for test purpose, see the example in [samples/gauth.js](https://github.com/openhoat/google-sheet-open-api/blob/master/samples/gauth.js) and the [official doc](https://developers.google.com/accounts/docs/OAuth2).

For more information about published RESTful resources, see the autogenerated API doc :

    $ curl http://localhost:3000
    $ curl -X OPTIONS curl http://localhost:3000/api/v1/sheet

### Run unit test

    $ grunt test

### Live demo

[google-sheet.app.nodeshub.com](https://google-sheet.app.nodeshub.com/)

Enjoy !
