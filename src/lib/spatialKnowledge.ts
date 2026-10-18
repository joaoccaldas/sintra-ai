import type { KnowledgeRecord } from "./knowledgeData";

/** 100 authored replication recipes and two connection guides; no tool execution implied. */
export const SPATIAL_KNOWLEDGE: KnowledgeRecord[] = [
  {
    "id": "3d-modular-corridor",
    "title": "Build a snapping corridor kit",
    "summary": "Four 2 m wall modules, one corner and a 1 m doorway on a 0.25 m grid. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Four 2 m wall modules, one corner and a 1 m doorway on a 0.25 m grid.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent modular corridor workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Four 2 m wall modules, one corner and a 1 m doorway on a 0.25 m grid. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Set all origins to a common floor corner and build the straight module with a bevel modifier",
      "Derive the corner and doorway from the same thickness parameters; keep collision proxies separate",
      "Assemble a 6 m corridor in the target engine using grid snapping; test from player height",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a snapping corridor kit candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Adjacent modules have no visible gaps at the doorway",
      "A capsule can pass the opening without colliding with decorative trim",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A visually closed seam may still contain a collision snag.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Test two adjoining modules before generating the full kit.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a snapping corridor kit in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Four 2 m wall modules, one corner and a 1 m doorway on a 0.25 m grid. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Adjacent modules have no visible gaps at the doorway; A capsule can pass the opening without colliding with decorative trim. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/modular-corridor.svg",
        "alt": "Illustrated procedure for build a snapping corridor kit: Set all origins to a common floor corner and build the straight module with a bevel modifier → Derive the corner and doorway from the same thickness parameters → Assemble a 6 m corridor in the target engine using grid snapping",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Build a snapping corridor kit. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Four 2 m wall modules, one corner and a 1 m doorway on a 0.25 m grid"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Four 2 m wall modules, one corner and a 1 m doorway on a 0.25 m grid Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Adjacent modules have no visible gaps at the doorway; A capsule can pass the opening without colliding with decorative trim."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Adjacent modules have no visible gaps at the doorway"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A capsule can pass the opening without colliding with decorative trim"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Test two adjoining modules before generating the full kit."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-loot-chest",
    "title": "Rig a reusable loot chest",
    "summary": "One 0.8 m chest, lid, hinge empty and open angle of 100 degrees. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Constraints control transforms through relationships with targets and limits.",
        "sourceIds": [
          "spatial-constraints"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-constraints",
        "title": "Constraints",
        "url": "https://docs.blender.org/manual/en/4.5/animation/constraints/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One 0.8 m chest, lid, hinge empty and open angle of 100 degrees.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent loot chest workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One 0.8 m chest, lid, hinge empty and open angle of 100 degrees. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Separate the lid and base, then move the lid origin to the hinge axis",
      "Keyframe closed and open poses on the lid without deforming the base",
      "Export the clip and trigger it once from an engine interaction; return to closed on reset",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned rig a reusable loot chest candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The lid stays attached at both hinge endpoints",
      "Repeated open/reset does not accumulate rotation",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A Blender constraint may require baking before engine export.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Name the action chest_open so the engine can identify it explicitly.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me rig a reusable loot chest in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One 0.8 m chest, lid, hinge empty and open angle of 100 degrees. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The lid stays attached at both hinge endpoints; Repeated open/reset does not accumulate rotation. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/loot-chest.svg",
        "alt": "Illustrated procedure for rig a reusable loot chest: Separate the lid and base, then move the lid origin to the hinge axis → Keyframe closed and open poses on the lid without deforming the base → Export the clip and trigger it once from an engine interaction",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Rig a reusable loot chest. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One 0.8 m chest, lid, hinge empty and open angle of 100 degrees"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One 0.8 m chest, lid, hinge empty and open angle of 100 degrees Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The lid stays attached at both hinge endpoints; Repeated open/reset does not accumulate rotation."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The lid stays attached at both hinge endpoints"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Repeated open/reset does not accumulate rotation"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Name the action chest_open so the engine can identify it explicitly."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-breakable-crate",
    "title": "Create a breakable crate with bounded debris",
    "summary": "One intact 0.6 m crate and six hand-authored break pieces. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Rigid-body workflows include collision shapes, constraints and simulation caches.",
        "sourceIds": [
          "spatial-rigid"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rigid",
        "title": "Rigid body",
        "url": "https://docs.blender.org/manual/en/4.5/physics/rigid_body/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One intact 0.6 m crate and six hand-authored break pieces.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent breakable crate workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One intact 0.6 m crate and six hand-authored break pieces. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the intact mesh and derive six named pieces with hidden interior faces closed",
      "Give debris simple convex colliders and a short lifetime in a separate engine scene",
      "Swap intact to debris on a single impact event; pool or remove debris after 3 seconds",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a breakable crate with bounded debris candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Only one intact or broken representation is active at a time",
      "Twenty breaks do not leave orphan bodies or growing object counts",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This is authored breakage, not a material fracture simulation.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a fixed break pattern before attempting expensive runtime fracture.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a breakable crate with bounded debris in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One intact 0.6 m crate and six hand-authored break pieces. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Only one intact or broken representation is active at a time; Twenty breaks do not leave orphan bodies or growing object counts. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/breakable-crate.svg",
        "alt": "Illustrated procedure for create a breakable crate with bounded debris: Reuse the intact mesh and derive six named pieces with hidden interior faces closed → Give debris simple convex colliders and a short lifetime in a separate engine scene → Swap intact to debris on a single impact event",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Create a breakable crate with bounded debris. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One intact 0.6 m crate and six hand-authored break pieces"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One intact 0.6 m crate and six hand-authored break pieces Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Only one intact or broken representation is active at a time; Twenty breaks do not leave orphan bodies or growing object counts."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Only one intact or broken representation is active at a time"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Twenty breaks do not leave orphan bodies or growing object counts"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a fixed break pattern before attempting expensive runtime fracture."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-weapon-sockets",
    "title": "Attach a tool to a character socket",
    "summary": "A licensed character rig, one 0.4 m tool and a named hand socket. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Armatures provide bones, posing and skinning for character animation.",
        "sourceIds": [
          "spatial-rig"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rig",
        "title": "Armatures",
        "url": "https://docs.blender.org/manual/en/4.5/animation/armatures/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed character rig, one 0.4 m tool and a named hand socket.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent weapon sockets workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed character rig, one 0.4 m tool and a named hand socket. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the rig's hand bone axes and grip reference pose",
      "Parent a socket marker with an explicit local transform; align the tool grip to it",
      "Export and attach the prop in the engine; inspect idle and reach poses",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned attach a tool to a character socket candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The tool stays attached through the animation",
      "A second prop fits the same documented grip convention",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Rights to a character do not automatically grant rights to branded props.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep socket transforms in the hand's local coordinates.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me attach a tool to a character socket in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed character rig, one 0.4 m tool and a named hand socket. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The tool stays attached through the animation; A second prop fits the same documented grip convention. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/weapon-sockets.svg",
        "alt": "Illustrated procedure for attach a tool to a character socket: Inspect the rig's hand bone axes and grip reference pose → Parent a socket marker with an explicit local transform → Export and attach the prop in the engine",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Attach a tool to a character socket. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed character rig, one 0.4 m tool and a named hand socket"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed character rig, one 0.4 m tool and a named hand socket Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The tool stays attached through the animation; A second prop fits the same documented grip convention."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The tool stays attached through the animation"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A second prop fits the same documented grip convention"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep socket transforms in the hand's local coordinates."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-terrain-collider",
    "title": "Separate terrain visuals from collision",
    "summary": "A 20 m terrain patch, a visible rocky edge and a low-resolution collision surface. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Godot documents 3D scene formats, export conventions and import configuration.",
        "sourceIds": [
          "spatial-import"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-import",
        "title": "Importing 3D scenes",
        "url": "https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/index.html",
        "publisher": "Godot contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 20 m terrain patch, a visible rocky edge and a low-resolution collision surface.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent terrain collider workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 20 m terrain patch, a visible rocky edge and a low-resolution collision surface. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Keep the render terrain unchanged and derive a named collider from a copy",
      "Remove small visual overhangs from the collider while preserving walkable height",
      "Import using the engine's documented collision settings and walk the edge slowly",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned separate terrain visuals from collision candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Feet do not sink below the intended walkable surface",
      "The simplified collider removes no required jump or passage",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A low triangle count alone does not establish correct collision behavior.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Inspect the collision debug view alongside the visual mesh.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me separate terrain visuals from collision in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 20 m terrain patch, a visible rocky edge and a low-resolution collision surface. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Feet do not sink below the intended walkable surface; The simplified collider removes no required jump or passage. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/terrain-collider.svg",
        "alt": "Illustrated procedure for separate terrain visuals from collision: Keep the render terrain unchanged and derive a named collider from a copy → Remove small visual overhangs from the collider while preserving walkable height → Import using the engine's documented collision settings and walk the edge slowly",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Separate terrain visuals from collision. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 20 m terrain patch, a visible rocky edge and a low-resolution collision surface"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 20 m terrain patch, a visible rocky edge and a low-resolution collision surface Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Feet do not sink below the intended walkable surface; The simplified collider removes no required jump or passage."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Feet do not sink below the intended walkable surface"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The simplified collider removes no required jump or passage"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Inspect the collision debug view alongside the visual mesh."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-navmesh-room",
    "title": "Make a room navigable for an NPC",
    "summary": "An 8 by 6 m room, two obstacles and a 0.5 m agent radius. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Godot navigation supports path queries over navigation-mesh regions.",
        "sourceIds": [
          "spatial-nav"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-nav",
        "title": "3D navigation overview",
        "url": "https://docs.godotengine.org/en/stable/tutorials/navigation/navigation_introduction_3d.html",
        "publisher": "Godot contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: An 8 by 6 m room, two obstacles and a 0.5 m agent radius.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent navmesh room workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: An 8 by 6 m room, two obstacles and a 0.5 m agent radius. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Import the room with simple static collision and mark the intended floor region",
      "Bake a navigation region using the configured agent radius and height",
      "Request paths to five marked targets and inspect doorways and obstacle clearance",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned make a room navigable for an npc candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All reachable targets return paths within the floor region",
      "A sealed target is reported unreachable rather than teleported to",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A navigation mesh is separate from collision and cannot prove animation quality.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Bake with the same agent dimensions used at runtime.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me make a room navigable for an npc in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: An 8 by 6 m room, two obstacles and a 0.5 m agent radius. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All reachable targets return paths within the floor region; A sealed target is reported unreachable rather than teleported to. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/navmesh-room.svg",
        "alt": "Illustrated procedure for make a room navigable for an npc: Import the room with simple static collision and mark the intended floor region → Bake a navigation region using the configured agent radius and height → Request paths to five marked targets and inspect doorways and obstacle clearance",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Make a room navigable for an NPC. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "An 8 by 6 m room, two obstacles and a 0.5 m agent radius"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "An 8 by 6 m room, two obstacles and a 0.5 m agent radius Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All reachable targets return paths within the floor region; A sealed target is reported unreachable rather than teleported to."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All reachable targets return paths within the floor region"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A sealed target is reported unreachable rather than teleported to"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Bake with the same agent dimensions used at runtime."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-pickup-inspection",
    "title": "Build a rotating collectible with inspection",
    "summary": "One collectible mesh, an inspection camera and a 0.3 m interaction radius. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "GLTFLoader loads glTF assets; compressed features can require configured decoders.",
        "sourceIds": [
          "spatial-web"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-web",
        "title": "GLTFLoader",
        "url": "https://threejs.org/docs/pages/GLTFLoader.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One collectible mesh, an inspection camera and a 0.3 m interaction radius.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent pickup inspection workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One collectible mesh, an inspection camera and a 0.3 m interaction radius. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Export the object with a centered inspection pivot and a separate collision proxy",
      "Implement a pickup state that hides the world object and shows its inspection instance",
      "Rotate the inspection instance with bounded input and restore focus on close",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a rotating collectible with inspection candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Closing returns keyboard control to the player",
      "The item cannot be picked up twice or duplicated by repeated input",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A static GLB does not contain inventory or input behavior.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep world placement and inspection rotation as separate transforms.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a rotating collectible with inspection in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One collectible mesh, an inspection camera and a 0.3 m interaction radius. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Closing returns keyboard control to the player; The item cannot be picked up twice or duplicated by repeated input. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/pickup-inspection.svg",
        "alt": "Illustrated procedure for build a rotating collectible with inspection: Export the object with a centered inspection pivot and a separate collision proxy → Implement a pickup state that hides the world object and shows its inspection instance → Rotate the inspection instance with bounded input and restore focus on close",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Build a rotating collectible with inspection. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One collectible mesh, an inspection camera and a 0.3 m interaction radius"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One collectible mesh, an inspection camera and a 0.3 m interaction radius Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Closing returns keyboard control to the player; The item cannot be picked up twice or duplicated by repeated input."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Closing returns keyboard control to the player"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The item cannot be picked up twice or duplicated by repeated input"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep world placement and inspection rotation as separate transforms."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-prop-lod",
    "title": "Compare three prop LODs",
    "summary": "One decorative statue and 100%, 50%, 20% geometry candidates. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One decorative statue and 100%, 50%, 20% geometry candidates.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent prop lod workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One decorative statue and 100%, 50%, 20% geometry candidates. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Preserve the master and derive two decimation candidates with recorded settings",
      "Compare silhouettes at 1 m, 5 m and 15 m using identical camera and lighting",
      "Configure engine LOD transitions and measure the complete scene on the target device",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare three prop lods candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The near LOD preserves the face silhouette",
      "Transition distances produce no obvious pop during a slow camera move",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The reduction percentages are experiment inputs, not accepted quality or performance claims.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A silhouette-sensitive mesh often needs manual retopology instead of uniform decimation.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare three prop lods in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One decorative statue and 100%, 50%, 20% geometry candidates. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The near LOD preserves the face silhouette; Transition distances produce no obvious pop during a slow camera move. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/prop-lod.svg",
        "alt": "Illustrated procedure for compare three prop lods: Preserve the master and derive two decimation candidates with recorded settings → Compare silhouettes at 1 m, 5 m and 15 m using identical camera and lighting → Configure engine LOD transitions and measure the complete scene on the target device",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Compare three prop LODs. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One decorative statue and 100%, 50%, 20% geometry candidates"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One decorative statue and 100%, 50%, 20% geometry candidates Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The near LOD preserves the face silhouette; Transition distances produce no obvious pop during a slow camera move."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The near LOD preserves the face silhouette"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Transition distances produce no obvious pop during a slow camera move"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A silhouette-sensitive mesh often needs manual retopology instead of uniform decimation."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-normal-bake-prop",
    "title": "Bake a high-detail prop onto a game mesh",
    "summary": "One high-detail panel, a low-detail panel, a non-overlapping UV map and a 1024 px normal target. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cycles can bake shading information into image textures.",
        "sourceIds": [
          "spatial-bake"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-bake",
        "title": "Render baking",
        "url": "https://docs.blender.org/manual/en/4.5/render/cycles/baking.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One high-detail panel, a low-detail panel, a non-overlapping UV map and a 1024 px normal target.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent normal bake prop workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One high-detail panel, a low-detail panel, a non-overlapping UV map and a 1024 px normal target. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Align high and low meshes; set the low mesh's active image target",
      "Bake selected-to-active tangent normals with a cage or bounded extrusion",
      "Load the low mesh and normal texture in the target shader; compare under a moving light",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned bake a high-detail prop onto a game mesh candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "No cage projection leaks across the panel edge",
      "Flat faces remain flat and bevel shading agrees with the high mesh",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A normal map cannot reproduce the source silhouette or physical relief.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a clearly named non-color normal image and inspect tangent convention.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me bake a high-detail prop onto a game mesh in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One high-detail panel, a low-detail panel, a non-overlapping UV map and a 1024 px normal target. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: No cage projection leaks across the panel edge; Flat faces remain flat and bevel shading agrees with the high mesh. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/normal-bake-prop.svg",
        "alt": "Illustrated procedure for bake a high-detail prop onto a game mesh: Align high and low meshes → Bake selected-to-active tangent normals with a cage or bounded extrusion → Load the low mesh and normal texture in the target shader",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Bake a high-detail prop onto a game mesh. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One high-detail panel, a low-detail panel, a non-overlapping UV map and a 1024 px normal target"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One high-detail panel, a low-detail panel, a non-overlapping UV map and a 1024 px normal target Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: No cage projection leaks across the panel edge; Flat faces remain flat and bevel shading agrees with the high mesh."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "No cage projection leaks across the panel edge"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Flat faces remain flat and bevel shading agrees with the high mesh"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a clearly named non-color normal image and inspect tangent convention."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-interactive-door",
    "title": "Wire a door without exporting game logic",
    "summary": "A 0.9 m door leaf, hinge pivot, frame and open/closed collision states. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Game assets",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Godot documents 3D scene formats, export conventions and import configuration.",
        "sourceIds": [
          "spatial-import"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-import",
        "title": "Importing 3D scenes",
        "url": "https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/index.html",
        "publisher": "Godot contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender → Godot or Unity environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 0.9 m door leaf, hinge pivot, frame and open/closed collision states.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent interactive door workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 0.9 m door leaf, hinge pivot, frame and open/closed collision states. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Model the frame and leaf separately; place the leaf origin at the hinge",
      "Export the leaf transform animation and attach an engine interaction component",
      "Switch collision state at agreed points; block repeated triggers while moving",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned wire a door without exporting game logic candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "A player cannot pass the closed leaf",
      "Opening twice does not double the angle or leave collision behind",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The mesh and animation export do not carry the interaction script.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Test the door from both sides with the largest intended player capsule.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender → Godot or Unity",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me wire a door without exporting game logic in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 0.9 m door leaf, hinge pivot, frame and open/closed collision states. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: A player cannot pass the closed leaf; Opening twice does not double the angle or leave collision behind. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "game-assets",
      "categoryLabel": "Game assets",
      "tools": [
        "Blender → Godot or Unity"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/interactive-door.svg",
        "alt": "Illustrated procedure for wire a door without exporting game logic: Model the frame and leaf separately → Export the leaf transform animation and attach an engine interaction component → Switch collision state at agreed points",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender → Godot or Unity with an optional authorized LLM client",
      "useWhen": "Wire a door without exporting game logic. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 0.9 m door leaf, hinge pivot, frame and open/closed collision states"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 0.9 m door leaf, hinge pivot, frame and open/closed collision states Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: A player cannot pass the closed leaf; Opening twice does not double the angle or leave collision behind."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "A player cannot pass the closed leaf"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Opening twice does not double the angle or leave collision behind"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Test the door from both sides with the largest intended player capsule."
        }
      ],
      "relatedPrompts": [
        "generate-unity-c-game-systems",
        "design-a-core-game-loop"
      ]
    }
  },
  {
    "id": "3d-heightmap-terrain",
    "title": "Turn a heightmap into a bounded landscape",
    "summary": "A licensed 256 by 256 grayscale heightmap, a 100 m square and a 12 m height range. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed 256 by 256 grayscale heightmap, a 100 m square and a 12 m height range.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent heightmap terrain workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed 256 by 256 grayscale heightmap, a 100 m square and a 12 m height range. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Subdivide a plane at an agreed preview density and map image intensity to Z displacement",
      "Keep the source image and height mapping explicit; inspect flat black and white sample pixels",
      "Create a lower-detail preview and compare ridge positions against the original image",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned turn a heightmap into a bounded landscape candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Black and white reference samples map to 0 m and 12 m",
      "No-data pixels are masked rather than turned into artificial cliffs",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "An artistic heightmap does not become surveyed terrain merely by using metres.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Test a small crop before increasing mesh density.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me turn a heightmap into a bounded landscape in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed 256 by 256 grayscale heightmap, a 100 m square and a 12 m height range. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Black and white reference samples map to 0 m and 12 m; No-data pixels are masked rather than turned into artificial cliffs. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/heightmap-terrain.svg",
        "alt": "Illustrated procedure for turn a heightmap into a bounded landscape: Subdivide a plane at an agreed preview density and map image intensity to Z displacement → Keep the source image and height mapping explicit → Create a lower-detail preview and compare ridge positions against the original image",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Turn a heightmap into a bounded landscape. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed 256 by 256 grayscale heightmap, a 100 m square and a 12 m height range"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed 256 by 256 grayscale heightmap, a 100 m square and a 12 m height range Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Black and white reference samples map to 0 m and 12 m; No-data pixels are masked rather than turned into artificial cliffs."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Black and white reference samples map to 0 m and 12 m"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "No-data pixels are masked rather than turned into artificial cliffs"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Test a small crop before increasing mesh density."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-river-spline",
    "title": "Build a river ribbon along a curve",
    "summary": "A 30 m curve, 2 m channel width and marked flow direction. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender supports editable curves, splines and curve modeling operations.",
        "sourceIds": [
          "spatial-curve"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-curve",
        "title": "Curves",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/curves/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 30 m curve, 2 m channel width and marked flow direction.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent river spline workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 30 m curve, 2 m channel width and marked flow direction. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Resample the centerline and sweep a flat channel profile along its tangent",
      "Offset banks from the same curve and repair sharp bends before adding detail",
      "Add a separately named water surface and UVs aligned with flow",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a river ribbon along a curve candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Channel width remains stable on broad bends",
      "Banks do not cross or invert at the tightest turn",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The surface is a visual river, not a hydrological flow solution.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use fewer well-placed control points before adding subdivision.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a river ribbon along a curve in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 30 m curve, 2 m channel width and marked flow direction. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Channel width remains stable on broad bends; Banks do not cross or invert at the tightest turn. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/river-spline.svg",
        "alt": "Illustrated procedure for build a river ribbon along a curve: Resample the centerline and sweep a flat channel profile along its tangent → Offset banks from the same curve and repair sharp bends before adding detail → Add a separately named water surface and UVs aligned with flow",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Build a river ribbon along a curve. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 30 m curve, 2 m channel width and marked flow direction"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 30 m curve, 2 m channel width and marked flow direction Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Channel width remains stable on broad bends; Banks do not cross or invert at the tightest turn."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Channel width remains stable on broad bends"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Banks do not cross or invert at the tightest turn"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use fewer well-placed control points before adding subdivision."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-forest-scatter",
    "title": "Scatter a forest without cloning every tree",
    "summary": "Three approved tree meshes, a 40 m terrain, seed 42 and an exclusion path. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Three approved tree meshes, a 40 m terrain, seed 42 and an exclusion path.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent forest scatter workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Three approved tree meshes, a 40 m terrain, seed 42 and an exclusion path. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Distribute points on the terrain using a density mask that excludes the path",
      "Instance the three source trees with seeded scale and rotation variations",
      "Inspect slope limits and export a bounded subset for engine instancing",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned scatter a forest without cloning every tree candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "No trunk center lies inside the exclusion path",
      "Repeating seed 42 preserves the same placement list",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Blender instances and engine instancing need a deliberate handoff.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep instances unrealized until a consumer requires individual geometry.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me scatter a forest without cloning every tree in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Three approved tree meshes, a 40 m terrain, seed 42 and an exclusion path. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: No trunk center lies inside the exclusion path; Repeating seed 42 preserves the same placement list. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/forest-scatter.svg",
        "alt": "Illustrated procedure for scatter a forest without cloning every tree: Distribute points on the terrain using a density mask that excludes the path → Instance the three source trees with seeded scale and rotation variations → Inspect slope limits and export a bounded subset for engine instancing",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Scatter a forest without cloning every tree. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Three approved tree meshes, a 40 m terrain, seed 42 and an exclusion path"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Three approved tree meshes, a 40 m terrain, seed 42 and an exclusion path Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: No trunk center lies inside the exclusion path; Repeating seed 42 preserves the same placement list."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "No trunk center lies inside the exclusion path"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Repeating seed 42 preserves the same placement list"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep instances unrealized until a consumer requires individual geometry."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-city-block",
    "title": "Generate a readable city block from parcels",
    "summary": "A 60 by 40 m block, six parcel rectangles and street setback of 3 m. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 60 by 40 m block, six parcel rectangles and street setback of 3 m.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent city block workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 60 by 40 m block, six parcel rectangles and street setback of 3 m. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Convert parcel outlines into building footprints after applying the setback",
      "Extrude height from a small explicit table instead of random uncontrolled towers",
      "Keep roads and pedestrian routes separate; inspect intersections from street level",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned generate a readable city block from parcels candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All buildings remain within their parcels",
      "Every entry has a route to a public street",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Procedural massing is not zoning compliance or structural design.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use semantic IDs for parcels so regeneration preserves annotations.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me generate a readable city block from parcels in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 60 by 40 m block, six parcel rectangles and street setback of 3 m. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All buildings remain within their parcels; Every entry has a route to a public street. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/city-block.svg",
        "alt": "Illustrated procedure for generate a readable city block from parcels: Convert parcel outlines into building footprints after applying the setback → Extrude height from a small explicit table instead of random uncontrolled towers → Keep roads and pedestrian routes separate",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Generate a readable city block from parcels. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 60 by 40 m block, six parcel rectangles and street setback of 3 m"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 60 by 40 m block, six parcel rectangles and street setback of 3 m Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All buildings remain within their parcels; Every entry has a route to a public street."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All buildings remain within their parcels"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Every entry has a route to a public street"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use semantic IDs for parcels so regeneration preserves annotations."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-cave-blockout",
    "title": "Block out a traversable cave",
    "summary": "Three chambers linked by a 2 m minimum passage. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Three chambers linked by a 2 m minimum passage.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent cave blockout workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Three chambers linked by a 2 m minimum passage. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Place simple chamber volumes and connect them with broad passage forms",
      "Use a non-destructive remesh or Boolean workflow on a copy; inspect internal normals",
      "Build simple navigation collision and walk from entrance to exit",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned block out a traversable cave candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The narrowest passage clears the intended player envelope",
      "No isolated interior surface blocks the route",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Remeshing can erase small openings and create dense unusable geometry.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Check the interior before decorating the exterior rock shell.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me block out a traversable cave in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Three chambers linked by a 2 m minimum passage. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The narrowest passage clears the intended player envelope; No isolated interior surface blocks the route. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/cave-blockout.svg",
        "alt": "Illustrated procedure for block out a traversable cave: Place simple chamber volumes and connect them with broad passage forms → Use a non-destructive remesh or Boolean workflow on a copy → Build simple navigation collision and walk from entrance to exit",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Block out a traversable cave. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Three chambers linked by a 2 m minimum passage"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Three chambers linked by a 2 m minimum passage Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The narrowest passage clears the intended player envelope; No isolated interior surface blocks the route."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The narrowest passage clears the intended player envelope"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "No isolated interior surface blocks the route"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Check the interior before decorating the exterior rock shell."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-floating-island",
    "title": "Design an illustrative floating island",
    "summary": "A 12 m top platform, a tapered underside and three access anchors. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 12 m top platform, a tapered underside and three access anchors.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent floating island workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 12 m top platform, a tapered underside and three access anchors. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Create the top footprint and derive a tapered underside using controlled radius levels",
      "Distribute rocks along the perimeter while preserving the access anchors",
      "Add a simple collision platform and an explicit fall/reset boundary in the runtime",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned design an illustrative floating island candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Access anchors remain unobstructed after reseeding",
      "The platform collision matches the intended walking area",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This is fantasy environment design with no physical stability claim.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a silhouette view to judge the island before adding vegetation.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me design an illustrative floating island in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 12 m top platform, a tapered underside and three access anchors. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Access anchors remain unobstructed after reseeding; The platform collision matches the intended walking area. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/floating-island.svg",
        "alt": "Illustrated procedure for design an illustrative floating island: Create the top footprint and derive a tapered underside using controlled radius levels → Distribute rocks along the perimeter while preserving the access anchors → Add a simple collision platform and an explicit fall/reset boundary in the runtime",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Design an illustrative floating island. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 12 m top platform, a tapered underside and three access anchors"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 12 m top platform, a tapered underside and three access anchors Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Access anchors remain unobstructed after reseeding; The platform collision matches the intended walking area."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Access anchors remain unobstructed after reseeding"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The platform collision matches the intended walking area"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a silhouette view to judge the island before adding vegetation."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-road-network",
    "title": "Sweep roads through an existing terrain",
    "summary": "Three intersecting centerlines, 4 m width and a maximum intended grade. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender supports editable curves, splines and curve modeling operations.",
        "sourceIds": [
          "spatial-curve"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-curve",
        "title": "Curves",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/curves/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Three intersecting centerlines, 4 m width and a maximum intended grade.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent road network workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Three intersecting centerlines, 4 m width and a maximum intended grade. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Sample terrain heights along each road and smooth the vertical profile",
      "Sweep the road cross-section and trim overlap at intersections",
      "Mark steep segments for redesign; inspect a vehicle-width proxy on each turn",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned sweep roads through an existing terrain candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Intersection surfaces do not z-fight",
      "The measured grade table identifies every segment above the chosen limit",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A visual road layout does not establish highway engineering compliance.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Record grade in percent and turn radius in metres.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me sweep roads through an existing terrain in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Three intersecting centerlines, 4 m width and a maximum intended grade. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Intersection surfaces do not z-fight; The measured grade table identifies every segment above the chosen limit. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/road-network.svg",
        "alt": "Illustrated procedure for sweep roads through an existing terrain: Sample terrain heights along each road and smooth the vertical profile → Sweep the road cross-section and trim overlap at intersections → Mark steep segments for redesign",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Sweep roads through an existing terrain. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Three intersecting centerlines, 4 m width and a maximum intended grade"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Three intersecting centerlines, 4 m width and a maximum intended grade Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Intersection surfaces do not z-fight; The measured grade table identifies every segment above the chosen limit."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Intersection surfaces do not z-fight"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The measured grade table identifies every segment above the chosen limit"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Record grade in percent and turn radius in metres."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-cliff-rock-variants",
    "title": "Make a small coherent rock family",
    "summary": "One base boulder and five seeds with identical maximum dimensions. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One base boulder and five seeds with identical maximum dimensions.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent cliff rock variants workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One base boulder and five seeds with identical maximum dimensions. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the base topology and vary a bounded displacement seed and intensity",
      "Flatten the support patch without changing the approved maximum extent",
      "Compare silhouettes under a single neutral material and export selected variants",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned make a small coherent rock family candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Each rock rests on its support patch",
      "Variation changes silhouette without producing loose internal faces",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Procedural noise alone is not a geologically accurate rock model.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Reject weak silhouettes before creating texture variants.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me make a small coherent rock family in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One base boulder and five seeds with identical maximum dimensions. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Each rock rests on its support patch; Variation changes silhouette without producing loose internal faces. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/cliff-rock-variants.svg",
        "alt": "Illustrated procedure for make a small coherent rock family: Reuse the base topology and vary a bounded displacement seed and intensity → Flatten the support patch without changing the approved maximum extent → Compare silhouettes under a single neutral material and export selected variants",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Make a small coherent rock family. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One base boulder and five seeds with identical maximum dimensions"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One base boulder and five seeds with identical maximum dimensions Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Each rock rests on its support patch; Variation changes silhouette without producing loose internal faces."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Each rock rests on its support patch"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Variation changes silhouette without producing loose internal faces"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Reject weak silhouettes before creating texture variants."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-cloud-cards",
    "title": "Create a lightweight distant cloud layer",
    "summary": "Four licensed cloud alpha images and a fixed distant sky band. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Four licensed cloud alpha images and a fixed distant sky band.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent cloud cards workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Four licensed cloud alpha images and a fixed distant sky band. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Place camera-facing cards beyond the playable scene with depth ordering",
      "Use an alpha-compatible material and test against both dark and bright backgrounds",
      "Compare overdraw with fewer larger cards and a static sky alternative",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a lightweight distant cloud layer candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Card edges do not reveal black fringes",
      "Camera movement does not expose obvious side-on planes in the allowed view",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Cards are a distant visual approximation, not volumetric weather.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep clouds out of close fly-through paths unless you use a volume approach.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a lightweight distant cloud layer in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Four licensed cloud alpha images and a fixed distant sky band. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Card edges do not reveal black fringes; Camera movement does not expose obvious side-on planes in the allowed view. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/cloud-cards.svg",
        "alt": "Illustrated procedure for create a lightweight distant cloud layer: Place camera-facing cards beyond the playable scene with depth ordering → Use an alpha-compatible material and test against both dark and bright backgrounds → Compare overdraw with fewer larger cards and a static sky alternative",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Create a lightweight distant cloud layer. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Four licensed cloud alpha images and a fixed distant sky band"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Four licensed cloud alpha images and a fixed distant sky band Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Card edges do not reveal black fringes; Camera movement does not expose obvious side-on planes in the allowed view."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Card edges do not reveal black fringes"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Camera movement does not expose obvious side-on planes in the allowed view"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep clouds out of close fly-through paths unless you use a volume approach."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-season-vegetation",
    "title": "Reuse one vegetation mesh across seasons",
    "summary": "One approved tree, three leaf palettes and a winter visibility mask. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Worlds & environments",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender Geometry Nodes environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One approved tree, three leaf palettes and a winter visibility mask.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent season vegetation workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One approved tree, three leaf palettes and a winter visibility mask. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Keep trunk geometry and semantic leaf groups stable across variants",
      "Define spring, autumn and winter material/visibility parameters in one table",
      "Compare each preset in the same scene and export only supported material changes",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned reuse one vegetation mesh across seasons candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The trunk and root anchor match across all presets",
      "Winter does not leave invisible leaves casting unintended shadows",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Phenology and tree species accuracy require botanical references.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Change palette and leaf density separately so their effects remain reviewable.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender Geometry Nodes",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me reuse one vegetation mesh across seasons in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One approved tree, three leaf palettes and a winter visibility mask. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The trunk and root anchor match across all presets; Winter does not leave invisible leaves casting unintended shadows. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "environments",
      "categoryLabel": "Worlds & environments",
      "tools": [
        "Blender Geometry Nodes"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/season-vegetation.svg",
        "alt": "Illustrated procedure for reuse one vegetation mesh across seasons: Keep trunk geometry and semantic leaf groups stable across variants → Define spring, autumn and winter material/visibility parameters in one table → Compare each preset in the same scene and export only supported material changes",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender Geometry Nodes with an optional authorized LLM client",
      "useWhen": "Reuse one vegetation mesh across seasons. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One approved tree, three leaf palettes and a winter visibility mask"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One approved tree, three leaf palettes and a winter visibility mask Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The trunk and root anchor match across all presets; Winter does not leave invisible leaves casting unintended shadows."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The trunk and root anchor match across all presets"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Winter does not leave invisible leaves casting unintended shadows"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Change palette and leaf density separately so their effects remain reviewable."
        }
      ],
      "relatedPrompts": [
        "procedural-level-design-system",
        "technical-documentation"
      ]
    }
  },
  {
    "id": "3d-parametric-chair",
    "title": "Adapt a parametric chair to a size brief",
    "summary": "An existing chair generator, 0.45 m seat height and 0.48 m seat width. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: An existing chair generator, 0.45 m seat height and 0.48 m seat width.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent parametric chair workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: An existing chair generator, 0.45 m seat height and 0.48 m seat width. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect exposed generator parameters and reuse the nearest chair definition",
      "Change seat height and width while keeping leg attachment points parameter-linked",
      "Export one candidate and compare dimensions and floor contact to the brief",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned adapt a parametric chair to a size brief candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All four feet touch the same floor plane",
      "Measured seat height and width match the two inputs",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A dimensionally correct chair is not certified ergonomic or structurally safe.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Check the existing registry before adding a new chair ID.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me adapt a parametric chair to a size brief in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: An existing chair generator, 0.45 m seat height and 0.48 m seat width. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All four feet touch the same floor plane; Measured seat height and width match the two inputs. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/parametric-chair.svg",
        "alt": "Illustrated procedure for adapt a parametric chair to a size brief: Inspect exposed generator parameters and reuse the nearest chair definition → Change seat height and width while keeping leg attachment points parameter-linked → Export one candidate and compare dimensions and floor contact to the brief",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Adapt a parametric chair to a size brief. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "An existing chair generator, 0.45 m seat height and 0.48 m seat width"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "An existing chair generator, 0.45 m seat height and 0.48 m seat width Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All four feet touch the same floor plane; Measured seat height and width match the two inputs."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All four feet touch the same floor plane"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Measured seat height and width match the two inputs"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Check the existing registry before adding a new chair ID."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-turned-vase",
    "title": "Model a vase from a measured profile",
    "summary": "A 0.30 m profile, 0.08 m rim diameter and 0.004 m intended wall. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender supports editable curves, splines and curve modeling operations.",
        "sourceIds": [
          "spatial-curve"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-curve",
        "title": "Curves",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/curves/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 0.30 m profile, 0.08 m rim diameter and 0.004 m intended wall.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent turned vase workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 0.30 m profile, 0.08 m rim diameter and 0.004 m intended wall. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Draw a half-section curve in a consistent radial plane",
      "Revolve it with Screw or a controlled lathe generator; close the bottom intentionally",
      "Inspect a cut section and separate the outer silhouette from manufacturing thickness",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned model a vase from a measured profile candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The axis has no doubled vertices or open bottom",
      "The profile matches the measured height and rim diameter",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Wall thickness still needs process-specific manufacturing checks.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep the profile editable rather than repeatedly sculpting the final mesh.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me model a vase from a measured profile in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 0.30 m profile, 0.08 m rim diameter and 0.004 m intended wall. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The axis has no doubled vertices or open bottom; The profile matches the measured height and rim diameter. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/turned-vase.svg",
        "alt": "Illustrated procedure for model a vase from a measured profile: Draw a half-section curve in a consistent radial plane → Revolve it with Screw or a controlled lathe generator → Inspect a cut section and separate the outer silhouette from manufacturing thickness",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Model a vase from a measured profile. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 0.30 m profile, 0.08 m rim diameter and 0.004 m intended wall"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 0.30 m profile, 0.08 m rim diameter and 0.004 m intended wall Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The axis has no doubled vertices or open bottom; The profile matches the measured height and rim diameter."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The axis has no doubled vertices or open bottom"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The profile matches the measured height and rim diameter"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep the profile editable rather than repeatedly sculpting the final mesh."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-watch-exploded",
    "title": "Create a semantic exploded product diagram",
    "summary": "A generic watch assembly with case, dial, glass and strap parts. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Constraints control transforms through relationships with targets and limits.",
        "sourceIds": [
          "spatial-constraints"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-constraints",
        "title": "Constraints",
        "url": "https://docs.blender.org/manual/en/4.5/animation/constraints/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A generic watch assembly with case, dial, glass and strap parts.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent watch exploded workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A generic watch assembly with case, dial, glass and strap parts. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Name parts by function and preserve their assembled transforms",
      "Animate displacement along recorded explosion vectors using parent empties",
      "Add numbered callouts and a reset pose that restores the original assembly",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a semantic exploded product diagram candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Reset restores every part's original transform",
      "Callout numbers map to an explicit parts list",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "An illustrative exploded view may omit real fasteners and assembly tolerances.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use generic geometry unless the brand assets are licensed.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a semantic exploded product diagram in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A generic watch assembly with case, dial, glass and strap parts. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Reset restores every part's original transform; Callout numbers map to an explicit parts list. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/watch-exploded.svg",
        "alt": "Illustrated procedure for create a semantic exploded product diagram: Name parts by function and preserve their assembled transforms → Animate displacement along recorded explosion vectors using parent empties → Add numbered callouts and a reset pose that restores the original assembly",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Create a semantic exploded product diagram. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A generic watch assembly with case, dial, glass and strap parts"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A generic watch assembly with case, dial, glass and strap parts Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Reset restores every part's original transform; Callout numbers map to an explicit parts list."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Reset restores every part's original transform"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Callout numbers map to an explicit parts list"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use generic geometry unless the brand assets are licensed."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-bike-fit-proxy",
    "title": "Build an adjustable bicycle fit proxy",
    "summary": "Wheelbase 1.02 m, saddle height 0.74 m and handlebar reach 0.48 m. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "The Python API can inspect and modify Blender data and run tools.",
        "sourceIds": [
          "spatial-api"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-api",
        "title": "Python API quickstart",
        "url": "https://docs.blender.org/api/4.5/info_quickstart.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Wheelbase 1.02 m, saddle height 0.74 m and handlebar reach 0.48 m.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent bike fit proxy workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Wheelbase 1.02 m, saddle height 0.74 m and handlebar reach 0.48 m. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse an existing generic frame proxy and define wheel, crank, saddle and bar anchors",
      "Drive the proxy from the three dimensions in a parameter table",
      "Show side and perspective views with labelled landmarks; compare all coordinates",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build an adjustable bicycle fit proxy candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Changing saddle height does not move wheel centers",
      "The side-view dimensions reproduce the input table",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This is a spatial planning proxy, not a medical fit recommendation or branded replica.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use simple tubes to review fit relationships before adding surface detail.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build an adjustable bicycle fit proxy in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Wheelbase 1.02 m, saddle height 0.74 m and handlebar reach 0.48 m. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Changing saddle height does not move wheel centers; The side-view dimensions reproduce the input table. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/bike-fit-proxy.svg",
        "alt": "Illustrated procedure for build an adjustable bicycle fit proxy: Reuse an existing generic frame proxy and define wheel, crank, saddle and bar anchors → Drive the proxy from the three dimensions in a parameter table → Show side and perspective views with labelled landmarks",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Build an adjustable bicycle fit proxy. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Wheelbase 1.02 m, saddle height 0.74 m and handlebar reach 0.48 m"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Wheelbase 1.02 m, saddle height 0.74 m and handlebar reach 0.48 m Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Changing saddle height does not move wheel centers; The side-view dimensions reproduce the input table."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Changing saddle height does not move wheel centers"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The side-view dimensions reproduce the input table"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use simple tubes to review fit relationships before adding surface detail."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-enclosure-fit",
    "title": "Check a product enclosure around a component",
    "summary": "A 60 by 40 by 15 mm component proxy, 2 mm wall and 1 mm clearance. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 60 by 40 by 15 mm component proxy, 2 mm wall and 1 mm clearance.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent enclosure fit workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 60 by 40 by 15 mm component proxy, 2 mm wall and 1 mm clearance. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Set metric units and use a measured component bounding box",
      "Construct the outer shell and subtract the clearance envelope on a derived copy",
      "Inspect sections at connectors and mounting points; export a dimension receipt",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned check a product enclosure around a component candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The component does not intersect the intended internal clearance volume",
      "All connector openings remain accessible",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Mesh Boolean output is not a replacement for manufacturing CAD tolerance analysis.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Separate clearance dimensions from wall dimensions in the parameter table.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me check a product enclosure around a component in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 60 by 40 by 15 mm component proxy, 2 mm wall and 1 mm clearance. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The component does not intersect the intended internal clearance volume; All connector openings remain accessible. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/enclosure-fit.svg",
        "alt": "Illustrated procedure for check a product enclosure around a component: Set metric units and use a measured component bounding box → Construct the outer shell and subtract the clearance envelope on a derived copy → Inspect sections at connectors and mounting points",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Check a product enclosure around a component. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 60 by 40 by 15 mm component proxy, 2 mm wall and 1 mm clearance"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 60 by 40 by 15 mm component proxy, 2 mm wall and 1 mm clearance Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The component does not intersect the intended internal clearance volume; All connector openings remain accessible."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The component does not intersect the intended internal clearance volume"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "All connector openings remain accessible"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Separate clearance dimensions from wall dimensions in the parameter table."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-retopology-joint",
    "title": "Retopologize a deforming elbow",
    "summary": "A licensed high-resolution arm and a low-resolution target cage. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender documents remeshing tools for changing topology while approximating shape.",
        "sourceIds": [
          "spatial-retopo"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-retopo",
        "title": "Retopology",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/meshes/retopology.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed high-resolution arm and a low-resolution target cage.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent retopology joint workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed high-resolution arm and a low-resolution target cage. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Preserve the source and build clean loops around the elbow on a separate mesh",
      "Use shrinkwrap as an aid while keeping a deliberate loop layout",
      "Weight to a simple two-bone rig and inspect straight, 90 and 130 degree bends",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned retopologize a deforming elbow candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Bending does not collapse the elbow silhouette",
      "The mesh remains connected without accidental doubled vertices",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Automatic projection does not guarantee animation-ready topology.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Evaluate topology in deformation poses, not only in the neutral pose.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me retopologize a deforming elbow in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed high-resolution arm and a low-resolution target cage. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Bending does not collapse the elbow silhouette; The mesh remains connected without accidental doubled vertices. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/retopology-joint.svg",
        "alt": "Illustrated procedure for retopologize a deforming elbow: Preserve the source and build clean loops around the elbow on a separate mesh → Use shrinkwrap as an aid while keeping a deliberate loop layout → Weight to a simple two-bone rig and inspect straight, 90 and 130 degree bends",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Retopologize a deforming elbow. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed high-resolution arm and a low-resolution target cage"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed high-resolution arm and a low-resolution target cage Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Bending does not collapse the elbow silhouette; The mesh remains connected without accidental doubled vertices."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Bending does not collapse the elbow silhouette"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The mesh remains connected without accidental doubled vertices"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Evaluate topology in deformation poses, not only in the neutral pose."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-scan-cleanup",
    "title": "Clean a scan while preserving measured scale",
    "summary": "A licensed object scan with a photographed 0.1 m scale reference. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender documents remeshing tools for changing topology while approximating shape.",
        "sourceIds": [
          "spatial-retopo"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-retopo",
        "title": "Retopology",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/meshes/retopology.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed object scan with a photographed 0.1 m scale reference.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent scan cleanup workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed object scan with a photographed 0.1 m scale reference. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Fit the reference scale and record the transform before deleting scan artifacts",
      "Remove floaters and fill only holes supported by reference views",
      "Derive a retopology candidate and compare key distances against the scaled source",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned clean a scan while preserving measured scale candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The 0.1 m reference remains correct after cleanup",
      "Reconstructed areas are labelled as inferred rather than scanned",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Missing scan geometry cannot be recovered as fact from an LLM description.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep the untouched scan and cleanup candidate under separate IDs.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me clean a scan while preserving measured scale in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed object scan with a photographed 0.1 m scale reference. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The 0.1 m reference remains correct after cleanup; Reconstructed areas are labelled as inferred rather than scanned. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/scan-cleanup.svg",
        "alt": "Illustrated procedure for clean a scan while preserving measured scale: Fit the reference scale and record the transform before deleting scan artifacts → Remove floaters and fill only holes supported by reference views → Derive a retopology candidate and compare key distances against the scaled source",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Clean a scan while preserving measured scale. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed object scan with a photographed 0.1 m scale reference"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed object scan with a photographed 0.1 m scale reference Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The 0.1 m reference remains correct after cleanup; Reconstructed areas are labelled as inferred rather than scanned."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The 0.1 m reference remains correct after cleanup"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Reconstructed areas are labelled as inferred rather than scanned"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep the untouched scan and cleanup candidate under separate IDs."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-print-preflight",
    "title": "Prepare a mesh for a printability review",
    "summary": "A closed 50 mm token mesh and the intended printer/process settings. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A closed 50 mm token mesh and the intended printer/process settings.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent print preflight workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A closed 50 mm token mesh and the intended printer/process settings. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Set units and inspect non-manifold edges, inverted normals and loose shells",
      "Add a measured wall-thickness inspection and orient a derived print candidate",
      "Export the candidate to the actual slicer and inspect layers, supports and estimated material",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned prepare a mesh for a printability review candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The exported bounding box remains 50 mm in the intended unit",
      "The slicer shows no unexplained missing layers or floating islands",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Watertight geometry is not proof of successful printing or food/contact safety.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A slicer preview catches scale errors that a viewport can hide.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me prepare a mesh for a printability review in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A closed 50 mm token mesh and the intended printer/process settings. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The exported bounding box remains 50 mm in the intended unit; The slicer shows no unexplained missing layers or floating islands. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/print-preflight.svg",
        "alt": "Illustrated procedure for prepare a mesh for a printability review: Set units and inspect non-manifold edges, inverted normals and loose shells → Add a measured wall-thickness inspection and orient a derived print candidate → Export the candidate to the actual slicer and inspect layers, supports and estimated material",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Prepare a mesh for a printability review. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A closed 50 mm token mesh and the intended printer/process settings"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A closed 50 mm token mesh and the intended printer/process settings Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The exported bounding box remains 50 mm in the intended unit; The slicer shows no unexplained missing layers or floating islands."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The exported bounding box remains 50 mm in the intended unit"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The slicer shows no unexplained missing layers or floating islands"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A slicer preview catches scale errors that a viewport can hide."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-photogrammetry-prop",
    "title": "Reconstruct a prop from overlapping photos",
    "summary": "Thirty licensed photos of one stationary matte object and a scale marker. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "COLMAP reconstructs sparse structure and supports multi-view dense reconstruction.",
        "sourceIds": [
          "spatial-colmap"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-colmap",
        "title": "COLMAP tutorial",
        "url": "https://colmap.github.io/tutorial.html",
        "publisher": "COLMAP contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Thirty licensed photos of one stationary matte object and a scale marker.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent photogrammetry prop workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Thirty licensed photos of one stationary matte object and a scale marker. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect blur and overlap; mask background where it confuses feature matching",
      "Use COLMAP's feature extraction, matching and sparse reconstruction workflow",
      "Review registered cameras before dense reconstruction and import a scaled candidate into Blender",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned reconstruct a prop from overlapping photos candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Misregistered camera views are identified before dense processing",
      "The known marker distance matches after applying scale",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Reflective or moving subjects can break reconstruction; rights and consent remain required.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Capture more views of feature-poor surfaces instead of asking an LLM to invent detail.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me reconstruct a prop from overlapping photos in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Thirty licensed photos of one stationary matte object and a scale marker. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Misregistered camera views are identified before dense processing; The known marker distance matches after applying scale. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/photogrammetry-prop.svg",
        "alt": "Illustrated procedure for reconstruct a prop from overlapping photos: Inspect blur and overlap → Use COLMAP's feature extraction, matching and sparse reconstruction workflow → Review registered cameras before dense reconstruction and import a scaled candidate into Blender",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Reconstruct a prop from overlapping photos. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Thirty licensed photos of one stationary matte object and a scale marker"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Thirty licensed photos of one stationary matte object and a scale marker Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Misregistered camera views are identified before dense processing; The known marker distance matches after applying scale."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Misregistered camera views are identified before dense processing"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The known marker distance matches after applying scale"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Capture more views of feature-poor surfaces instead of asking an LLM to invent detail."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-splat-collision-proxy",
    "title": "Pair a radiance-field capture with collision geometry",
    "summary": "One owned scene capture, a trained viewing representation and a coarse room proxy. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Modeling & reconstruction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Nerfstudio documents training and viewing a radiance-field representation.",
        "sourceIds": [
          "spatial-nerf"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-nerf",
        "title": "Train a first model",
        "url": "https://docs.nerf.studio/quickstart/first_nerf.html",
        "publisher": "Nerfstudio contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / COLMAP / Nerfstudio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One owned scene capture, a trained viewing representation and a coarse room proxy.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent splat collision proxy workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One owned scene capture, a trained viewing representation and a coarse room proxy. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Use the documented capture processing and training path on an authorized machine",
      "Keep the capture as a visual representation and model a separate collision proxy",
      "Align the two using three measured landmarks and inspect camera occlusion and navigation",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned pair a radiance-field capture with collision geometry candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Collision aligns at all three landmarks",
      "The viewer does not advertise the capture as a watertight editable mesh",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A radiance field or splat does not automatically supply topology, collision or game logic.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Train a small scene before committing large GPU budgets.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / COLMAP / Nerfstudio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me pair a radiance-field capture with collision geometry in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One owned scene capture, a trained viewing representation and a coarse room proxy. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Collision aligns at all three landmarks; The viewer does not advertise the capture as a watertight editable mesh. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "modeling",
      "categoryLabel": "Modeling & reconstruction",
      "tools": [
        "Blender",
        "COLMAP",
        "Nerfstudio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/splat-collision-proxy.svg",
        "alt": "Illustrated procedure for pair a radiance-field capture with collision geometry: Use the documented capture processing and training path on an authorized machine → Keep the capture as a visual representation and model a separate collision proxy → Align the two using three measured landmarks and inspect camera occlusion and navigation",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / COLMAP / Nerfstudio with an optional authorized LLM client",
      "useWhen": "Pair a radiance-field capture with collision geometry. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One owned scene capture, a trained viewing representation and a coarse room proxy"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One owned scene capture, a trained viewing representation and a coarse room proxy Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Collision aligns at all three landmarks; The viewer does not advertise the capture as a watertight editable mesh."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Collision aligns at all three landmarks"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The viewer does not advertise the capture as a watertight editable mesh"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Train a small scene before committing large GPU budgets."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-oak-material",
    "title": "Build a reusable oak material study",
    "summary": "One neutral plinth, a licensed oak texture and 0.6 m real-world mapping width. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One neutral plinth, a licensed oak texture and 0.6 m real-world mapping width.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent oak material workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One neutral plinth, a licensed oak texture and 0.6 m real-world mapping width. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Apply base color and separate roughness/normal inputs with the correct data interpretation",
      "Compare restrained normal strength against a flat baseline under the same key light",
      "Check end grain, seams and mapping scale before accepting the finish for a room",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a reusable oak material study candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The grain scale stays consistent on all visible faces",
      "Normal detail does not read as carved rope at the target distance",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Procedural or photographic wood may remain stylized; no photorealistic result is assumed.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Change one material parameter at a time and keep the rejected comparison.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a reusable oak material study in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One neutral plinth, a licensed oak texture and 0.6 m real-world mapping width. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The grain scale stays consistent on all visible faces; Normal detail does not read as carved rope at the target distance. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/oak-material.svg",
        "alt": "Illustrated procedure for build a reusable oak material study: Apply base color and separate roughness/normal inputs with the correct data interpretation → Compare restrained normal strength against a flat baseline under the same key light → Check end grain, seams and mapping scale before accepting the finish for a room",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Build a reusable oak material study. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One neutral plinth, a licensed oak texture and 0.6 m real-world mapping width"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One neutral plinth, a licensed oak texture and 0.6 m real-world mapping width Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The grain scale stays consistent on all visible faces; Normal detail does not read as carved rope at the target distance."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The grain scale stays consistent on all visible faces"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Normal detail does not read as carved rope at the target distance"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Change one material parameter at a time and keep the rejected comparison."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-brushed-metal",
    "title": "Make anisotropic brushed metal readable",
    "summary": "A cylindrical metal sample, roughness 0.3 and an explicit brushing direction. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A cylindrical metal sample, roughness 0.3 and an explicit brushing direction.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent brushed metal workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A cylindrical metal sample, roughness 0.3 and an explicit brushing direction. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Set a metallic material and define consistent tangents or UV direction",
      "Compare anisotropy disabled and enabled under a long softbox-style light",
      "Rotate the sample and inspect highlights before exporting supported channels",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned make anisotropic brushed metal readable candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The brushing direction follows the intended surface orientation",
      "The exported fallback remains acceptable if anisotropy is unsupported",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Blender and runtime BRDF implementations may differ.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a neutral environment before tinting lights.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me make anisotropic brushed metal readable in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A cylindrical metal sample, roughness 0.3 and an explicit brushing direction. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The brushing direction follows the intended surface orientation; The exported fallback remains acceptable if anisotropy is unsupported. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/brushed-metal.svg",
        "alt": "Illustrated procedure for make anisotropic brushed metal readable: Set a metallic material and define consistent tangents or UV direction → Compare anisotropy disabled and enabled under a long softbox-style light → Rotate the sample and inspect highlights before exporting supported channels",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Make anisotropic brushed metal readable. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A cylindrical metal sample, roughness 0.3 and an explicit brushing direction"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A cylindrical metal sample, roughness 0.3 and an explicit brushing direction Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The brushing direction follows the intended surface orientation; The exported fallback remains acceptable if anisotropy is unsupported."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The brushing direction follows the intended surface orientation"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The exported fallback remains acceptable if anisotropy is unsupported"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a neutral environment before tinting lights."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-glass-display",
    "title": "Review glass thickness and transmission",
    "summary": "A 6 mm glass panel, an object behind it and a neutral stage. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 6 mm glass panel, an object behind it and a neutral stage.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent glass display workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 6 mm glass panel, an object behind it and a neutral stage. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Model physical thickness and inspect outward normals before adjusting transmission",
      "Compare transmission, roughness and index settings while keeping exposure fixed",
      "Test the target runtime's supported glass extensions and sorting behavior",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned review glass thickness and transmission candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The object behind the glass remains legible",
      "Overlapping panes do not flicker or unexpectedly turn opaque",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Real-time transmission is an approximation and may not reproduce caustics.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a simple opaque fallback for constrained viewers.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me review glass thickness and transmission in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 6 mm glass panel, an object behind it and a neutral stage. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The object behind the glass remains legible; Overlapping panes do not flicker or unexpectedly turn opaque. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/glass-display.svg",
        "alt": "Illustrated procedure for review glass thickness and transmission: Model physical thickness and inspect outward normals before adjusting transmission → Compare transmission, roughness and index settings while keeping exposure fixed → Test the target runtime's supported glass extensions and sorting behavior",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Review glass thickness and transmission. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 6 mm glass panel, an object behind it and a neutral stage"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 6 mm glass panel, an object behind it and a neutral stage Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The object behind the glass remains legible; Overlapping panes do not flicker or unexpectedly turn opaque."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The object behind the glass remains legible"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Overlapping panes do not flicker or unexpectedly turn opaque"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a simple opaque fallback for constrained viewers."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-fabric-weave",
    "title": "Show fabric weave without excessive geometry",
    "summary": "A cushion mesh, a licensed weave map and 5 mm visual repeat. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A cushion mesh, a licensed weave map and 5 mm visual repeat.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent fabric weave workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A cushion mesh, a licensed weave map and 5 mm visual repeat. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Keep the weave in surface maps and preserve silhouette folds in geometry",
      "Set UV scale from the measured repeat and compare normal strength at viewing distance",
      "Inspect seams under grazing light and test a lower texture resolution",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned show fabric weave without excessive geometry candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The weave does not change apparent size across UV islands",
      "The distant view avoids distracting moire",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Surface weave maps do not simulate fiber mechanics.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Judge the intended display distance before increasing texture size.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me show fabric weave without excessive geometry in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A cushion mesh, a licensed weave map and 5 mm visual repeat. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The weave does not change apparent size across UV islands; The distant view avoids distracting moire. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/fabric-weave.svg",
        "alt": "Illustrated procedure for show fabric weave without excessive geometry: Keep the weave in surface maps and preserve silhouette folds in geometry → Set UV scale from the measured repeat and compare normal strength at viewing distance → Inspect seams under grazing light and test a lower texture resolution",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Show fabric weave without excessive geometry. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A cushion mesh, a licensed weave map and 5 mm visual repeat"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A cushion mesh, a licensed weave map and 5 mm visual repeat Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The weave does not change apparent size across UV islands; The distant view avoids distracting moire."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The weave does not change apparent size across UV islands"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The distant view avoids distracting moire"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Judge the intended display distance before increasing texture size."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-wet-ground",
    "title": "Create a controlled wet-ground variant",
    "summary": "A dry pavement material and a separate puddle mask. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A dry pavement material and a separate puddle mask.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent wet ground workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A dry pavement material and a separate puddle mask. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the dry material and drive roughness changes from the puddle mask",
      "Keep raised dry areas visible; add geometry only for puddle edges that affect silhouette",
      "Compare dry and wet presets under identical lighting and export the intended fallback",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a controlled wet-ground variant candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The puddle mask does not invert at UV seams",
      "The wet preset retains readable pavement detail",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This is an artistic wetness effect, not a measured water-film simulation.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Avoid painting directional reflections into reusable base color.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a controlled wet-ground variant in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A dry pavement material and a separate puddle mask. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The puddle mask does not invert at UV seams; The wet preset retains readable pavement detail. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/wet-ground.svg",
        "alt": "Illustrated procedure for create a controlled wet-ground variant: Reuse the dry material and drive roughness changes from the puddle mask → Keep raised dry areas visible → Compare dry and wet presets under identical lighting and export the intended fallback",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Create a controlled wet-ground variant. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A dry pavement material and a separate puddle mask"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A dry pavement material and a separate puddle mask Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The puddle mask does not invert at UV seams; The wet preset retains readable pavement detail."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The puddle mask does not invert at UV seams"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The wet preset retains readable pavement detail"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Avoid painting directional reflections into reusable base color."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-triplanar-rock",
    "title": "Evaluate triplanar projection for rock faces",
    "summary": "A scaled boulder, a licensed rock texture and a 1 m mapping reference. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Principled BSDF combines surface layers with configurable material parameters.",
        "sourceIds": [
          "spatial-material"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-material",
        "title": "Principled BSDF",
        "url": "https://docs.blender.org/manual/en/4.5/render/shader_nodes/shader/principled.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A scaled boulder, a licensed rock texture and a 1 m mapping reference.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent triplanar rock workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A scaled boulder, a licensed rock texture and a 1 m mapping reference. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Compare the existing UV mapping with an object/world-space projection study",
      "Control blend sharpness around corners and inspect rotated and non-uniformly scaled copies",
      "Bake to a portable UV texture only when the destination cannot reproduce the shader",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned evaluate triplanar projection for rock faces candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The 1 m mapping reference is consistent across copies",
      "Projection seams do not become visible at dominant view angles",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Custom procedural shader graphs generally do not survive a basic GLB export.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep shader-based and baked variants as separate deliverables.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me evaluate triplanar projection for rock faces in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A scaled boulder, a licensed rock texture and a 1 m mapping reference. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The 1 m mapping reference is consistent across copies; Projection seams do not become visible at dominant view angles. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/triplanar-rock.svg",
        "alt": "Illustrated procedure for evaluate triplanar projection for rock faces: Compare the existing UV mapping with an object/world-space projection study → Control blend sharpness around corners and inspect rotated and non-uniformly scaled copies → Bake to a portable UV texture only when the destination cannot reproduce the shader",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Evaluate triplanar projection for rock faces. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A scaled boulder, a licensed rock texture and a 1 m mapping reference"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A scaled boulder, a licensed rock texture and a 1 m mapping reference Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The 1 m mapping reference is consistent across copies; Projection seams do not become visible at dominant view angles."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The 1 m mapping reference is consistent across copies"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Projection seams do not become visible at dominant view angles"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep shader-based and baked variants as separate deliverables."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-decal-label",
    "title": "Apply a legible product label decal",
    "summary": "One generic bottle, a licensed label image and a front-facing camera. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "UV tools provide seams, unwrapping, island packing and texture-space editing.",
        "sourceIds": [
          "spatial-uv"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-uv",
        "title": "UV editing",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/meshes/uv/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One generic bottle, a licensed label image and a front-facing camera.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent decal label workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One generic bottle, a licensed label image and a front-facing camera. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Create a bounded label UV island with explicit padding",
      "Assign the label through a supported material or a separate offset decal mesh",
      "Inspect transparency edges, curved text distortion and the target runtime at small size",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned apply a legible product label decal candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The label is readable at the agreed delivery resolution",
      "No z-fighting appears during a full rotation",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A visually similar generated logo is not evidence of permission to use a trademark.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a small physical offset only when a separate decal mesh is necessary.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me apply a legible product label decal in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One generic bottle, a licensed label image and a front-facing camera. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The label is readable at the agreed delivery resolution; No z-fighting appears during a full rotation. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/decal-label.svg",
        "alt": "Illustrated procedure for apply a legible product label decal: Create a bounded label UV island with explicit padding → Assign the label through a supported material or a separate offset decal mesh → Inspect transparency edges, curved text distortion and the target runtime at small size",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Apply a legible product label decal. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One generic bottle, a licensed label image and a front-facing camera"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One generic bottle, a licensed label image and a front-facing camera Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The label is readable at the agreed delivery resolution; No z-fighting appears during a full rotation."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The label is readable at the agreed delivery resolution"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "No z-fighting appears during a full rotation"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a small physical offset only when a separate decal mesh is necessary."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-texture-atlas",
    "title": "Consolidate prop textures into an atlas",
    "summary": "Four small props, their source materials and a 2048 px trial atlas. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "UV tools provide seams, unwrapping, island packing and texture-space editing.",
        "sourceIds": [
          "spatial-uv"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-uv",
        "title": "UV editing",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/meshes/uv/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Four small props, their source materials and a 2048 px trial atlas.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent texture atlas workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Four small props, their source materials and a 2048 px trial atlas. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Group compatible material channels and repack UV islands with padding",
      "Bake or transfer each channel to the atlas without mixing color and data interpretation",
      "Compare memory, material count and distant mip seams against the original pack",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned consolidate prop textures into an atlas candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All props sample their own islands at lower mip levels",
      "The atlas does not silently reduce required label detail",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "An atlas is a packaging choice, not an automatic performance improvement.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Measure total texture memory; one large atlas can be worse than small reusable maps.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me consolidate prop textures into an atlas in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Four small props, their source materials and a 2048 px trial atlas. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All props sample their own islands at lower mip levels; The atlas does not silently reduce required label detail. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/texture-atlas.svg",
        "alt": "Illustrated procedure for consolidate prop textures into an atlas: Group compatible material channels and repack UV islands with padding → Bake or transfer each channel to the atlas without mixing color and data interpretation → Compare memory, material count and distant mip seams against the original pack",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Consolidate prop textures into an atlas. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Four small props, their source materials and a 2048 px trial atlas"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Four small props, their source materials and a 2048 px trial atlas Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All props sample their own islands at lower mip levels; The atlas does not silently reduce required label detail."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All props sample their own islands at lower mip levels"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The atlas does not silently reduce required label detail"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Measure total texture memory; one large atlas can be worse than small reusable maps."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-static-lightmap",
    "title": "Bake room lighting for a runtime",
    "summary": "A fixed room, non-overlapping lightmap UVs and one moving character. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "LightmapGI supplies precomputed lighting with engine-specific setup requirements.",
        "sourceIds": [
          "spatial-lightmap"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-lightmap",
        "title": "LightmapGI",
        "url": "https://docs.godotengine.org/en/stable/classes/class_lightmapgi.html",
        "publisher": "Godot contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A fixed room, non-overlapping lightmap UVs and one moving character.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent static lightmap workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A fixed room, non-overlapping lightmap UVs and one moving character. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Mark static geometry and configure the engine's lightmap UV/import settings",
      "Bake a small room candidate with the chosen static lights on an authorized render machine",
      "Test the moving character with the runtime's intended indirect-light solution",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned bake room lighting for a runtime candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Static surfaces have no unexplained seams or double lighting",
      "Moving objects do not inherit fixed shadows painted into their base color",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A Blender render bake is not automatically an engine-compatible LightmapGI result.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep reusable prop albedo separate from room-specific baked illumination.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me bake room lighting for a runtime in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A fixed room, non-overlapping lightmap UVs and one moving character. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Static surfaces have no unexplained seams or double lighting; Moving objects do not inherit fixed shadows painted into their base color. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/static-lightmap.svg",
        "alt": "Illustrated procedure for bake room lighting for a runtime: Mark static geometry and configure the engine's lightmap UV/import settings → Bake a small room candidate with the chosen static lights on an authorized render machine → Test the moving character with the runtime's intended indirect-light solution",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Bake room lighting for a runtime. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A fixed room, non-overlapping lightmap UVs and one moving character"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A fixed room, non-overlapping lightmap UVs and one moving character Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Static surfaces have no unexplained seams or double lighting; Moving objects do not inherit fixed shadows painted into their base color."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Static surfaces have no unexplained seams or double lighting"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Moving objects do not inherit fixed shadows painted into their base color"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep reusable prop albedo separate from room-specific baked illumination."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-material-variants",
    "title": "Ship one mesh with reviewed finish variants",
    "summary": "A single plinth mesh and two approved finish candidates. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Materials & lighting",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "The glTF exporter delivers supported geometry, material and animation features.",
        "sourceIds": [
          "spatial-gltf"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-gltf",
        "title": "glTF export",
        "url": "https://docs.blender.org/manual/en/4.5/addons/import_export/scene_gltf2.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender shaders / runtime materials environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A single plinth mesh and two approved finish candidates.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent material variants workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A single plinth mesh and two approved finish candidates. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Keep one geometry source and record two material definitions with stable names",
      "Use a supported variants export path or explicit application-side material mapping",
      "Test switching in the actual viewer and compare file size against duplicated meshes",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned ship one mesh with reviewed finish variants candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Switching finishes preserves geometry, anchors and annotations",
      "Unsupported variants fall back to the documented default",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Variants support differs by exporter and loader; a default material is not a full variant test.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Inspect the loader's extension/plugin support before choosing a packaging method.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender shaders / runtime materials",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me ship one mesh with reviewed finish variants in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A single plinth mesh and two approved finish candidates. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Switching finishes preserves geometry, anchors and annotations; Unsupported variants fall back to the documented default. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "materials",
      "categoryLabel": "Materials & lighting",
      "tools": [
        "Blender shaders",
        "runtime materials"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/material-variants.svg",
        "alt": "Illustrated procedure for ship one mesh with reviewed finish variants: Keep one geometry source and record two material definitions with stable names → Use a supported variants export path or explicit application-side material mapping → Test switching in the actual viewer and compare file size against duplicated meshes",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender shaders / runtime materials with an optional authorized LLM client",
      "useWhen": "Ship one mesh with reviewed finish variants. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A single plinth mesh and two approved finish candidates"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A single plinth mesh and two approved finish candidates Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Switching finishes preserves geometry, anchors and annotations; Unsupported variants fall back to the documented default."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Switching finishes preserves geometry, anchors and annotations"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Unsupported variants fall back to the documented default"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Inspect the loader's extension/plugin support before choosing a packaging method."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-walk-cycle",
    "title": "Author a loopable walk cycle",
    "summary": "One licensed rig, 24 fps and a 24-frame in-place cycle. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Armatures provide bones, posing and skinning for character animation.",
        "sourceIds": [
          "spatial-rig"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rig",
        "title": "Armatures",
        "url": "https://docs.blender.org/manual/en/4.5/animation/armatures/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One licensed rig, 24 fps and a 24-frame in-place cycle.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent walk cycle workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One licensed rig, 24 fps and a 24-frame in-place cycle. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Mark contact, passing and opposing contact poses on the same root transform",
      "Adjust foot planting and pelvis motion before interpolating the full loop",
      "Bake an export candidate and compare first/last pose plus two engine loops",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned author a loopable walk cycle candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "No visible foot slide occurs during the planted interval",
      "The loop boundary has no root position jump",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A rig-specific action is not automatically portable to another skeleton.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Choose in-place or root motion explicitly before animating.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me author a loopable walk cycle in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One licensed rig, 24 fps and a 24-frame in-place cycle. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: No visible foot slide occurs during the planted interval; The loop boundary has no root position jump. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/walk-cycle.svg",
        "alt": "Illustrated procedure for author a loopable walk cycle: Mark contact, passing and opposing contact poses on the same root transform → Adjust foot planting and pelvis motion before interpolating the full loop → Bake an export candidate and compare first/last pose plus two engine loops",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Author a loopable walk cycle. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One licensed rig, 24 fps and a 24-frame in-place cycle"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One licensed rig, 24 fps and a 24-frame in-place cycle Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: No visible foot slide occurs during the planted interval; The loop boundary has no root position jump."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "No visible foot slide occurs during the planted interval"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The loop boundary has no root position jump"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Choose in-place or root motion explicitly before animating."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-facial-shapes",
    "title": "Build a small facial expression set",
    "summary": "A neutral head mesh and smile, blink and brow shape targets. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Shape keys store alternate vertex positions for compatible mesh topology.",
        "sourceIds": [
          "spatial-shape"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-shape",
        "title": "Shape keys",
        "url": "https://docs.blender.org/manual/en/4.5/animation/shape_keys/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A neutral head mesh and smile, blink and brow shape targets.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent facial shapes workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A neutral head mesh and smile, blink and brow shape targets. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Preserve vertex order and create each expression from the same base topology",
      "Test each target alone before combining blink and smile at partial weights",
      "Export supported morph targets and compare the neutral and combined expressions in the viewer",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a small facial expression set candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Neutral weight zero reproduces the original face",
      "Combined expressions do not expose gaps around eyelids or lips",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Morph targets do not include a dialogue controller or emotion inference system.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep expression names stable for application-side controls.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a small facial expression set in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A neutral head mesh and smile, blink and brow shape targets. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Neutral weight zero reproduces the original face; Combined expressions do not expose gaps around eyelids or lips. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/facial-shapes.svg",
        "alt": "Illustrated procedure for build a small facial expression set: Preserve vertex order and create each expression from the same base topology → Test each target alone before combining blink and smile at partial weights → Export supported morph targets and compare the neutral and combined expressions in the viewer",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Build a small facial expression set. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A neutral head mesh and smile, blink and brow shape targets"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A neutral head mesh and smile, blink and brow shape targets Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Neutral weight zero reproduces the original face; Combined expressions do not expose gaps around eyelids or lips."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Neutral weight zero reproduces the original face"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Combined expressions do not expose gaps around eyelids or lips"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep expression names stable for application-side controls."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-camera-rail",
    "title": "Animate a camera along a product rail",
    "summary": "A 4 m curve, 120 frames and one look-at target. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Constraints control transforms through relationships with targets and limits.",
        "sourceIds": [
          "spatial-constraints"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-constraints",
        "title": "Constraints",
        "url": "https://docs.blender.org/manual/en/4.5/animation/constraints/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 4 m curve, 120 frames and one look-at target.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent camera rail workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 4 m curve, 120 frames and one look-at target. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Create a camera with a Follow Path constraint and a separate Track To target",
      "Keyframe path progress with deliberate start/stop timing",
      "Inspect near clipping and framing at five checkpoints; bake transforms if required by delivery",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned animate a camera along a product rail candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The target remains framed at all five checkpoints",
      "There is no unexpected roll flip along the curve",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Constraints are authoring tools and may require baking for other applications.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a separate target empty instead of hand-keying every camera rotation.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me animate a camera along a product rail in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 4 m curve, 120 frames and one look-at target. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The target remains framed at all five checkpoints; There is no unexpected roll flip along the curve. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/camera-rail.svg",
        "alt": "Illustrated procedure for animate a camera along a product rail: Create a camera with a Follow Path constraint and a separate Track To target → Keyframe path progress with deliberate start/stop timing → Inspect near clipping and framing at five checkpoints",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Animate a camera along a product rail. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 4 m curve, 120 frames and one look-at target"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 4 m curve, 120 frames and one look-at target Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The target remains framed at all five checkpoints; There is no unexpected roll flip along the curve."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The target remains framed at all five checkpoints"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "There is no unexpected roll flip along the curve"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a separate target empty instead of hand-keying every camera rotation."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-mechanical-linkage",
    "title": "Animate a constrained mechanical linkage",
    "summary": "Two generic bars, three pivot markers and a 90 degree driver motion. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Constraints control transforms through relationships with targets and limits.",
        "sourceIds": [
          "spatial-constraints"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-constraints",
        "title": "Constraints",
        "url": "https://docs.blender.org/manual/en/4.5/animation/constraints/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Two generic bars, three pivot markers and a 90 degree driver motion.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent mechanical linkage workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Two generic bars, three pivot markers and a 90 degree driver motion. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Place pivot origins from the dimension table and preserve bar lengths",
      "Drive one angle and constrain the dependent pieces without scaling them",
      "Sweep the motion and inspect unreachable or intersecting poses",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned animate a constrained mechanical linkage candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Bar lengths remain constant through the sweep",
      "Every sampled pivot pair remains coincident within the chosen tolerance",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A kinematic animation does not establish loads, torque or structural safety.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Solve a planar linkage before adding decorative geometry.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me animate a constrained mechanical linkage in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Two generic bars, three pivot markers and a 90 degree driver motion. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Bar lengths remain constant through the sweep; Every sampled pivot pair remains coincident within the chosen tolerance. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/mechanical-linkage.svg",
        "alt": "Illustrated procedure for animate a constrained mechanical linkage: Place pivot origins from the dimension table and preserve bar lengths → Drive one angle and constrain the dependent pieces without scaling them → Sweep the motion and inspect unreachable or intersecting poses",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Animate a constrained mechanical linkage. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Two generic bars, three pivot markers and a 90 degree driver motion"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Two generic bars, three pivot markers and a 90 degree driver motion Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Bar lengths remain constant through the sweep; Every sampled pivot pair remains coincident within the chosen tolerance."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Bar lengths remain constant through the sweep"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Every sampled pivot pair remains coincident within the chosen tolerance"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Solve a planar linkage before adding decorative geometry."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-crowd-variation",
    "title": "Create a bounded background crowd",
    "summary": "Three licensed animated characters, twelve positions and three phase offsets. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "InstancedMesh shares geometry/materials across multiple world transforms.",
        "sourceIds": [
          "spatial-instances"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-instances",
        "title": "InstancedMesh",
        "url": "https://threejs.org/docs/pages/InstancedMesh.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Three licensed animated characters, twelve positions and three phase offsets.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent crowd variation workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Three licensed animated characters, twelve positions and three phase offsets. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse source meshes and clips rather than creating twelve unique rigs",
      "Assign clip phase and scale from an explicit placement table",
      "Profile the actual crowd implementation; use a supported instancing or crowd system only where available",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a bounded background crowd candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Each character has a valid clip reference",
      "Animation memory and draw calls are measured in the complete scene",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Crowd animation support and skinning costs vary between runtimes.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Static InstancedMesh is not a drop-in solution for arbitrary skinned characters.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a bounded background crowd in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Three licensed animated characters, twelve positions and three phase offsets. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Each character has a valid clip reference; Animation memory and draw calls are measured in the complete scene. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/crowd-variation.svg",
        "alt": "Illustrated procedure for create a bounded background crowd: Reuse source meshes and clips rather than creating twelve unique rigs → Assign clip phase and scale from an explicit placement table → Profile the actual crowd implementation",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Create a bounded background crowd. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Three licensed animated characters, twelve positions and three phase offsets"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Three licensed animated characters, twelve positions and three phase offsets Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Each character has a valid clip reference; Animation memory and draw calls are measured in the complete scene."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Each character has a valid clip reference"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Animation memory and draw calls are measured in the complete scene"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Static InstancedMesh is not a drop-in solution for arbitrary skinned characters."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-flag-animation",
    "title": "Create a wind-driven flag loop candidate",
    "summary": "A 1 by 0.6 m flag, pinned pole edge and 120-frame trial. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cloth simulation includes pinned weights, collision settings and caches.",
        "sourceIds": [
          "spatial-cloth"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-cloth",
        "title": "Cloth",
        "url": "https://docs.blender.org/manual/en/4.5/physics/cloth/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 1 by 0.6 m flag, pinned pole edge and 120-frame trial.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent flag animation workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 1 by 0.6 m flag, pinned pole edge and 120-frame trial. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Subdivide a flat flag at a modest density and pin the pole-edge vertices",
      "Add bounded wind and cloth collision; cache the trial on an authorized machine",
      "Choose a segment with compatible endpoints or author a corrective blend before export",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a wind-driven flag loop candidate candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Pinned vertices remain attached to the pole",
      "The proposed loop has no sudden cloth shape jump",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A simulation cache does not automatically become a seamless loop or GLB animation.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A shorter low-resolution cache is easier to debug than a full-quality simulation.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a wind-driven flag loop candidate in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 1 by 0.6 m flag, pinned pole edge and 120-frame trial. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Pinned vertices remain attached to the pole; The proposed loop has no sudden cloth shape jump. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/flag-animation.svg",
        "alt": "Illustrated procedure for create a wind-driven flag loop candidate: Subdivide a flat flag at a modest density and pin the pole-edge vertices → Add bounded wind and cloth collision → Choose a segment with compatible endpoints or author a corrective blend before export",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Create a wind-driven flag loop candidate. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 1 by 0.6 m flag, pinned pole edge and 120-frame trial"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 1 by 0.6 m flag, pinned pole edge and 120-frame trial Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Pinned vertices remain attached to the pole; The proposed loop has no sudden cloth shape jump."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Pinned vertices remain attached to the pole"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The proposed loop has no sudden cloth shape jump"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A shorter low-resolution cache is easier to debug than a full-quality simulation."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-hair-cards",
    "title": "Build a small hair-card style",
    "summary": "A head proxy, six card strips and a licensed hair alpha atlas. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "UV tools provide seams, unwrapping, island packing and texture-space editing.",
        "sourceIds": [
          "spatial-uv"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-uv",
        "title": "UV editing",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/meshes/uv/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A head proxy, six card strips and a licensed hair alpha atlas.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent hair cards workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A head proxy, six card strips and a licensed hair alpha atlas. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Place broad cards to establish the silhouette before adding small strands",
      "Map each strip to an atlas region and set a compatible alpha material",
      "Inspect the style from front, side and rear under the target runtime's sorting behavior",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a small hair-card style candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The skull is not exposed in the intended camera range",
      "Overlapping cards avoid obvious sorting flicker",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Hair cards are a real-time approximation, not strand-level grooming physics.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use silhouette cards sparingly and keep a simple fallback style.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a small hair-card style in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A head proxy, six card strips and a licensed hair alpha atlas. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The skull is not exposed in the intended camera range; Overlapping cards avoid obvious sorting flicker. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/hair-cards.svg",
        "alt": "Illustrated procedure for build a small hair-card style: Place broad cards to establish the silhouette before adding small strands → Map each strip to an atlas region and set a compatible alpha material → Inspect the style from front, side and rear under the target runtime's sorting behavior",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Build a small hair-card style. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A head proxy, six card strips and a licensed hair alpha atlas"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A head proxy, six card strips and a licensed hair alpha atlas Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The skull is not exposed in the intended camera range; Overlapping cards avoid obvious sorting flicker."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The skull is not exposed in the intended camera range"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Overlapping cards avoid obvious sorting flicker"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use silhouette cards sparingly and keep a simple fallback style."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-retarget-motion",
    "title": "Retarget a licensed motion clip",
    "summary": "Source and target rigs, one 2-second walk and an explicit bone mapping. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Armatures provide bones, posing and skinning for character animation.",
        "sourceIds": [
          "spatial-rig"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rig",
        "title": "Armatures",
        "url": "https://docs.blender.org/manual/en/4.5/animation/armatures/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Source and target rigs, one 2-second walk and an explicit bone mapping.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent retarget motion workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Source and target rigs, one 2-second walk and an explicit bone mapping. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Compare rest poses, units and root conventions before mapping bones",
      "Use the selected retargeting tool to create a separate target action",
      "Correct contacts and bake a candidate; compare hips, feet and hands at keyframes",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned retarget a licensed motion clip candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The target's feet reach the floor without changing body scale",
      "Root displacement matches the chosen in-place/root-motion convention",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Retargeting availability depends on the selected add-on or engine; Blender armatures alone do not imply automatic retargeting.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A small mapping table is easier to audit than automatic guesses.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me retarget a licensed motion clip in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Source and target rigs, one 2-second walk and an explicit bone mapping. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The target's feet reach the floor without changing body scale; Root displacement matches the chosen in-place/root-motion convention. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/retarget-motion.svg",
        "alt": "Illustrated procedure for retarget a licensed motion clip: Compare rest poses, units and root conventions before mapping bones → Use the selected retargeting tool to create a separate target action → Correct contacts and bake a candidate",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Retarget a licensed motion clip. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Source and target rigs, one 2-second walk and an explicit bone mapping"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Source and target rigs, one 2-second walk and an explicit bone mapping Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The target's feet reach the floor without changing body scale; Root displacement matches the chosen in-place/root-motion convention."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The target's feet reach the floor without changing body scale"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Root displacement matches the chosen in-place/root-motion convention"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A small mapping table is easier to audit than automatic guesses."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-assembly-explainer",
    "title": "Animate an assembly sequence with callouts",
    "summary": "A four-part generic lamp and a 10-second storyboard. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Constraints control transforms through relationships with targets and limits.",
        "sourceIds": [
          "spatial-constraints"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-constraints",
        "title": "Constraints",
        "url": "https://docs.blender.org/manual/en/4.5/animation/constraints/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A four-part generic lamp and a 10-second storyboard.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent assembly explainer workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A four-part generic lamp and a 10-second storyboard. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Define assembly order and collision-free paths for each semantic part",
      "Keyframe parts into their original transforms with pauses for callouts",
      "Review a low-cost viewport preview for legibility before using an authorized renderer",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned animate an assembly sequence with callouts candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Final transforms match the original assembly",
      "Callouts stay attached to the intended parts throughout the sequence",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "An assembly explainer may simplify real manufacturing steps and needs expert review.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Lock the narration beats before polishing interpolation.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me animate an assembly sequence with callouts in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A four-part generic lamp and a 10-second storyboard. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Final transforms match the original assembly; Callouts stay attached to the intended parts throughout the sequence. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/assembly-explainer.svg",
        "alt": "Illustrated procedure for animate an assembly sequence with callouts: Define assembly order and collision-free paths for each semantic part → Keyframe parts into their original transforms with pauses for callouts → Review a low-cost viewport preview for legibility before using an authorized renderer",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Animate an assembly sequence with callouts. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A four-part generic lamp and a 10-second storyboard"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A four-part generic lamp and a 10-second storyboard Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Final transforms match the original assembly; Callouts stay attached to the intended parts throughout the sequence."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Final transforms match the original assembly"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Callouts stay attached to the intended parts throughout the sequence"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Lock the narration beats before polishing interpolation."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-viseme-timing",
    "title": "Align authored mouth shapes to a speech track",
    "summary": "A consented 3-second voice clip and five existing mouth-shape targets. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Animation & characters",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Shape keys store alternate vertex positions for compatible mesh topology.",
        "sourceIds": [
          "spatial-shape"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-shape",
        "title": "Shape keys",
        "url": "https://docs.blender.org/manual/en/4.5/animation/shape_keys/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender animation / engine clips environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A consented 3-second voice clip and five existing mouth-shape targets.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent viseme timing workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A consented 3-second voice clip and five existing mouth-shape targets. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Create a timecoded phoneme/viseme proposal from the supplied transcript and audio",
      "Review timing by ear and map only to existing supported targets",
      "Keyframe overlapping shape weights and inspect closures for M/B/P sounds",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned align authored mouth shapes to a speech track candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Mouth closures align with the reviewed audio beats",
      "The neutral face returns after speech ends",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Audio analysis requires consent and does not establish identity or emotional state.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep transcript timing editable instead of baking an opaque generated face animation.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender animation / engine clips",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me align authored mouth shapes to a speech track in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A consented 3-second voice clip and five existing mouth-shape targets. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Mouth closures align with the reviewed audio beats; The neutral face returns after speech ends. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "animation",
      "categoryLabel": "Animation & characters",
      "tools": [
        "Blender animation",
        "engine clips"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/viseme-timing.svg",
        "alt": "Illustrated procedure for align authored mouth shapes to a speech track: Create a timecoded phoneme/viseme proposal from the supplied transcript and audio → Review timing by ear and map only to existing supported targets → Keyframe overlapping shape weights and inspect closures for M/B/P sounds",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender animation / engine clips with an optional authorized LLM client",
      "useWhen": "Align authored mouth shapes to a speech track. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A consented 3-second voice clip and five existing mouth-shape targets"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A consented 3-second voice clip and five existing mouth-shape targets Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Mouth closures align with the reviewed audio beats; The neutral face returns after speech ends."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Mouth closures align with the reviewed audio beats"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The neutral face returns after speech ends"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep transcript timing editable instead of baking an opaque generated face animation."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-rigid-stack",
    "title": "Test a small rigid-body stack",
    "summary": "Five 0.2 m cubes, a passive floor and a 120-frame trial. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Rigid-body workflows include collision shapes, constraints and simulation caches.",
        "sourceIds": [
          "spatial-rigid"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rigid",
        "title": "Rigid body",
        "url": "https://docs.blender.org/manual/en/4.5/physics/rigid_body/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Five 0.2 m cubes, a passive floor and a 120-frame trial.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent rigid stack workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Five 0.2 m cubes, a passive floor and a 120-frame trial. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Apply scale and assign simple collision shapes with recorded mass values",
      "Stack cubes with a small clear separation and run the low-cost cache",
      "Compare settling with a smaller time step before accepting the visual motion",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned test a small rigid-body stack candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Cubes do not tunnel through the floor",
      "The stack's final pose is stable under the selected repeat-run conditions",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A stable artistic stack does not validate real material properties.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use simple collision shapes before increasing solver settings.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me test a small rigid-body stack in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Five 0.2 m cubes, a passive floor and a 120-frame trial. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Cubes do not tunnel through the floor; The stack's final pose is stable under the selected repeat-run conditions. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/rigid-stack.svg",
        "alt": "Illustrated procedure for test a small rigid-body stack: Apply scale and assign simple collision shapes with recorded mass values → Stack cubes with a small clear separation and run the low-cost cache → Compare settling with a smaller time step before accepting the visual motion",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Test a small rigid-body stack. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Five 0.2 m cubes, a passive floor and a 120-frame trial"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Five 0.2 m cubes, a passive floor and a 120-frame trial Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Cubes do not tunnel through the floor; The stack's final pose is stable under the selected repeat-run conditions."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Cubes do not tunnel through the floor"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The stack's final pose is stable under the selected repeat-run conditions"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use simple collision shapes before increasing solver settings."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-domino-chain",
    "title": "Find a reliable domino spacing",
    "summary": "Ten 0.1 m dominoes with 0.04 m trial spacing. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Rigid-body workflows include collision shapes, constraints and simulation caches.",
        "sourceIds": [
          "spatial-rigid"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rigid",
        "title": "Rigid body",
        "url": "https://docs.blender.org/manual/en/4.5/physics/rigid_body/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Ten 0.1 m dominoes with 0.04 m trial spacing.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent domino chain workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Ten 0.1 m dominoes with 0.04 m trial spacing. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Create linked geometry with separate rigid-body transforms and consistent origins",
      "Add one controlled initial push and cache a short trial",
      "Compare three spacings while changing no other parameter; record the last fallen index",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned find a reliable domino spacing candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The chain falls in the intended order",
      "The result table preserves failed spacings as well as successful ones",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This is a visual parameter study, not a validated contact mechanics experiment.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Vary spacing first, then friction or solver settings.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me find a reliable domino spacing in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Ten 0.1 m dominoes with 0.04 m trial spacing. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The chain falls in the intended order; The result table preserves failed spacings as well as successful ones. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/domino-chain.svg",
        "alt": "Illustrated procedure for find a reliable domino spacing: Create linked geometry with separate rigid-body transforms and consistent origins → Add one controlled initial push and cache a short trial → Compare three spacings while changing no other parameter",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Find a reliable domino spacing. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Ten 0.1 m dominoes with 0.04 m trial spacing"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Ten 0.1 m dominoes with 0.04 m trial spacing Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The chain falls in the intended order; The result table preserves failed spacings as well as successful ones."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The chain falls in the intended order"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The result table preserves failed spacings as well as successful ones"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Vary spacing first, then friction or solver settings."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-cloth-drape",
    "title": "Drape fabric over a measured table",
    "summary": "A 1.2 m cloth square, a 0.8 m table and pinned/no-pin trial variants. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cloth simulation includes pinned weights, collision settings and caches.",
        "sourceIds": [
          "spatial-cloth"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-cloth",
        "title": "Cloth",
        "url": "https://docs.blender.org/manual/en/4.5/physics/cloth/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 1.2 m cloth square, a 0.8 m table and pinned/no-pin trial variants.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent cloth drape workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 1.2 m cloth square, a 0.8 m table and pinned/no-pin trial variants. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Apply scene scale and keep the table collision proxy simpler than the render mesh",
      "Run a low-resolution cloth trial and inspect collision distance and self-intersections",
      "Increase resolution only after the silhouette and support contact are acceptable",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned drape fabric over a measured table candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The cloth remains outside the tabletop",
      "The drape is reproducible with the recorded mesh and cache settings",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The solver parameters do not automatically correspond to a measured real textile.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Evaluate cloth thickness separately from collision distance.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me drape fabric over a measured table in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 1.2 m cloth square, a 0.8 m table and pinned/no-pin trial variants. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The cloth remains outside the tabletop; The drape is reproducible with the recorded mesh and cache settings. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/cloth-drape.svg",
        "alt": "Illustrated procedure for drape fabric over a measured table: Apply scene scale and keep the table collision proxy simpler than the render mesh → Run a low-resolution cloth trial and inspect collision distance and self-intersections → Increase resolution only after the silhouette and support contact are acceptable",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Drape fabric over a measured table. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 1.2 m cloth square, a 0.8 m table and pinned/no-pin trial variants"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 1.2 m cloth square, a 0.8 m table and pinned/no-pin trial variants Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The cloth remains outside the tabletop; The drape is reproducible with the recorded mesh and cache settings."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The cloth remains outside the tabletop"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The drape is reproducible with the recorded mesh and cache settings"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Evaluate cloth thickness separately from collision distance."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-liquid-pour",
    "title": "Prototype a bounded liquid pour",
    "summary": "A 0.5 m domain, a cup proxy and a 48-frame inflow trial. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Fluid workflows distinguish liquid and gas domains, flows and effectors.",
        "sourceIds": [
          "spatial-fluid"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-fluid",
        "title": "Fluid simulation",
        "url": "https://docs.blender.org/manual/en/4.5/physics/fluid/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 0.5 m domain, a cup proxy and a 48-frame inflow trial.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent liquid pour workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 0.5 m domain, a cup proxy and a 48-frame inflow trial. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Set domain, liquid source and collision effector with consistent scale",
      "Bake a low-resolution data cache, then inspect containment before meshing",
      "Generate a surface candidate and compare at two domain resolutions",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned prototype a bounded liquid pour candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The cup's collision contains the intended liquid volume",
      "The cache covers every delivered frame without missing data",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The result is a visual fluid simulation without an engineering accuracy claim.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Start with a coarse domain and a short pour to control cost.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me prototype a bounded liquid pour in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 0.5 m domain, a cup proxy and a 48-frame inflow trial. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The cup's collision contains the intended liquid volume; The cache covers every delivered frame without missing data. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/liquid-pour.svg",
        "alt": "Illustrated procedure for prototype a bounded liquid pour: Set domain, liquid source and collision effector with consistent scale → Bake a low-resolution data cache, then inspect containment before meshing → Generate a surface candidate and compare at two domain resolutions",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Prototype a bounded liquid pour. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 0.5 m domain, a cup proxy and a 48-frame inflow trial"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 0.5 m domain, a cup proxy and a 48-frame inflow trial Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The cup's collision contains the intended liquid volume; The cache covers every delivered frame without missing data."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The cup's collision contains the intended liquid volume"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The cache covers every delivered frame without missing data"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Start with a coarse domain and a short pour to control cost."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-smoke-burst",
    "title": "Make a short gas simulation preview",
    "summary": "A 1 m gas domain, a 12-frame source pulse and a 72-frame preview. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Fluid workflows distinguish liquid and gas domains, flows and effectors.",
        "sourceIds": [
          "spatial-fluid"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-fluid",
        "title": "Fluid simulation",
        "url": "https://docs.blender.org/manual/en/4.5/physics/fluid/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 1 m gas domain, a 12-frame source pulse and a 72-frame preview.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent smoke burst workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 1 m gas domain, a 12-frame source pulse and a 72-frame preview. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Configure a gas domain and a bounded smoke source with explicit start/stop frames",
      "Cache at low resolution and inspect the domain boundary before adding detail",
      "Compare density and lighting under one fixed camera on an authorized renderer",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned make a short gas simulation preview candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Smoke does not clip unintentionally at the domain edge",
      "The source stops emitting after the specified pulse",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Smoke appearance is highly lighting-dependent and does not predict ventilation or exposure.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Record cache resolution and frame range beside the preview.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me make a short gas simulation preview in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 1 m gas domain, a 12-frame source pulse and a 72-frame preview. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Smoke does not clip unintentionally at the domain edge; The source stops emitting after the specified pulse. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/smoke-burst.svg",
        "alt": "Illustrated procedure for make a short gas simulation preview: Configure a gas domain and a bounded smoke source with explicit start/stop frames → Cache at low resolution and inspect the domain boundary before adding detail → Compare density and lighting under one fixed camera on an authorized renderer",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Make a short gas simulation preview. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 1 m gas domain, a 12-frame source pulse and a 72-frame preview"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 1 m gas domain, a 12-frame source pulse and a 72-frame preview Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Smoke does not clip unintentionally at the domain edge; The source stops emitting after the specified pulse."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Smoke does not clip unintentionally at the domain edge"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The source stops emitting after the specified pulse"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Record cache resolution and frame range beside the preview."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-soft-body-drop",
    "title": "Compare a soft-body drop against a rigid baseline",
    "summary": "A 0.3 m rounded cube dropped 0.5 m onto a passive plane. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Soft-body settings cover goals, edges, collision and solver behavior.",
        "sourceIds": [
          "spatial-soft"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-soft",
        "title": "Soft body",
        "url": "https://docs.blender.org/manual/en/4.5/physics/soft_body/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 0.3 m rounded cube dropped 0.5 m onto a passive plane.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent soft body drop workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 0.3 m rounded cube dropped 0.5 m onto a passive plane. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Preserve a rigid baseline and configure a separate soft-body candidate",
      "Set goal/edge behavior deliberately and record the solver settings",
      "Compare deformation, penetration and recovery over the same frame range",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare a soft-body drop against a rigid baseline candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The soft candidate does not pass through the plane",
      "The comparison identifies volume loss or unrecovered deformation",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A Blender soft body is not automatically a calibrated finite-element model.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep mesh density fixed while testing stiffness settings.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare a soft-body drop against a rigid baseline in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 0.3 m rounded cube dropped 0.5 m onto a passive plane. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The soft candidate does not pass through the plane; The comparison identifies volume loss or unrecovered deformation. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/soft-body-drop.svg",
        "alt": "Illustrated procedure for compare a soft-body drop against a rigid baseline: Preserve a rigid baseline and configure a separate soft-body candidate → Set goal/edge behavior deliberately and record the solver settings → Compare deformation, penetration and recovery over the same frame range",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Compare a soft-body drop against a rigid baseline. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 0.3 m rounded cube dropped 0.5 m onto a passive plane"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 0.3 m rounded cube dropped 0.5 m onto a passive plane Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The soft candidate does not pass through the plane; The comparison identifies volume loss or unrecovered deformation."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The soft candidate does not pass through the plane"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The comparison identifies volume loss or unrecovered deformation"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep mesh density fixed while testing stiffness settings."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-flock-path",
    "title": "Create a constrained flock visual",
    "summary": "Twenty low-detail birds, a goal marker and an obstacle volume. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Boid particles follow configured rules for flock-like motion.",
        "sourceIds": [
          "spatial-boids"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-boids",
        "title": "Boids",
        "url": "https://docs.blender.org/manual/en/4.5/physics/particles/emitter/physics/boids.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Twenty low-detail birds, a goal marker and an obstacle volume.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent flock path workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Twenty low-detail birds, a goal marker and an obstacle volume. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Build a small particle/boid trial using explicit goal and avoidance rules",
      "Preview with proxy geometry and inspect the obstacle clearance",
      "Replace proxies with approved instances and keep the simulation cache separate",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a constrained flock visual candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Bird centers remain outside the intended obstacle region",
      "No unexplained speed spikes dominate the shot",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Legacy particle availability depends on Blender version; check the pinned environment.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Inspect the particle path before adding wings or motion blur.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a constrained flock visual in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Twenty low-detail birds, a goal marker and an obstacle volume. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Bird centers remain outside the intended obstacle region; No unexplained speed spikes dominate the shot. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/flock-path.svg",
        "alt": "Illustrated procedure for create a constrained flock visual: Build a small particle/boid trial using explicit goal and avoidance rules → Preview with proxy geometry and inspect the obstacle clearance → Replace proxies with approved instances and keep the simulation cache separate",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Create a constrained flock visual. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Twenty low-detail birds, a goal marker and an obstacle volume"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Twenty low-detail birds, a goal marker and an obstacle volume Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Bird centers remain outside the intended obstacle region; No unexplained speed spikes dominate the shot."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Bird centers remain outside the intended obstacle region"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "No unexplained speed spikes dominate the shot"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Inspect the particle path before adding wings or motion blur."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-pendulum-study",
    "title": "Compare an animated pendulum with an analytical period",
    "summary": "A 1 m pendulum, small initial angle and gravity 9.81 m/s². An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Rigid-body workflows include collision shapes, constraints and simulation caches.",
        "sourceIds": [
          "spatial-rigid"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rigid",
        "title": "Rigid body",
        "url": "https://docs.blender.org/manual/en/4.5/physics/rigid_body/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 1 m pendulum, small initial angle and gravity 9.81 m/s².",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent pendulum study workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 1 m pendulum, small initial angle and gravity 9.81 m/s². Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Build a hinge-constrained rigid pendulum with a documented pivot and mass center",
      "Record successive crossing times from the simulated angle series",
      "Compare the small-angle period to 2*pi*sqrt(L/g) and repeat with a smaller time step",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare an animated pendulum with an analytical period candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The period comparison reports numerical error explicitly",
      "Halving the time step does not create unexplained drift",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A visual match does not validate friction, bearing losses or large-angle behavior.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep the initial angle small when using the small-angle reference.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare an animated pendulum with an analytical period in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 1 m pendulum, small initial angle and gravity 9.81 m/s². Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The period comparison reports numerical error explicitly; Halving the time step does not create unexplained drift. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/pendulum-study.svg",
        "alt": "Illustrated procedure for compare an animated pendulum with an analytical period: Build a hinge-constrained rigid pendulum with a documented pivot and mass center → Record successive crossing times from the simulated angle series → Compare the small-angle period to 2*pi*sqrt(L/g) and repeat with a smaller time step",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Compare an animated pendulum with an analytical period. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 1 m pendulum, small initial angle and gravity 9.81 m/s²"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 1 m pendulum, small initial angle and gravity 9.81 m/s² Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The period comparison reports numerical error explicitly; Halving the time step does not create unexplained drift."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The period comparison reports numerical error explicitly"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Halving the time step does not create unexplained drift"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep the initial angle small when using the small-angle reference."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-robot-reach",
    "title": "Visualize a robot arm's sampled reach",
    "summary": "A licensed MuJoCo arm model, joint limits and 100 sampled configurations. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "MuJoCo simulates articulated structures interacting through contact.",
        "sourceIds": [
          "spatial-mujoco"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-mujoco",
        "title": "MuJoCo overview",
        "url": "https://mujoco.readthedocs.io/en/stable/overview.html",
        "publisher": "Google DeepMind / MuJoCo contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed MuJoCo arm model, joint limits and 100 sampled configurations.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent robot reach workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed MuJoCo arm model, joint limits and 100 sampled configurations. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Load the existing model and inspect joint axes, limits and link units",
      "Sample configurations inside limits and record end-effector positions",
      "Visualize the points in Blender or a web viewer while preserving solver coordinates",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned visualize a robot arm's sampled reach candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every sample stays within the declared joint limits",
      "A known reference pose maps to the expected endpoint",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Kinematic reach does not prove collision-free paths, payload or real robot safety.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Treat a sampled cloud as a lower-coverage illustration, not the full reachable volume.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me visualize a robot arm's sampled reach in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed MuJoCo arm model, joint limits and 100 sampled configurations. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every sample stays within the declared joint limits; A known reference pose maps to the expected endpoint. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/robot-reach.svg",
        "alt": "Illustrated procedure for visualize a robot arm's sampled reach: Load the existing model and inspect joint axes, limits and link units → Sample configurations inside limits and record end-effector positions → Visualize the points in Blender or a web viewer while preserving solver coordinates",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Visualize a robot arm's sampled reach. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed MuJoCo arm model, joint limits and 100 sampled configurations"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed MuJoCo arm model, joint limits and 100 sampled configurations Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every sample stays within the declared joint limits; A known reference pose maps to the expected endpoint."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every sample stays within the declared joint limits"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A known reference pose maps to the expected endpoint"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Treat a sampled cloud as a lower-coverage illustration, not the full reachable volume."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-gripper-contact",
    "title": "Run a toy gripper contact experiment",
    "summary": "A generic two-finger gripper, one box and three friction trials. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Physics & simulation",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "MuJoCo simulates articulated structures interacting through contact.",
        "sourceIds": [
          "spatial-mujoco"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-mujoco",
        "title": "MuJoCo overview",
        "url": "https://mujoco.readthedocs.io/en/stable/overview.html",
        "publisher": "Google DeepMind / MuJoCo contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / MuJoCo environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A generic two-finger gripper, one box and three friction trials.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent gripper contact workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A generic two-finger gripper, one box and three friction trials. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse a documented MuJoCo model and name the contact bodies explicitly",
      "Run a bounded close-and-lift sequence with fixed initial conditions",
      "Log contact forces, object slip and lift height before visualizing the replay",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned run a toy gripper contact experiment candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The recorded object height agrees with the replayed trajectory",
      "Failed grasps remain in the results instead of being removed",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Simulation cannot authorize operation of a physical robot or certify a safe grasp.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Inspect solver warnings and time-step sensitivity before interpreting force values.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / MuJoCo",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me run a toy gripper contact experiment in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A generic two-finger gripper, one box and three friction trials. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The recorded object height agrees with the replayed trajectory; Failed grasps remain in the results instead of being removed. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "simulation",
      "categoryLabel": "Physics & simulation",
      "tools": [
        "Blender",
        "MuJoCo"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/gripper-contact.svg",
        "alt": "Illustrated procedure for run a toy gripper contact experiment: Reuse a documented MuJoCo model and name the contact bodies explicitly → Run a bounded close-and-lift sequence with fixed initial conditions → Log contact forces, object slip and lift height before visualizing the replay",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / MuJoCo with an optional authorized LLM client",
      "useWhen": "Run a toy gripper contact experiment. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A generic two-finger gripper, one box and three friction trials"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A generic two-finger gripper, one box and three friction trials Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The recorded object height agrees with the replayed trajectory; Failed grasps remain in the results instead of being removed."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The recorded object height agrees with the replayed trajectory"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Failed grasps remain in the results instead of being removed"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Inspect solver warnings and time-step sensitivity before interpreting force values."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-floorplan-room",
    "title": "Build a room from a dimensioned floor plan",
    "summary": "An owned plan, one 4 m reference wall and a 2.7 m ceiling. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: An owned plan, one 4 m reference wall and a 2.7 m ceiling.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent floorplan room workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: An owned plan, one 4 m reference wall and a 2.7 m ceiling. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Calibrate the plan image against the reference wall and record the image scale",
      "Build wall centerlines, thicknesses and openings from explicit dimensions",
      "Compare three independent plan dimensions and inspect a human-height walkthrough",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a room from a dimensioned floor plan candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All three dimensions agree with the source tolerance",
      "Doors and windows correspond to the intended plan openings",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A visualization model is not construction documentation or a survey.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep uncertain dimensions visibly unresolved instead of estimating them silently.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a room from a dimensioned floor plan in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: An owned plan, one 4 m reference wall and a 2.7 m ceiling. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All three dimensions agree with the source tolerance; Doors and windows correspond to the intended plan openings. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/floorplan-room.svg",
        "alt": "Illustrated procedure for build a room from a dimensioned floor plan: Calibrate the plan image against the reference wall and record the image scale → Build wall centerlines, thicknesses and openings from explicit dimensions → Compare three independent plan dimensions and inspect a human-height walkthrough",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Build a room from a dimensioned floor plan. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "An owned plan, one 4 m reference wall and a 2.7 m ceiling"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "An owned plan, one 4 m reference wall and a 2.7 m ceiling Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All three dimensions agree with the source tolerance; Doors and windows correspond to the intended plan openings."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All three dimensions agree with the source tolerance"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Doors and windows correspond to the intended plan openings"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep uncertain dimensions visibly unresolved instead of estimating them silently."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-daylight-comparison",
    "title": "Compare two daylight design options",
    "summary": "One room, two window options and a fixed sun direction/time label. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender light objects expose type, intensity and color controls.",
        "sourceIds": [
          "spatial-lighting"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-lighting",
        "title": "Lights",
        "url": "https://docs.blender.org/manual/en/4.5/render/lights/light_object.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One room, two window options and a fixed sun direction/time label.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent daylight comparison workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One room, two window options and a fixed sun direction/time label. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Duplicate the design option parameters while preserving the same camera and materials",
      "Set the lighting assumptions and color transform identically in both candidates",
      "Render only through an authorized workflow and compare shadow/brightness patterns side by side",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare two daylight design options candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Only the intended window geometry changes between candidates",
      "Captions state time, sun assumptions and exposure",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This illustrative comparison is not a daylight-factor or building-code assessment.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Lock exposure so auto-adjustment does not conceal the design difference.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare two daylight design options in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One room, two window options and a fixed sun direction/time label. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Only the intended window geometry changes between candidates; Captions state time, sun assumptions and exposure. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/daylight-comparison.svg",
        "alt": "Illustrated procedure for compare two daylight design options: Duplicate the design option parameters while preserving the same camera and materials → Set the lighting assumptions and color transform identically in both candidates → Render only through an authorized workflow and compare shadow/brightness patterns side by side",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Compare two daylight design options. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One room, two window options and a fixed sun direction/time label"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One room, two window options and a fixed sun direction/time label Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Only the intended window geometry changes between candidates; Captions state time, sun assumptions and exposure."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Only the intended window geometry changes between candidates"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Captions state time, sun assumptions and exposure"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Lock exposure so auto-adjustment does not conceal the design difference."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-retail-layout",
    "title": "Compare shelf layouts with product proxies",
    "summary": "A 10 by 8 m shop, four shelves and a marked circulation route. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "InstancedMesh shares geometry/materials across multiple world transforms.",
        "sourceIds": [
          "spatial-instances"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-instances",
        "title": "InstancedMesh",
        "url": "https://threejs.org/docs/pages/InstancedMesh.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A 10 by 8 m shop, four shelves and a marked circulation route.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent retail layout workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A 10 by 8 m shop, four shelves and a marked circulation route. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse approved shelf and product proxies; place from a layout table",
      "Keep aisle envelopes visible as separate non-rendered guides",
      "Compare two layouts from entry and cashier viewpoints, then walk the route",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare shelf layouts with product proxies candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The marked circulation envelope remains unobstructed",
      "The product count is identical across layout alternatives",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Accessibility, fire and merchandising compliance need their own qualified review.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep stock count constant to avoid misleading density comparisons.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare shelf layouts with product proxies in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A 10 by 8 m shop, four shelves and a marked circulation route. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The marked circulation envelope remains unobstructed; The product count is identical across layout alternatives. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/retail-layout.svg",
        "alt": "Illustrated procedure for compare shelf layouts with product proxies: Reuse approved shelf and product proxies → Keep aisle envelopes visible as separate non-rendered guides → Compare two layouts from entry and cashier viewpoints, then walk the route",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Compare shelf layouts with product proxies. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A 10 by 8 m shop, four shelves and a marked circulation route"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A 10 by 8 m shop, four shelves and a marked circulation route Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The marked circulation envelope remains unobstructed; The product count is identical across layout alternatives."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The marked circulation envelope remains unobstructed"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The product count is identical across layout alternatives"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep stock count constant to avoid misleading density comparisons."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-museum-story-room",
    "title": "Compose a museum room around a narrative",
    "summary": "Six owned objects, three story chapters and one existing room runtime. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cameras define the view and projection used to frame a scene.",
        "sourceIds": [
          "spatial-camera"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-camera",
        "title": "Cameras",
        "url": "https://docs.blender.org/manual/en/4.5/render/cameras.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Six owned objects, three story chapters and one existing room runtime.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent museum story room workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Six owned objects, three story chapters and one existing room runtime. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the room entrance and available display supports before adding new props",
      "Place objects by story chapter with measured sightlines and label positions",
      "Review the route from entrance to exit and keep a simple text alternative to each exhibit",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compose a museum room around a narrative candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every object has a readable label and provenance link",
      "The route does not require camera teleportation to understand chapter order",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A static gallery asset does not preserve the original runtime's interactions.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use the existing KONA/Studio room conventions when adapting private projects.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compose a museum room around a narrative in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Six owned objects, three story chapters and one existing room runtime. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every object has a readable label and provenance link; The route does not require camera teleportation to understand chapter order. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/museum-story-room.svg",
        "alt": "Illustrated procedure for compose a museum room around a narrative: Reuse the room entrance and available display supports before adding new props → Place objects by story chapter with measured sightlines and label positions → Review the route from entrance to exit and keep a simple text alternative to each exhibit",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Compose a museum room around a narrative. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Six owned objects, three story chapters and one existing room runtime"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Six owned objects, three story chapters and one existing room runtime Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every object has a readable label and provenance link; The route does not require camera teleportation to understand chapter order."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every object has a readable label and provenance link"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The route does not require camera teleportation to understand chapter order"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use the existing KONA/Studio room conventions when adapting private projects."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-product-configurator",
    "title": "Build a finish-and-part product configurator",
    "summary": "One generic lamp, two shades and three material finishes. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "GLTFLoader loads glTF assets; compressed features can require configured decoders.",
        "sourceIds": [
          "spatial-web"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-web",
        "title": "GLTFLoader",
        "url": "https://threejs.org/docs/pages/GLTFLoader.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One generic lamp, two shades and three material finishes.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent product configurator workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One generic lamp, two shades and three material finishes. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Keep the base assembly and part anchors stable; define allowed combinations in data",
      "Load approved parts once and switch visibility/materials through the existing runtime",
      "Test all six combinations and reset without accumulating duplicate meshes",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a finish-and-part product configurator candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every allowed combination has a valid part/finish mapping",
      "Reset restores the documented default and original camera",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The configurator does not prove stock availability or manufacturing compatibility.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Reuse existing semantic anchors rather than hard-coding world coordinates.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a finish-and-part product configurator in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One generic lamp, two shades and three material finishes. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every allowed combination has a valid part/finish mapping; Reset restores the documented default and original camera. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/product-configurator.svg",
        "alt": "Illustrated procedure for build a finish-and-part product configurator: Keep the base assembly and part anchors stable → Load approved parts once and switch visibility/materials through the existing runtime → Test all six combinations and reset without accumulating duplicate meshes",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Build a finish-and-part product configurator. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One generic lamp, two shades and three material finishes"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One generic lamp, two shades and three material finishes Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every allowed combination has a valid part/finish mapping; Reset restores the documented default and original camera."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every allowed combination has a valid part/finish mapping"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Reset restores the documented default and original camera"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Reuse existing semantic anchors rather than hard-coding world coordinates."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-packshot-turntable",
    "title": "Plan a consistent product turntable",
    "summary": "One approved product, 36 views and a fixed 50 mm perspective camera. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cameras define the view and projection used to frame a scene.",
        "sourceIds": [
          "spatial-camera"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-camera",
        "title": "Cameras",
        "url": "https://docs.blender.org/manual/en/4.5/render/cameras.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One approved product, 36 views and a fixed 50 mm perspective camera.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent packshot turntable workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One approved product, 36 views and a fixed 50 mm perspective camera. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Place the product at its review anchor and fit one camera to the maximum silhouette",
      "Rotate a parent empty in 10-degree steps while keeping lighting and exposure fixed",
      "Render through an authorized machine and inspect the full frame sequence before packaging",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned plan a consistent product turntable candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All 36 views keep the product inside the agreed safe frame",
      "The first and final displayed sequence join without a duplicate pause",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "No render is implied until an actual output receipt and images exist.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep the camera fixed; rotating lights would undermine material comparisons.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me plan a consistent product turntable in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One approved product, 36 views and a fixed 50 mm perspective camera. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All 36 views keep the product inside the agreed safe frame; The first and final displayed sequence join without a duplicate pause. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/packshot-turntable.svg",
        "alt": "Illustrated procedure for plan a consistent product turntable: Place the product at its review anchor and fit one camera to the maximum silhouette → Rotate a parent empty in 10-degree steps while keeping lighting and exposure fixed → Render through an authorized machine and inspect the full frame sequence before packaging",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Plan a consistent product turntable. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One approved product, 36 views and a fixed 50 mm perspective camera"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One approved product, 36 views and a fixed 50 mm perspective camera Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All 36 views keep the product inside the agreed safe frame; The first and final displayed sequence join without a duplicate pause."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All 36 views keep the product inside the agreed safe frame"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The first and final displayed sequence join without a duplicate pause"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep the camera fixed; rotating lights would undermine material comparisons."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-assembly-clearance",
    "title": "Show an assembly clearance envelope",
    "summary": "Two generic mating parts and a 2 mm proposed clearance envelope. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Modifiers change evaluated geometry through an editable operation stack.",
        "sourceIds": [
          "spatial-modifiers"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-modifiers",
        "title": "Mesh modifiers",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/modifiers/introduction.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Two generic mating parts and a 2 mm proposed clearance envelope.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent assembly clearance workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Two generic mating parts and a 2 mm proposed clearance envelope. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Preserve original part geometry and generate a visibly distinct clearance proxy",
      "Move the insertion candidate along an explicit path and inspect sampled cross sections",
      "Report geometric intersections and unresolved tolerance assumptions in a review table",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned show an assembly clearance envelope candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The proxy is excluded from the final product render/export",
      "The report names the first intersecting sampled pose",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Mesh intersection checks do not certify engineering tolerances or assembly feasibility.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use section views to reveal hidden conflicts instead of relying on a single hero view.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me show an assembly clearance envelope in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Two generic mating parts and a 2 mm proposed clearance envelope. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The proxy is excluded from the final product render/export; The report names the first intersecting sampled pose. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/assembly-clearance.svg",
        "alt": "Illustrated procedure for show an assembly clearance envelope: Preserve original part geometry and generate a visibly distinct clearance proxy → Move the insertion candidate along an explicit path and inspect sampled cross sections → Report geometric intersections and unresolved tolerance assumptions in a review table",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Show an assembly clearance envelope. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Two generic mating parts and a 2 mm proposed clearance envelope"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Two generic mating parts and a 2 mm proposed clearance envelope Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The proxy is excluded from the final product render/export; The report names the first intersecting sampled pose."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The proxy is excluded from the final product render/export"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The report names the first intersecting sampled pose"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use section views to reveal hidden conflicts instead of relying on a single hero view."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-acoustic-zones",
    "title": "Visualize an acoustic planning hypothesis",
    "summary": "A room, two speaker markers and hand-authored quiet/focus zones. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A room, two speaker markers and hand-authored quiet/focus zones.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent acoustic zones workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A room, two speaker markers and hand-authored quiet/focus zones. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Import the existing room and label the zones as planning assumptions",
      "Draw colored bounded volumes and source markers without claiming computed sound fields",
      "Compare furniture alternatives and export a legend plus the unresolved acoustic questions",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned visualize an acoustic planning hypothesis candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every zone is marked illustrative rather than measured",
      "The legend remains understandable without relying on color alone",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This diagram performs no acoustic propagation, reverberation or exposure calculation.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use patterns or labels alongside zone colors.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me visualize an acoustic planning hypothesis in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A room, two speaker markers and hand-authored quiet/focus zones. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every zone is marked illustrative rather than measured; The legend remains understandable without relying on color alone. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/acoustic-zones.svg",
        "alt": "Illustrated procedure for visualize an acoustic planning hypothesis: Import the existing room and label the zones as planning assumptions → Draw colored bounded volumes and source markers without claiming computed sound fields → Compare furniture alternatives and export a legend plus the unresolved acoustic questions",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Visualize an acoustic planning hypothesis. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A room, two speaker markers and hand-authored quiet/focus zones"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A room, two speaker markers and hand-authored quiet/focus zones Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every zone is marked illustrative rather than measured; The legend remains understandable without relying on color alone."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every zone is marked illustrative rather than measured"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The legend remains understandable without relying on color alone"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use patterns or labels alongside zone colors."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-accessibility-route",
    "title": "Review a route with dimensional proxies",
    "summary": "A room, user-supplied route requirements and a turning-envelope proxy. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Godot documents 3D scene formats, export conventions and import configuration.",
        "sourceIds": [
          "spatial-import"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-import",
        "title": "Importing 3D scenes",
        "url": "https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/index.html",
        "publisher": "Godot contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A room, user-supplied route requirements and a turning-envelope proxy.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent accessibility route workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A room, user-supplied route requirements and a turning-envelope proxy. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the supplied requirements and model their dimensions explicitly",
      "Move the route/turning proxy through entrances and around furniture",
      "Record clearances and conflicts at named checkpoints with screenshots or measurements",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned review a route with dimensional proxies candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every checkpoint retains its measured clearance and requirement source",
      "Conflicts remain open until a qualified reviewer resolves them",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The workflow assists review and does not certify legal accessibility compliance.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep jurisdiction-specific requirements separate from the geometry model.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me review a route with dimensional proxies in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A room, user-supplied route requirements and a turning-envelope proxy. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every checkpoint retains its measured clearance and requirement source; Conflicts remain open until a qualified reviewer resolves them. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/accessibility-route.svg",
        "alt": "Illustrated procedure for review a route with dimensional proxies: Inspect the supplied requirements and model their dimensions explicitly → Move the route/turning proxy through entrances and around furniture → Record clearances and conflicts at named checkpoints with screenshots or measurements",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Review a route with dimensional proxies. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A room, user-supplied route requirements and a turning-envelope proxy"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A room, user-supplied route requirements and a turning-envelope proxy Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every checkpoint retains its measured clearance and requirement source; Conflicts remain open until a qualified reviewer resolves them."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every checkpoint retains its measured clearance and requirement source"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Conflicts remain open until a qualified reviewer resolves them"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep jurisdiction-specific requirements separate from the geometry model."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-camera-match",
    "title": "Match a camera to a reference photograph",
    "summary": "One owned photograph, visible parallel lines and a known dimension. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Architecture & products",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cameras define the view and projection used to frame a scene.",
        "sourceIds": [
          "spatial-camera"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-camera",
        "title": "Cameras",
        "url": "https://docs.blender.org/manual/en/4.5/render/cameras.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Blender / Three.js environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One owned photograph, visible parallel lines and a known dimension.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent camera match workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One owned photograph, visible parallel lines and a known dimension. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Estimate perspective and camera orientation from reference lines using the chosen matching method",
      "Scale the scene from the known dimension without stretching geometry to fit",
      "Overlay a simple blockout and compare several edges away from the calibration point",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned match a camera to a reference photograph candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Independent reference edges align within a stated visual tolerance",
      "The known dimension remains unchanged after matching",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A single photograph cannot uniquely recover hidden geometry or exact depth.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A wide-angle image may need lens-distortion correction first.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Blender / Three.js",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me match a camera to a reference photograph in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One owned photograph, visible parallel lines and a known dimension. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Independent reference edges align within a stated visual tolerance; The known dimension remains unchanged after matching. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "visualization",
      "categoryLabel": "Architecture & products",
      "tools": [
        "Blender",
        "Three.js"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/camera-match.svg",
        "alt": "Illustrated procedure for match a camera to a reference photograph: Estimate perspective and camera orientation from reference lines using the chosen matching method → Scale the scene from the known dimension without stretching geometry to fit → Overlay a simple blockout and compare several edges away from the calibration point",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Blender / Three.js with an optional authorized LLM client",
      "useWhen": "Match a camera to a reference photograph. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One owned photograph, visible parallel lines and a known dimension"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One owned photograph, visible parallel lines and a known dimension Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Independent reference edges align within a stated visual tolerance; The known dimension remains unchanged after matching."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Independent reference edges align within a stated visual tolerance"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The known dimension remains unchanged after matching"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A wide-angle image may need lens-distortion correction first."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-solar-ephemeris",
    "title": "Visualize Solar System positions from ephemerides",
    "summary": "Sun, Earth and Mars vectors for one named UTC interval with an explicit center/frame. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Horizons provides dated ephemerides with configurable targets, centers and frames.",
        "sourceIds": [
          "spatial-horizons"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-horizons",
        "title": "Horizons manual",
        "url": "https://ssd.jpl.nasa.gov/horizons/manual.html",
        "publisher": "NASA JPL",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Sun, Earth and Mars vectors for one named UTC interval with an explicit center/frame.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent solar ephemeris workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Sun, Earth and Mars vectors for one named UTC interval with an explicit center/frame. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Choose the Horizons vector output, target IDs, center, reference frame and time scale deliberately",
      "Save the original query/result and convert distance/time units in a separate transformation table",
      "Animate the sampled positions in Blender or a web viewer with distance and radius scale factors labelled",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned visualize solar system positions from ephemerides candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "A sampled position matches the saved source vector after inverse scaling",
      "The caption distinguishes physical distance scale from exaggerated body radii",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A visualization is not a new orbital prediction; interpolation and display scaling can mislead.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep the epoch and time scale beside every exported trajectory.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me visualize solar system positions from ephemerides in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Sun, Earth and Mars vectors for one named UTC interval with an explicit center/frame. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: A sampled position matches the saved source vector after inverse scaling; The caption distinguishes physical distance scale from exaggerated body radii. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/solar-ephemeris.svg",
        "alt": "Illustrated procedure for visualize solar system positions from ephemerides: Choose the Horizons vector output, target IDs, center, reference frame and time scale deliberately → Save the original query/result and convert distance/time units in a separate transformation table → Animate the sampled positions in Blender or a web viewer with distance and radius scale factors labelled",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Visualize Solar System positions from ephemerides. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Sun, Earth and Mars vectors for one named UTC interval with an explicit center/frame"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Sun, Earth and Mars vectors for one named UTC interval with an explicit center/frame Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: A sampled position matches the saved source vector after inverse scaling; The caption distinguishes physical distance scale from exaggerated body radii."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "A sampled position matches the saved source vector after inverse scaling"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The caption distinguishes physical distance scale from exaggerated body radii"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep the epoch and time scale beside every exported trajectory."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-two-body-orbit",
    "title": "Compare an N-body orbit with a two-body reference",
    "summary": "A synthetic star/planet pair in declared units, one orbital period and two time steps. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "REBOUND numerically integrates gravitational particle motion with selectable integrators.",
        "sourceIds": [
          "spatial-rebound"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rebound",
        "title": "REBOUND N-body integration",
        "url": "https://rebound.hanno-rein.de/",
        "publisher": "REBOUND contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A synthetic star/planet pair in declared units, one orbital period and two time steps.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent two body orbit workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A synthetic star/planet pair in declared units, one orbital period and two time steps. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Initialize a small REBOUND system with explicit masses and initial state",
      "Integrate the same interval at two tolerances/time steps and save state plus energy diagnostics",
      "Plot the trajectory first, then animate the saved positions without recalculating gravity in Blender",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare an n-body orbit with a two-body reference candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The orbit closes within the chosen numerical tolerance",
      "Energy error and time-step sensitivity are reported rather than hidden",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This is a proposed numerical experiment; Sintra has not run or validated the integration.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a simple two-body problem before adding encounters or many particles.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare an n-body orbit with a two-body reference in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A synthetic star/planet pair in declared units, one orbital period and two time steps. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The orbit closes within the chosen numerical tolerance; Energy error and time-step sensitivity are reported rather than hidden. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/two-body-orbit.svg",
        "alt": "Illustrated procedure for compare an n-body orbit with a two-body reference: Initialize a small REBOUND system with explicit masses and initial state → Integrate the same interval at two tolerances/time steps and save state plus energy diagnostics → Plot the trajectory first, then animate the saved positions without recalculating gravity in Blender",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Compare an N-body orbit with a two-body reference. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A synthetic star/planet pair in declared units, one orbital period and two time steps"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A synthetic star/planet pair in declared units, one orbital period and two time steps Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The orbit closes within the chosen numerical tolerance; Energy error and time-step sensitivity are reported rather than hidden."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The orbit closes within the chosen numerical tolerance"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Energy error and time-step sensitivity are reported rather than hidden"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a simple two-body problem before adding encounters or many particles."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-star-catalog",
    "title": "Build a star field from a cited catalog sample",
    "summary": "A licensed catalog sample with RA, Dec, distance units and a stated epoch. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Astropy coordinates uses declared units and coordinate frames.",
        "sourceIds": [
          "spatial-astro"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-astro",
        "title": "Astronomical coordinate systems",
        "url": "https://docs.astropy.org/en/stable/coordinates/index.html",
        "publisher": "Astropy contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed catalog sample with RA, Dec, distance units and a stated epoch.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent star catalog workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed catalog sample with RA, Dec, distance units and a stated epoch. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect column units, missing distances and the catalog's coordinate frame/epoch",
      "Use Astropy coordinates to transform only supported positions; retain missing values explicitly",
      "Display points with separate brightness styling and a legend for distance scaling",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned build a star field from a cited catalog sample candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Three reference stars agree with independently checked transformed coordinates",
      "No missing distance is silently replaced by zero",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Apparent brightness, physical luminosity and display size are different quantities.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A sky-direction sphere is more honest than invented depth when distance is absent.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me build a star field from a cited catalog sample in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed catalog sample with RA, Dec, distance units and a stated epoch. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Three reference stars agree with independently checked transformed coordinates; No missing distance is silently replaced by zero. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/star-catalog.svg",
        "alt": "Illustrated procedure for build a star field from a cited catalog sample: Inspect column units, missing distances and the catalog's coordinate frame/epoch → Use Astropy coordinates to transform only supported positions → Display points with separate brightness styling and a legend for distance scaling",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Build a star field from a cited catalog sample. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed catalog sample with RA, Dec, distance units and a stated epoch"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed catalog sample with RA, Dec, distance units and a stated epoch Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Three reference stars agree with independently checked transformed coordinates; No missing distance is silently replaced by zero."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Three reference stars agree with independently checked transformed coordinates"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "No missing distance is silently replaced by zero"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A sky-direction sphere is more honest than invented depth when distance is absent."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-galactic-distance",
    "title": "Explain astronomical distance scales without distortion",
    "summary": "A small cited distance table from planets through nearby galaxies. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Astropy coordinates uses declared units and coordinate frames.",
        "sourceIds": [
          "spatial-astro"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-astro",
        "title": "Astronomical coordinate systems",
        "url": "https://docs.astropy.org/en/stable/coordinates/index.html",
        "publisher": "Astropy contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A small cited distance table from planets through nearby galaxies.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent galactic distance workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A small cited distance table from planets through nearby galaxies. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Normalize all distances into one declared physical unit and retain uncertainties",
      "Build separate linear and logarithmic display mappings with inverse functions",
      "Add scale labels and an accessible table; never blend mappings without a visible transition",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned explain astronomical distance scales without distortion candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Each plotted item round-trips through the inverse mapping",
      "The legend states that log spacing is not physical separation",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A logarithmic illustration cannot be used to measure travel distances by screen spacing.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use separate views for physical scale and readable labels.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me explain astronomical distance scales without distortion in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A small cited distance table from planets through nearby galaxies. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Each plotted item round-trips through the inverse mapping; The legend states that log spacing is not physical separation. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/galactic-distance.svg",
        "alt": "Illustrated procedure for explain astronomical distance scales without distortion: Normalize all distances into one declared physical unit and retain uncertainties → Build separate linear and logarithmic display mappings with inverse functions → Add scale labels and an accessible table",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Explain astronomical distance scales without distortion. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A small cited distance table from planets through nearby galaxies"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A small cited distance table from planets through nearby galaxies Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Each plotted item round-trips through the inverse mapping; The legend states that log spacing is not physical separation."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Each plotted item round-trips through the inverse mapping"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The legend states that log spacing is not physical separation"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use separate views for physical scale and readable labels."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-exoplanet-transit",
    "title": "Animate a synthetic exoplanet transit",
    "summary": "A toy star of radius 1, planet radius 0.1 and a central transit path. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "REBOUND numerically integrates gravitational particle motion with selectable integrators.",
        "sourceIds": [
          "spatial-rebound"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-rebound",
        "title": "REBOUND N-body integration",
        "url": "https://rebound.hanno-rein.de/",
        "publisher": "REBOUND contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A toy star of radius 1, planet radius 0.1 and a central transit path.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent exoplanet transit workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A toy star of radius 1, planet radius 0.1 and a central transit path. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Compute a clearly labelled simplified occultation series from an explicit geometric model",
      "Animate the planet and plot relative flux against the same saved times",
      "Compare full overlap against the toy depth approximation (Rp/Rs)^2 while labelling omitted limb darkening",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned animate a synthetic exoplanet transit candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The toy full-transit depth is 0.01 under the stated uniform-star assumptions",
      "Animation and plotted flux use the same time index",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "No real exoplanet detection or parameter inference is performed.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Separate illustrative geometry from fitted observational parameters.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me animate a synthetic exoplanet transit in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A toy star of radius 1, planet radius 0.1 and a central transit path. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The toy full-transit depth is 0.01 under the stated uniform-star assumptions; Animation and plotted flux use the same time index. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/exoplanet-transit.svg",
        "alt": "Illustrated procedure for animate a synthetic exoplanet transit: Compute a clearly labelled simplified occultation series from an explicit geometric model → Animate the planet and plot relative flux against the same saved times → Compare full overlap against the toy depth approximation (Rp/Rs)^2 while labelling omitted limb darkening",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Animate a synthetic exoplanet transit. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A toy star of radius 1, planet radius 0.1 and a central transit path"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A toy star of radius 1, planet radius 0.1 and a central transit path Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The toy full-transit depth is 0.01 under the stated uniform-star assumptions; Animation and plotted flux use the same time index."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The toy full-transit depth is 0.01 under the stated uniform-star assumptions"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Animation and plotted flux use the same time index"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Separate illustrative geometry from fitted observational parameters."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-asteroid-trajectory",
    "title": "Compare an asteroid trajectory with source dates",
    "summary": "One Horizons asteroid target, seven dated samples and an explicit observer/center. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Horizons provides dated ephemerides with configurable targets, centers and frames.",
        "sourceIds": [
          "spatial-horizons"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-horizons",
        "title": "Horizons manual",
        "url": "https://ssd.jpl.nasa.gov/horizons/manual.html",
        "publisher": "NASA JPL",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One Horizons asteroid target, seven dated samples and an explicit observer/center.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent asteroid trajectory workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One Horizons asteroid target, seven dated samples and an explicit observer/center. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Resolve the precise target identifier and retain the query's solution/date metadata",
      "Request vectors using one consistent center/frame and save the response unchanged",
      "Plot the sampled path with time labels and a stated interpolation policy",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare an asteroid trajectory with source dates candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Target ID and solution metadata survive into the published caption",
      "A known sample matches the saved vector after display conversion",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "This educational display is not an impact-risk assessment or an operational ephemeris service.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Do not mix observer apparent coordinates with Cartesian state vectors.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare an asteroid trajectory with source dates in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One Horizons asteroid target, seven dated samples and an explicit observer/center. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Target ID and solution metadata survive into the published caption; A known sample matches the saved vector after display conversion. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/asteroid-trajectory.svg",
        "alt": "Illustrated procedure for compare an asteroid trajectory with source dates: Resolve the precise target identifier and retain the query's solution/date metadata → Request vectors using one consistent center/frame and save the response unchanged → Plot the sampled path with time labels and a stated interpolation policy",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Compare an asteroid trajectory with source dates. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One Horizons asteroid target, seven dated samples and an explicit observer/center"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One Horizons asteroid target, seven dated samples and an explicit observer/center Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Target ID and solution metadata survive into the published caption; A known sample matches the saved vector after display conversion."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Target ID and solution metadata survive into the published caption"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A known sample matches the saved vector after display conversion"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Do not mix observer apparent coordinates with Cartesian state vectors."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-earth-terrain",
    "title": "Place a terrain tile on a geospatial globe",
    "summary": "One licensed georeferenced terrain/model tile, CRS and height datum metadata. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cesium ion tiles supported models for geospatial viewing.",
        "sourceIds": [
          "spatial-cesium"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-cesium",
        "title": "Tile 3D models",
        "url": "https://cesium.com/learn/3d-tiling/ion-tile-3d-models/",
        "publisher": "Cesium",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One licensed georeferenced terrain/model tile, CRS and height datum metadata.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent earth terrain workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One licensed georeferenced terrain/model tile, CRS and height datum metadata. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the tile's origin, coordinate reference system and height reference",
      "Use the selected geospatial tool's supported import/tiling path with explicit georeferencing",
      "Compare three known landmarks and record any vertical offset before adding a Blender-derived overlay",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned place a terrain tile on a geospatial globe candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Landmarks align horizontally within the declared source tolerance",
      "Height-datum differences are identified rather than visually hidden",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A good-looking globe overlay does not establish survey accuracy; hosted tiling may incur costs.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep local modeling coordinates separate from Earth-centered coordinates.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me place a terrain tile on a geospatial globe in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One licensed georeferenced terrain/model tile, CRS and height datum metadata. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Landmarks align horizontally within the declared source tolerance; Height-datum differences are identified rather than visually hidden. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/earth-terrain.svg",
        "alt": "Illustrated procedure for place a terrain tile on a geospatial globe: Inspect the tile's origin, coordinate reference system and height reference → Use the selected geospatial tool's supported import/tiling path with explicit georeferencing → Compare three known landmarks and record any vertical offset before adding a Blender-derived overlay",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Place a terrain tile on a geospatial globe. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One licensed georeferenced terrain/model tile, CRS and height datum metadata"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One licensed georeferenced terrain/model tile, CRS and height datum metadata Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Landmarks align horizontally within the declared source tolerance; Height-datum differences are identified rather than visually hidden."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Landmarks align horizontally within the declared source tolerance"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Height-datum differences are identified rather than visually hidden"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep local modeling coordinates separate from Earth-centered coordinates."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-satellite-groundtrack",
    "title": "Visualize a dated satellite ground track",
    "summary": "A supplied validated state-vector series, timestamps and Earth orientation assumptions. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Astropy coordinates uses declared units and coordinate frames.",
        "sourceIds": [
          "spatial-astro"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-astro",
        "title": "Astronomical coordinate systems",
        "url": "https://docs.astropy.org/en/stable/coordinates/index.html",
        "publisher": "Astropy contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A supplied validated state-vector series, timestamps and Earth orientation assumptions.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent satellite groundtrack workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A supplied validated state-vector series, timestamps and Earth orientation assumptions. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Preserve the original frame and time scale while checking the series metadata",
      "Transform through a supported time-aware frame conversion and derive latitude/longitude",
      "Draw the ground track with antimeridian splitting and show the source validity interval",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned visualize a dated satellite ground track candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The track does not draw a false line across the map at the antimeridian",
      "A reference timestamp agrees with the validated source position",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The workflow does not produce navigation-grade or operational satellite predictions.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use a validated propagator upstream; Astropy coordinates alone are not an orbit propagator.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me visualize a dated satellite ground track in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A supplied validated state-vector series, timestamps and Earth orientation assumptions. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The track does not draw a false line across the map at the antimeridian; A reference timestamp agrees with the validated source position. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/satellite-groundtrack.svg",
        "alt": "Illustrated procedure for visualize a dated satellite ground track: Preserve the original frame and time scale while checking the series metadata → Transform through a supported time-aware frame conversion and derive latitude/longitude → Draw the ground track with antimeridian splitting and show the source validity interval",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Visualize a dated satellite ground track. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A supplied validated state-vector series, timestamps and Earth orientation assumptions"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A supplied validated state-vector series, timestamps and Earth orientation assumptions Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The track does not draw a false line across the map at the antimeridian; A reference timestamp agrees with the validated source position."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The track does not draw a false line across the map at the antimeridian"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A reference timestamp agrees with the validated source position"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use a validated propagator upstream; Astropy coordinates alone are not an orbit propagator."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-black-hole-illustration",
    "title": "Create a labelled black-hole concept illustration",
    "summary": "An artistic accretion disk, a central mask and a caption stating not ray-traced GR. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: An artistic accretion disk, a central mask and a caption stating not ray-traced GR.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent black hole illustration workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: An artistic accretion disk, a central mask and a caption stating not ray-traced GR. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Build the disk and central silhouette as separate procedural objects",
      "Add an illustrative warped band without labelling it a physical lensing solution",
      "Use callouts to distinguish authored appearance, known concepts and omitted relativistic calculations",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a labelled black-hole concept illustration candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The final caption explicitly identifies the image as illustrative",
      "No display parameter is presented as a measured black-hole property",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Blender distortion nodes and an LLM prompt do not solve general relativistic light transport.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use an actual scientific ray tracer and cited physical model if accuracy is required.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a labelled black-hole concept illustration in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: An artistic accretion disk, a central mask and a caption stating not ray-traced GR. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The final caption explicitly identifies the image as illustrative; No display parameter is presented as a measured black-hole property. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/black-hole-illustration.svg",
        "alt": "Illustrated procedure for create a labelled black-hole concept illustration: Build the disk and central silhouette as separate procedural objects → Add an illustrative warped band without labelling it a physical lensing solution → Use callouts to distinguish authored appearance, known concepts and omitted relativistic calculations",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Create a labelled black-hole concept illustration. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "An artistic accretion disk, a central mask and a caption stating not ray-traced GR"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "An artistic accretion disk, a central mask and a caption stating not ray-traced GR Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The final caption explicitly identifies the image as illustrative; No display parameter is presented as a measured black-hole property."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The final caption explicitly identifies the image as illustrative"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "No display parameter is presented as a measured black-hole property"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use an actual scientific ray tracer and cited physical model if accuracy is required."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-cosmic-web",
    "title": "Visualize a provided cosmological simulation snapshot",
    "summary": "A licensed snapshot extract with x/y/z, units, periodic-box size and a maximum 10000-point preview. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Space & scientific data",
      "Blender",
      "Skills",
      "Scientific visualization"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Three.js Points displays point geometry with a points material.",
        "sourceIds": [
          "spatial-points"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-points",
        "title": "Points",
        "url": "https://threejs.org/docs/pages/Points.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized NASA / Astropy / REBOUND → Blender or web environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed snapshot extract with x/y/z, units, periodic-box size and a maximum 10000-point preview.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent cosmic web workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed snapshot extract with x/y/z, units, periodic-box size and a maximum 10000-point preview. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the simulation's coordinate convention, epoch/redshift and sample-selection metadata",
      "Create a deterministic bounded point sample while preserving the original scientific values",
      "Display with an explicit density/color mapping and label any periodic wrapping",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned visualize a provided cosmological simulation snapshot candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The same sample seed selects the same particle IDs",
      "The visual legend retains units, epoch and selection limits",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "The viewer does not simulate cosmological evolution or validate the supplied scientific model.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Downsample deterministically before loading large simulation files into a browser.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "NASA / Astropy / REBOUND → Blender or web",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me visualize a provided cosmological simulation snapshot in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed snapshot extract with x/y/z, units, periodic-box size and a maximum 10000-point preview. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The same sample seed selects the same particle IDs; The visual legend retains units, epoch and selection limits. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "space",
      "categoryLabel": "Space & scientific data",
      "tools": [
        "NASA",
        "Astropy",
        "REBOUND → Blender or web"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/cosmic-web.svg",
        "alt": "Illustrated procedure for visualize a provided cosmological simulation snapshot: Inspect the simulation's coordinate convention, epoch/redshift and sample-selection metadata → Create a deterministic bounded point sample while preserving the original scientific values → Display with an explicit density/color mapping and label any periodic wrapping",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "NASA / Astropy / REBOUND → Blender or web with an optional authorized LLM client",
      "useWhen": "Visualize a provided cosmological simulation snapshot. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed snapshot extract with x/y/z, units, periodic-box size and a maximum 10000-point preview"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed snapshot extract with x/y/z, units, periodic-box size and a maximum 10000-point preview Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The same sample seed selects the same particle IDs; The visual legend retains units, epoch and selection limits."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The same sample seed selects the same particle IDs"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The visual legend retains units, epoch and selection limits"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Downsample deterministically before loading large simulation files into a browser."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-glb-viewer",
    "title": "Load a reviewed GLB in an existing web viewer",
    "summary": "One self-contained licensed GLB and the project's existing Three.js loader. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "GLTFLoader loads glTF assets; compressed features can require configured decoders.",
        "sourceIds": [
          "spatial-web"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-web",
        "title": "GLTFLoader",
        "url": "https://threejs.org/docs/pages/GLTFLoader.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One self-contained licensed GLB and the project's existing Three.js loader.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent glb viewer workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One self-contained licensed GLB and the project's existing Three.js loader. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the current viewer and reuse its GLTFLoader/decoder setup",
      "Load the model with an error state and fit the camera to its bounds",
      "Check scale, materials and animation in the actual deployed base path; dispose owned resources on replacement",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned load a reviewed glb in an existing web viewer candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The model loads on the deployed URL without missing relative resources",
      "Switching models repeatedly does not grow retained resources without explanation",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A loader success does not establish visual quality, rights or target-device performance.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use the existing viewer instead of embedding a second renderer.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me load a reviewed glb in an existing web viewer in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One self-contained licensed GLB and the project's existing Three.js loader. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The model loads on the deployed URL without missing relative resources; Switching models repeatedly does not grow retained resources without explanation. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/glb-viewer.svg",
        "alt": "Illustrated procedure for load a reviewed glb in an existing web viewer: Inspect the current viewer and reuse its GLTFLoader/decoder setup → Load the model with an error state and fit the camera to its bounds → Check scale, materials and animation in the actual deployed base path",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Load a reviewed GLB in an existing web viewer. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One self-contained licensed GLB and the project's existing Three.js loader"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One self-contained licensed GLB and the project's existing Three.js loader Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The model loads on the deployed URL without missing relative resources; Switching models repeatedly does not grow retained resources without explanation."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The model loads on the deployed URL without missing relative resources"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Switching models repeatedly does not grow retained resources without explanation"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use the existing viewer instead of embedding a second renderer."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-instanced-props",
    "title": "Instance repeated static props efficiently",
    "summary": "One static bench mesh and a table of 100 transforms. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "InstancedMesh shares geometry/materials across multiple world transforms.",
        "sourceIds": [
          "spatial-instances"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-instances",
        "title": "InstancedMesh",
        "url": "https://threejs.org/docs/pages/InstancedMesh.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One static bench mesh and a table of 100 transforms.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent instanced props workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One static bench mesh and a table of 100 transforms. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Group only compatible geometry/material pairs for instancing",
      "Set instance matrices and colors from the transform table; update bounds as required",
      "Compare the complete scene's draws and frame behavior against separate objects",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned instance repeated static props efficiently candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All 100 transforms match the input table",
      "Culling still works after a changed instance position",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Fewer draw calls do not alone prove faster end-to-end rendering.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Instancing is most useful when geometry and material are genuinely shared.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me instance repeated static props efficiently in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One static bench mesh and a table of 100 transforms. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All 100 transforms match the input table; Culling still works after a changed instance position. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/instanced-props.svg",
        "alt": "Illustrated procedure for instance repeated static props efficiently: Group only compatible geometry/material pairs for instancing → Set instance matrices and colors from the transform table → Compare the complete scene's draws and frame behavior against separate objects",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Instance repeated static props efficiently. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One static bench mesh and a table of 100 transforms"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One static bench mesh and a table of 100 transforms Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All 100 transforms match the input table; Culling still works after a changed instance position."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All 100 transforms match the input table"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Culling still works after a changed instance position"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Instancing is most useful when geometry and material are genuinely shared."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-object-picking",
    "title": "Add semantic object selection",
    "summary": "Three meshes with stable IDs and a details panel. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Raycaster computes ray intersections with supported scene objects.",
        "sourceIds": [
          "spatial-picking"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-picking",
        "title": "Raycaster",
        "url": "https://threejs.org/docs/pages/Raycaster.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Three meshes with stable IDs and a details panel.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent object picking workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Three meshes with stable IDs and a details panel. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the scene's Raycaster and map intersections to semantic parent IDs",
      "Ignore hidden/non-interactive helpers and handle overlapping hits deliberately",
      "Add keyboard-accessible list selection that opens the same details panel",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned add semantic object selection candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Selecting a child mesh resolves to the intended semantic object",
      "The same information is reachable without precise pointer use",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Geometric picking alone is not an accessible interaction design.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep semantic IDs separate from temporary mesh names.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me add semantic object selection in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Three meshes with stable IDs and a details panel. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Selecting a child mesh resolves to the intended semantic object; The same information is reachable without precise pointer use. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/object-picking.svg",
        "alt": "Illustrated procedure for add semantic object selection: Reuse the scene's Raycaster and map intersections to semantic parent IDs → Ignore hidden/non-interactive helpers and handle overlapping hits deliberately → Add keyboard-accessible list selection that opens the same details panel",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Add semantic object selection. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Three meshes with stable IDs and a details panel"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Three meshes with stable IDs and a details panel Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Selecting a child mesh resolves to the intended semantic object; The same information is reachable without precise pointer use."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Selecting a child mesh resolves to the intended semantic object"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The same information is reachable without precise pointer use"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep semantic IDs separate from temporary mesh names."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-ar-placement",
    "title": "Prototype surface placement in supported AR",
    "summary": "One metre-scaled model and an AR-capable device/browser. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Three.js documents enabling a WebXR VR rendering session.",
        "sourceIds": [
          "spatial-xr"
        ]
      },
      {
        "text": "The WebXR Hit Test draft describes placement against detected physical surfaces; device support and feature permissions are required.",
        "sourceIds": [
          "spatial-hit-test"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-xr",
        "title": "WebXR VR basics",
        "url": "https://threejs.org/manual/pages/webxr-basics.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-hit-test",
        "title": "WebXR Hit Test Module (Editors Draft)",
        "publisher": "W3C Immersive Web Working Group",
        "url": "https://immersive-web.github.io/hit-test/",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One metre-scaled model and an AR-capable device/browser.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent ar placement workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One metre-scaled model and an AR-capable device/browser. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Check the browser's supported immersive-ar and required hit-test features before starting",
      "Use the platform's documented hit-test path and place a single anchored candidate",
      "Show a manual fallback and test scale, reset and session exit on the real device",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned prototype surface placement in supported ar candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Unsupported devices receive a usable fallback",
      "Reset removes the placed candidate without leaving duplicate anchors",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "WebXR VR support does not imply AR hit-test support; this AR procedure needs platform-specific documentation and testing.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A desktop emulator cannot establish physical-device tracking quality.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me prototype surface placement in supported ar in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One metre-scaled model and an AR-capable device/browser. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Unsupported devices receive a usable fallback; Reset removes the placed candidate without leaving duplicate anchors. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/ar-placement.svg",
        "alt": "Illustrated procedure for prototype surface placement in supported ar: Check the browser's supported immersive-ar and required hit-test features before starting → Use the platform's documented hit-test path and place a single anchored candidate → Show a manual fallback and test scale, reset and session exit on the real device",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Prototype surface placement in supported AR. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One metre-scaled model and an AR-capable device/browser"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One metre-scaled model and an AR-capable device/browser Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Unsupported devices receive a usable fallback; Reset removes the placed candidate without leaving duplicate anchors."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Unsupported devices receive a usable fallback"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Reset removes the placed candidate without leaving duplicate anchors"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A desktop emulator cannot establish physical-device tracking quality."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-vr-room",
    "title": "Walk through an existing room in VR",
    "summary": "One reviewed room, two controller inputs and an XR-capable device. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Three.js documents enabling a WebXR VR rendering session.",
        "sourceIds": [
          "spatial-xr"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-xr",
        "title": "WebXR VR basics",
        "url": "https://threejs.org/manual/pages/webxr-basics.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One reviewed room, two controller inputs and an XR-capable device.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent vr room workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One reviewed room, two controller inputs and an XR-capable device. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the room's loader and enable the renderer's supported XR session path",
      "Define a bounded locomotion mode and inspect floor scale before entering the headset",
      "Test entry, recenter, exit and a non-XR fallback on the physical device",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned walk through an existing room in vr candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Session exit returns to an operable page",
      "The room scale and floor height match the intended user reference",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Comfort, accessibility and controller mappings require device/user testing.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Start with stationary viewing before adding locomotion.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me walk through an existing room in vr in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One reviewed room, two controller inputs and an XR-capable device. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Session exit returns to an operable page; The room scale and floor height match the intended user reference. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/vr-room.svg",
        "alt": "Illustrated procedure for walk through an existing room in vr: Reuse the room's loader and enable the renderer's supported XR session path → Define a bounded locomotion mode and inspect floor scale before entering the headset → Test entry, recenter, exit and a non-XR fallback on the physical device",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Walk through an existing room in VR. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One reviewed room, two controller inputs and an XR-capable device"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One reviewed room, two controller inputs and an XR-capable device Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Session exit returns to an operable page; The room scale and floor height match the intended user reference."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Session exit returns to an operable page"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The room scale and floor height match the intended user reference"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Start with stationary viewing before adding locomotion."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-first-person-room",
    "title": "Add a bounded first-person room tour",
    "summary": "An existing room, simple collision and a player capsule. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Godot documents 3D scene formats, export conventions and import configuration.",
        "sourceIds": [
          "spatial-import"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-import",
        "title": "Importing 3D scenes",
        "url": "https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/index.html",
        "publisher": "Godot contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: An existing room, simple collision and a player capsule.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent first person room workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: An existing room, simple collision and a player capsule. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the runtime's movement controller and separate collision mesh",
      "Set spawn and return anchors away from geometry intersections",
      "Test walls, stairs, reset and pointer/keyboard focus recovery",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned add a bounded first-person room tour candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The player cannot walk through the selected blocking walls",
      "Escape and reset restore visible controls",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A camera moving through geometry is not a tested collision controller.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep a non-pointer-lock alternative for touch and keyboard users.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me add a bounded first-person room tour in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: An existing room, simple collision and a player capsule. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The player cannot walk through the selected blocking walls; Escape and reset restore visible controls. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/first-person-room.svg",
        "alt": "Illustrated procedure for add a bounded first-person room tour: Reuse the runtime's movement controller and separate collision mesh → Set spawn and return anchors away from geometry intersections → Test walls, stairs, reset and pointer/keyboard focus recovery",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Add a bounded first-person room tour. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "An existing room, simple collision and a player capsule"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "An existing room, simple collision and a player capsule Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The player cannot walk through the selected blocking walls; Escape and reset restore visible controls."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The player cannot walk through the selected blocking walls"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Escape and reset restore visible controls"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep a non-pointer-lock alternative for touch and keyboard users."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-point-cloud-view",
    "title": "Display a bounded measured point cloud",
    "summary": "A licensed 10000-point sample with XYZ units and optional color. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Three.js Points displays point geometry with a points material.",
        "sourceIds": [
          "spatial-points"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-points",
        "title": "Points",
        "url": "https://threejs.org/docs/pages/Points.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A licensed 10000-point sample with XYZ units and optional color.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent point cloud view workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A licensed 10000-point sample with XYZ units and optional color. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Validate numeric values and center a display copy around a recorded local origin",
      "Create a BufferGeometry/Points representation without inventing surface triangles",
      "Add bounds, density controls and a text summary of sample size and units",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned display a bounded measured point cloud candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Invalid coordinates are reported and excluded explicitly",
      "The display transform can map a selected point back to its source row",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A point cloud is not a watertight mesh or a complete surface reconstruction.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use chunking or a dedicated point-cloud stack for larger captures.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me display a bounded measured point cloud in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A licensed 10000-point sample with XYZ units and optional color. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Invalid coordinates are reported and excluded explicitly; The display transform can map a selected point back to its source row. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/point-cloud-view.svg",
        "alt": "Illustrated procedure for display a bounded measured point cloud: Validate numeric values and center a display copy around a recorded local origin → Create a BufferGeometry/Points representation without inventing surface triangles → Add bounds, density controls and a text summary of sample size and units",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Display a bounded measured point cloud. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A licensed 10000-point sample with XYZ units and optional color"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A licensed 10000-point sample with XYZ units and optional color Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Invalid coordinates are reported and excluded explicitly; The display transform can map a selected point back to its source row."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Invalid coordinates are reported and excluded explicitly"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The display transform can map a selected point back to its source row"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use chunking or a dedicated point-cloud stack for larger captures."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-section-view",
    "title": "Create a reversible section cut",
    "summary": "One building mesh and a horizontal cut height of 1.2 m. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Three.js materials expose clipping-plane controls for compatible rendering paths.",
        "sourceIds": [
          "spatial-clip"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-clip",
        "title": "Clipping planes",
        "url": "https://threejs.org/docs/pages/Material.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One building mesh and a horizontal cut height of 1.2 m.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent section view workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One building mesh and a horizontal cut height of 1.2 m. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Use the existing material pipeline and configure a supported clipping plane",
      "Make cut height adjustable and keep clipping state out of the source mesh",
      "Provide a reset and explain whether open cut faces are capped or simply clipped",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a reversible section cut candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Reset restores the complete model without permanent geometry edits",
      "All participating materials obey the same cut plane",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A clipped view may expose hollow geometry and does not create a fabrication-ready section.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Cap rendering is a separate feature; do not imply it exists from clipping alone.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a reversible section cut in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One building mesh and a horizontal cut height of 1.2 m. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Reset restores the complete model without permanent geometry edits; All participating materials obey the same cut plane. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/section-view.svg",
        "alt": "Illustrated procedure for create a reversible section cut: Use the existing material pipeline and configure a supported clipping plane → Make cut height adjustable and keep clipping state out of the source mesh → Provide a reset and explain whether open cut faces are capped or simply clipped",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Create a reversible section cut. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One building mesh and a horizontal cut height of 1.2 m"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One building mesh and a horizontal cut height of 1.2 m Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Reset restores the complete model without permanent geometry edits; All participating materials obey the same cut plane."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Reset restores the complete model without permanent geometry edits"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "All participating materials obey the same cut plane"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Cap rendering is a separate feature; do not imply it exists from clipping alone."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-annotation-tour",
    "title": "Attach durable annotations to model parts",
    "summary": "Five semantic part IDs and authored explanatory text. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "GLTFLoader loads glTF assets; compressed features can require configured decoders.",
        "sourceIds": [
          "spatial-web"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-web",
        "title": "GLTFLoader",
        "url": "https://threejs.org/docs/pages/GLTFLoader.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Five semantic part IDs and authored explanatory text.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent annotation tour workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Five semantic part IDs and authored explanatory text. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Resolve existing semantic anchors instead of saving raw screen coordinates",
      "Place labels with occlusion behavior and a synchronized accessible list",
      "Test camera changes and a new finish variant without changing annotation identity",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned attach durable annotations to model parts candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All five labels remain attached to the intended parts",
      "Every label is available in the text list when occluded",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Mesh reauthoring can invalidate anchors and must trigger review.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Store IDs and local anchors in data, not brittle child-index paths.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me attach durable annotations to model parts in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Five semantic part IDs and authored explanatory text. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All five labels remain attached to the intended parts; Every label is available in the text list when occluded. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/annotation-tour.svg",
        "alt": "Illustrated procedure for attach durable annotations to model parts: Resolve existing semantic anchors instead of saving raw screen coordinates → Place labels with occlusion behavior and a synchronized accessible list → Test camera changes and a new finish variant without changing annotation identity",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Attach durable annotations to model parts. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Five semantic part IDs and authored explanatory text"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Five semantic part IDs and authored explanatory text Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All five labels remain attached to the intended parts; Every label is available in the text list when occluded."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All five labels remain attached to the intended parts"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Every label is available in the text list when occluded"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Store IDs and local anchors in data, not brittle child-index paths."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-panorama-tour",
    "title": "Connect licensed panoramas into a simple tour",
    "summary": "Three owned 360 panoramas, room names and transition hotspots. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Web, XR & interaction",
      "Blender",
      "Skills"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cameras define the view and projection used to frame a scene.",
        "sourceIds": [
          "spatial-camera"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-camera",
        "title": "Cameras",
        "url": "https://docs.blender.org/manual/en/4.5/render/cameras.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Three.js / WebXR environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Three owned 360 panoramas, room names and transition hotspots.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent panorama tour workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Three owned 360 panoramas, room names and transition hotspots. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Check horizon, orientation and privacy before using the images",
      "Create a node graph with explicit hotspot destinations and a labelled floor-plan alternative",
      "Test every transition, back navigation and loading/error state",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned connect licensed panoramas into a simple tour candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every hotspot opens the named destination without trapping navigation",
      "The floor-plan/text route reaches all three nodes",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A panorama tour permits node-based viewing, not arbitrary 3D movement or editable geometry.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep the graph in the existing room data model rather than duplicating routing.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Three.js / WebXR",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me connect licensed panoramas into a simple tour in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Three owned 360 panoramas, room names and transition hotspots. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every hotspot opens the named destination without trapping navigation; The floor-plan/text route reaches all three nodes. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "web-xr",
      "categoryLabel": "Web, XR & interaction",
      "tools": [
        "Three.js",
        "WebXR"
      ],
      "complexity": "Intermediate",
      "diagram": {
        "url": "/visuals/3d/panorama-tour.svg",
        "alt": "Illustrated procedure for connect licensed panoramas into a simple tour: Check horizon, orientation and privacy before using the images → Create a node graph with explicit hotspot destinations and a labelled floor-plan alternative → Test every transition, back navigation and loading/error state",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Three.js / WebXR with an optional authorized LLM client",
      "useWhen": "Connect licensed panoramas into a simple tour. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Three owned 360 panoramas, room names and transition hotspots"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Three owned 360 panoramas, room names and transition hotspots Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every hotspot opens the named destination without trapping navigation; The floor-plan/text route reaches all three nodes."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every hotspot opens the named destination without trapping navigation"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The floor-plan/text route reaches all three nodes"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep the graph in the existing room data model rather than duplicating routing."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-mcp-connection-audit",
    "title": "Inspect an existing Blender MCP connection",
    "summary": "One installed MCP entry, its exact package/add-on versions and an empty test scene. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "MCP for Blender is a community add-on/server integration, not Blender Foundation software.",
        "sourceIds": [
          "spatial-mcpblender"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-mcpblender",
        "title": "MCP for Blender maintainer README",
        "url": "https://github.com/ahujasid/mcp-for-blender",
        "publisher": "ahujasid and contributors (community)",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One installed MCP entry, its exact package/add-on versions and an empty test scene.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent mcp connection audit workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One installed MCP entry, its exact package/add-on versions and an empty test scene. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inventory the current client entry and Blender add-on before changing configuration",
      "Confirm the maintainer, transport, enabled integrations and available tools through the client's discovery view",
      "Request scene inspection first; review any proposed Python before running one bounded edit on a disposable scene",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned inspect an existing blender mcp connection candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Discovery identifies the expected server and add-on version",
      "The inspection request does not alter objects or enable external services",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Code execution reaches Blender's Python environment; MCP is not a sandbox or proof of safety.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "The current community package is mcp-for-blender; preserve a working legacy setup until deliberately migrating.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me inspect an existing blender mcp connection in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One installed MCP entry, its exact package/add-on versions and an empty test scene. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Discovery identifies the expected server and add-on version; The inspection request does not alter objects or enable external services. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/mcp-connection-audit.svg",
        "alt": "Illustrated procedure for inspect an existing blender mcp connection: Inventory the current client entry and Blender add-on before changing configuration → Confirm the maintainer, transport, enabled integrations and available tools through the client's discovery view → Request scene inspection first",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Inspect an existing Blender MCP connection. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One installed MCP entry, its exact package/add-on versions and an empty test scene"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One installed MCP entry, its exact package/add-on versions and an empty test scene Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Discovery identifies the expected server and add-on version; The inspection request does not alter objects or enable external services."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Discovery identifies the expected server and add-on version"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The inspection request does not alter objects or enable external services"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. The current community package is mcp-for-blender; preserve a working legacy setup until deliberately migrating."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-asset-inventory",
    "title": "Discover reusable assets through read-only MCP",
    "summary": "An existing authorized spatial catalog and an explicit project scope. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Claude Code connects to external tools through configured MCP servers.",
        "sourceIds": [
          "spatial-claude"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-claude",
        "title": "Claude Code MCP",
        "url": "https://code.claude.com/docs/en/mcp",
        "publisher": "Anthropic",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: An existing authorized spatial catalog and an explicit project scope.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent asset inventory workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: An existing authorized spatial catalog and an explicit project scope. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect available tool schemas and search the permitted catalog for an equivalent asset",
      "Fetch one candidate's current hash, dimensions, provenance and supported material features",
      "Use the existing delivery planner to identify remaining gates before generating anything",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned discover reusable assets through read-only mcp candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Out-of-scope projects are denied",
      "The selected source hash matches the file handed to the consuming project",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Sintra publishes instructions and public JSON, not the user's private asset catalog or a hosted MCP endpoint.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "The existing private Studio adapter offers search_assets, get_asset and plan_delivery; do not expose its private catalog publicly.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me discover reusable assets through read-only mcp in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: An existing authorized spatial catalog and an explicit project scope. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Out-of-scope projects are denied; The selected source hash matches the file handed to the consuming project. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/asset-inventory.svg",
        "alt": "Illustrated procedure for discover reusable assets through read-only mcp: Inspect available tool schemas and search the permitted catalog for an equivalent asset → Fetch one candidate's current hash, dimensions, provenance and supported material features → Use the existing delivery planner to identify remaining gates before generating anything",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Discover reusable assets through read-only MCP. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "An existing authorized spatial catalog and an explicit project scope"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "An existing authorized spatial catalog and an explicit project scope Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Out-of-scope projects are denied; The selected source hash matches the file handed to the consuming project."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Out-of-scope projects are denied"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The selected source hash matches the file handed to the consuming project"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. The existing private Studio adapter offers search_assets, get_asset and plan_delivery; do not expose its private catalog publicly."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-parameter-contract",
    "title": "Turn an LLM design brief into bounded parameters",
    "summary": "A generic prop generator and width 0.4–0.8 m, height 0.3–0.6 m ranges. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "The Python API can inspect and modify Blender data and run tools.",
        "sourceIds": [
          "spatial-api"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-api",
        "title": "Python API quickstart",
        "url": "https://docs.blender.org/api/4.5/info_quickstart.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: A generic prop generator and width 0.4–0.8 m, height 0.3–0.6 m ranges.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent parameter contract workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: A generic prop generator and width 0.4–0.8 m, height 0.3–0.6 m ranges. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the existing generator and define a schema with units, bounds and required fields",
      "Ask the LLM for parameters only; reject unknown keys and out-of-range values deterministically",
      "Run one accepted parameter set through the existing generator and save the input/output identity",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned turn an llm design brief into bounded parameters candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "A negative width is rejected before geometry execution",
      "The accepted values appear unchanged in the output receipt",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A schema-valid request can still produce an ugly or unsuitable object.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Separate free-form intent from the validated generator input.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me turn an llm design brief into bounded parameters in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: A generic prop generator and width 0.4–0.8 m, height 0.3–0.6 m ranges. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: A negative width is rejected before geometry execution; The accepted values appear unchanged in the output receipt. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/parameter-contract.svg",
        "alt": "Illustrated procedure for turn an llm design brief into bounded parameters: Inspect the existing generator and define a schema with units, bounds and required fields → Ask the LLM for parameters only → Run one accepted parameter set through the existing generator and save the input/output identity",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Turn an LLM design brief into bounded parameters. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "A generic prop generator and width 0.4–0.8 m, height 0.3–0.6 m ranges"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "A generic prop generator and width 0.4–0.8 m, height 0.3–0.6 m ranges Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: A negative width is rejected before geometry execution; The accepted values appear unchanged in the output receipt."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "A negative width is rejected before geometry execution"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The accepted values appear unchanged in the output receipt"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Separate free-form intent from the validated generator input."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-seeded-variants",
    "title": "Make procedural variants reproducible",
    "summary": "One existing generator, seeds 41/42/43 and a fixed parameter JSON. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Geometry Nodes provides procedural geometry, instances and field-based controls.",
        "sourceIds": [
          "spatial-geometry"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One existing generator, seeds 41/42/43 and a fixed parameter JSON.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent seeded variants workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One existing generator, seeds 41/42/43 and a fixed parameter JSON. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Record generator revision, Blender version and source dependencies",
      "Pass each explicit seed into the existing random/placement controls",
      "Regenerate one candidate and compare its exported identity and measured geometry under documented tolerances",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned make procedural variants reproducible candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The same seed preserves the intended placement/shape choices",
      "A different seed does not alter protected anchors or size limits",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Matching seeds do not promise byte-identical files across software versions.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Record nondeterministic exporter metadata separately from geometry comparisons.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me make procedural variants reproducible in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One existing generator, seeds 41/42/43 and a fixed parameter JSON. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The same seed preserves the intended placement/shape choices; A different seed does not alter protected anchors or size limits. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/seeded-variants.svg",
        "alt": "Illustrated procedure for make procedural variants reproducible: Record generator revision, Blender version and source dependencies → Pass each explicit seed into the existing random/placement controls → Regenerate one candidate and compare its exported identity and measured geometry under documented tolerances",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Make procedural variants reproducible. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One existing generator, seeds 41/42/43 and a fixed parameter JSON"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One existing generator, seeds 41/42/43 and a fixed parameter JSON Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The same seed preserves the intended placement/shape choices; A different seed does not alter protected anchors or size limits."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The same seed preserves the intended placement/shape choices"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A different seed does not alter protected anchors or size limits"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Record nondeterministic exporter metadata separately from geometry comparisons."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-export-validator",
    "title": "Validate an export before engine handoff",
    "summary": "One GLB, its source identity and the existing project's Khronos validator. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Khronos glTF Validator produces issue reports against the glTF specification.",
        "sourceIds": [
          "spatial-validator"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-validator",
        "title": "glTF Validator",
        "url": "https://github.com/KhronosGroup/glTF-Validator",
        "publisher": "Khronos Group",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One GLB, its source identity and the existing project's Khronos validator.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent export validator workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One GLB, its source identity and the existing project's Khronos validator. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Export a derived candidate without overwriting the authoring source",
      "Run the existing validator and retain errors, warnings and extension requirements",
      "Import in the actual destination and inspect scale, materials, animation and required decoders",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned validate an export before engine handoff candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Validation errors are resolved or explicitly block delivery",
      "A zero-error report is accompanied by a destination import check",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A valid file is not proof of visual acceptance or broad engine compatibility.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Keep validator version and source hash beside its report.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me validate an export before engine handoff in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One GLB, its source identity and the existing project's Khronos validator. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Validation errors are resolved or explicitly block delivery; A zero-error report is accompanied by a destination import check. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/export-validator.svg",
        "alt": "Illustrated procedure for validate an export before engine handoff: Export a derived candidate without overwriting the authoring source → Run the existing validator and retain errors, warnings and extension requirements → Import in the actual destination and inspect scale, materials, animation and required decoders",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Validate an export before engine handoff. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One GLB, its source identity and the existing project's Khronos validator"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One GLB, its source identity and the existing project's Khronos validator Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Validation errors are resolved or explicitly block delivery; A zero-error report is accompanied by a destination import check."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Validation errors are resolved or explicitly block delivery"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "A zero-error report is accompanied by a destination import check"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Keep validator version and source hash beside its report."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-texture-budget",
    "title": "Compare compressed texture delivery candidates",
    "summary": "One reviewed material set and baseline/512/1024 px candidates. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "KTX2Loader uses hardware detection and a configured texture transcoder.",
        "sourceIds": [
          "spatial-compress"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-compress",
        "title": "KTX2Loader",
        "url": "https://threejs.org/docs/pages/KTX2Loader.html",
        "publisher": "Three.js contributors",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One reviewed material set and baseline/512/1024 px candidates.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent texture budget workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One reviewed material set and baseline/512/1024 px candidates. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Record baseline image dimensions, file size and visible quality at the target camera",
      "Prepare bounded derivatives with the existing texture pipeline; configure the consumer's required KTX2 decoder if used",
      "Compare load behavior, memory and fixed-view detail on the actual target device",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned compare compressed texture delivery candidates candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "All candidates preserve declared channel/color interpretation",
      "Missing transcoder support produces an explicit fallback or error",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A smaller download can trade away detail or increase decode cost.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Compare normal-map gradients and small text, not only overall color.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me compare compressed texture delivery candidates in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One reviewed material set and baseline/512/1024 px candidates. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: All candidates preserve declared channel/color interpretation; Missing transcoder support produces an explicit fallback or error. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/texture-budget.svg",
        "alt": "Illustrated procedure for compare compressed texture delivery candidates: Record baseline image dimensions, file size and visible quality at the target camera → Prepare bounded derivatives with the existing texture pipeline → Compare load behavior, memory and fixed-view detail on the actual target device",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Compare compressed texture delivery candidates. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One reviewed material set and baseline/512/1024 px candidates"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One reviewed material set and baseline/512/1024 px candidates Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: All candidates preserve declared channel/color interpretation; Missing transcoder support produces an explicit fallback or error."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "All candidates preserve declared channel/color interpretation"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Missing transcoder support produces an explicit fallback or error"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Compare normal-map gradients and small text, not only overall color."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-visual-regression",
    "title": "Create a source-bound visual comparison",
    "summary": "One model hash, fixed camera, viewport, lighting and two material candidates. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Cameras define the view and projection used to frame a scene.",
        "sourceIds": [
          "spatial-camera"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-camera",
        "title": "Cameras",
        "url": "https://docs.blender.org/manual/en/4.5/render/cameras.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One model hash, fixed camera, viewport, lighting and two material candidates.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent visual regression workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One model hash, fixed camera, viewport, lighting and two material candidates. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Capture the baseline using the project's existing inspector or authorized renderer",
      "Change one declared parameter and capture with the same view and exposure",
      "Review paired images and measured counters; keep both acceptance and rejection notes",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned create a source-bound visual comparison candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Both captures cite the same geometry hash and view settings",
      "The report separates visual judgment from timing measurements",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A pixel difference threshold alone cannot establish artistic quality.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Do not borrow a neighboring asset's thumbnail as evidence.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me create a source-bound visual comparison in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One model hash, fixed camera, viewport, lighting and two material candidates. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Both captures cite the same geometry hash and view settings; The report separates visual judgment from timing measurements. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/visual-regression.svg",
        "alt": "Illustrated procedure for create a source-bound visual comparison: Capture the baseline using the project's existing inspector or authorized renderer → Change one declared parameter and capture with the same view and exposure → Review paired images and measured counters",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Create a source-bound visual comparison. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One model hash, fixed camera, viewport, lighting and two material candidates"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One model hash, fixed camera, viewport, lighting and two material candidates Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Both captures cite the same geometry hash and view settings; The report separates visual judgment from timing measurements."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Both captures cite the same geometry hash and view settings"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The report separates visual judgment from timing measurements"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Do not borrow a neighboring asset's thumbnail as evidence."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-production-receipt",
    "title": "Record a reusable 3D production receipt",
    "summary": "One completed local candidate export and its measured file/dimension data. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "The Python API can inspect and modify Blender data and run tools.",
        "sourceIds": [
          "spatial-api"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-api",
        "title": "Python API quickstart",
        "url": "https://docs.blender.org/api/4.5/info_quickstart.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One completed local candidate export and its measured file/dimension data.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent production receipt workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One completed local candidate export and its measured file/dimension data. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Reuse the existing batch receipt format and collect source revision, parameters and output hash",
      "Record only actually measured timings, geometry counts and validation results",
      "Link the receipt to the candidate and leave absent measurements explicitly unknown",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned record a reusable 3d production receipt candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "Every reported metric has a measurement method and scope",
      "The receipt names unresolved visual, rights and device gates",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "A receipt is agent-authored evidence until independently checked and does not approve production.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use asset triangles and full-scene rendered triangles as different metrics.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me record a reusable 3d production receipt in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One completed local candidate export and its measured file/dimension data. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: Every reported metric has a measurement method and scope; The receipt names unresolved visual, rights and device gates. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/production-receipt.svg",
        "alt": "Illustrated procedure for record a reusable 3d production receipt: Reuse the existing batch receipt format and collect source revision, parameters and output hash → Record only actually measured timings, geometry counts and validation results → Link the receipt to the candidate and leave absent measurements explicitly unknown",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Record a reusable 3D production receipt. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One completed local candidate export and its measured file/dimension data"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One completed local candidate export and its measured file/dimension data Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: Every reported metric has a measurement method and scope; The receipt names unresolved visual, rights and device gates."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "Every reported metric has a measurement method and scope"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The receipt names unresolved visual, rights and device gates"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use asset triangles and full-scene rendered triangles as different metrics."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-llm-knowledge-retrieval",
    "title": "Retrieve one 3D procedure without loading the whole catalog",
    "summary": "Sintra's public compact knowledge index and an authorized HTTP-capable client. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "MCP connections expose tools; instruction skills do not themselves grant access.",
        "sourceIds": [
          "spatial-codex"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-codex",
        "title": "Codex MCP",
        "url": "https://learn.chatgpt.com/docs/extend/mcp?surface=cli",
        "publisher": "OpenAI",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: Sintra's public compact knowledge index and an authorized HTTP-capable client.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent llm knowledge retrieval workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: Sintra's public compact knowledge index and an authorized HTTP-capable client. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Read /api/index.json, then filter /api/knowledge-index.json by 3D and the task",
      "Fetch the selected resourceUrl and follow its cited sources, execution status and limitations",
      "Load the linked SKILL.md only when its procedure matches the requested environment; inspect tools separately",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned retrieve one 3d procedure without loading the whole catalog candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The JSON and skill retain the same canonical ID and source URLs",
      "The client does not treat a skill download as installed tools or permission",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "Static HTTPS knowledge access is not an MCP handshake or live Blender connection.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "Use progressive retrieval; 100 full procedures need not fill every prompt.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me retrieve one 3d procedure without loading the whole catalog in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: Sintra's public compact knowledge index and an authorized HTTP-capable client. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The JSON and skill retain the same canonical ID and source URLs; The client does not treat a skill download as installed tools or permission. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/llm-knowledge-retrieval.svg",
        "alt": "Illustrated procedure for retrieve one 3d procedure without loading the whole catalog: Read /api/index.json, then filter /api/knowledge-index.json by 3D and the task → Fetch the selected resourceUrl and follow its cited sources, execution status and limitations → Load the linked SKILL.md only when its procedure matches the requested environment",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Retrieve one 3D procedure without loading the whole catalog. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "Sintra's public compact knowledge index and an authorized HTTP-capable client"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "Sintra's public compact knowledge index and an authorized HTTP-capable client Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The JSON and skill retain the same canonical ID and source URLs; The client does not treat a skill download as installed tools or permission."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The JSON and skill retain the same canonical ID and source URLs"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "The client does not treat a skill download as installed tools or permission"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. Use progressive retrieval; 100 full procedures need not fill every prompt."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-asset-rights",
    "title": "Keep provenance and rights attached to a 3D derivative",
    "summary": "One approved source asset, its license text and a derived export. An LLM-assisted recipe with a concrete practice case, visual procedure and review gates.",
    "kind": "workflow",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "LLMs, MCP & production",
      "Blender",
      "Skills",
      "MCP"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "example-workflow",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "The glTF exporter delivers supported geometry, material and animation features.",
        "sourceIds": [
          "spatial-gltf"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-gltf",
        "title": "glTF export",
        "url": "https://docs.blender.org/manual/en/4.5/addons/import_export/scene_gltf2.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An authorized Claude Code / Codex / existing Studio environment and a recorded tool version. Blender-specific references here are pinned to the 4.5 manual; check differences in your installed version.",
      "Practice inputs: One approved source asset, its license text and a derived export.",
      "Permission to use the source assets and a writable derived-output location. Use a disposable project copy for edits. An MCP connection is optional; reviewed scripts or manual tool actions can follow the same procedure."
    ],
    "steps": [
      "Inspect the existing project, asset registry and target runtime for an equivalent asset rights workflow. Reuse the closest source and preserve its original files.",
      "Give Claude Code, Codex or another authorized coding assistant this practice brief: One approved source asset, its license text and a derived export. Ask for a small plan and parameter/script diff; verify names and APIs against the installed tool version before applying it.",
      "Inspect the owning registry for an equivalent source and preserve the original license/provenance record",
      "Record transformations, external textures and model/source identities in the existing receipt",
      "Review the final distribution bundle for attribution, restricted content and embedded private paths",
      "Save the derived candidate separately, record software versions and source/output identities, then perform the acceptance checks. Keep unresolved quality, performance and rights questions in the receipt."
    ],
    "output": "A versioned keep provenance and rights attached to a 3d derivative candidate, the input/parameter table, source identity and a review receipt with the checks below.",
    "validation": [
      "The public derivative has no private source paths or credentials",
      "Every external asset has a recorded source and distribution basis",
      "Record actual observations separately from expected results; missing tests remain unrun."
    ],
    "limitations": [
      "An LLM's statement that an asset is safe does not establish ownership or commercial rights.",
      "Sintra-authored proposal, not an executed Blender/engine/solver test. The diagram illustrates the procedure and is not a render or execution receipt.",
      "Cloud chat cannot directly control a local 3D app without an appropriate authorized bridge. Tool access, model availability, paid services and rendering resources must be checked separately."
    ],
    "tips": [
      "A geometry generator's license and a downloaded texture's license are separate obligations.",
      "Let the LLM draft and explain bounded changes; use deterministic software to measure geometry, calculate trajectories and validate files."
    ],
    "integrations": [
      {
        "name": "Claude Code / Codex / existing Studio",
        "purpose": "Perform the tool-specific procedure in an existing authorized project.",
        "access": "local"
      },
      {
        "name": "Claude Code / Codex / compatible LLM client",
        "purpose": "Explain inputs, propose parameters or a reviewable script, interpret the actual returned evidence. No connection is supplied by this skill.",
        "access": "local"
      }
    ],
    "prompt": "Help me keep provenance and rights attached to a 3d derivative in [existing authorized project]. First find an equivalent asset/workflow and inspect the installed tool version. Practice brief: One approved source asset, its license text and a derived export. Propose the smallest parameter or script diff and explain each tool action. Follow the linked procedure, preserve original assets and stop on missing inputs or unsupported APIs. Check: The public derivative has no private source paths or credentials; Every external asset has a recorded source and distribution basis. Return actual observations, source/output identities and blockers. Do not call expected results completed tests or publish private source paths.",
    "related": [
      "3d-mcp-connections",
      "3d-start-here"
    ],
    "spatial": {
      "category": "production",
      "categoryLabel": "LLMs, MCP & production",
      "tools": [
        "Claude Code",
        "Codex",
        "existing Studio"
      ],
      "complexity": "Advanced",
      "diagram": {
        "url": "/visuals/3d/asset-rights.svg",
        "alt": "Illustrated procedure for keep provenance and rights attached to a 3d derivative: Inspect the owning registry for an equivalent source and preserve the original license/provenance record → Record transformations, external textures and model/source identities in the existing receipt → Review the final distribution bundle for attribution, restricted content and embedded private paths",
        "caption": "Original Sintra procedure diagram · illustrative, not a 3D render or tested output."
      }
    },
    "replication": {
      "version": "1.0",
      "environment": "Claude Code / Codex / existing Studio with an optional authorized LLM client",
      "useWhen": "Keep provenance and rights attached to a 3D derivative. Reuse the existing project and relevant source assets.",
      "timeEstimate": "Planning estimate: 45–120 minutes for a bounded pilot; simulation, capture, rendering and device review may take longer.",
      "inputs": [
        {
          "name": "Practice specification",
          "detail": "One approved source asset, its license text and a derived export"
        },
        {
          "name": "Existing project and evidence",
          "detail": "The source asset/generator or dataset, tool version, provenance/license and a target runtime/output format."
        }
      ],
      "launch": [
        "Open the existing project and save a derived working copy. Inspect the current scene, dependencies and available generators before editing.",
        "Confirm tool APIs in the cited versioned documentation. If using MCP, inspect the existing connection and tools/list; otherwise use a reviewed script or perform the steps manually. Do not install a second equivalent connection."
      ],
      "practice": {
        "task": "One approved source asset, its license text and a derived export Follow the three tool-specific stages in the procedure; begin with a low-cost preview.",
        "expected": "Expected review conditions, not completed tests: The public derivative has no private source paths or credentials; Every external asset has a recorded source and distribution basis."
      },
      "acceptanceTests": [
        {
          "scenario": "Practice candidate",
          "expected": "The public derivative has no private source paths or credentials"
        },
        {
          "scenario": "Edge or handoff case",
          "expected": "Every external asset has a recorded source and distribution basis"
        }
      ],
      "troubleshooting": [
        {
          "symptom": "An operator, node socket or exporter option is unavailable",
          "action": "Stop and inspect the installed tool/version documentation; adapt the smallest affected step rather than guessing an API name."
        },
        {
          "symptom": "The candidate fails its stated review condition",
          "action": "Return to the last accepted source/parameter set, reduce to one representative case and record the failed observation. A geometry generator's license and a downloaded texture's license are separate obligations."
        }
      ],
      "relatedPrompts": [
        "technical-documentation",
        "debug-this-error"
      ]
    }
  },
  {
    "id": "3d-start-here",
    "title": "Choose an LLM-assisted 3D workflow",
    "summary": "Start with a bounded object, room, motion or scientific dataset; choose a documented tool path and judge the actual output.",
    "kind": "capability",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Blender",
      "MCP",
      "Connectors"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "primary-documentation",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "Blender Python can inspect and edit application data; generated code uses that application environment.",
        "sourceIds": [
          "spatial-api"
        ]
      },
      {
        "text": "Geometry Nodes offers a reusable procedural route alongside hand-authored meshes.",
        "sourceIds": [
          "spatial-geometry"
        ]
      },
      {
        "text": "glTF is a delivery format with specific supported features, not the complete authoring scene.",
        "sourceIds": [
          "spatial-gltf"
        ]
      },
      {
        "text": "Coordinate conversion needs declared units and frames; a picture cannot supply missing measurements.",
        "sourceIds": [
          "spatial-astro"
        ]
      },
      {
        "text": "REBOUND is a gravitational integrator; Blender can visualize saved trajectories.",
        "sourceIds": [
          "spatial-rebound"
        ]
      },
      {
        "text": "An MCP server supplies tools/data; a skill supplies instructions for a supported host.",
        "sourceIds": [
          "spatial-codex"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-api",
        "title": "Python API quickstart",
        "url": "https://docs.blender.org/api/4.5/info_quickstart.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-geometry",
        "title": "Geometry Nodes",
        "url": "https://docs.blender.org/manual/en/4.5/modeling/geometry_nodes/index.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-gltf",
        "title": "glTF export",
        "url": "https://docs.blender.org/manual/en/4.5/addons/import_export/scene_gltf2.html",
        "publisher": "Blender Foundation",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-astro",
        "title": "Astronomical coordinate systems",
        "url": "https://docs.astropy.org/en/stable/coordinates/index.html",
        "publisher": "Astropy contributors",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-rebound",
        "title": "REBOUND N-body integration",
        "url": "https://rebound.hanno-rein.de/",
        "publisher": "REBOUND contributors",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-codex",
        "title": "Codex MCP",
        "url": "https://learn.chatgpt.com/docs/extend/mcp?surface=cli",
        "publisher": "OpenAI",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An identified host/client, installed application version, existing project and authorized input scope."
    ],
    "steps": [
      "Choose a task from the 100 recipes and inspect its inputs, expected deliverable and checks. Start with one representative sample.",
      "Reuse existing assets and generators. In the private project estate, generic Studio props and KONA room/runtime conventions are useful starting points when available and authorized. Do not publish those sources by copying this guide.",
      "Choose manual operation or a reviewed Python/Geometry Nodes change for Blender. Use Claude Code/Codex with an existing local connection only if tool access is needed. A chat-only assistant can help with parameters and explanation.",
      "For game delivery, test the exported asset inside Godot/Unity/the actual runtime. For scientific work, calculate in a suitable solver and preserve the source values before displaying them.",
      "Compare fixed-view candidates, record measured geometry/runtime costs separately, and keep failed visual reviews. Scale to a batch only after the sample is accepted."
    ],
    "output": "A documented connection/tool choice with the intended scope, versions, a bounded test and unresolved gates.",
    "validation": [
      "Inspect actual discovered tools rather than inferring capabilities from a product name.",
      "Verify one disposable scene or read-only query before using a valuable source project."
    ],
    "limitations": [
      "Provider and maintainer documentation establishes a documented capability, not a completed Sintra integration test.",
      "Community integrations are executable dependencies. Review publisher, pinned version, tool scope and optional external services before enabling them.",
      "The private Studio catalog and source assets remain private. Sintra serves public static knowledge through HTTPS; it does not host a 3D MCP server."
    ],
    "tips": [
      "Name the geometry source, authoring scene, delivery package and runtime behavior separately.",
      "Use low-cost previews first. Follow the owning project’s render policy; do not bypass local rendering restrictions or enable a paid service automatically.",
      "The diagrams are learning aids. The practice inputs are deliberate toy cases, not certified engineering or scientific results."
    ],
    "related": [
      "3d-mcp-connections",
      "3d-modular-corridor",
      "3d-solar-ephemeris",
      "3d-parametric-chair"
    ]
  },
  {
    "id": "3d-mcp-connections",
    "title": "Choose and inspect 3D MCP connections",
    "summary": "Compare three documented community integrations, existing read-only Studio discovery and the script-only alternative. Nothing here installs a server.",
    "kind": "capability",
    "audiences": [
      "personal",
      "corporate",
      "developer"
    ],
    "tags": [
      "3D",
      "Blender",
      "MCP",
      "Connectors"
    ],
    "reviewedAt": "2026-10-18",
    "reviewDueAt": "2026-11-17",
    "evidenceLevel": "primary-documentation",
    "executionStatus": "not-run-in-sintra",
    "facts": [
      {
        "text": "MCP for Blender is the current community name/package; the former blender-mcp setup remains documented for existing users. It uses a Blender add-on plus an MCP server and can execute Python.",
        "sourceIds": [
          "spatial-mcpblender"
        ]
      },
      {
        "text": "Coding-Solo Godot MCP documents editor/project lifecycle, debug output, project inspection and scene operations. It is a separate engine connection.",
        "sourceIds": [
          "spatial-mcpgodot"
        ]
      },
      {
        "text": "Coplay Unity MCP documents editor-side asset, scene and script operations. Its setup and supported versions must be checked in its own repository.",
        "sourceIds": [
          "spatial-mcpunity"
        ]
      },
      {
        "text": "Claude Code supports configured MCP connections; the host’s connection scope and actual discovered tools determine access.",
        "sourceIds": [
          "spatial-claude"
        ]
      },
      {
        "text": "OpenAI documents MCP for connected tools and the distinction between tools and reusable instruction skills.",
        "sourceIds": [
          "spatial-codex"
        ]
      }
    ],
    "sources": [
      {
        "id": "spatial-mcpblender",
        "title": "MCP for Blender maintainer README",
        "url": "https://github.com/ahujasid/mcp-for-blender",
        "publisher": "ahujasid and contributors (community)",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-mcpgodot",
        "title": "Godot MCP maintainer README",
        "url": "https://github.com/Coding-Solo/godot-mcp",
        "publisher": "Coding-Solo and contributors (community)",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-mcpunity",
        "title": "Unity MCP maintainer README",
        "url": "https://github.com/CoplayDev/unity-mcp",
        "publisher": "Coplay and contributors (community)",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-claude",
        "title": "Claude Code MCP",
        "url": "https://code.claude.com/docs/en/mcp",
        "publisher": "Anthropic",
        "checkedAt": "2026-10-18"
      },
      {
        "id": "spatial-codex",
        "title": "Codex MCP",
        "url": "https://learn.chatgpt.com/docs/extend/mcp?surface=cli",
        "publisher": "OpenAI",
        "checkedAt": "2026-10-18"
      }
    ],
    "prerequisites": [
      "An identified host/client, installed application version, existing project and authorized input scope."
    ],
    "steps": [
      "Inventory existing client connections and add-ons first. Record the client, application, server package/add-on version, transport, local scope and enabled third-party integrations. Keep a working legacy entry until migration is deliberate.",
      "Blender route: open the maintainer README linked below. Review the add-on code/release and install or reuse the matching add-on through Blender Preferences. Use a disposable scene. Avoid duplicate server processes. The maintainer documents uvx mcp-for-blender; select and pin a reviewed package version for repeatable use.",
      "Claude Code example after selecting a reviewed version: claude mcp add blender -- uvx --from mcp-for-blender==<reviewed-version> mcp-for-blender. Replace the placeholder first and verify your client’s current syntax. For Codex use its documented MCP configuration/add flow with the same reviewed executable. Do not paste an unreviewed remote installer into a shell.",
      "In the chosen client inspect connection status and discovered schemas. Request the scene/object inventory before editing. Review a proposed Python change, then test it against one primitive in the disposable scene. Confirm object count/transform before and after; preserve the result and failures.",
      "Godot route: reuse an existing Godot MCP entry or follow Coding-Solo’s versioned setup, verify the Godot binary/project path and first request version/project information. Run only the intended disposable project, then inspect its debug output.",
      "Unity route: follow Coplay’s current package/editor setup and supported client transport. Reuse the existing project package/connection, inspect tool discovery, then test one named disposable scene change and the project’s existing tests. Do not assume Blender tools control Unity.",
      "Existing private Studio route: use its project allowlist and read-only search_assets/get_asset/list_rooms/get_room/plan_delivery/web_integration tools where that adapter is already available. Keep hashes and grants intact. These private tool names are an existing internal pattern, not public Sintra endpoints.",
      "No MCP needed: ask an LLM for a small reviewed script or node plan, run it under the owning project’s authorized tool policy, and return the measurements/screenshots. Cloud-only chat requires an appropriate bridge to reach local applications."
    ],
    "output": "A documented connection/tool choice with the intended scope, versions, a bounded test and unresolved gates.",
    "validation": [
      "Inspect actual discovered tools rather than inferring capabilities from a product name.",
      "Verify one disposable scene or read-only query before using a valuable source project."
    ],
    "limitations": [
      "Provider and maintainer documentation establishes a documented capability, not a completed Sintra integration test.",
      "Community integrations are executable dependencies. Review publisher, pinned version, tool scope and optional external services before enabling them.",
      "The private Studio catalog and source assets remain private. Sintra serves public static knowledge through HTTPS; it does not host a 3D MCP server."
    ],
    "tips": [
      "Blender code execution is local application access, not a sandbox. Inspect execute-code proposals and optional asset/API services independently.",
      "Check the current maintainer’s security and telemetry settings. Restricted/safe modes may reduce tools but do not establish a general isolation boundary.",
      "Do not infer Unreal, Houdini, CAD, asset-store licensing or remote render access from these three connections. Discover and review a specific maintained adapter for another tool."
    ],
    "related": [
      "3d-mcp-connection-audit",
      "3d-asset-inventory",
      "3d-export-validator",
      "3d-start-here"
    ]
  }
];
