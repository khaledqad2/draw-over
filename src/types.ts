/**
 * Available drawing tools
 */
export type ToolType = "line" | "arrow" | "rectangle" | "drumstick" | "pencil";

/**
 * Configuration options for DrawOver
 */
export interface DrawOverOptions {
  /** Stroke color for drawn shapes (default: '#ff0000') */
  strokeColor?: string;

  /** Stroke width in pixels (default: 2) */
  strokeWidth?: number;

  /** Fill color for shapes like rectangles (default: 'transparent') */
  fillColor?: string;

  /** Z-index of the overlay (default: 9999) */
  zIndex?: number;
}

/**
 * Point coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Shape information
 */
export interface Shape {
  /** Unique identifier for the shape */
  id: string;

  /** Type of shape */
  type: ToolType;

  /** The actual SVG element */
  element: SVGElement;
}
