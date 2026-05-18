// Placeholder — will be replaced by full data
export interface PathStep {
  type: "concept"|"use-case"|"tool"|"page"|"read";
  label: string; desc: string; href: string; duration: string; icon: string;
}
export interface LearningPath {
  id: string; title: string; tagline: string; emoji: string; color: string;
  level: "beginner"|"intermediate"|"advanced"; audience: string;
  totalDuration: string; steps: PathStep[];
}
export const LEARNING_PATHS: LearningPath[] = [];
