import {
  BarChart3,
  Code,
  LineChart,
  Workflow,
  Files,
  Table,
  Presentation,
  Map,
  type LucideIcon,
} from "lucide-react";
import type { OutputKind } from "@/lib/data";

const MAP: Record<OutputKind, { icon: LucideIcon; label: string }> = {
  analysis:  { icon: BarChart3,    label: "Analysis"  },
  code:      { icon: Code,         label: "Code"      },
  visual:    { icon: LineChart,    label: "Dashboard" },
  spec:      { icon: Workflow,     label: "System"    },
  templates: { icon: Files,        label: "Templates" },
  table:     { icon: Table,        label: "Model"     },
  deck:      { icon: Presentation, label: "Deck"      },
  plan:      { icon: Map,          label: "Plan"      },
};

interface Props {
  kind: OutputKind;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export default function OutputKindIcon({ kind, size = 14, showLabel = false, className = "" }: Props) {
  const { icon: Icon, label } = MAP[kind] ?? MAP.analysis;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Icon size={size} aria-hidden="true" />
      {showLabel && <span>{label}</span>}
    </span>
  );
}

export function outputKindLabel(kind: OutputKind): string {
  return MAP[kind]?.label ?? "Analysis";
}
