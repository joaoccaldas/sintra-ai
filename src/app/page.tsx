"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  Filter,
  X,
  Sparkles,
  Zap,
  Target,
  Layers,
  Lightbulb,
  Code,
  MessageSquare,
  Search as SearchIcon,
  ChevronDown,
  BookOpen,
  Shuffle,
} from "lucide-react";
import useCases from "../data/useCases.json";
import { cn } from "@/lib/utils";

const domains = [
  { name: "Business Intelligence", icon: Target, color: "text-aurora-blue" },
  { name: "Personal Productivity", icon: Zap, color: "text-aurora-teal" },
  { name: "Design & Creative", icon: Layers, color: "text-aurora-pink" },
  { name: "Software Development", icon: Code, color: "text-aurora-purple" },
  { name: "Research & Analysis", icon: SearchIcon, color: "text-aurora-gold" },
  { name: "Communication & Writing", icon: MessageSquare, color: "text-aurora-blue" },
];

const skillLevels = [
  { name: "BEGINNER", emoji: "🔴", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { name: "INTERMEDIATE", emoji: "🟡", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { name: "ADVANCED", emoji: "🟢", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { name: "EXPERT", emoji: "⚫", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredCases = useMemo(() => {
    return (useCases as any[]).filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesDomain =
        !selectedDomain || item.domain === selectedDomain;
      const matchesSkill =
        !selectedSkill || item.skill_level === selectedSkill;
      return matchesSearch && matchesDomain && matchesSkill;
    });
  }, [searchQuery, selectedDomain, selectedSkill]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRandom = () => {
    const random = filteredCases[Math.floor(Math.random() * filteredCases.length)];
    if (random) {
      const id = `${random.domain}-${random.title}`;
      setExpandedCard(id);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const clearFilters = () => {
    setSelectedDomain(null);
    setSelectedSkill(null);
    setSearchQuery("");
  };

  const activeFiltersCount = [
    selectedDomain,
    selectedSkill,
    searchQuery,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-sintra-50 dark:bg-night-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-sintra-50/80 dark:bg-night-900/80 border-b border-sintra-200 dark:border-night-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-purple to-aurora-blue flex items-center justify-center shadow-lg shadow-aurora-purple/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-sintra-900 dark:text-sintra-100">
                  Sintra
                </h1>
                <p className="text-xs text-sintra-500 dark:text-sintra-400">
                  AI Use Case Library
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={handleRandom}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-sintra-100 dark:bg-night-700 text-sintra-700 dark:text-sintra-300 hover:bg-sintra-200 dark:hover:bg-night-600 transition-all text-sm font-medium"
              >
                <Shuffle className="w-4 h-4" />
                <span>Random</span>
              </button>
              <a
                href="https://github.com/joaoccaldas/sintra-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sintra-900 dark:bg-sintra-100 text-sintra-100 dark:text-sintra-900 hover:opacity-90 transition-all text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple/5 via-transparent to-aurora-blue/5 dark:from-aurora-purple/10 dark:to-aurora-blue/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aurora-purple/10 dark:bg-aurora-purple/20 text-aurora-purple dark:text-aurora-purple text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              <span>70+ Curated AI Use Cases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sintra-900 dark:text-sintra-100 mb-4 leading-tight">
              Find the perfect{" "}
              <span className="bg-gradient-to-r from-aurora-purple to-aurora-blue bg-clip-text text-transparent">
                AI prompt
              </span>{" "}
              for any task
            </h2>
            <p className="text-sintra-600 dark:text-sintra-400 text-lg mb-8">
              A minimal, organized collection of use cases for business,
              productivity, design, and development.
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sintra-400" />
              <input
                type="text"
                placeholder="Search use cases, prompts, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-night-800 border border-sintra-200 dark:border-night-600 text-sintra-900 dark:text-sintra-100 placeholder:text-sintra-400 focus:outline-none focus:ring-2 focus:ring-aurora-purple/50 shadow-lg shadow-sintra-200/50 dark:shadow-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[73px] z-40 bg-sintra-50/95 dark:bg-night-900/95 backdrop-blur border-b border-sintra-200 dark:border-night-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-all",
                showFilters || activeFiltersCount > 0
                  ? "bg-aurora-purple/10 border-aurora-purple/30 text-aurora-purple"
                  : "bg-white dark:bg-night-800 border-sintra-200 dark:border-night-600 text-sintra-700 dark:text-sintra-300"
              )}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-aurora-purple text-white text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-sintra-500 hover:text-sintra-700 dark:hover:text-sintra-300 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}

            <div className="h-6 w-px bg-sintra-200 dark:bg-night-600 mx-2" />

            {/* Domain chips */}
            {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() =>
                  setSelectedDomain(
                    selectedDomain === domain.name ? null : domain.name
                  )
                }
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-all",
                  selectedDomain === domain.name
                    ? "bg-sintra-900 dark:bg-sintra-100 text-sintra-100 dark:text-sintra-900 border-sintra-900 dark:border-sintra-100"
                    : "bg-white dark:bg-night-800 border-sintra-200 dark:border-night-600 text-sintra-700 dark:text-sintra-300 hover:border-sintra-400 dark:hover:border-night-500"
                )}
              >
                <domain.icon className={cn("w-4 h-4", domain.color)} />
                <span className="hidden sm:inline">{domain.name}</span>
              </button>
            ))}
          </div>

          {/* Skill filter expand */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  <span className="text-sm text-sintra-500 dark:text-sintra-400 mr-2">
                    Skill level:
                  </span>
                  {skillLevels.map((skill) => (
                    <button
                      key={skill.name}
                      onClick={() =>
                        setSelectedSkill(
                          selectedSkill === skill.name ? null : skill.name
                        )
                      }
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all",
                        selectedSkill === skill.name
                          ? "bg-sintra-900 dark:bg-sintra-100 text-sintra-100 dark:text-sintra-900 border-sintra-900 dark:border-sintra-100"
                          : skill.color
                      )}
                    >
                      <span>{skill.emoji}</span>
                      <span>{skill.name.toLowerCase()}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-sintra-500 dark:text-sintra-400">
          Showing{" "}
          <span className="font-semibold text-sintra-900 dark:text-sintra-100">
            {filteredCases.length}
          </span>{" "}
          use cases
          {filteredCases.length !== useCases.length && (
            <span className="text-sintra-400">
              {" "}
              of {useCases.length}
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item, index) => {
              const id = `${item.domain}-${item.title}`;
              const isExpanded = expandedCard === id;

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  id={id}
                  onClick={() => setExpandedCard(isExpanded ? null : id)}
                  className={cn(
                    "group relative bg-white dark:bg-night-800 rounded-2xl border border-sintra-200 dark:border-night-700 overflow-hidden cursor-pointer transition-all duration-300",
                    "hover:shadow-xl hover:shadow-sintra-200/50 dark:hover:shadow-night-950/50",
                    "hover:border-aurora-purple/30 dark:hover:border-aurora-purple/30",
                    isExpanded && "ring-2 ring-aurora-purple/50"
                  )}
                >
                  {/* Card header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.skill_emoji}</span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            skillLevels.find(
                              (s) => s.name === item.skill_level
                            )?.color
                          )}
                        >
                          {item.skill_level.toLowerCase()}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.prompt, id);
                        }}
                        className="p-2 rounded-lg bg-sintra-100 dark:bg-night-700 text-sintra-600 dark:text-sintra-400 hover:bg-aurora-purple/10 hover:text-aurora-purple transition-all opacity-0 group-hover:opacity-100"
                      >
                        {copiedId === id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <h3 className="font-semibold text-sintra-900 dark:text-sintra-100 mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-sintra-500 dark:text-sintra-400 line-clamp-2 mb-3">
                      {item.best_for}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-sintra-100 dark:bg-night-700 text-xs text-sintra-600 dark:text-sintra-400"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-sintra-400">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-sintra-200 dark:border-night-700"
                      >
                        <div className="p-5 bg-sintra-50/50 dark:bg-night-900/50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-sintra-500 dark:text-sintra-400 uppercase tracking-wider">
                              Prompt
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(item.prompt, id);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aurora-purple/10 text-aurora-purple text-xs font-medium hover:bg-aurora-purple/20 transition-colors"
                            >
                              {copiedId === id ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-sm text-sintra-700 dark:text-sintra-300 font-mono whitespace-pre-wrap overflow-x-auto p-3 rounded-lg bg-white dark:bg-night-800 border border-sintra-200 dark:border-night-700">
                            {item.prompt}
                          </pre>

                          {item.source && (
                            <div className="mt-4 pt-4 border-t border-sintra-200 dark:border-night-700">
                              <p className="text-xs text-sintra-500 dark:text-sintra-400">
                                Source: {item.source}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand hint */}
                  {!isExpanded && (
                    <div className="px-5 pb-4">
                      <div className="flex items-center gap-1 text-xs text-sintra-400 dark:text-sintra-500">
                        <span>Click to expand</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredCases.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sintra-100 dark:bg-night-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-sintra-400" />
            </div>
            <h3 className="text-lg font-semibold text-sintra-900 dark:text-sintra-100 mb-2">
              No use cases found
            </h3>
            <p className="text-sintra-500 dark:text-sintra-400 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-sintra-900 dark:bg-sintra-100 text-sintra-100 dark:text-sintra-900 font-medium hover:opacity-90 transition-opacity"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sintra-200 dark:border-night-700 bg-white dark:bg-night-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-aurora-purple" />
              <span className="font-semibold text-sintra-900 dark:text-sintra-100">
                Sintra
              </span>
            </div>
            <p className="text-sm text-sintra-500 dark:text-sintra-400 text-center">
              Curated AI use cases for business, productivity, design, and development.
            </p>
            <p className="text-xs text-sintra-400">
              {useCases.length} use cases • 10 video sources
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
