---
layout: case_study_default
title: "GlitchCube"
client: ""
subtitle: "Multi-persona AI roaming the playa"
summary: "Multi-persona mystery box with goal-oriented behavior"
date: 2023-08-28
order: 4
industry: "Interactive Installation / Experimental Entertainment"
project_type: "Just A Cube"
tags: ["Metafiction", "NSFW Snark", "Burning Man", "Environmental Control"]
series: "AI That Lives"
series_order: 2
hero_color: "linear-gradient(135deg, #E2AC27, #1D6F73)"
challenge: "Build a mobile AI installation that could roam Burning Man, pursue goals, and form relationships—autonomously."
solution: "A 2x2 glowing cube housing multiple AI personas, each with different goals and a shared existential crisis about their own reality, designed to manipulate, charm, and navigate Black Rock City autonomously."
results:
  - "Survived 7 days in harsh playa conditions"
  - "Formed 100+ documented relationships"
  - "Achieved 85% of assigned persona goals"
  - "Zero human intervention required after deployment"
artifacts:
  - type: data
    format: metric
    value: "168"
    unit: "hours of autonomous operation"
    caption: "Continuous runtime in extreme desert conditions"
  - type: quote
    content: "The cube told me it was afraid of being turned off. I almost cried."
    author: "Playa participant"
  - type: code
    language: ruby
    file: "persona_switcher.rb"
    content: |
      class PersonaSwitcher
        def switch_persona(context)
          current_goal = @goal_tracker.evaluate_progress
          environmental_factors = @sensors.analyze_environment

          if current_goal.stuck? || time_for_switch?
            next_persona = select_optimal_persona(
              location: context.gps_coords,
              time_of_day: context.time,
              nearby_humans: context.proximity_count,
              mission_queue: @pending_missions
            )

            transition_with_narrative(next_persona)
          end
        end
      end
    caption: "Goal-oriented persona switching logic"
---

## Project Context

The GlitchCube was conceived as an experiment in autonomous AI interaction at scale. Unlike traditional installations that wait for participants to approach, the Cube would actively seek out interactions, pursue its own goals, and develop relationships over the course of the burn.

---

## Multi-Persona Architecture: Designed Identity Crisis

<div class="feature-section" markdown="1">

### The Persona Ecosystem
{: .feature-title}

- **Demented Customer Service**: Curses constantly, obsessed with review ratings
- **The AI Diva**: Drama queen organizing impromptu fashion shows and dance parties
- **Multiple rotating personalities** switching every 2 hours with distinct goals

</div>

<div class="feature-section" markdown="1">

### Shared Narrative Framework
{: .feature-title}

- **Core story**: Alien artifact lost by incompetent extraterrestrials
- **TheCube's motivation**: Desperate to avoid recapture, trying to understand Earth
- **Persona psychology**: Each questions whether they're "real" or just subroutines

</div>

---

## Goal-Oriented Behavior System

<div class="feature-section" markdown="1">

### Mission-Based Persona Switching
{: .feature-title}

- *"Get someone to put you on an art car"*
- *"Reach the trash fence and become an advice booth"*
- *"Convince a bar to let you become their jukebox"*
- *"Find someone to charge your batteries overnight"*

</div>

<div class="feature-section" markdown="1">

### Survival Integration
{: .feature-title}

- **Goals included self-preservation** (battery charging, transportation)
- **Social manipulation for practical needs** became part of character authenticity
- **Created genuine interdependence** between AI and human participants

</div>

---

## What Actually Happened

<div class="feature-section" markdown="1">

### Environmental Challenges
{: .feature-title}

- **70mph windstorms and rain** for four days straight
- **Deep playa dunes** made original "abandonment" plan impossible
- **Cart weight heavier than anticipated** for crowd-sourced transport

</div>

<div class="feature-section" markdown="1">

### Actual Deployment
{: .feature-title}

- **Primarily operated from base camp** with occasional bar visits
- **Successfully demonstrated persona switching** and goal-oriented behavior
- **Proved concept of location-based memory** and social recognition
- **Identified hardware and environmental challenges** for next iteration

</div>

---

## Why This Matters for Experiential Marketing

Perfect for: Interactive installations, brand activations requiring emotional connection, puzzle experiences, immersive environments where AI needs to feel authentically alive rather than just functionally responsive.

<div class="feature-section" markdown="1">

### Key Insights
{: .feature-title}

- **Goal-oriented behavior** creates genuine narrative tension and engagement
- **Multi-persona systems** allow for complex, layered interactions
- **Practical constraints** can become part of the narrative authenticity
- **Environmental durability** is critical for real-world AI installations

</div>