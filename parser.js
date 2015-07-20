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
  var formatted = [];
  var rows = babyParse.parse(data).data;
  for (var i in rows) {
    var feature = {
      "title": rows[i][0],
      "description": "",
      "spec": "",
      "css_version": rows[i][1],
      "links": [{"url": "","title": ""}],
      "categories": [],
      "stats": {
        "web": {
          "Outlook.com": rows[i][2],
          "Yahoo! Mail": rows[i][3],
          "Gmail": rows[i][4],
          "AOL Mail": rows[i][5]
        },
        "pc": {
          "Outlook '07 / '10 / ‘13": rows[i][6],
          "Outlook '03 / Express / Mail": rows[i][7],
          "Windows Live Mail 2011": rows[i][8],
          "Notes 6 / 7": rows[i][9],
          "Lotus Notes 8.5": rows[i][10],
          "AOL Desktop 10": rows[i][11]
        },
        "mac": {
          "Apple Mail 6.5": rows[i][12],
          "Outlook 2011": rows[i][13],
          "Postbox": rows[i][14],
          "Thunderbird 17": rows[i][15]
        },
        "mobile": {
          "iPhone / iPad (iOS 7)": rows[i][16],
          "Blackberry 6": rows[i][17],
          "Android 4 (Default)": rows[i][18],
          "Gmail": rows[i][19],
          "Windows Mobile 7.5": rows[i][20],
          "Samsung Galaxy S4 (Default)": rows[i][21],
          "Mailbox (iOS 7)": rows[i][22],
          "Sparrow (iOS 7)": rows[i][23]
        }
      },
      "notes": [{"note": ""}],
      "bugs": [{"description": ""}]
    }
    formatted.push(feature);
  }
  return formatted;
};

// Write files
var writeJSON = function(features) {
  for (var i in features) {
    var fileName = path.join(__dirname, './features-json/' + features[i].title + '.json')
    fs.writeFile(fileName, JSON.stringify(features[i]), 'utf8', function(error) {
      if (error) {
        return console.error(error);
      }
    });
  }
};

// Do magick
if (argv.file) {
  readCSV(argv.file)
  .then(function(data){
    var features = formatData(data);
    writeJSON(features);
  })
  .catch(console.error);
} else {
  console.log('Error! No file to parse');
}

