---
title: "Open Router Enhanced: Updated to 1.2"
date: 2025-12-24
tags:
  - tools
  - open-source
  - ai-ops
  - things-to-build
reading_time: 10
author: Eric Stiens
---

## OpenRouter Enhanced 1.2: What's New (and Why It Matters for Character Work)

A few months ago I wrote about [why I built Open Router Enhanced](https://lowlevelmagic.io/writings/why-i-built-open-router-enhanced/)—the 3 a.m. model outage that killed a DJ character mid-sentence, the JSON hallucinations that broke DMX light commands, the general chaos of creative-LLM-ops. The gem was born from necessity: when you're running live AI characters that control real hardware, you need infrastructure that doesn't assume you're building a chatbot.

Since then, the gem has grown. Here's what's new and why it matters.

## The Quick Version

If you're already using OpenRouter Enhanced, here's the headline: version 1.2 adds full Responses API support with tool calling, and 1.1 added server-side JSON healing that actually works.

If you're not using it yet—keep reading.

## What OpenRouter Enhanced Actually Does

OpenRouter gives you access to hundreds of models through one API. OpenRouter Enhanced makes that API usable for production Ruby applications.

```ruby
client = OpenRouter::Client.new

response = client.complete([
  { role: "user", content: "You're a noir detective. Describe this room." }
], model: "anthropic/claude-sonnet-4")
```

Switch `anthropic/claude-sonnet-4` to `openai/gpt-4o` or `google/gemini-2.0-flash-001`. Your code doesn't change. When Anthropic has an outage at 2 a.m., you swap models and keep running.

That's table stakes. Here's what makes it actually useful for character work.

## New in 1.2: Responses API with Reasoning

OpenRouter's Responses API is now fully supported. The interesting part for character applications: configurable reasoning effort.

```ruby
response = client.responses(
  "The user just insulted the bartender. How does she respond?",
  model: "anthropic/claude-sonnet-4",
  reasoning: { effort: "high" }
)

puts response.reasoning  # See the model's thought process
puts response.content    # The actual response
```

For characters that need to maintain complex internal state—emotional arcs, relationship history, goals—having access to the reasoning chain is genuinely useful. You can log it, debug with it, even feed it back into context for consistency.

## New in 1.2: Tool Calling That Works Across APIs

Tool calling now works identically whether you're using Chat Completions or Responses API:

```ruby
dmx_tool = OpenRouter::Tool.define do
  name "set_lights"
  description "Control DMX lighting"
  parameters do
    integer :channel, required: true
    integer :value, required: true, minimum: 0, maximum: 255
  end
end

response = client.responses(
  "The mood shifts darker. Adjust the lighting.",
  model: "openai/gpt-4o",
  tools: [dmx_tool]
)

results = response.execute_tool_calls do |call|
  dmx.set(call.arguments[:channel], call.arguments[:value])
end
```

The 1.2.1 patch fixed an idempotency bug where tool results could register multiple times with different IDs—the kind of subtle issue that breaks multi-turn tool conversations in production.

## New in 1.1: JSON That Actually Parses

This was the big one. Getting structured JSON from LLMs is notoriously unreliable. Models hallucinate markdown fences, add trailing commas, forget closing braces. When that JSON controls stage lighting or audio routing, you need it to parse.

OpenRouter now has a server-side response-healing plugin that repairs malformed JSON with under 1ms latency. We enable it automatically:

```ruby
response = client.complete(
  messages,
  model: "anthropic/claude-sonnet-4",
  response_format: {
    type: "json_schema",
    json_schema: lighting_command_schema
  }
)
# JSON is healed server-side before it reaches you
```

No extra API calls, no client-side retry loops. The JSON just works.

For cases where native healing isn't enough, client-side healing still kicks in as a fallback—but we rarely need it now.

## The Rest of the Toolkit

Beyond the new stuff:

- **Smart Model Selection**: Pick models by capability, cost, or context window with a fluent DSL
- **Fallback Routing**: Automatic failover when your primary model is down
- **Streaming**: Real-time responses with callbacks for chunks and completion
- **Usage Tracking**: Token counting and cost analytics per request
- **Model Registry**: Local caching with capability detection

## Who This Is For

If you're building a RAG chatbot or a customer service bot, you probably don't need this. The standard OpenRouter client is fine.

But if you're building characters—AI entities that maintain personality, control hardware, run in real-time, and absolutely cannot fail silently—this is the infrastructure layer that handles the operational chaos so you can focus on the creative work.

```ruby
# Gemfile
gem 'open_router_enhanced'
```

The code is on [GitHub](https://github.com/estiens/open_router_enhanced). Contributions welcome. The code is still a bit messy in places—we're making this up as we go, like everyone else in this space.