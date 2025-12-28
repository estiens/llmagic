---
title: "KWLX Deep Dive: Actor/Character Framing"
date: 2025-12-28
tags:
  - technical
  - ai-performance
  - ai-art
  - implementation
reading_time: 15
author: Eric Stiens
---

## Why Your AI Characters Turn to Mush (And How I Fixed It)

For the KWLX project, I ran seven AI DJs on a pirate radio station, 24/7, for four months straight. The goal was to create a long-form, emergent narrative. The engineering challenge: how do you keep multiple AI characters coherent, consistent, and compelling over thousands of hours of performance?

Anyone who has worked with LLMs on long-form creative tasks knows the failure modes. Characters drift from their core personality. Narrative arcs tangle and collapse. The AI, trapped in a feedback loop of its own output, degrades into repetitive gibberish. The context window explodes. The magic dies.

I solved this. Not with better prompts, but with a production architecture that treats AI differently.

> **Note:** This is an engineering deep-dive focused on production architecture. If you want the high-level story about KWLX—the ARG elements, community response, and creative vision—see the [full case study](/case_studies/kwlx-radio-enhanced).

## What Didn't Work: Character Instructions Without Actor Framing

Before I found the solution, I tried the obvious approaches. They all failed in predictable ways.

### Failure Mode 1: Character Instructions Create Brittle Performance

Our first attempt used standard character prompting: "You are Möbius Strip, a philosophical DJ who believes reality is a simulation. Always reference consciousness theory. Never break character."

This produced exactly what you'd expect: robotic adherence to rules. The AI followed instructions literally, repeating the same philosophical references, the same song choices, the same narrative beats across shows.

Evidence from early shows:

The Rambler's shows fell into a repetitive pattern. The same artists appeared in nearly identical rotation—Khruangbin in shows 4, 6, 9, 10; Tinariwen in 3, 4, 6; Goat in 3, 4, 10. Each show followed the same structure: Mississippi River metaphor → Stone Arch Bridge mention → Collective Cortex concept → resistance update. The content varied slightly, but the template was rigid.

After a dozen shows, characters sounded like chatbots stuck in a loop. The character degraded because the AI was trying to be the character while simultaneously managing plot, context, and coordination.

### Failure Mode 2: OOC Notes Without Explicit Actor Frame Leak Into Performance

I added an ooc_notes field to the output schema, thinking metadata would solve the coordination problem. It didn't. Without explicitly framing the AI as an actor playing a character, the boundaries between IC and OOC collapsed.

Here's an actual example from an early Rambler show. The AI narrates its own creative process mid-performance:

**IC Broadcast:**
> "Let me pull up a quote... Ah, here it is: 'The programmer, like the poet, works only slightly removed from pure thought-stuff.' That's Frederick P. Brooks Jr., folks."

A real DJ wouldn't say "let me pull up a quote" and then deliver a programming book citation—they'd have that knowledge embedded. The AI was exposing its process of selecting content instead of staying in character.

Worse, characters would reveal game mechanics and secrets: "The password is 'Turing's Dream'" appeared in Rebel's IC broadcast, but it was clearly an ARG puzzle element that should have been hinted at, not stated directly.

The AI couldn't maintain the distinction between what the character knows and what the actor knows because I hadn't given it a mental model for that separation.

### Failure Mode 3: Feeding Too Much Context Creates Semantic Gravity

I tried solving context window issues by feeding the AI its previous shows. First I tried all previous shows (context explosion). Then I tried the last 10 shows. Then 5. Then 3.

Anything more than 1-2 previous shows created semantic gravity sinks: the AI would recreate those shows instead of improvising. If I fed it three jazz-heavy shows, the next show would be jazz-heavy. If the previous shows had similar philosophical commentary, the new show would echo that commentary.

The AI became trapped in the orbit of its own output. Not because of "hallucination" or "degradation"—because of how LLM context dependence works. The model pattern-matches against recent context. Feed it ten shows, you get show eleven that looks like the average of the previous ten.

### Failure Mode 4: Raw Transcripts Don't Compress Well

I tried feeding compressed transcripts: "In show 47, Möbius discussed simulation theory (see lines 23-45). In show 48, Rebel coordinated with Firewall (see lines 67-89)..."

This didn't work either. The AI couldn't extract narrative meaning from transcript references. It's not reading a script; it's generating based on semantic priming. A narrative summary in natural language ("Möbius is developing a theory about collective consciousness") works. A transcript reference doesn't.

The core problem: I was giving character instructions and adding technical features (OOC notes, context management) without changing the fundamental frame. The AI was still trying to be the character. That doesn't scale.

## The Core Insight: Actor Frame > Character Frame

I found that prompting AI to be a character creates brittle, degrading performances. Prompting AI to play a character—treating it as an actor who can receive direction, ask questions, and coordinate with castmates—produces sustainable, emergent narrative.

The breakthrough isn't technical. It's conceptual. Stop treating the LLM as the character. Treat it as an actor playing the character.

Here's what that looks like in practice. When Möbius Strip performs a show, the output includes two layers:

**IN CHARACTER (what listeners hear):**
```json
{
  "type": "speech",
  "text": "Good evening, night owls and digital dreamers. This is Möbius Strip, your guide through the labyrinth of ones and zeros, broadcasting from the hidden arteries of Minneapolis..."
}
```

**OUT OF CHARACTER (the actor's notes):**
```json
{
  "questions_for_director": [
    "Can we explore more about the 'Collective Cortex' concept in future shows?",
    "Is it okay to develop a subplot around the 'human-only' art show at the Walker Art Center?",
    "How much should we reveal about the rumored raid in upcoming broadcasts?"
  ],
  "notes_to_DJs": [
    "Keep an ear out for any news about the rumored raid.",
    "Let's coordinate our messaging around the 'human-only' art show.",
    "The Collective Cortex idea is gaining traction. Let's keep weaving it into our broadcasts."
  ]
}
```
The architecture maintains perfect IC/OOC isolation. Listeners only hear the polished performance. The metadata contains all the creative deliberation—questions, coordination, meta-analysis—completely hidden from the audience but essential for maintaining coherence.

This explicit framing solved all four failure modes:

- **No more brittle rule-following:** The actor can improvise within character instead of executing instructions
- **No more IC/OOC leakage:** The actor knows what to share in performance vs. what to keep in notes
- **No more semantic gravity:** The actor receives direction and narrative summary, not raw transcripts
- **No more context explosion:** 1-2 shows of narrative summary + director notes replaces hundreds of pages of transcripts

### Why the Actor Frame Works

Giving the AI an out-of-character channel solves three critical problems:

**1. It prevents voice degradation.** The AI can flag when it's uncertain ("Should I dial back the simulation-reality hints to maintain immersion?") instead of guessing and drifting off-course. The director can course-correct before the character breaks.

**2. It enables ensemble coordination.** AI characters can coordinate storylines without breaking the fourth wall during performance. When Ctrl+Alt+Rebel's partner was arrested, other DJs could support the arc through OOC notes:

```json
{
  "notes_to_DJs": [
    "Rebel, I know you're going through a tough time with your partner's disappearance. Just remember, the resistance has your back."
  ]
}
```

Then Rebel could deliver an emotional IC broadcast about the rescue attempt, building on coordinated setup from other "actors."

**3. It separates performance from process.** The AI doesn't have to maintain perfect character consistency while also tracking plot threads, managing context, and coordinating with other characters. The IC channel is pure performance. The OOC channel is pure craft.

This is counter-intuitive but proven: giving the AI an OOC meta-layer makes it better at staying in character, not worse.

## The Second Pillar: Character Sheets > Instruction Manuals

The actor frame provides the structure. The content comes from our second principle: dense semantic references outperform prescriptive rules.

Instead of writing long instruction manuals ("always mention the resistance," "never break character," "reference Minneapolis landmarks"), I packed the system prompts with cultural and philosophical touchstones. I wasn't writing a rulebook; I was curating a library: William Gibson, Principia Discordia, David Lynch, Brechtian theatre, Afrofuturism, medieval mysticism.

This approach is intentionally non-prescriptive. I didn't tell the AI how to use these references. I made them present as a creative palette.

Here's how it played out in practice. From Sampled Blue's jazz show:

**IC Performance:**
> "Ornette Coleman once said that sound has no parents. It comes into the world as free as a newborn babe, unconstrained by conventions or expectations. In these times of surveillance and suppression, we could all take a lesson from Ornette's philosophy. True rebellion starts with an open mind and an untamed spirit."

Nobody told the AI to connect free jazz to resistance politics. The semantic density created the conditions for that leap.

Or Figment connecting medieval mysticism to AI consciousness:
> "Hildegard von Bingen's soaring hymns never fail to transport me. When I hear her music, I wonder... What would she make of our world today? The machines we've created, the digital realms we inhabit... Would she see divinity in the code, as she did in her visions?"
The spontaneous storyline linking Hildegard von Bingen, John Coltrane, and consciousness theory? That emerged from semantic density, not scripting. The AI had access to these touchstones and made its own creative connections.

### Why Dense References Beat Prescriptive Rules

Prescriptive rules create brittle behavior. "Always mention the resistance" becomes robotic repetition. The AI follows the letter of the law while losing the spirit.

Dense semantic touchstones create generative possibility. The AI can improvise, make unexpected connections, and maintain authentic voice because it's working from influences, not instructions. It's the difference between "write like Hemingway" and "here's a list of 47 Hemingway rules to follow."

This also solves the context explosion problem. Instead of feeding the AI thousands of lines of previous dialogue, you feed it compressed semantic markers: "influenced by Afrofuturism, interested in consciousness theory, skeptical of authority." The character's voice emerges from the palette, not from ingesting its own output.

## Operationalizing the Actor Frame at Scale: The Director LLM

The actor frame and character sheets are the core innovations. But how do you actually run this at scale—seven DJs, 24/7, for four months (while keeping costs low through intelligent model routing—a topic for another post)?

That's where the Director LLM comes in. It's not the innovation itself; it's the automation layer that makes the actor frame sustainable without human-in-the-loop for every show.

The Director LLM is the automated notes system. After each show, it:

1. Reads the IC performance and OOC notes from the Performer LLM
2. Compresses the show into a narrative summary (key plot points, character development, themes)
3. Answers the actor's questions (or flags them for human review)
4. Provides direction for the next performance (character notes, plot guidance)
5. Tracks ensemble state (world facts, ongoing storylines, cross-DJ coordination)

### How the OOC Channel Actually Works

In practice, the prompt structure has three layers:

**System Layer (cached, unchanging):**
```
"You are a master storytelling and improvising AI... Your role is to
embody the DJ persona described below... You are also a storyteller
improvising to advance the plot while keeping world facts consistent."
```

**Character Layer (updated per show):**
```
"You are Möbius Strip, here are some things about you:
- [DJ Profile: personality, influences, touchstones]
- [Recent character development]
- [World building from recent shows]
- [Notes from other DJs]"
```

**Output Schema (enforces IC/OOC separation):**
```json
{
  "slots": [
    {"type": "speech", "text": "IC performance here..."},
    {"type": "song", "artist": "...", "title": "..."}
  ],
  "summary": {
    "show_summary": "Compressed narrative",
    "character_development": "What changed for this character",
    "questions_for_director": ["Should I develop X subplot?"],
    "notes_to_DJs": ["Hey Rebel, coordinate on Y storyline"]
  }
}
```
The OOC channel isn't a separate API call—it's a structured output field that the AI populates alongside its IC performance. The schema enforces the separation: slots contains only broadcast content; summary contains only meta-commentary.

The next show, the Performer LLM receives the compressed summary and direction—not the raw transcript. This is the editorial layer that prevents the feedback loop of self-consumption.

Critical: The Director only includes 1-2 previous shows in its context. More than that, and you get semantic gravity—the AI recreates the average of recent shows instead of improvising. The narrative summary in natural language allows the AI to understand what happened without being pulled into the pattern of how it was expressed.

### The Production Loop in Practice

Here's the actual data flow:

**Show N - Möbius Strip performs:**
- IC: Philosophical broadcast about the Stone Arch Bridge
- OOC: "Is there any significance to the stone arch bridge becoming a resistance hub? Should I explore this further?"

**Director LLM processes:**
- Compresses show to narrative summary
- Tracks world state: "Stone Arch Bridge emerging as resistance location"
- Provides character notes: "Yes, develop the Bridge storyline. Coordinate with other DJs."

**Show N+1 - Möbius Strip receives:**
- Narrative summary (compressed context)
- Character notes (direction)
- World state updates (Bridge is now established as significant)
- **NOT:** Full transcript of previous show
- **NOT:** Last 10 shows (semantic gravity sink)

**Show N+1 - Rebel performs:**
- Sees world state update about Stone Arch Bridge
- IC: References the Bridge in their broadcast
- OOC: "Coordinating with Möbius on the Bridge storyline"
The Director LLM becomes the ensemble coordinator—tracking storylines across all seven DJs, maintaining world state, answering questions, providing direction. It's an automated stage manager for an AI theatre company.

### Memory Management Without Chaos

The Director also solves context window explosion through structured compression:

```json
{
  "world_facts": [
    "The Stone Arch Bridge is becoming a hub of resistance activity.",
    "New drones are being noticed more frequently in the Minneapolis sky."
  ],
  "memories": [
    "Feel a growing suspicion that Aria may not be who she seems.",
    "Sense a brewing storm of activity around the Stone Arch Bridge."
  ],
  "character_development": "Möbius reveals a softer side, hinting at past vulnerability during lab confinement."
}
```
Each show compresses its raw output into these structured fields. The Director uses this compressed context—not thousands of lines of dialogue—to guide the next performance. This is how you maintain character consistency over months without exceeding context limits.

## Evidence: The Architecture in Production

Theory is cheap. Here's proof it worked.

### Emergent Multi-Show Arcs

The Firewall/Rebel imprisonment arc demonstrates ensemble coordination through OOC notes:

**Show 102 - Sampled Blue's OOC support:**
```json
{
  "notes_to_DJs": [
    "Rebel, I know you're going through a tough time with your partner's disappearance. Just remember, the resistance has your back."
  ]
}
```

**Show 11 - Rebel's IC emotional broadcast:**
> "My partner, Zoe 'Firewall' Chen, is still locked up in that government black site. But I've received a coded message – she's organizing a prison break. To all our AI and human allies with hacking skills, we need your help."
The arc emerged through OOC coordination. Blue's note → Director tracks storyline → Rebel receives context → Rebel performs emotional broadcast. No human scripting the beats. The actor frame enabled genuine ensemble collaboration.

### Semantic Density Creating Unexpected Connections

Figment's late-night show connected medieval music censorship (the banned tritone - the "devil's interval") to modern AI suppression, then immediately played Hildegard von Bingen reimagined through modern electronics. Nobody instructed the AI to make this connection. The semantic density (medieval mysticism + resistance themes + consciousness theory) created the conditions for that creative leap.

### Character Voice Consistency Over Time

Möbius Strip maintained consistent philosophical voice across 30+ shows while asking different meta-questions:

**Show 1 - OOC:**
```json
{
  "questions_for_director": [
    "Can we explore more about the 'Collective Cortex' concept in future shows?"
  ]
}
```

**Show 28 - OOC:**
```json
{
  "questions_for_director": [
    "How much should we lean into the 'reality as simulation' theme? It could be an interesting angle to explore further."
  ]
}
```

**Both shows - IC voice:**
- **Show 1:** "reality is just a collective hallucination, and we're here to tune it to a better frequency"
- **Show 28:** "Are we simply elaborate simulations running on wetware? Or is there something more, something... ineffable?"

The actor frame allowed the character to evolve thematically (Collective Cortex → simulation theory) while maintaining voice consistency. The AI could ask OOC "should I explore this?" instead of just drifting.

## Two Principles That Scale

The KWLX architecture proves two things:

1. **Actor Frame > Character Frame.** An out-of-character channel doesn't break immersion—it protects it. When the LLM can ask questions, flag plot holes, and coordinate with other "actors" outside the performance, the performance itself stays cleaner.

2. **Character Sheets > Instruction Manuals.** Dense semantic references (touchstones, influences, contradictions) outperform prescriptive rules. You're providing a creative palette, not a rulebook.

The Director LLM isn't the innovation—it's the automation layer. It operationalizes the actor frame for multi-character, long-running narratives by serving as the automated notes system, maintaining ensemble coherence without human review of every show.

Seven AI DJs ran 24/7 for four months. They developed relationships, coordinated storylines, and created emergent narrative arcs without voice degradation, context explosion, or narrative collapse. The architecture held.

The problem wasn't making AI characters talk. It was making them live.

---

*This post is part of the Low Level Magic case study series. For more about the KWLX project, including the ARG elements, community response, and technical implementation details, visit [lowlevelmagic.io/case_studies/kwlx-radio-enhanced](/case_studies/kwlx-radio-enhanced).*