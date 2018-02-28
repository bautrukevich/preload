import FontFaceObserver from 'fontfaceobserver';

export function loadFonts() {
  const font = new FontFaceObserver('Gilroy');

  font.load(null, 5000).then(function () {
    console.log('Font is available');
  }, function () {
    console.error('Font is not available after waiting 5 seconds');
  });
}
