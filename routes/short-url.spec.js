const {
  describe, it, before, after, afterEach, beforeEach
} = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const { expect } = chai;

describe('.shortUrl', () => {
  describe('happyFlow', () => {
    it('should return short url', async () => {});
    it('should return same short url if same long url is provided', async () => {});
    it('should return separate short urls for different long urls provided', async () => {});
  });

  describe('unhappyFlow', () => {
    it('should throw error if long url is not provided', async () => {});
    it('should throw error if long url is not a valid url', async () => {});
  });
});
