# preload

It's a small library for preload images in browser.

[See demo](https://bautrukevich.github.io/preload/)

## Usage

#### Usage from npm

First of all you need to install it from npm using

```yarn add @bautrukevich/preload``` 

or 

```npm install @bautrukevich/preload --save```

After you can import it and use like this:

```js
import preload from '@bautrukevich/preload';

let orImageWithSrc = new Image();
orImageWithSrc.src = '/url/path/to/image';
let orImageWithoutSrc = new Image(); // it's valid and you can set src later

const result = preload('/url/path/to/image', orImageWithSrc, orImageWithoutSrc)
    .then(resolved => {
      console.log(resolved);
    }, rejected => {
      console.log(rejected);
    });
```

```preload``` function accept any number of arguments such as ```URL (string)``` or ```HTMLImageElement (new Image() or document.createElement('img'))``` and return ```Promise``` with ```[[source, 'state'], [source, 'state']...]```, where ```source``` — HTMLImageElement and ```state``` — state of his loading (can be ```'new'```, ```'loaded'```, ```'failed'```).

#### Usage from dist

You can simply install library using npm or download and add script ```/dist/preload.min.js``` to your page and use ```preload()``` function.

## Scripts

You can use npm or yarn (as you wish).

```yarn build``` or ```npm run build``` — build UMD library

```yarn dev``` or ```npm run dev``` — for development. With opening browser use ```yarn dev --open``` or ```npm run dev --open```.

```yarn test``` or ```npm run test``` — run tests once.

```yarn test:watch``` or ```npm run test:watch``` — run tests in watch mode.
