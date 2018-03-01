import { loadFonts } from './js/utils';
import preload from '@bautrukevich/preload';
import Prism from 'prismjs';

// loadFonts();

const IMAGE_URL = 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png';

preload(IMAGE_URL).then(loaded => {
  console.log(loaded); // [[HTMLImageElement, 'loaded']]
  let loadedImageElement = loaded[0][0];
  let image = document.getElementById('image');

  // Firs image
  let inserted = image.parentNode.insertBefore(loadedImageElement, image.nextSibling);
  inserted.height = 44;

  // Second image
  image.src = loadedImageElement.src;
}, failed => {
  console.log(failed);
});

