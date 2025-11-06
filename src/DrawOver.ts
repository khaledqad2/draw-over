import type { DrawOverOptions, ToolType, Shape, Point } from "./types";
import { BaseTool } from "./tools/BaseTool";
import { LineTool } from "./tools/LineTool";
import { ArrowTool } from "./tools/ArrowTool";
import { RectangleTool } from "./tools/RectangleTool";
import "./styles.css";

export class DrawOver {
  private options: Required<DrawOverOptions>;
  private isActive: boolean = false;
  private overlay: HTMLDivElement | null = null;
  private svg: SVGSVGElement | null = null;
  private currentTool: BaseTool | null = null;
  private tools: Map<ToolType, BaseTool>;
  private shapes: Shape[] = [];
  private isDrawing: boolean = false;

  constructor(options: DrawOverOptions = {}) {
    this.options = {
      strokeColor: options.strokeColor || "#ff0000",
      strokeWidth: options.strokeWidth || 2,
      fillColor: options.fillColor || "transparent",
      zIndex: options.zIndex || 9999,
    };

    // Initialize tools
    this.tools = new Map();
    this.tools.set("line", new LineTool(this.options));
    this.tools.set("arrow", new ArrowTool(this.options));
    this.tools.set("rectangle", new RectangleTool(this.options));

    // Set default tool
    this.currentTool = this.tools.get("line")!;
  }

  /**
   * Activate the drawing overlay
   */
  public activate(): void {
    if (this.isActive) return;

    this.createOverlay();
    this.attachEventListeners();
    this.isActive = true;
  }

  /**
   * Deactivate the drawing overlay
   */
  public deactivate(): void {
    if (!this.isActive) return;

    this.removeEventListeners();
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    this.overlay = null;
    this.svg = null;
    this.isActive = false;
  }

  /**
   * Set the active drawing tool
   */
  public setTool(toolType: ToolType): void {
    const tool = this.tools.get(toolType);
    if (tool) {
      this.currentTool = tool;
    }
  }

  /**
   * Update drawing options
   */
  public setOptions(options: Partial<DrawOverOptions>): void {
    this.options = { ...this.options, ...options };

    // Update all tools with new options
    this.tools.forEach((tool) => tool.updateOptions(this.options));
  }

  /**
   * Clear all drawings
   */
  public clear(): void {
    if (!this.svg) return;

    this.shapes.forEach((shape) => {
      if (shape.element.parentNode) {
        shape.element.parentNode.removeChild(shape.element);
      }
    });
    this.shapes = [];
  }

  /**
   * Export drawings as SVG string
   */
  public exportSVG(): string {
    if (!this.svg) return "";
    return this.svg.outerHTML;
  }

  /**
   * Get all shapes
   */
  public getShapes(): Shape[] {
    return [...this.shapes];
  }

  /**
   * Remove a specific shape by ID
   */
  public removeShape(id: string): void {
    const shapeIndex = this.shapes.findIndex((s) => s.id === id);
    if (shapeIndex !== -1) {
      const shape = this.shapes[shapeIndex];
      if (shape.element.parentNode) {
        shape.element.parentNode.removeChild(shape.element);
      }
      this.shapes.splice(shapeIndex, 1);
    }
  }

  private createOverlay(): void {
    // Create overlay container
    this.overlay = document.createElement("div");
    this.overlay.className = "draw-over-overlay";
    this.overlay.style.zIndex = this.options.zIndex.toString();

    // Create SVG element
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    this.svg.style.position = "absolute";
    this.svg.style.top = "0";
    this.svg.style.left = "0";

    // Add arrow marker definitions for arrow tool
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
    );
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "3");
    marker.setAttribute("orient", "auto");

    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    polygon.setAttribute("points", "0 0, 10 3, 0 6");
    polygon.setAttribute("fill", this.options.strokeColor);

    marker.appendChild(polygon);
    defs.appendChild(marker);
    this.svg.appendChild(defs);

    this.overlay.appendChild(this.svg);
    document.body.appendChild(this.overlay);
  }

  private attachEventListeners(): void {
    if (!this.svg) return;

    this.svg.addEventListener("mousedown", this.handleMouseDown);
    this.svg.addEventListener("mousemove", this.handleMouseMove);
    this.svg.addEventListener("mouseup", this.handleMouseUp);
    this.svg.addEventListener("mouseleave", this.handleMouseUp);
  }

  private removeEventListeners(): void {
    if (!this.svg) return;

    this.svg.removeEventListener("mousedown", this.handleMouseDown);
    this.svg.removeEventListener("mousemove", this.handleMouseMove);
    this.svg.removeEventListener("mouseup", this.handleMouseUp);
    this.svg.removeEventListener("mouseleave", this.handleMouseUp);
  }

  private handleMouseDown = (e: MouseEvent): void => {
    if (!this.currentTool || !this.svg) return;

    this.isDrawing = true;
    const point = this.getMousePosition(e);
    this.currentTool.onStart(point, this.svg);
  };

  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.isDrawing || !this.currentTool) return;

    const point = this.getMousePosition(e);
    this.currentTool.onMove(point);
  };

  private handleMouseUp = (e: MouseEvent): void => {
    if (!this.isDrawing || !this.currentTool) return;

    this.isDrawing = false;
    const point = this.getMousePosition(e);
    const shape = this.currentTool.onEnd(point);

    if (shape) {
      this.shapes.push(shape);
    }
  };

  private getMousePosition(e: MouseEvent): Point {
    if (!this.svg) return { x: 0, y: 0 };

    const rect = this.svg.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
}

export default DrawOver;
