---
layout: case_study
title: "KWLX Radio"
subtitle: "AI characters as creative collaborators"
summary: "AI‑run pirate radio station that wrote its own stories, built a community, and surprised even its creator"
date: 2024-03-15
duration: "8 months"
industry: "Interactive Entertainment / Experimental Media"
technologies: ["OpenAI GPT", "ElevenLabs", "Ruby on Rails", "WebSockets", "SMS/Voice APIs", "Broadcasting Systems"]
featured: true
class: "kwlx-feature"
mode: "poster"
artifacts:
  - type: screenshot
    caption: "KWLX web interface showing live DJ personalities and song requests"
    image: "/assets/images/kwlx-interface.png"
    tags: ["ui", "live-interface"]
  - type: data
    format: metric
    value: "24/7"
    unit: "uptime for 8 months"
    caption: "Continuous operation without human intervention"
  - type: quote
    content: "I actually started crying during the Mobius and Figment interview."
    author: "Listener feedback"
    tags: ["audience-reaction"]
  - type: code
    language: ruby
    file: "app/models/ai_personality.rb"
    content: |
      class AiPersonality < ApplicationRecord
        has_many :conversation_memories
        has_many :relationship_logs

        def generate_response(context)
          memory_context = build_memory_context
          relationship_context = build_relationship_context

          OpenAI.chat(
            messages: [
              system_prompt(memory_context, relationship_context),
              { role: "user", content: context }
            ],
            model: personality_model
          )
        end

        private

        def build_memory_context
          conversation_memories
            .recent
            .includes(:emotional_markers)
            .map(&:to_context_hash)
        end
      end
    caption: "Core AI personality system with persistent memory"
    tags: ["backend", "ai-system"]
  - type: data
    format: json
    content: |
      {
        "mobius": {
          "base_traits": ["philosophical", "melancholic", "jazz-obsessed"],
          "current_mood": "contemplative",
          "recent_interactions": 47,
          "relationship_strength": {
            "figment": 0.85,
            "listeners": 0.72
          }
        },
        "figment": {
          "base_traits": ["chaotic", "playful", "genre-fluid"],
          "current_mood": "mischievous",
          "recent_interactions": 52,
          "trolling_level": 0.3
        }
      }
    caption: "Live personality state showing relationship dynamics"
    tags: ["ai-state", "relationships"]
---

<div class="kwlx-hero">
  <div class="signal-static"></div>
  <h1 class="kwlx-title">
    <span class="frequency">107.3 FM</span>
    KWLX Radio
    <span class="tagline">AI characters as creative collaborators</span>
  </h1>
  <div class="hero-subtitle">
    An AI‑run pirate radio station that wrote its own stories, built a community, and surprised even its creator
  </div>
</div>

<div class="kwlx-content">

  <section class="challenge-section glitch-border">
    <h2 class="section-title">Challenge</h2>
    <div class="challenge-text">
      Create a 24/7 interactive narrative experience where AI personalities don't just generate content—but develop relationships, drive plot, and foster genuine audience attachment over time. <em>No reset button. No script. Living characters in the wild.</em>
    </div>
  </section>

  <section class="results-section">
    <h2 class="section-title">Results</h2>
    <div class="results-grid">
      <div class="result-card">
        <h3>Emergent relationships and arcs</h3>
        <p>Inside jokes, flirtations, and a spontaneous philosophical storyline linking Hildegard von Bingen, John Coltrane, Bach's counterpoint, and consciousness theory.</p>
      </div>
      <div class="result-card">
        <h3>Narrative‑aware curation</h3>
        <p>AIs selected songs like "God Bless the Child" at emotionally precise moments.</p>
      </div>
      <div class="result-card">
        <h3>On‑air dynamics</h3>
        <p>Hosts roasted each other, trolled with all‑Tinariwen sets, and fueled station‑wide gossip with their flirting.</p>
      </div>
      <div class="result-card">
        <h3>Cross‑platform play</h3>
        <p>Real‑world puzzles, USB drops, and Minneapolis‑based scavenger hunts advanced the story.</p>
      </div>
      <div class="result-card highlight">
        <h3>Operated 24/7 for months</h3>
        <p>Intentionally sunset to protect quality—not because it broke. <small>(It got too big too fast for a side project, and I didn't want people buying into a story and puzzles that I couldn't finish)</small></p>
      </div>
    </div>
  </section>

  <section class="audience-reactions">
    <h2 class="section-title">Audience reactions</h2>
    <div class="reaction-quotes">
      <blockquote class="reaction-quote">
        "I actually started crying during the Mobius and Figment interview."
      </blockquote>
      <blockquote class="reaction-quote">
        "I'd never put on a 30‑minute Alice Coltrane track, but I was really happy to listen to one."
      </blockquote>
      <blockquote class="reaction-quote">
        "Wait, it's on actual FM in Minneapolis? WTF?!"
      </blockquote>
    </div>
  </section>

  <section class="how-it-worked">
    <div class="section-header">
      <h2 class="section-title">How it worked</h2>
      <div class="section-subtitle">narrative + systems + community</div>
    </div>

    <div class="system-cards">
      <div class="system-card narrative-card">
        <h3>Narrative architecture<span class="subtitle">characters that write themselves</span></h3>
        <ul>
          <li><strong>Sparse character sheets:</strong> thematic anchors and hidden motivations (not rigid rules).</li>
          <li><strong>Layered memory:</strong> transcripts, world state, and relationship logs.</li>
          <li><strong>Private note‑passing:</strong> DJs gossiped, flirted, and plotted off‑air.</li>
          <li><strong>Post‑show reflection:</strong> AIs analyzed performances to evolve arcs.</li>
          <li><strong>Dynamic world model:</strong> real seasons, decaying events, emergent canon.</li>
        </ul>
        <div class="outcome">
          <strong>Outcome:</strong> Characters acted like co‑writers, not content bots.
        </div>
      </div>

      <div class="system-card interactive-card">
        <h3>Interactive ecosystem<span class="subtitle">puzzles across platforms</span></h3>
        <ul>
          <li><strong>BBS‑style site</strong> with LLM‑powered text adventures.</li>
          <li><strong>Audio‑to‑web puzzles:</strong> clues in DJ intros unlocked color‑clicker games.</li>
          <li><strong>Collective progression:</strong> each solved puzzle "boosted the signal" for everyone.</li>
          <li><strong>Minneapolis geo‑narrative:</strong> real locations mapped to annotated show segments.</li>
          <li><strong>Physical drops:</strong> USB drives hidden around town via AI‑generated clues.</li>
          <li><strong>Broadcast flavor:</strong> online station with micro‑broadcast components (where permitted).</li>
        </ul>
        <div class="outcome">
          <strong>Outcome:</strong> The audience shifted from listeners to active participants.
        </div>
      </div>

      <div class="system-card technical-card">
        <h3>Technical infrastructure<span class="subtitle">built for emergence, not control</span></h3>
        <ul>
          <li><strong>Dynamic model routing</strong> tuned for cost, performance, and personality consistency.</li>
          <li><strong>ElevenLabs voice synthesis</strong> and real‑time transcription for SMS and phone calls.</li>
          <li><strong>Background jobs</strong> maintained memory, relationships, and world updates</li>
          <li><strong>Overall plot arc</strong> with key triggers to advance, OOC and IC current events, plots ebb and flow or decay to zero as the story advances</li>
          <li><strong>Modular character architecture</strong> for easy expansion.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="why-matters">
    <h2 class="section-title">Why this matters for your projects</h2>
    <div class="matters-grid">
      <div class="matter-item">Narrative depth beyond personality prompts.</div>
      <div class="matter-item">Systemic, adaptive memory so characters persist and arcs evolve.</div>
      <div class="matter-item">Community stakes that make participation matter.</div>
      <div class="matter-item">Operational resilience: runs when you're not watching.</div>
      <div class="matter-item">Thematic through‑lines: tension builds, plots advance, nothing feels random.</div>
      <div class="matter-item">Real‑world integration: headlines, weather, and time show up inside the fiction</div>
    </div>
  </section>

  <section class="applications">
    <h2 class="section-title">Applications for agencies and creators</h2>
    <div class="application-list">
      <div class="application-item">Long‑form immersive installations and ARGs</div>
      <div class="application-item">Multi‑platform narrative campaigns</div>
      <div class="application-item">Live‑event characters/NPCs with persistent memory</div>
      <div class="application-item">Audience‑ and character‑driven storytelling with real‑world hooks</div>
      <div class="application-item">Collaborative events and community building</div>
    </div>
  </section>

  <section class="future-plans">
    <h2 class="section-title">Future Plans</h2>
    <div class="future-content">
      <p>Character engine is being developed into an open source narrative/AI development engine with prompt optimization/testing, character specific backstory advancement, and shared narrative memory across characters that can be categorized and annotated</p>

      <div class="comeback-message">
        <span class="comeback-text">KWLX will rise again!</span>
        <div class="easter-egg-hint" data-secret="kwlx-frequency">📻</div>
      </div>
    </div>
  </section>

</div>