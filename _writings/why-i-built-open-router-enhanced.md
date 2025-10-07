---
title: "Duct Tape DSLs: Model Routing, Structured Outputs, and Typed Tools"
description: "Deploy a real-time character and you learn quickly: everything breaks, always, and in ways that don't exist in web-land."
date: 2024-12-20
tags:
  - tools
  - open-source
  - ai-ops
  - things-to-build
reading_time: 10
author: Eric Stiens
---

3 a.m. on the KWLX stream: Figment's mid-sentence about medieval polyphony when the model I was using goes down. The pipe goes silent. Dead air. The magic dies in 3000ms.

That outage convinced me traditional DevOps is the wrong ladder. I don't need five-nines uptime; I need creative-LLM-ops: cheap fallbacks that still sound like the same DJ, JSON that parses when the model hallucinates markdown, and cost-throttles that flip to a cheaper model before my budget explodes.

I need to be able to programatically test new models for the narrative enhancements, I need to programatically test all models under a certain price range to determine how decent they are at calling the custom tools I built. So many things I need...might as well start building one of them!

So, I forked [Obie Fernandez's OpenRouter gem](https://github.com/OlympiaAI/open_router) and bolted on the pieces. The repo is live, messy, un-enterprise, but it's driving real installations right now. Here's what it actually does, what it doesn't, and why that gap matters.

## The Problem: Character Work Breaks Different

Everyone's building chatbots that answer questions correctly. Some of us are building characters that need to stay consistent while controlling DMX lights, maintaining story continuity across weeks, and not dying when Claude decides to wrap valid JSON in triple backticks for no fucking reason.

If you've deployed a real-time AI character, you know the pain:

- **Model Musical Chairs**: New models drop every week, pricing changes overnight, your character's personality flips if you switch providers without rigorous testing
- **API Russian Roulette**: No fallback chains when your primary model provider goes down mid-conversation
- **JSON That Isn't**: Fighting malformed responses that crash something else when you send them in
- **Tool Calling Chaos**: Every model handles function calling slightly differently, and shouldn't our param types be...typed for the tool and for the prompt?
- **Budget Explosion**: No way to automatically switch to cheaper models when your installation starts costing more than rent

Meanwhile, I'm watching dozens of new models launch every month. How are you supposed to optimize across this chaos while your AI bartender is trying to serve drinks?

## open_router_enhanced: Duct Tape for Production Characters

I needed infrastructure that could adapt automatically. Built on Obie's solid foundation, I added a DSL around some stuff that i was tired of re-writing.

### 1. Smart Model Selection with Fallbacks

Hard-coding "gpt-4o" breaks the moment prices jump or the endpoint 500s. State the job, not the brand:

```ruby
# Find what you actually need
models = OpenRouter::ModelSelector.new
  .require(:function_calling)
  .choose_with_fallbacks(limit: 3)
# => ["openai/gpt-4o", "anthropic/claude-3-5-sonnet", "deepseek-chat"]

# Or optimize for budget
model = OpenRouter::ModelSelector.new
  .require(:function_calling)
  .within_budget(max_cost: 0.005)
  .choose
```

The gem pings OpenRouter's registry, filters on your capability list, and returns an ordered fallback chain. Swap at runtime without touching business logic. You can fitler out certain mdoels, optimize for certain providers, only use models published after a certain date and more.

### 2. Two Ways to Get Reliable JSON

Because LLMs love to mangle outputs, and your lighting controller doesn't care about their creativity.

**Auto-heal** for models that don't natively support structured output:

```ruby
OpenRouter.configure do |c|
  c.auto_heal_responses = true
  c.healer_model        = "gpt-4o-mini"
end
```

Receive malformed JSON → gem quietly ships it to the healer, sends clean structs upstream.

**Contracts** for models that do support structured output:

```ruby
user_schema = OpenRouter::Schema.define("user") do
  string :name, required: true
  integer :age,  minimum: 0, maximum: 150
end

response = client.complete(messages, response_format: user_schema)
```

If the model still flunks validation, the request retries; your app code never sees garbage, and you know what methods you can call on your output and what type you will get back.

### 3. Typed Tool-calling Without YAML Hell

Characters control lights, audio, DMX rigs, webhooks. One hallucinated enum value—'brightness: quite dim'—and your actuator crashes.

```ruby
light_tool = OpenRouter::Tool.define do
  name "control_lighting"
  parameters do
    string :zone,  enum: %w[stage audience ambient], required: true
    integer :brightness, minimum: 0, maximum: 100, required: true
  end
end
```

The gem builds the OpenAI-style function blob, injects it, parses the call, and validates before your handler runs. No more surprises because the LLM decided "color: purple" makes sense when it returned the proper HEX codes the previous 998 calls.

### 4. Cost Throttling That Won't Bankrupt a Pop-up Gallery

OpenRouter returns price-per-token - we can use that:

```ruby
cost = OpenRouter::ModelRegistry.calculate_estimated_cost(
  "anthropic/claude-3-5-sonnet",
  input_tokens: 2000,
  output_tokens: 1000
)

if cost > budget
  model = OpenRouter::ModelSelector.new
    .within_budget(max_cost: 0.005)
    .choose
end
```

LLM cost overruns are going to be a massive problem. Real-time logic that takes into account real-time and accumulated costs is a huge pain point.

## What's Not Happening Here

These are on the roadmap (and future posts), not solved today:

- **A/B testing**: no built‑in stats engine yet; still reading logs
- **Voice consistency across TTS**: cadence can drift; no perceptual guardrail yet
- **Character‑drift detection**: no automated "did Figment stay Figment?" suite
- **Narrative state management**: long‑horizon continuity still too manual
- **Multi‑character coordination**: shared world state without contradictions
- **Performance monitoring**: real‑time "authenticity"/engagement metrics

Each deserves its own layer of infrastructure. And, it's own blog post. I'll get to those soon!

## Why This Matters

Most LLM infrastructure optimizes for correctness—did the chatbot answer correctly? Character work requires operational reliability—did the AI maintain its role while successfully controlling real hardware without breaking the budget?

The infrastructure needs are completely different. Current tools optimize for accuracy metrics. I need tools that optimize for consistent behavior, reliable system integration, and graceful degradation when things go wrong.

We're all building the ladder while we climb. If you're patching the same holes, the repo is at [open_router_enhanced](https://github.com/estiens/open_router_enhanced) and the gem is on [RubyGems](https://rubygems.org/gems/open_router_enhanced). Open an issue or PR—we're making this up as we go, might as well do it together.

---

**Next in this series**: "Type-Safe Tool Calling: Why Your AI Character Needs Contracts, Not Prompts" - exploring how to make LLM-controlled hardware reliable enough for public installations.

This is part of the "Things to Build" series exploring the missing infrastructure for professional AI character development. Each post tackles a different operational challenge that current tools don't address—because we're all making this up as we go, and we might as well document what actually works.