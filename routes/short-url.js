const fs = require("fs");
const express = require("express");
const validUrl = require("valid-url");
const { hostname, urlFilePath } = require("config");
const lineReader = require("line-reader");
const { customAlphabet } = require("nanoid");
const uniqueIdGenerator = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  10
);

const shortUrlRoute = express.Router();

const checkIfUrlExists = async url =>
  new Promise(async (resolve, reject) => {
    try {
      if (fs.existsSync(urlFilePath)) {
        lineReader.eachLine(urlFilePath, function(line, isLast) {
          const splittedLine = line.split(" ");

          if (
            splittedLine &&
            splittedLine.length === 2 &&
            splittedLine[1] === url
          ) {
            resolve(splittedLine[0]);
          } else if (isLast) {
            console.log(`File does not contain long url ${url}`);
            resolve(false);
          }
        });
      } else {
        fs.writeFileSync(
          urlFilePath,
          "This file contains mapping of long urls and their short codes\r\n"
        );
        resolve(checkIfUrlExists(url));
      }
    } catch (error) {
      reject(error);
    }
  });

const saveUrl = async ({ shortUrlCode, longUrl }) => {
  fs.appendFile(urlFilePath, `${shortUrlCode} ${longUrl}\r\n`, err => {
    if (err) {
      console.error("Unable to write file", err);
    } else {
      console.log("URL appended to file.");
    }
  });
};

shortUrlRoute.post("/", async ({ body: { longUrl } }, res, next) => {
  try {
    if (!longUrl || !validUrl.isUri(longUrl)) {
      throw new Error("Invalid Url provided");
    }

    const oldUrl = await checkIfUrlExists(longUrl);
    if (oldUrl) {
      return res.send({
        statusCode: 200,
        data: {
          url: `https://${hostname}/${oldUrl}`
        }
      });
    }

    const shortUrlCode = uniqueIdGenerator();
    saveUrl({ shortUrlCode, longUrl });

    return res.send({
      statusCode: 200,
      data: {
        url: `https://${hostname}/${shortUrlCode}`
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = shortUrlRoute;
