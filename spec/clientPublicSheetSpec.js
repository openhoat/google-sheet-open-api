var util = require('hw-util')
  , request = require('request');

describe('Google Sheet Open Api', function () {
  it('should return a JSON document from a public sheet', function () {
    var completed, gdocKey, sheetIndex;
    completed = false;
    gdocKey = '0AilC0U4Eb0tjdGEwR1RDTlRrbnVHbUVBWjBSVHk5OVE';
    sheetIndex = 0;
    runs(function () {
      request.get(util.format('http://google-sheet.app.nodeshub.com/api/v1/sheet/%s/%s', gdocKey, sheetIndex), function (err, response, body) {
        var data;
        expect(err).toBeFalsy();
        if (err) {
          return;
        }
        data = JSON.parse(body);
        expect(JSON.stringify(data)).toBe(JSON.stringify([
          { firstname: 'John', lastname: 'Doe', age: '20' },
          { firstname: 'Jack', lastname: 'Russell', age: '42' },
          { firstname: 'Jennifer', lastname: 'Lobese', age: '54' }
        ]));
        completed = true;
      });
    });
    waitsFor(function () {
      return completed;
    }, 'The docs should be loaded', 3000);
  });
});