// Placeholder — will be replaced by full data
export type ToolCategory = "chat" | "writing" | "code" | "image" | "video" | "audio" | "research" | "productivity";

export interface AITool {
  id: string; name: string; tagline: string; description: string;
  category: ToolCategory; pricing: "free"|"freemium"|"paid"|"enterprise";
  priceNote: string; url: string; provider: string;
  tags: string[]; status: "available"|"beta"|"waitlist"; highlight: string;
}

export const TOOL_CATEGORIES: { id: ToolCategory; label: string; icon: string; desc: string }[] = [
  { id: "chat",        label: "Chat & Assistants", icon: "💬", desc: "AI chatbots and reasoning assistants" },
  { id: "writing",     label: "Writing",           icon: "✍️", desc: "Copy, editing, and long-form content" },
  { id: "code",        label: "Code",              icon: "⌨️", desc: "IDE assistants and code generation" },
  { id: "image",       label: "Image",             icon: "🎨", desc: "Image generation and editing" },
  { id: "video",       label: "Video",             icon: "🎬", desc: "Video generation and production" },
  { id: "audio",       label: "Audio",             icon: "🎵", desc: "Voice, music, and speech synthesis" },
  { id: "research",    label: "Research",          icon: "🔍", desc: "AI-powered search and knowledge tools" },
  { id: "productivity",label: "Productivity",      icon: "⚡", desc: "Workflow automation and agents" },
];

export const AI_TOOLS: AITool[] = [];
