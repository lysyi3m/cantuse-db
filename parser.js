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
      "file": rows[i][0],
      "title": rows[i][1],
      "description": rows[i][2],
      "spec": rows[i][3],
      "css_version": rows[i][4],
      "links": [{"url": "","title": ""}],
      "categories": [],
      "stats": {
        "web": {
          "Outlook.com": rows[i][5],
          "Yahoo! Mail": rows[i][6],
          "Gmail": rows[i][7],
          "AOL Mail": rows[i][8]
        },
        "pc": {
          "Outlook '07 / '10 / ‘13": rows[i][9],
          "Outlook '03 / Express / Mail": rows[i][10],
          "Windows Live Mail 2011": rows[i][11],
          "Notes 6 / 7": rows[i][12],
          "Lotus Notes 8.5": rows[i][13],
          "AOL Desktop 10": rows[i][14]
        },
        "mac": {
          "Apple Mail 6.5": rows[i][15],
          "Outlook 2011": rows[i][16],
          "Postbox": rows[i][17],
          "Thunderbird 17": rows[i][18]
        },
        "mobile": {
          "iPhone / iPad (iOS 7)": rows[i][19],
          "Blackberry 6": rows[i][20],
          "Android 4 (Default)": rows[i][21],
          "Gmail": rows[i][22],
          "Windows Mobile 7.5": rows[i][23],
          "Samsung Galaxy S4 (Default)": rows[i][24],
          "Mailbox (iOS 7)": rows[i][25],
          "Sparrow (iOS 7)": rows[i][26]
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
    var fileName = path.join(__dirname, './features-json/' + features[i].file + '.json')
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

