# Preload

<img align="right" width="64" height="64"
         src="https://github.com/bautrukevich/preload/blob/master/preload.svg"
         alt="">

[![NPM version][npm-img]][npm-link]

[npm-img]: http://img.shields.io/npm/v/@bautrukevich/preload.svg
[npm-link]: https://www.npmjs.com/package/@bautrukevich/preload

It's a small library for preload images in browser.

[See demo](https://bautrukevich.github.io/preload/)

## For what?

#### The problem

Large or a lot of image files may take a second or two to load on the page. Preloading those images early rather than later helps ensure that visitors have a great experience viewing your content.

#### The solution

JavaScript includes the Image among its native object types. The Image object represents an HTML image tag on the page and exposes the same properties and events. Perhaps oddly, the Image has no constructor that accepts an image source, so an image must be loaded into the object by setting its src attribute. Doing so causes the image to be downloaded from the server at that point.

## Usage

#### Usage from npm

First of all you need to install it from npm using

```yarn add @bautrukevich/preload``` 

or 

```npm install @bautrukevich/preload --save```

After you can import it and use like this:

```js
import preload from '@bautrukevich/preload';
    
    const IMAGE_URL = 'https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png';
    let orImageWithSrc = new Image();
    orImageWithSrc.src = IMAGE_URL;
    let orImageWithoutSrc = new Image(); // it's valid and you can set src later

    // It would be resolved
    preload(IMAGE_URL, orImageWithSrc).then(resolved => {
      console.log(resolved);
    }, rejected => {
      console.log(rejected); // [[HTMLImageElement, 'loaded'], [HTMLImageElement, 'loaded']]
    });

    // It would be rejected
    preload(orImageWithoutSrc).then(resolved => {
      console.log(resolved);
    }, rejected => {
      console.log(rejected); // [[HTMLImageElement, 'new']]
    });
```

```preload``` function accept any number of arguments such as ```URL (string)``` or ```HTMLImageElement (new Image() or document.createElement('img'))``` and return ```Promise``` with ```[[source, 'state'], [source, 'state']...]```, where ```source``` — HTMLImageElement and ```state``` — state of his loading (can be ```'new'```, ```'loaded'```, ```'failed'```).

Promise resolves if all images was loaded successfully and rejected if at least one not.

#### Usage from dist

You can simply install library using npm or download and add script ```/dist/preload.min.js``` to your page and use ```preload()``` function.

## Scripts

You can use npm or yarn (as you wish).

```yarn build``` or ```npm run build``` — build UMD library

```yarn dev``` or ```npm run dev``` — for development. With opening browser use ```yarn dev --open``` or ```npm run dev --open```.

```yarn test``` or ```npm run test``` — run tests once.

```yarn test:watch``` or ```npm run test:watch``` — run tests in watch mode.

## Browser support

Last 2 versions. No IE.
