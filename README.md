# DrawOver

A lightweight, framework-agnostic JavaScript library that lets you draw lines, arrows, and rectangles over any web application. Perfect for annotations, screenshots, tutorials, and interactive demonstrations.

[![NPM Version](https://img.shields.io/npm/v/draw-over.svg)](https://www.npmjs.com/package/draw-over)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Simple API** - Just a few lines of code to get started  
🎨 **Customizable** - Change colors, stroke width, and more  
📦 **Lightweight** - No dependencies, small bundle size  
🔧 **TypeScript Support** - Full type definitions included  
🎯 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS  
🖱️ **Intuitive UX** - Overlay only intercepts events while drawing

## Installation

```bash
npm install draw-over
```

Or with yarn:

```bash
yarn add draw-over
```

Or with pnpm:

```bash
pnpm add draw-over
```

## Quick Start

```javascript
import DrawOver from "draw-over";

// Create instance
const drawer = new DrawOver({
  strokeColor: "#ff0000",
  strokeWidth: 3,
  fillColor: "transparent",
});

// Activate drawing mode
drawer.activate();

// Set tool (line, arrow, or rectangle)
drawer.setTool("line");

// Deactivate when done
drawer.deactivate();
```

## Usage

### Basic Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DrawOver Example</title>
  </head>
  <body>
    <button id="start">Start Drawing</button>
    <button id="stop">Stop Drawing</button>
    <button id="clear">Clear All</button>

    <script type="module">
      import DrawOver from "draw-over";

      const drawer = new DrawOver();

      document.getElementById("start").addEventListener("click", () => {
        drawer.activate();
        drawer.setTool("line");
      });

      document.getElementById("stop").addEventListener("click", () => {
        drawer.deactivate();
      });

      document.getElementById("clear").addEventListener("click", () => {
        drawer.clear();
      });
    </script>
  </body>
</html>
```

### With React

```jsx
import { useRef } from "react";
import DrawOver from "draw-over";

function App() {
  const drawerRef = useRef(null);

  const handleStart = () => {
    if (!drawerRef.current) {
      drawerRef.current = new DrawOver({
        strokeColor: "#3b82f6",
        strokeWidth: 2,
      });
    }
    drawerRef.current.activate();
  };

  const handleStop = () => {
    drawerRef.current?.deactivate();
  };

  return (
    <div>
      <button onClick={handleStart}>Start Drawing</button>
      <button onClick={handleStop}>Stop Drawing</button>
    </div>
  );
}
```

## API Reference

### Constructor

```typescript
new DrawOver(options?: DrawOverOptions)
```

#### Options

| Option        | Type     | Default         | Description                   |
| ------------- | -------- | --------------- | ----------------------------- |
| `strokeColor` | `string` | `'#00ff00'`     | Color of drawn shapes         |
| `strokeWidth` | `number` | `2`             | Width of the stroke in pixels |
| `fillColor`   | `string` | `'transparent'` | Fill color for rectangles     |
| `zIndex`      | `number` | `9999`          | Z-index of the overlay        |

### Methods

#### `activate()`

Activates the drawing overlay. Users can start drawing by clicking and dragging.

```javascript
drawer.activate();
```

#### `deactivate()`

Deactivates the drawing overlay and removes it from the DOM.

```javascript
drawer.deactivate();
```

#### `setTool(toolType)`

Sets the active drawing tool.

```javascript
drawer.setTool("line"); // Draw lines
drawer.setTool("arrow"); // Draw arrows
drawer.setTool("rectangle"); // Draw rectangles
```

**Parameters:**

- `toolType`: `'line'` | `'arrow'` | `'rectangle'`

#### `setOptions(options)`

Updates the drawing options.

```javascript
drawer.setOptions({
  strokeColor: "#00ff00",
  strokeWidth: 5,
});
```

#### `clear()`

Removes all drawn shapes from the overlay.

```javascript
drawer.clear();
```

#### `getShapes()`

Returns an array of all drawn shapes.

```javascript
const shapes = drawer.getShapes();
console.log(shapes); // [{ id, type, element }, ...]
```

#### `removeShape(id)`

Removes a specific shape by its ID.

```javascript
drawer.removeShape("shape-123456");
```

#### `exportSVG()`

Exports all drawings as an SVG string.

```javascript
const svgString = drawer.exportSVG();
console.log(svgString);
```

## TypeScript Support

DrawOver is written in TypeScript and includes full type definitions.

```typescript
import DrawOver, { DrawOverOptions, ToolType } from "draw-over";

const options: DrawOverOptions = {
  strokeColor: "#ff0000",
  strokeWidth: 3,
};

const drawer = new DrawOver(options);

const tool: ToolType = "arrow";
drawer.setTool(tool);
```

## Browser Support

DrawOver works in all modern browsers that support SVG and ES6+:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Use Cases

- 📸 Screenshot annotations
- 📝 Tutorial overlays
- 🎓 Educational tools
- 🐛 Bug reporting tools
- 🎨 Creative applications
- 📊 Presentation tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Support

If you find this package helpful, please give it a ⭐️ on [GitHub](https://github.com/khaledqad2/draw-over)!
