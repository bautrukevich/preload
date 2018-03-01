import { describe, it } from 'mocha';
import chai, { expect, should } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import preload, {
  EMPTY_PARAMS_ERROR_MESSAGE,
  STATE_NEW,
  STATE_LOADED, STATE_FAILED
} from '../src/index';

chai.use(chaiAsPromised);
chai.should();
chai.expect();

const IMAGE_URL = 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png';
const FAILED_IMAGE_URL = 'https://www.google.ru/images/branding/googlelogo/2';
const imageWithoutSrc = new Image();
let imageWithSrcFirst = new Image();
let imageWithSrcSecond = new Image();

imageWithoutSrc.src = '';
imageWithSrcFirst.src = IMAGE_URL;
imageWithSrcSecond.src = IMAGE_URL;

describe('Testing preload function', () => {
  // Check for possible errors
  // Empty params
  describe('preload()', () => {
    it(`should be rejected with Error: ${EMPTY_PARAMS_ERROR_MESSAGE}`, () => {
      return preload().should.be.rejectedWith(Error, EMPTY_PARAMS_ERROR_MESSAGE);
    });
  });
  // Check for resolve
  describe(`preload('${IMAGE_URL}')`, () => {
    it('should be resolved', (done) => {
      return preload(IMAGE_URL).then(result => {
        expect(result).to.equal([
          [imageWithSrcFirst, STATE_LOADED]
        ]);
      }).then(done, done);
    });
  });
  describe(`preload('${IMAGE_URL}', imageWithSrcFirst)`, () => {
    it('should be resolved', (done) => {
      return preload(IMAGE_URL, imageWithSrcFirst).then(result => {
        expect(result).to.equal([
          [imageWithSrcFirst, STATE_LOADED],
          [imageWithSrcFirst, STATE_LOADED]
        ]);
      }).then(done, done);
    });
  });
  // Check for reject
  describe('preload(imageWithoutSrc)', () => {
    it('should be rejected', (done) => {
      return preload(imageWithoutSrc).catch(result => {
        expect(result).to.equal([
          [imageWithSrcFirst, STATE_NEW]
        ]);
      }).then(done, done);
    });
  });
  describe(`preload('${IMAGE_URL}', imageWithoutSrc)`, () => {
    it('should be rejected', (done) => {
      return preload(IMAGE_URL, imageWithoutSrc).catch(result => {
        expect(result).to.equal([
          [imageWithSrcFirst, STATE_LOADED],
          [imageWithSrcFirst, STATE_NEW]
        ]);
      }).then(done, done);
    });
  });
  describe(`preload('${FAILED_IMAGE_URL}')`, () => {
    it('should be rejected', (done) => {
      return preload(FAILED_IMAGE_URL).catch(result => {
        expect(result).to.equal([
          [FAILED_IMAGE_URL, STATE_FAILED]
        ]);
      }).then(done, done);
    });
  });
  describe(`preload('${FAILED_IMAGE_URL}', imageWithoutSrc)`, () => {
    it('should be rejected', (done) => {
      return preload(FAILED_IMAGE_URL, imageWithoutSrc).catch(result => {
        expect(result).to.equal([
          [FAILED_IMAGE_URL, STATE_FAILED],
          [imageWithoutSrc, STATE_NEW]
        ]);
      }).then(done, done);
    });
  });
});
