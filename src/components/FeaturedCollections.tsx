"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, getCollectionItems, type Collection } from "@/lib/collections";
import { type UseCase } from "@/lib/data";
import ExpandedCard from "./ExpandedCard";

function CollectionCard({ collection, onExplore }: {
  collection: Collection;
  onExplore: (c: Collection) => void;
}) {
  const items = getCollectionItems(collection);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onExplore(collection)}
      className="group flex flex-col gap-4 rounded-2xl border p-6 text-left w-full transition-all duration-200 hover:scale-[1.015] hover:shadow-lg bg-[#0A0817] border-white/[0.07] hover:border-white/20"
      style={{ "--col": collection.color } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{collection.icon}</span>
          <div>
            <h3 className="font-serif text-[18px] text-fg-1 leading-tight">{collection.title}</h3>
            <p className="font-mono text-[10px] text-fg-4 mt-0.5">{items.length} prompts</p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.06em] text-fg-4 group-hover:text-current transition-colors"
          style={{ color: collection.color, opacity: 0.7 }}
        >
          Explore <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      {/* Tagline */}
      <p className="font-sans text-[13px] text-fg-3 leading-[1.5]">{collection.tagline}</p>

      {/* Preview titles */}
      <div className="flex flex-col gap-1.5 mt-auto">
        {items.slice(0, 3).map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: collection.color, opacity: 0.6 }} />
            <span className="font-sans text-[12px] text-fg-3 truncate">{item.title}</span>
          </div>
        ))}
        {items.length > 3 && (
          <span className="font-mono text-[10px] text-fg-4 pl-3">+{items.length - 3} more</span>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="h-px w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${collection.color}, transparent)` }} />
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25 }}
      className="mt-8 rounded-2xl border border-white/[0.1] bg-[#0A0817] overflow-hidden"
    >
      {/* Panel header */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onOpenItem(item, items)}
            className="group flex flex-col gap-2 rounded-xl border p-4 text-left transition-all hover:border-white/20 bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: collection.color }}>
                {item.difficulty}
              </span>
            </div>
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

export default function FeaturedCollections() {
  const [openCollection, setOpenCollection] = useState<Collection | null>(null);
  const [expandedItem, setExpandedItem] = useState<UseCase | null>(null);
  const [expandedItems, setExpandedItems] = useState<UseCase[]>([]);

  const handleOpenItem = (item: UseCase, items: UseCase[]) => {
    setExpandedItem(item);
    setExpandedItems(items);
  };

  return (
    <section className="relative py-20 px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Section header */}
      <div className="flex items-center gap-3.5 mb-3">
        <span className="w-9 h-px bg-gradient-to-r from-transparent to-violet-bright" />
        <span className="eyebrow violet">Curated Collections</span>
      </div>
      <h2 className="font-serif font-light text-[clamp(28px,4vw,48px)] leading-[1.08] tracking-[-0.02em] text-fg-1 mb-3">
        Browse by goal.
      </h2>
      <p className="font-sans text-[15px] text-fg-3 max-w-lg leading-[1.55] mb-10">
        Hand-picked prompts for common workflows — grab a full toolkit, not just a single prompt.
      </p>

      {/* Collection cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {COLLECTIONS.map(c => (
          <CollectionCard
            key={c.id}
            collection={c}
            onExplore={col => setOpenCollection(prev => prev?.id === col.id ? null : col)}
          />
        ))}
      </div>

      {/* Expanded panel */}
      {openCollection && (
        <CollectionPanel
          collection={openCollection}
          onClose={() => setOpenCollection(null)}
          onOpenItem={handleOpenItem}
        />
      )}

      <ExpandedCard
        item={expandedItem}
        onClose={() => setExpandedItem(null)}
        items={expandedItems}
      />
    </section>
  );
}
