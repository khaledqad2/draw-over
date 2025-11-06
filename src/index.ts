// Main exports
export { DrawOver } from "./DrawOver";
export { default } from "./DrawOver";

// Export types for TypeScript users
export type { DrawOverOptions, ToolType, Point, Shape } from "./types";

// Export tools if users want to extend
export { BaseTool } from "./tools/BaseTool";
export { LineTool } from "./tools/LineTool";
export { ArrowTool } from "./tools/ArrowTool";
export { RectangleTool } from "./tools/RectangleTool";
