const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = new JSDOM('<html><body></body></html>', {
  resources: 'usable'
});

const { window } = global.document;

global.window = window;
global.HTMLImageElement = window.HTMLImageElement;
global.Image = window.Image;
