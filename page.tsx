"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, User, BookOpen, X, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const allStories = [
  {
    id: 0,
    title: "The Architecture of a Perfect Quill",
    excerpt: "A visual glossary of the grades. Understanding the structural integrity and peeling techniques that define the Alba, Continental, and Mexican grades of Ceylon Cinnamon.",
    date: "Jan 28, 2024",
    author: "Editorial Board",
    image: "/gallery/IMG_7825.jpg",
    category: "Featured",
    readingTime: "15 min",
    content: `
      <p>A cinnamon quill is not just a rolled piece of bark; it is a structural marvel. To the untrained eye, they appear similar, but to the connoisseur, the tightness of the scroll and the thinness of the bark tell a story of origin and skill.</p>
      <br/>
      <h3>The Alba: The Gold Standard</h3>
      <p>The Alba grade represents the pinnacle of the peeler's art. Sourced from the tenderest shoots, these quills are rolled so tightly they resemble a solid pencil. The bark is paper-thin, allowing for a quick release of flavor and a brittle snap that releases a burst of sweet aroma. It is the champagne of spices.</p>
      <br/>
      <h3>Technique as Tradition</h3>
      <p>Creating these quills involves a technique known as "telescoping," where smaller quills are inserted into larger ones to form a continuous, seamless tube. This prevents breakage and preserves the essential oils in the hollow center. It is a method unique to Sri Lanka, unchanged for centuries.</p>
    `
  },
  {
    id: 1,
    title: "The Silent Rise of Ceylon Quills",
    excerpt: "An in-depth analysis of the 2024 export trends. Why the European market is pivoting back to authentic Cinnamomum zeylanicum.",
    date: "Jan 15, 2024",
    author: "Sarah Van Dort",
    image: "/gallery/IMG_7805.jpg",
    category: "Market Insights",
    readingTime: "8 min",
    content: `
      <p>In the mist-shrouded highlands of Sri Lanka, a quiet revolution is taking root. For decades, the global cinnamon market has been flooded with Cassia—a cheaper, coarser substitute often mislabeled as true cinnamon. But as European and North American consumers become more discerning about provenance and health, the demand for authentic <em>Cinnamomum zeylanicum</em> is experiencing an unprecedented resurgence.</p>
      <br/>
      <h3>The Cassia Effect</h3>
      <p>The distinction is not merely botanical; it is a matter of health and flavor. Cassia contains high levels of coumarin, a compound that can be toxic in large doses. Ceylon cinnamon, by contrast, is virtually free of coumarin and possesses a delicate, complex flavor profile that has been prized by chefs and perfumers for centuries.</p>
      <br/>
      <h3>A Benefit for the Highlands</h3>
      <p>This shift in global preference is breathing new life into the communities of the Ratnapura and Galle districts. Smallholder farmers, who once struggled against industrial scaling, are now finding their artisanal methods valued at a premium.</p>
    `
  },
  {
    id: 2,
    title: "The Chemical Poetry of Scent",
    excerpt: "Decoding the differences between True Cinnamon and Cassia through coumarin content and aromatic volatile oils.",
    date: "Jan 02, 2024",
    author: "Dr. Kamal Silva",
    image: "/gallery/IMG_7811.jpg",
    category: "Science",
    readingTime: "5 min",
    content: `
      <p>Scent is chemistry, and the chemistry of Ceylon Cinnamon is a masterpiece of nature. Unlike its rougher cousin Cassia, which is dominated by cinnamaldehyde alone, True Cinnamon contains a symphony of over 80 distinct chemical compounds, including eugenol and linalool, which give it floral and citrus notes.</p>
      <br/>
      <h3>The Coumarin Question</h3>
      <p>The most critical chemical distinction lies in coumarin. Cassia bark can contain up to 1% coumarin, a blood-thinning compound. Ceylon Cinnamon typically contains less than 0.004%. This stark difference makes Ceylon Cinnamon the only safe choice for daily wellness consumption.</p>
      <br/>
      <h3>Volatile Magic</h3>
      <p>Our recent gas chromatography analysis reveals that the "sweetness" of Ceylon Cinnamon comes not from sugar, but from the complex interaction of these volatile oils — a chemical poem written by the soil and sun of Sri Lanka.</p>
    `
  },
  {
    id: 3,
    title: "Daughters of the Southern Soil",
    excerpt: "Meet the master artisans of Matara. How our collective initiative is rewriting the narrative of female empowerment in the spice trade.",
    date: "Dec 20, 2023",
    author: "Shamalka Edirisinghe",
    image: "/gallery/IMG_7828.jpg",
    category: "Heritage",
    readingTime: "12 min",
    content: `
      <p>In the cinnamon industry, the peeler is king—or historically, queen. The delicate art of separating the inner bark from the outer layer without breaking the quill requires a dexterity that has traditionally been maintained by the women of the Southern Province.</p>
      <br/>
      <h3>Rewriting the Narrative</h3>
      <p>For too long, this skilled labor was undervalued. The new "Southern Soil" collective initiative is changing that. By establishing fixed fair-trade wages and providing specialized healthcare for the repetitive strain issues common in peeling, we are ensuring that this ancient craft remains a viable and dignified livelihood.</p>
      <br/>
      <h3>The Matara Standard</h3>
      <p>These women are not just workers; they are artisans. The "Alba" grade quill—no thicker than a pencil—is the ultimate test of a peeler's skill. It takes years to master.</p>
    `
  }
];

const categories = ["All", "Featured", "Market Insights", "Science", "Heritage"];

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<typeof allStories[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredStory = allStories[0];
  const gridStories = allStories.slice(1);

  const filteredGrid = activeCategory === "All"
    ? gridStories
    : allStories.filter(s => s.category === activeCategory && s.id !== 0);

  const showFeatured = activeCategory === "All" || activeCategory === "Featured";

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden transition-colors duration-500">

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />

      {/* ─── HEADER ─── */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-background transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-bold tracking-[0.8em] uppercase text-[10px] mb-6 block">The Sovereign Journal</span>
            <h1 className="text-5xl md:text-[7rem] font-serif font-light leading-none mb-8 tracking-tighter">
              Essays from <span className="italic text-foreground/40">the Heartland.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto font-light leading-relaxed italic border-x border-border/40 px-8 md:px-12 font-serif">
              "A curated collection of observations, scientific research, and artisanal portraits from the epicenter of the world's finest spice."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER ─── */}
      <section className="sticky top-[80px] z-[60] py-5 border-y border-border/40 backdrop-blur-md bg-background/80 transition-all duration-500">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/40 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED STORY ─── */}
      <AnimatePresence>
        {showFeatured && (
          <motion.section
            key="featured"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-16 md:py-24"
          >
            <div className="container px-4">
              <div className="mb-8 flex items-center gap-4">
                <div className="w-8 h-px bg-primary" />
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-[9px]">Cover Story</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedStory(featuredStory)}
                className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-card aspect-[3/4] md:aspect-[21/9] group cursor-pointer border border-border/40 transition-colors duration-500 shadow-2xl"
              >
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-[3s] ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                {/* Top badge row */}
                <div className="absolute top-10 left-10 md:top-14 md:left-14 flex items-center gap-4 z-10">
                  <span className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-[0.3em]">
                    {featuredStory.category}
                  </span>
                  <span className="flex items-center gap-2 text-foreground/50 text-[9px] font-bold uppercase tracking-widest">
                    <Clock size={10} /> {featuredStory.readingTime} read
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute inset-x-10 bottom-10 md:inset-x-14 md:bottom-14 z-10 max-w-3xl">
                  <h2 className="text-4xl md:text-7xl font-serif font-light text-foreground mb-6 leading-[0.9] tracking-tighter">
                    {featuredStory.title.split(" ").slice(0, 3).join(" ")} <br />
                    <span className="italic text-foreground/50">{featuredStory.title.split(" ").slice(3).join(" ")}</span>
                  </h2>
                  <p className="text-foreground/50 font-light font-serif italic text-lg mb-8 max-w-xl hidden md:block">
                    "{featuredStory.excerpt}"
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                      <BookOpen size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground group-hover:translate-x-2 transition-transform duration-500">
                      Begin Reading
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PULL QUOTE INTERLUDE ─── */}
      {showFeatured && (
        <section className="py-20 border-y border-border/20 bg-background transition-colors duration-500">
          <div className="container px-4">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-12 h-px bg-primary mx-auto mb-10" />
              <p className="text-3xl md:text-5xl font-serif font-light italic text-foreground/30 leading-relaxed tracking-tight mb-10">
                "The quill is not just a spice — it is a living record of soil, of hands, and of centuries of whispered knowledge."
              </p>
              <div className="w-12 h-px bg-primary mx-auto mt-10" />
            </motion.blockquote>
          </div>
        </section>
      )}

      {/* ─── JOURNAL GRID ─── */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          {filteredGrid.length > 0 && (
            <div className="mb-12 flex items-center gap-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary font-bold tracking-[0.5em] uppercase text-[9px]">
                {activeCategory === "All" ? "From the Archive" : activeCategory}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
            {filteredGrid.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 border border-border/40 bg-card">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-70 group-hover:opacity-100 transition-all duration-[2s] ease-out"
                  />
                  {/* Category badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/40 text-primary text-[8px] font-bold uppercase tracking-[0.3em]">
                      {story.category}
                    </span>
                  </div>
                  {/* Hover read overlay */}
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-foreground text-[10px] font-bold uppercase tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ArrowRight size={16} className="text-primary" />
                      Read Story
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-5 text-[8px] font-bold uppercase tracking-widest text-foreground/30">
                  <span className="flex items-center gap-1.5"><Calendar size={10} className="text-primary/60" /> {story.date}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground/10" />
                  <span className="flex items-center gap-1.5"><User size={10} className="text-primary/60" /> {story.author}</span>
                  <span className="ml-auto flex items-center gap-1.5"><Clock size={10} /> {story.readingTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-light mb-4 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground/45 font-light font-serif italic text-sm leading-relaxed border-l border-border/40 pl-5 mb-6 flex-1">
                  "{story.excerpt}"
                </p>

                {/* Read CTA */}
                <div className="flex items-center gap-3 text-primary text-[9px] font-bold uppercase tracking-[0.4em] pt-6 border-t border-border/20 group-hover:gap-5 transition-all duration-300">
                  <ArrowRight size={14} />
                  <span>Read Article</span>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredGrid.length === 0 && (
            <div className="text-center py-32 text-foreground/30">
              <p className="text-xl font-serif italic">No stories in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── STORY READER MODAL ─── */}
      <AnimatePresence>
        {selectedStory && (
          <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StoryModal({ story, onClose }: { story: typeof allStories[0], onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12"
    >
      <div className="absolute inset-0 bg-background/92 backdrop-blur-3xl" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl bg-card rounded-[3rem] border border-border/40 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Hero image */}
        <div className="relative h-64 md:h-80 w-full shrink-0">
          <Image src={story.image} alt={story.title} fill className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-md border border-border/40 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary hover:text-primary-foreground transition-all transform hover:rotate-90 z-20"
          >
            <X size={18} />
          </button>
          {/* Title over image */}
          <div className="absolute bottom-8 left-8 md:left-12 right-8 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-[0.3em] mb-4">
              {story.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground leading-tight tracking-tighter">
              {story.title}
            </h2>
          </div>
        </div>

        {/* Content scroll area */}
        <div className="overflow-y-auto flex-1 p-8 md:p-12">
          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-border/40 text-[9px] font-bold uppercase tracking-widest text-foreground/35">
            <span className="flex items-center gap-2"><Calendar size={12} className="text-primary" /> {story.date}</span>
            <span className="flex items-center gap-2"><User size={12} className="text-primary" /> {story.author}</span>
            <span className="flex items-center gap-2 ml-auto"><Clock size={12} className="text-primary" /> {story.readingTime} read</span>
          </div>

          {/* Article body */}
          <div
            className="prose prose-invert prose-lg max-w-none text-foreground/60 font-light font-serif leading-loose [&_h3]:text-foreground [&_h3]:font-serif [&_h3]:font-light [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:tracking-tight [&_em]:text-primary [&_em]:not-italic"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Footer */}
          <div className="mt-16 pt-10 border-t border-border/40 flex justify-center">
            <Button
              onClick={onClose}
              className="bg-primary hover:bg-foreground hover:text-background text-primary-foreground rounded-full h-14 px-12 text-[10px] font-bold uppercase tracking-[0.3em] transition-all"
            >
              Back to Journal
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
