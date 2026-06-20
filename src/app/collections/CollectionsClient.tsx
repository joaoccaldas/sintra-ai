"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { COLLECTIONS, getCollectionItems, type Collection } from "@/lib/collections";
import { type UseCase, BASE_PATH } from "@/lib/constants";
import ExpandedCard from "@/components/ExpandedCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

function CollectionCard({ collection, isOpen, onToggle }: {
  collection: Collection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const items = getCollectionItems(collection);
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onToggle}
      className="group flex flex-col gap-4 rounded-2xl border p-6 text-left w-full transition-all duration-200 hover:border-violet/30"
      style={{
        background: isOpen ? "rgba(159,140,255,0.06)" : "rgba(255,255,255,0.02)",
        borderColor: isOpen ? "rgba(159,140,255,0.35)" : "rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{collection.icon}</span>
          <div>
            <h3 className="font-serif text-[18px] text-fg-1 leading-tight">{collection.title}</h3>
            <p className="font-mono text-[10px] text-fg-4 mt-0.5">{items.length} prompts</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.06em] text-fg-4 group-hover:text-violet-bright transition-colors">
          {isOpen ? "Close" : "Explore"} <ArrowRight size={10} className={`transition-transform ${isOpen ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
        </span>
      </div>

      <p className="font-sans text-[13px] text-fg-3 leading-[1.5]">{collection.tagline}</p>

      <div className="flex flex-col gap-1.5 mt-auto">
        {items.slice(0, 3).map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-violet/60 shrink-0" />
            <span className="font-sans text-[12px] text-fg-3 truncate">{item.title}</span>
          </div>
        ))}
        {items.length > 3 && (
          <span className="font-mono text-[10px] text-fg-4 pl-3">+{items.length - 3} more</span>
        )}
      </div>
    </motion.button>
  );
}

function CollectionPanel({ collection, onClose, onOpenItem }: {
  collection: Collection;
  onClose: () => void;
  onOpenItem: (item: UseCase, items: UseCase[]) => void;
}) {
  const items = getCollectionItems(collection);
  return (
    <motion.div
      key="collection-panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22 }}
      className="mt-4 rounded-2xl border border-white/[0.1] bg-white/[0.02] overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <span className="text-xl">{collection.icon}</span>
          <div>
            <h3 className="font-serif text-[20px] text-fg-1">{collection.title}</h3>
            <p className="font-sans text-[13px] text-fg-3">{collection.tagline}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-[11px] tracking-[0.08em] uppercase text-fg-4 hover:text-fg-1 transition-colors"
        >
          Close ×
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onOpenItem(item, items)}
            className="group flex flex-col gap-2 rounded-xl border p-4 text-left transition-all hover:border-violet/30 hover:bg-violet/[0.04] bg-white/[0.02] border-white/[0.06]"
          >
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-violet/70">{item.difficulty}</span>
            <h4 className="font-serif text-[15px] text-fg-1 leading-tight group-hover:text-violet-bright transition-colors">
              {item.title}
            </h4>
            <p className="font-sans text-[12px] text-fg-3 leading-[1.45] line-clamp-2">
              {item.outcome || item.desc}
            </p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function CollectionsClient() {
  const [openCollection, setOpenCollection] = useState<Collection | null>(null);
  const [expandedItem, setExpandedItem] = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  return (
    <div className="min-h-screen bg-abyss text-fg-1">
      <Header total={USE_CASES_COUNT} />

      <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-fg-4 mb-10">
          <Link href={`${BASE_PATH}/`} className="hover:text-fg-2 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-fg-2">Collections</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
          <span className="eyebrow violet">Curated Collections</span>
        </div>
        <h1 className="font-serif font-light text-[clamp(28px,4vw,52px)] leading-[1.08] tracking-[-0.02em] text-fg-1 mb-3">
          Browse by goal.
        </h1>
        <p className="font-sans text-[15px] text-fg-3 max-w-lg leading-[1.55] mb-14">
          Hand-picked prompts for common workflows — grab a full toolkit, not just a single prompt.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLECTIONS.map(c => (
            <div key={c.id}>
              <CollectionCard
                collection={c}
                isOpen={openCollection?.id === c.id}
                onToggle={() => setOpenCollection(prev => prev?.id === c.id ? null : c)}
              />
              <AnimatePresence>
                {openCollection?.id === c.id && (
                  <CollectionPanel
                    collection={c}
                    onClose={() => setOpenCollection(null)}
                    onOpenItem={(item, items) => { setExpandedItem(item); setExpandedItems(items); }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <ExpandedCard
        item={expandedItem}
        onClose={() => setExpandedItem(null)}
        items={expandedItems}
      />
    </div>
  );
}
