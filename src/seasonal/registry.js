import { lazy } from "react";

export const seasonalRegistry = {
  halloween: lazy(() => import("./themes/halloween/index.js")),
  "todos-santos": lazy(() => import("./themes/todos-santos/index.js")),
};
