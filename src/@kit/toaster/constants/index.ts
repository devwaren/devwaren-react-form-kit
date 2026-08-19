import { ToasterPosition } from "./types";

const positionClasses: Record<ToasterPosition, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "right-4 bottom-4",
};

export {positionClasses}