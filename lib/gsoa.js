var GoogleSpreadsheet = require('google-spreadsheet')
  , Profess = require('profess');

module.exports = {
  googleSheetToJson: function (gdocKey, accessToken, googleLogin, googlePwd, sheetIndex, callback) {
    var authorization, profess, spreadsheet, errorHandller;
    sheetIndex = sheetIndex || 0;
    if (accessToken) {
      authorization = {type: 'Bearer', value: accessToken };
    }
    profess = new Profess();
    errorHandller = profess.handleError(callback);
    profess.
      do(function () {
        spreadsheet = new GoogleSpreadsheet(gdocKey, authorization);
        if (googleLogin) {
          spreadsheet.setAuth(googleLogin, googlePwd, errorHandller);
        } else {
          profess.next();
        }
      }).
      then(function () {
        spreadsheet.getInfo(errorHandller);
      }).
      then(function (sheetInfo) {
        var worksheet;
        if (!sheetInfo.worksheets || !sheetInfo.worksheets[sheetIndex]) {
          return errorHandller('No worksheet!');
        }
        worksheet = sheetInfo.worksheets[sheetIndex];
        worksheet.getRows(errorHandller);
      }).
      then(function (rows) {
        var jsonDoc = [];
        rows.forEach(function (row) {
          var jsonRow, resultRow;
          jsonRow = JSON.parse(JSON.stringify(row)); // Keep only json valid datas
          resultRow = {};
          Object.keys(jsonRow).filter(function (key) { // Filter metadata names to drop
            return ['_xml', 'id', 'title', 'content', '_links'].indexOf(key) === -1;
          }).forEach(function (key) { // Keep only real datas
              resultRow[key] = jsonRow[key];
            });
          jsonDoc.push(resultRow);
        });
        profess.next(jsonDoc);
      }).
      then(function (doc) {
        callback(null, doc);
      });
  }
};