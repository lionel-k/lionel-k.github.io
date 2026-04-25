import json
import sys

with open('_posts/2026-04-25-how-lingu-africa-led-me-to-apply-to-two-ai-competitions.md', 'r') as f:
    lines = f.readlines()

start = None
for i, line in enumerate(lines):
    if line.startswith('## Building Beyond an App'):
        start = i
        break
if start is None:
    sys.exit(1)
end = None
for i in range(start + 1, len(lines)):
    if lines[i].startswith('## Discovering the Competitions'):
        end = i
        break
if end is None:
    end = len(lines)

oldText = ''.join(lines[start:end])
print('OLD:', json.dumps(oldText))

newText = '''## Building Beyond an App

From the beginning, I knew lingu.africa couldn’t be just another language‑learning app. Language is culture. Culture is stories, proverbs, everyday situations, identity transmission. So I built features that reflected that:

- **Story‑based lessons** that teach Kirundi through family narratives, not isolated words.
- **Proverb collections** that carry wisdom and connect generations.
- **Everyday situation dialogues**—how to greet elders, how to talk about food, how to express emotion—that make language usable, not just academic.
- **Voice‑first interaction** because African languages are oral traditions; they’re meant to be heard and spoken.

### The AI Behind lingu.africa

Each of these features is powered by AI—but not in a generic, one‑size‑fits‑all way. I deliberately chose open‑source models that can be fine‑tuned on small, culturally specific datasets. Here’s how AI works under the hood:

- **Personalized learning paths:** The system analyzes a learner’s progress, mistakes, and engagement to adapt lesson difficulty and content. If a learner struggles with greetings, it offers more practice with elder‑greeting dialogues, not just more random vocabulary.

- **Culturally relevant content generation:** Using a fine‑tuned language model, lingu.africa generates new stories and proverbs that match Kirundi’s cultural context. The model is trained on a curated corpus of Kirundi texts, ensuring the generated content feels authentic, not generic.

- **Voice interaction:** Speech‑to‑text and text‑to‑speech models are fine‑tuned on Kirundi pronunciation and intonation patterns. This makes the voice features accurate for a language that most commercial speech APIs treat as an afterthought.

- **Adaptive feedback:** When a learner speaks a phrase, the AI evaluates pronunciation, suggests corrections, and explains why a certain intonation matters in Kirundi culture (e.g., the respect encoded in pitch when addressing elders).

This AI stack isn’t just about technology—it’s about enabling cultural transmission at scale. It’s what turns lingu.africa from a static app into a living, adapting companion for heritage‑language learners.

Each feature was a small step toward a bigger vision: lingu.africa as an AI‑powered cultural and educational project, not just a language app.

That vision is what made the two AI competitions feel like a natural fit.
'''
print('NEW:', json.dumps(newText))