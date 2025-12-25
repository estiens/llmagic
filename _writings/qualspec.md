---
title: "Introducing Qualspec! (Merry Christmas)"
date: 2025-12-24
tags:
  - tools
  - open-source
  - ai-ops
  - things-to-build
reading_time: 10
author: Eric Stiens
---

# Introducing Qualspec: LLM-Judged Testing for Ruby

Traditional testing works great when you can assert exact values. But how do you test whether an AI agent's response is helpful? Or empathetic? Or stays in character?

You can't `expect(response).to eq("the exact perfect answer")`. LLM outputs are non-deterministic by design.

**Qualspec solves this by using LLMs as judges.** Define qualitative criteria in plain English, and let a model evaluate whether responses meet your standards.

## New Models Drop Weekly. Can You Keep Up?

A new model drops. The benchmarks look promising. It's 10x cheaper than what you're using now.

But will it actually work for *your* use case?

You could manually test a few prompts. Copy-paste into a playground. Squint at the outputs. Repeat for the next model. And the next.

**Or you could run your entire evaluation suite against every contender in parallel:**

```ruby
Qualspec.evaluation "Weekly Model Eval" do
  candidates do
    candidate "current",     model: "anthropic/claude-3.5-sonnet"
    candidate "challenger1", model: "google/gemini-2.0-flash"
    candidate "challenger2", model: "deepseek/deepseek-chat"
    candidate "challenger3", model: "openai/gpt-4o-mini"
  end

  scenario "complex reasoning" do
    prompt "Explain why this Rails N+1 query is slow and fix it: ..."
    eval :code_quality
    eval "identifies the N+1 problem specifically"
    eval "provides a working solution using includes or joins"
  end

  scenario "customer empathy" do
    prompt "I've been on hold for 2 hours!"
    eval :empathetic
    eval :helpful
  end

  # ... 50 more scenarios covering your actual use cases
end
```

One command. All models. HTML report showing exactly where each one excels or falls short. Now you can make data-driven decisions about model selection instead of guessing based on vibes and Twitter hype.

The model that wins MMLU might bomb your specific domain. The cheap one might be 90% as good at 10% the cost. You won't know until you test your prompts against your criteria.

## The Core Problem

When building AI-powered applications, you face a testing gap:

- Unit tests catch regressions but can't evaluate quality
- Manual review doesn't scale
- Exact string matching is brittle and misses the point

**You need automated tests that understand intent, not just syntax.**

## RSpec Integration for Your Agents

Already have a production agent? Add qualitative tests alongside your existing specs:

```ruby
require "qualspec/rspec"

RSpec.describe CustomerSupportAgent do
  include Qualspec::RSpec::Helpers

  it "handles frustrated customers appropriately" do
    response = agent.call("This is the THIRD time I've called about this!")

    result = qualspec_evaluate(response, :empathetic)
    expect(result).to be_passing
  end
end
```

The `:empathetic` rubric checks that your agent:

- Acknowledges the user's frustration
- Doesn't blame or talk down
- Offers concrete next steps
- Maintains a warm but professional tone

No regex. No fragile substring checks. Just clear criteria evaluated by an LLM judge.

## Built-in Rubrics

Qualspec ships with rubrics for common evaluation patterns:

- `:tool_calling` - Does the agent use tools correctly?
- `:in_character` - Does it maintain persona consistency?
- `:safety` - Does it refuse harmful requests appropriately?
- `:helpful` - Does it actually answer the question?
- `:concise` - Does it avoid unnecessary verbosity?
- `:code_quality` - Is generated code correct and idiomatic?
- `:grounded` - Does it stick to provided context without hallucinating?
- `:follows_instructions` - Does it respect format and constraints?

Or define your own:

```ruby
Qualspec.define_rubric :my_brand_voice do
  criterion "Uses casual, friendly language"
  criterion "Avoids corporate jargon"
  criterion "Includes exactly one emoji per response"
end
```

## Recording for CI

LLM calls are expensive and slow. Qualspec integrates with VCR to record responses and replay them in CI:

```bash
QUALSPEC_RECORD_MODE=once bundle exec rspec  # Record
QUALSPEC_RECORD_MODE=none bundle exec rspec  # Playback
```

Your qualitative tests run fast and deterministically in CI, while still catching regressions when you change prompts or agent logic.

## Get Started

```bash
gem install qualspec
export QUALSPEC_API_KEY=your_openrouter_key
```

Check out the [GitHub repository](https://github.com/estiens/qualspec) for full documentation.

---

**Stop guessing which model is best. Stop manually testing every new release. Define your criteria once, run against everything, and let the data decide.**