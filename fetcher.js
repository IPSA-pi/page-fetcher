const fs = require('fs');
const request = require('request');
const { argv } = require('process');

const args = argv.slice(2);
const url = args[0];
const localPath = args[1];

const fetchAndSave = function (url, localPath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Failed to download resource: ", error);
      return;
    }
    // Optional: it's okay if students don't bother checking the http response code for this exercise.
    fs.writeFile(localPath, body, (error) => {
      if (error) {
        console.log("Failed to write to localPath: ", localPath);
      } else {
        console.log(
          `Downloaded and saved ${body.length} bytes to ${localPath}`
        );
      }
    });
  });
};

fetchAndSave(url, localPath);

