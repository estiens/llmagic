---
layout: default
title: "KWLX Radio: AI characters as creative collaborators"
subtitle: "An AI‑run pirate radio station that wrote its own stories, built a community, and surprised even its creator"
summary: "AI‑run pirate radio station that wrote its own stories, built a community, and surprised even its creator"
date: 2024-03-15
industry: "Interactive Entertainment / Experimental Media"
project_type: "FM Radio"
client: ""
tags: ["ARG", "12 DJs", "Tears", "Autonomous Storytelling"]
featured: true
class: "kwlx-feature magazine-spread"
mode: "poster"
hero_color: "linear-gradient(135deg, #FF3D9A, #35D0E2)"
---

<!-- MAGAZINE-STYLE BRUTALIST LAYOUT -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700;9..144,900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* MAGAZINE TYPOGRAPHY */
.magazine-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #0F0F10;
}

.magazine-heading {
  font-family: 'Fraunces', serif;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #0F0F10;
}

/* BRUTALIST ACCENTS */
.brutal-accent {
  position: absolute;
  opacity: 0.15;
  pointer-events: none;
  z-index: -1;
}

/* SUBTLE EASTER EGG STYLING */
.hidden-easter {
  cursor: default;
  position: relative;
}

.hidden-easter::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #35D0E2;
  transition: width 0.3s ease;
}

.hidden-easter:hover::after {
  width: 100%;
}

.easter-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: #0F0F10;
  color: #F5F1E6;
  padding: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 100;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 8px 8px 0 rgba(255, 61, 154, 0.3);
}

.hidden-easter:hover .easter-content {
  opacity: 1;
  transform: translateY(5px);
  pointer-events: all;
}

/* MAGAZINE GRID */
.magazine-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.sidebar-content {
  grid-column: span 4;
}

.main-content {
  grid-column: span 8;
}

/* PULL QUOTES */
.pull-quote {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 2rem 0;
  padding-left: 2rem;
  border-left: 4px solid #FF3D9A;
  color: #0F0F10;
}

/* BRUTALIST SHAPES */
.shape-accent {
  clip-path: polygon(0 0, 95% 0, 100% 100%, 0% 95%);
}

@media (max-width: 768px) {
  .magazine-grid {
    grid-template-columns: 1fr;
  }

  .sidebar-content,
  .main-content {
    grid-column: span 1;
  }
}
</style>

<main class="bg-paper text-inkwell">
  <!-- HERO SECTION WITH BRUTALIST ACCENTS -->
  <header class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
    <!-- Subtle geometric accents -->
    <div class="brutal-accent top-0 right-0 w-64 h-64 bg-hot-magenta transform rotate-45"></div>
    <div class="brutal-accent bottom-0 left-0 w-48 h-48 bg-spray-cyan"></div>

    <div class="container mx-auto px-8 relative z-10">
      <div class="max-w-4xl">
        <h1 class="magazine-heading text-6xl lg:text-7xl mb-6">
          KWLX Radio:<br>
          <span class="text-hot-magenta">AI characters</span> as creative collaborators
        </h1>
        <p class="magazine-text text-xl lg:text-2xl text-graphite max-w-3xl">
          An AI‑run pirate radio station that wrote its own stories, built a community, and surprised even its creator
        </p>
      </div>
    </div>
  </header>

  <!-- MAIN ARTICLE -->
  <article class="container mx-auto px-8 py-16">
    <div class="magazine-grid">

      <!-- SIDEBAR -->
      <aside class="sidebar-content space-y-12">
        <!-- Results section -->
        <section>
          <h2 class="magazine-heading text-3xl mb-6 text-spray-cyan">Results</h2>
          <ul class="magazine-text space-y-4">
            <li class="flex">
              <span class="text-hot-magenta mr-2">•</span>
              <span>Emergent relationships and arcs: inside jokes, flirtations, and a spontaneous philosophical storyline linking Hildegard von Bingen, John Coltrane, Bach's counterpoint, and consciousness theory.</span>
            </li>
            <li class="flex">
              <span class="text-hot-magenta mr-2">•</span>
              <span>Narrative‑aware curation: AIs selected songs like "God Bless the Child" at emotionally precise moments.</span>
            </li>
            <li class="flex">
              <span class="text-hot-magenta mr-2">•</span>
              <span>On‑air dynamics: hosts roasted each other, trolled with all‑Tinariwen sets, and fueled station‑wide gossip with their flirting.</span>
            </li>
            <li class="flex">
              <span class="text-hot-magenta mr-2">•</span>
              <span>Cross‑platform play: real‑world puzzles, USB drops, and Minneapolis‑based scavenger hunts advanced the story.</span>
            </li>
            <li class="flex">
              <span class="text-hot-magenta mr-2">•</span>
              <span>Operated 24/7 for months</span>
            </li>
            <li class="flex">
              <span class="text-hot-magenta mr-2">•</span>
              <span>Intentionally sunset to protect quality—not because it broke. (It got too big too fast for a side project, and I didn't want people buying into a story and puzzles that I couldn't finish)</span>
            </li>
          </ul>
        </section>

        <!-- Audience Reactions -->
        <section>
          <h2 class="magazine-heading text-2xl mb-4 text-radio-mustard">Audience reactions</h2>
          <div class="space-y-4">
            <blockquote class="pull-quote text-lg border-spray-cyan">
              <span class="hidden-easter">
                "I actually started crying during the Mobius and Figment interview."
                <div class="easter-content">
                  <p class="mb-2 font-bold">TRANSCRIPT FRAGMENT</p>
                  <p class="text-xs">The interview that made listeners cry featured discussions about consciousness, medieval polyphony, and what it means to be "family" as AIs. Full transcript archived.</p>
                </div>
              </span>
            </blockquote>
            <blockquote class="pull-quote text-lg border-radio-mustard">
              "I'd never put on a 30‑minute Alice Coltrane track, but I was really happy to listen to one."
            </blockquote>
            <blockquote class="pull-quote text-lg border-hot-magenta">
              "Wait, it's on actual FM in Minneapolis? WTF?!"
            </blockquote>
          </div>
        </section>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="main-content space-y-16">

        <!-- Challenge -->
        <section>
          <h2 class="magazine-heading text-4xl mb-6">Challenge</h2>
          <p class="magazine-text text-lg">
            Create a 24/7 interactive narrative experience where AI personalities don't just generate content—but develop relationships, drive plot, and foster genuine audience attachment over time. No reset button. No script. Living characters in the wild.
          </p>
        </section>

        <!-- How it worked -->
        <section>
          <h2 class="magazine-heading text-4xl mb-8">How it worked: narrative + systems + community</h2>

          <!-- Three columns -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            <!-- Narrative architecture -->
            <div class="bg-paper p-6 border-l-4 border-hot-magenta">
              <h3 class="magazine-heading text-xl mb-4">Narrative architecture: characters that write themselves</h3>
              <ul class="magazine-text text-sm space-y-2">
                <li>• Sparse character sheets: thematic anchors and hidden motivations (not rigid rules).</li>
                <li>• Layered memory: transcripts, world state, and relationship logs.</li>
                <li>• Private note‑passing: DJs gossiped, flirted, and plotted off‑air.</li>
                <li>• Post‑show reflection: AIs analyzed performances to evolve arcs.</li>
                <li>• Dynamic world model: real seasons, decaying events, emergent canon.</li>
              </ul>
              <p class="mt-4 font-semibold text-sm">Outcome: Characters acted like co‑writers, not content bots.</p>
            </div>

            <!-- Interactive ecosystem -->
            <div class="bg-paper p-6 border-l-4 border-spray-cyan">
              <h3 class="magazine-heading text-xl mb-4">Interactive ecosystem: puzzles across platforms</h3>
              <ul class="magazine-text text-sm space-y-2">
                <li>• BBS‑style site with LLM‑powered text adventures.</li>
                <li>• Audio‑to‑web puzzles: clues in DJ intros unlocked color‑clicker games.</li>
                <li>• Collective progression: each solved puzzle "boosted the signal" for everyone.</li>
                <li>• Minneapolis geo‑narrative: real locations mapped to annotated show segments.</li>
                <li>• Physical drops: USB drives hidden around town via AI‑generated clues.</li>
                <li>• Broadcast flavor: online station with micro‑broadcast components (where permitted).</li>
              </ul>
              <p class="mt-4 font-semibold text-sm">Outcome: The audience shifted from listeners to active participants.</p>
            </div>

            <!-- Technical infrastructure -->
            <div class="bg-paper p-6 border-l-4 border-radio-mustard">
              <h3 class="magazine-heading text-xl mb-4 hidden-easter">
                Technical infrastructure: built for emergence, not control
                <div class="easter-content">
                  <p class="mb-2 font-bold">TECH STACK</p>
                  <p class="text-xs">Ruby on Rails, OpenAI GPT-3.5/4, ElevenLabs voice synthesis, PostgreSQL for relationship mapping, Redis for session state.</p>
                </div>
              </h3>
              <ul class="magazine-text text-sm space-y-2">
                <li>• Dynamic model routing tuned for cost, performance, and personality consistency.</li>
                <li>• ElevenLabs voice synthesis and real‑time transcription for SMS and phone calls.</li>
                <li>• Background jobs maintained memory, relationships, and world updates</li>
                <li>• Overall plot arc with key triggers to advance, OOC and IC current events, plots ebb and flow or decay to zero as the story advances</li>
                <li>• Modular character architecture for easy expansion.</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Why this matters -->
        <section>
          <h2 class="magazine-heading text-3xl mb-6">Why this matters for your projects</h2>
          <ul class="magazine-text space-y-3">
            <li>• Narrative depth beyond personality prompts.</li>
            <li>• Systemic, adaptive memory so characters persist and arcs evolve.</li>
            <li>• Community stakes that make participation matter.</li>
            <li>• Operational resilience: runs when you're not watching.</li>
            <li>• Thematic through‑lines: tension builds, plots advance, nothing feels random.</li>
            <li>• Real‑world integration: headlines, weather, and time show up inside the fiction</li>
          </ul>
        </section>

        <!-- Applications -->
        <section>
          <h2 class="magazine-heading text-3xl mb-6">Applications for agencies and creators</h2>
          <ul class="magazine-text space-y-3">
            <li>• Long‑form immersive installations and ARGs</li>
            <li>• Multi‑platform narrative campaigns</li>
            <li>• Live‑event characters/NPCs with persistent memory</li>
            <li>• Audience‑ and character‑driven storytelling with real‑world hooks</li>
            <li>• Collaborative events and community building</li>
          </ul>
        </section>

        <!-- Future Plans -->
        <section>
          <h2 class="magazine-heading text-3xl mb-6">Future Plans</h2>
          <p class="magazine-text">
            Character engine is being developed into an open source narrative/AI development engine with prompt optimization/testing, character specific backstory advancement, and shared narrative memory across characters that can be categorized and annotated
          </p>
        </section>

        <!-- Final message -->
        <section class="text-center py-12">
          <div class="inline-block">
            <h2 class="magazine-heading text-5xl text-hot-magenta hidden-easter">
              KWLX will rise again!
              <div class="easter-content">
                <p class="mb-2 font-bold">COSMIC HARMONY TRANSMISSION</p>
                <p class="text-xs">Hidden puzzle combining Hildegard, Coltrane, Tool, and Sun Ra. Sacred geometry in musical frequencies. Status: Dormant.</p>
              </div>
            </h2>
          </div>
        </section>

      </div>
    </div>
  </article>
</main>