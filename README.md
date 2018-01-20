# Spiral Generator

Generates a sprial of numbers going from 0 to X, starting in the middle with zero.

## Prerequisites
1. You must have `npm` installed on your computer.
2. You must be connected to the internet.

## How to run it
1. Clone the repo.
2. Open terminal/cmd and navigate the spiral generator directory.
3. Run `npm i`.
4. Run `npm start`.
5. Go to http://localhost:8080 to see the generator.
6. Go to http://localhost:8080/test.html to see the unit tests (more coming soon).

## Known limitations
1. Only works on browsers that support ES6. An ES5 transpiled version is coming soon (see enhancements below)
2. Is not in a module format. Only available Globally on the `Window` object.
3. Is not really usable in Node.Js. Only works in the browser.

## Future enhancements
Here's what I would I would do if I had more time:
1. More unit test coverage with different spiral sizes, and testing each class.
2. Update to Typescript.
3. Add Babel to transpile the code to ES5.
4. Add webpack or another bundler so that we can follow the one-class-per-file convention, and use ES6 `import` and `export`.
5. Restructure the project so that it utililizes javascript modules and can be imported into other projects.
6. Rorganize the file/folder structure. Possibly break the contents down into `src`, `dist`, and `example`.
7. Improve the look and feel of the UI (maybe add some coloring so the spiral shape is eaiser to follow or make the text box auto-focsed when the page loads) 