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
      "css": rows[i][1],
      "spec": "",
      "links": [{"url": "","title": ""}],
      "categories": [],
      "stats": {
        "web": {
          "outlook_com": rows[i][2],
          "yahoo_mail": rows[i][3],
          "gmail": rows[i][4],
          "aol_mail": rows[i][5]
        },
        "pc": {
          "outlook_07_10_13": rows[i][6],
          "outlook_03_express_mail": rows[i][7],
          "windows_live_mail_11": rows[i][8],
          "ln_6_7": rows[i][9],
          "ln_85": rows[i][10],
          "aol_10": rows[i][11]
        },
        "mac": {
          "apple_mail_65": rows[i][12],
          "outlook_11": rows[i][13],
          "postbox": rows[i][14],
          "thunderbird_17": rows[i][15]
        },
        "mobile": {
          "ios_7": rows[i][16],
          "blackberry_6": rows[i][17],
          "android_4": rows[i][18],
          "gmail": rows[i][19],
          "wp_75": rows[i][20],
          "sgs_4": rows[i][21],
          "mailbox_ios7": rows[i][22],
          "sparrow_ios7": rows[i][23]
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

