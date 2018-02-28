// Possible state for HTMLImageElement
export const STATE_NEW = 'new'; // for all new Image() without src
export const STATE_LOADED = 'loaded'; // for resolved and loaded images
export const STATE_FAILED = 'failed'; // for rejected images

// Errors messages for pretty errors in runtime
export const EMPTY_PARAMS_MESSAGE = 'Empty params: ' +
  'you can pass an image/images and it must be URL (string) or HTMLImageElement';
export const TYPE_ERROR_MESSAGE = 'Incorrect params: ' +
  'image must be URL string or HTMLImageElement';

/**
 * Preload images.
 * Return Promise on loading images from URL string or HTMLImageElement object.
 *
 * @param {string|HTMLImageElement} images Set of URL's or HTMLImageElement's.
 *
 * @returns {Promise}
 *
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
  let image;

  // Check arguments count
  if (images.length === 0) {
    return Promise.reject(new Error(EMPTY_PARAMS_MESSAGE));
  } else if (images.length === 1) {
    image = images[0];
  } else {
    // Make recursive call of preload for each image (string URL or HTMLImageElement)
    const reflected = [].map.call(images, oneImage => preload(oneImage).catch(error => error));

    return Promise.all(reflected).then(resolved => resolved.filter(oneImage => oneImage[1] !== STATE_FAILED));
  }

  // Check for type errors
  // Accept only HTMLImageElement interface
  if (typeof image === 'object' && !(image instanceof HTMLImageElement)) {
    return Promise.reject(new TypeError(TYPE_ERROR_MESSAGE)).then(reason => reason);
  }

  // And not empty string
  if (typeof image === 'string' && image === '') {
    return Promise.reject(new Error(EMPTY_PARAMS_MESSAGE)).then(reason => reason);
  }

  // and not empty string as URL
  if (typeof image === 'string') {
    let url = image;

    // Create a new img from HTML5 constructor and set src
    image = new Image();
    image.src = url;
  }

  return new Promise((resolve, reject) => {
    const fullfill = () => {
      let state = STATE_NEW;

      if (image.naturalWidth) {
        state = STATE_LOADED;

        image.removeEventListener('load', fullfill);
        image.removeEventListener('error', fullfill);
        resolve([image, state]);
      } else if (image.complete) {
        if (typeof image.src === 'undefined' || image.src === '') {
          state = STATE_NEW;
        } else {
          state = STATE_FAILED;
        }

        image.removeEventListener('load', fullfill);
        image.removeEventListener('error', fullfill);
        reject([image, state]);
      }
    };

    if (image instanceof HTMLImageElement) {
      image.addEventListener('load', fullfill);
      image.addEventListener('error', fullfill);
    }
  });
}
