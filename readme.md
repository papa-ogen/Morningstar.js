# Morningstar.js

## Examples
https://papa-ogen.github.io/morningstar.js/index.html

Simple code example of creating a canvas with a square
```javascript
import { Canvas } from 'Morningstar.js';

class Example extends Canvas {
  constructor() {
    super({ bgColor: '#fff' });

    // request animation frame
    this.init();
  }

  render(time) {

    // create a black rectangle
    this.rect({ x: 50, y: 50, width: 50, height: 50 });

    // stop animation cycle
    this.stopAnimation();

  }
}

new Example
```
 
