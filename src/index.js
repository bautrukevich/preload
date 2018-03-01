// Possible state for HTMLImageElement
export const STATE_NEW = 'new'; // for all new Image() without src
export const STATE_LOADED = 'loaded'; // for resolved and loaded images
export const STATE_FAILED = 'failed'; // for rejected images

// Errors messages for pretty errors in runtime
export const EMPTY_PARAMS_ERROR_MESSAGE = `Empty params: 
  you can pass an image/images and it must be URL (string) or HTMLImageElement`;
export const TYPE_ERROR_MESSAGE = `Incorrect params: 
  image must be URL string or HTMLImageElement`;

/**
 * Check type of image and prepare it if string.
 * @param {String|HTMLImageElement} image String(URL) or HTMLImageElement.
 * @return {HTMLImageElement}
 */
const checkAndPrepareImage = (image) => {
  // Check for type errors
  switch (typeof image) {
    // Accept only HTMLImageElement interface
    case 'object':
      if (!(image instanceof HTMLImageElement)) {
        Promise.reject(new TypeError(TYPE_ERROR_MESSAGE));
      }
      if (typeof image.src === 'undefined') {
        image.src = '';
      }
      break;
    // and string
    case 'string':
      let url = image;

      // Create a new img from HTML5 constructor and set src
      image = new Image();
      image.src = url;
      break;
    // otherwise throw error
    default:
      Promise.reject(new TypeError(TYPE_ERROR_MESSAGE));
  }

  return image;
};

/**
 * Preload image.
 * @param {HTMLImageElement} image HTMLImageElement.
 * @return {Promise}
 */
const preloadHTMLImageElement = (image) => (
  new Promise((resolve, reject) => {
    // If image doesn't have src reject with 'new' state
    if (image.src === '') {
      reject([image, STATE_NEW]);
    }

    const onLoad = () => {
      // Set 'new' state by default.
      let state = STATE_NEW;

      // If the browser can determine the naturalWidth
      if (image.naturalWidth) {
        state = STATE_LOADED;

        resolve([image, state]);
      }

      // If the image is complete but the naturalWidth is 0px
      if (image.complete) {
        state = STATE_FAILED;

        reject([image, state]);
      }
    };

    const onError = () => {
      reject([image, STATE_FAILED]);
    };

    // Register event listeners
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
  })
);

/**
 * Preload images in browser.
 * Return Promise on loading images from String (URL) or HTMLImageElement object.
 * @param {string|HTMLImageElement} images Set of URL's or HTMLImageElement's.
 * @return {Promise}
 * @function
 * @example
 * import preload from '@bautrukevich/preload';
 *
 * let orImageWithSrc = new Image();
 * orImageWithSrc.src = '/url/path/to/image';
 * let orImageWithoutSrc = new Image(); // it's valid and you can set src later
 *
 * const result = preload('/url/path/to/image', orImageWithSrc, orImageWithoutSrc)
 *  .then(resolved => {
 *    console.log(resolved);
 *  }, rejected => {
 *    console.log(rejected);
 *  });
 */
export default function preload(...images) {
  if (images.length === 0) {
    // throw new Error(EMPTY_PARAMS_ERROR_MESSAGE);
    return Promise.reject(new Error(EMPTY_PARAMS_ERROR_MESSAGE));
  }

  if (images.length === 1) {
    const image = checkAndPrepareImage(images[0]);

    return Promise.all([preloadHTMLImageElement(image).catch(reason => reason)]);
  }

  // Make preload for each image (string URL or HTMLImageElement)
  const reflected = images.map(image => (
    preloadHTMLImageElement(checkAndPrepareImage(image))
      .catch(reason => reason)
  ));

  return Promise.all(reflected);
}
