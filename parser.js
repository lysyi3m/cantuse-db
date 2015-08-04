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
      "description": features[i][2],
      "spec": features[i][3],
      "css_version": features[i][4],
      "links": [{"url": "","title": ""}],
      "categories": [],
      "stats": {
        "web": {
          "Outlook.com": features[i][5],
          "Yahoo! Mail": features[i][6],
          "Gmail": features[i][7],
          "AOL Mail": features[i][8]
        },
        "pc": {
          "Outlook '07 / '10 / ‘13": features[i][9],
          "Outlook '03 / Express / Mail": features[i][10],
          "Windows Live Mail 2011": features[i][11],
          "Notes 6 / 7": features[i][12],
          "Lotus Notes 8.5": features[i][13],
          "AOL Desktop 10": features[i][14]
        },
        "mac": {
          "Apple Mail 6.5": features[i][15],
          "Outlook 2011": features[i][16],
          "Postbox": features[i][17],
          "Thunderbird 17": features[i][18]
        },
        "mobile": {
          "iPhone / iPad (iOS 7)": features[i][19],
          "Blackberry 6": features[i][20],
          "Android 4 (Default)": features[i][21],
          "Gmail": features[i][22],
          "Windows Mobile 7.5": features[i][23],
          "Samsung Galaxy S4 (Default)": features[i][24],
          "Mailbox (iOS 7)": features[i][25],
          "Sparrow (iOS 7)": features[i][26]
        }
      },
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

