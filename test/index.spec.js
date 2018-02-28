import { describe, it } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import preload, {
  TYPE_ERROR_MESSAGE,
  EMPTY_PARAMS_MESSAGE,
  STATE_NEW,
  STATE_LOADED
} from '../src/index';

chai.use(chaiAsPromised);
chai.should();

const IMAGE_URL = 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png';

describe('Testing preload function', () => {
  // Check for possible errors

  // Empty params
  describe('preload()', () => {
    it(`should be rejected with Error: ${EMPTY_PARAMS_MESSAGE}`, () => {
      return preload().should.be.rejectedWith(Error, EMPTY_PARAMS_MESSAGE);
    });
  });
  describe('preload(\'\')', () => {
    it(`should be rejected with Error: ${EMPTY_PARAMS_MESSAGE}`, () => {
      return preload('').should.be.rejectedWith(Error, EMPTY_PARAMS_MESSAGE);
    });
  });
  describe('preload(\'\', \'\')', () => {
    it(`should be rejected with Error: ${EMPTY_PARAMS_MESSAGE}`, () => {
      return preload('', '').should.be.rejectedWith(Error, EMPTY_PARAMS_MESSAGE);
    });
  });
  describe('preload(\'\', new Image())', () => {
    it(`should be rejected with Error: ${EMPTY_PARAMS_MESSAGE}`, () => {
      return preload('', new Image()).should.be.rejectedWith(Error, EMPTY_PARAMS_MESSAGE);
    });
  });

  // Type Error cases
  describe('preload({})', () => {
    it(`should be rejected with TypeError: ${TYPE_ERROR_MESSAGE}`, () => {
      return preload({}).should.be.rejectedWith(TypeError, TYPE_ERROR_MESSAGE);
    });
  });
  describe('preload({}, {})', () => {
    it(`should be rejected with TypeError: ${TYPE_ERROR_MESSAGE}`, () => {
      return preload({}, {}).should.be.rejectedWith(TypeError, TYPE_ERROR_MESSAGE);
    });
  });
  describe('preload([])', () => {
    it(`should be rejected with TypeError: ${TYPE_ERROR_MESSAGE}`, () => {
      return preload([]).should.be.rejectedWith(TypeError, TYPE_ERROR_MESSAGE);
    });
  });
  describe('preload([], [])', () => {
    it(`should be rejected with TypeError: ${TYPE_ERROR_MESSAGE}`, () => {
      return preload([], []).should.be.rejectedWith(TypeError, TYPE_ERROR_MESSAGE);
    });
  });
  describe('preload({a: 1})', () => {
    it(`should be rejected with TypeError: ${TYPE_ERROR_MESSAGE}`, () => {
      return preload({a: 1}).should.be.rejectedWith(TypeError, TYPE_ERROR_MESSAGE);
    });
  });

  // Check for resolving and rejecting

  // Check for new Image()
  describe('preload(new Image(), \'\')', () => {
    it('should be resolved', () => {
      return preload(new Image(), '').should.be.fulfilled();
    });
  });
  // Check for one string
  describe(`preload('${IMAGE_URL}')`, () => {
    it('should be resolved', () => {
      return preload(IMAGE_URL).should.be.resolved;
    });
    it(`should eventually equal [[image, '${STATE_LOADED}']]`, () => {
      let image = new Image();

      image.src = IMAGE_URL;

      preload(IMAGE_URL).should.eventually.equal([
        [image, STATE_LOADED]
      ]);
    });
  });
  // Check for two string
  describe(`preload('${IMAGE_URL}', '${IMAGE_URL}')`, () => {
    it('should be resolved', () => {
      return preload(IMAGE_URL, IMAGE_URL).should.be.resolved;
    });
    it(`should eventually equal [[image1, '${STATE_LOADED}'], [image2, '${STATE_LOADED}']]`, () => {
      let image1 = new Image();
      let image2 = new Image();

      image1.src = IMAGE_URL;
      image2.src = IMAGE_URL;

      return preload(IMAGE_URL).should.eventually.equal([
        [image1, STATE_LOADED],
        [image2, STATE_LOADED]
      ]);
    });
  });
  // Check for two new Image() without src
  describe('preload(new Image(), new Image())', () => {
    it('should be resolved', () => {
      return preload(new Image(), new Image()).should.be.resolved;
    });
    it(`should eventually equal [[image1, '${STATE_NEW}'], [image2, '${STATE_NEW}']]`, () => {
      let image1 = new Image();
      let image2 = new Image();

      return preload(IMAGE_URL).should.eventually.equal([
        [image1, STATE_NEW],
        [image2, STATE_NEW]
      ]);
    });
  });
  // Check for two new Image() with src
  describe('preload(image1, image2)', () => {
    it('should be resolved', () => {
      let image1 = new Image();
      let image2 = new Image();

      image1.src = IMAGE_URL;
      image2.src = IMAGE_URL;

      return preload(image1, image2).should.be.resolved;
    });
  });
  // Check for string and new Image()
  describe('preload(image1, image2)', () => {
    it('should be resolved', () => {
      let image1 = new Image();
      let image2 = new Image();

      image1.src = IMAGE_URL;
      image2.src = IMAGE_URL;

      return preload(image1, image2).should.be.resolved;
    });
  });
  // Check for string and new Image() with src
  describe(`preload(image, '${IMAGE_URL}')`, () => {
    it('should be resolved', () => {
      let image = new Image();

      image.src = IMAGE_URL;

      return preload(image, IMAGE_URL).should.be.resolved;
    });
  });
  // Check for string and new Image()
  describe('preload(image, new Image())', () => {
    it('should be resolved', () => {
      let image = new Image();

      image.src = IMAGE_URL;

      return preload(image, new Image()).should.be.resolved;
    });
    it(`should eventually equal [[imageWithSrc, '${STATE_LOADED}'], [image, '${STATE_NEW}']]`, () => {
      let image = new Image();
      let imageWithSrc = new Image();

      imageWithSrc.src = IMAGE_URL;

      return preload(imageWithSrc, image).should.eventually.equal([
        [imageWithSrc, STATE_LOADED],
        [image, STATE_NEW]
      ]);
    });
  });
});
