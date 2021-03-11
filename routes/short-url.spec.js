const fs = require("fs");
const { urlFilePath, hostname } = require("config");
const { describe, it, afterEach, beforeEach } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiUrl = require("chai-url");
const app = require("../index");
const chance = require("chance").Chance();

chai.use(chaiUrl);
chai.use(chaiHttp);
const { expect } = chai;

const deleteShortUrlsFile = async () => {
  if (fs.existsSync(urlFilePath)) {
    return fs.unlinkSync(urlFilePath);
  }
};

describe(".shortUrl", () => {
  beforeEach(deleteShortUrlsFile);
  afterEach(deleteShortUrlsFile);

  describe("happyFlow", () => {
    it("should return short url", async () => {
      const response = (await chai
        .request(app)
        .post("/short-url")
        .send({
          longUrl: chance.url()
        })).body;

      expect(response.statusCode).to.equal(200);
      expect(response.data.url).to.contain.hostname(hostname);
    });

    it("should return same short url if same long url is provided", async () => {
      const longUrl = chance.url();
      const response = (await chai
        .request(app)
        .post("/short-url")
        .send({
          longUrl
        })).body;

      const firstResponseUrl = response.data.url;

      const response2 = (await chai
        .request(app)
        .post("/short-url")
        .send({
          longUrl
        })).body;

      const secondResponseUrl = response2.data.url;

      expect(response.statusCode).to.equal(200);
      expect(firstResponseUrl).to.equal(secondResponseUrl);
    });

    it("should return separate short urls for different long urls provided", async () => {
      const response = (await chai
        .request(app)
        .post("/short-url")
        .send({
          longUrl: chance.url()
        })).body;

      const firstResponseUrl = response.data.url;

      const response2 = (await chai
        .request(app)
        .post("/short-url")
        .send({
          longUrl: chance.url()
        })).body;

      const secondResponseUrl = response2.data.url;

      expect(response.statusCode).to.equal(200);
      expect(firstResponseUrl).to.not.equal(secondResponseUrl);
    });
  });

  describe("unhappyFlow", () => {
    it("should throw error if long url is not provided", async () => {
      const response = JSON.parse(
        (await chai
          .request(app)
          .post("/short-url")
          .send()).error.text
      );

      expect(response.statusCode).to.equal(400);
      expect(response.message).to.equal("Invalid Url provided");
    });

    it("should throw error if long url is not a valid url", async () => {
      const response = JSON.parse(
        (await chai
          .request(app)
          .post("/short-url")
          .send({
            longUrl: chance.string()
          })).error.text
      );

      expect(response.statusCode).to.equal(400);
      expect(response.message).to.equal("Invalid Url provided");
    });
  });
});
