export const SPATIAL_CATEGORIES = [
  {
    "id": "game-assets",
    "title": "Game assets",
    "tool": "Blender → Godot or Unity",
    "exampleId": "3d-modular-corridor"
  },
  {
    "id": "environments",
    "title": "Worlds & environments",
    "tool": "Blender Geometry Nodes",
    "exampleId": "3d-heightmap-terrain"
  },
  {
    "id": "modeling",
    "title": "Modeling & reconstruction",
    "tool": "Blender / COLMAP / Nerfstudio",
    "exampleId": "3d-parametric-chair"
  },
  {
    "id": "materials",
    "title": "Materials & lighting",
    "tool": "Blender shaders / runtime materials",
    "exampleId": "3d-oak-material"
  },
  {
    "id": "animation",
    "title": "Animation & characters",
    "tool": "Blender animation / engine clips",
    "exampleId": "3d-walk-cycle"
  },
  {
    "id": "simulation",
    "title": "Physics & simulation",
    "tool": "Blender / MuJoCo",
    "exampleId": "3d-rigid-stack"
  },
  {
    "id": "visualization",
    "title": "Architecture & products",
    "tool": "Blender / Three.js",
    "exampleId": "3d-floorplan-room"
  },
  {
    "id": "space",
    "title": "Space & scientific data",
    "tool": "NASA / Astropy / REBOUND → Blender or web",
    "exampleId": "3d-solar-ephemeris"
  },
  {
    "id": "web-xr",
    "title": "Web, XR & interaction",
    "tool": "Three.js / WebXR",
    "exampleId": "3d-glb-viewer"
  },
  {
    "id": "production",
    "title": "LLMs, MCP & production",
    "tool": "Claude Code / Codex / existing Studio",
    "exampleId": "3d-mcp-connection-audit"
  }
] as const;
