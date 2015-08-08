var argv      = require('optimist').argv;
var fs        = require('fs');
var path      = require('path');
var Q         = require('q');
var babyParse = require('babyparse');

// Read csv
var readCSV = function(file) {
  fs.createReadStream(file)
  var deferred = Q.defer();
  fs.readFile(file, 'utf8', function(error, data) {
    deferred.resolve(data);
    if (error) {
      return deferred.reject(error);
    }
  });
  return deferred.promise;
};

// Format data
var formatData = function(data) {
  var features = babyParse.parse(data).data;
  for (var i in features) {
    var feature = {
      "title": features[i][1],
      "category": features[i][2],
      "description": features[i][3],
      "spec": features[i][4],
      "css_version": features[i][5],
      "links": [{"url": "","title": ""}],
      "stats": [
        {
          "group": "web",
          "clients": [
            {"name": "Outlook.com", "value": features[i][6]},
            {"name": "Yahoo! Mail", "value": features[i][7]},
            {"name": "Gmail", "value": features[i][8]},
            {"name": "AOL Mail", "value": features[i][9]}
          ]
        },
        {
          "group": "pc",
          "clients": [
            {"name": "Outlook '07 / '10 / ‘13", "value": features[i][10]},
            {"name": "Outlook '03 / Express / Mail", "value": features[i][11]},
            {"name": "Windows Live Mail 2011", "value": features[i][12]},
            {"name": "Notes 6 / 7", "value": features[i][13]},
            {"name": "Lotus Notes 8.5", "value": features[i][14]},
            {"name": "AOL Desktop 10", "value": features[i][15]}
          ]
        },
        {
          "group": "mac",
          "clients": [
            {"name": "Apple Mail 6.5", "value": features[i][16]},
            {"name": "Outlook 2011", "value": features[i][17]},
            {"name": "Postbox", "value": features[i][18]},
            {"name": "Thunderbird 17", "value": features[i][19]}
          ]
        },
        {
          "group": "mobile",
          "clients": [
            {"name": "iPhone / iPad (iOS 7)", "value": features[i][20]},
            {"name": "Blackberry 6", "value": features[i][21]},
            {"name": "Android 4 (Default)", "value": features[i][22]},
            {"name": "Gmail", "value": features[i][23]},
            {"name": "Windows Mobile 7.5", "value": features[i][24]},
            {"name": "Samsung Galaxy S4 (Default)", "value": features[i][25]},
            {"name": "Mailbox (iOS 7)", "value": features[i][26]},
            {"name": "Sparrow (iOS 7)", "value": features[i][27]}
          ]
        }
      ],
      "notes": [{"note": ""}],
      "bugs": [{"description": ""}]
    }
    var fileName = path.join(__dirname, './features/' + features[i][0] + '.json')
    fs.writeFile(fileName, JSON.stringify(feature), 'utf8', function(error) {
      if (error) {
        return console.error(error);
      }
    });
  }
};

// Do magick
if (argv.file) {
  readCSV(argv.file).then(function(data){ formatData(data) }).catch(console.error);
} else {
  console.log('Error! No file to parse');
}

