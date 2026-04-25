import json

oldText = "\nEach feature was a small step toward a bigger vision: lingu.africa as an AI‑powered cultural and educational project, not just a language app.\n"

newText = """\n### The AI Behind lingu.africa

Each of these features is powered by AI—but not in a generic, one‑size‑fits‑all way. I deliberately chose open‑source models that can be fine‑tuned on small, culturally specific datasets. Here’s how AI works under the hood:

- **Personalized learning paths:** The system analyzes a learner’s progress, mistakes, and engagement to adapt lesson difficulty and content. If a learner struggles with greetings, it offers more practice with elder‑greeting dialogues, not just more random vocabulary.

- **Culturally relevant content generation:** Using a fine‑tuned language model, lingu.africa generates new stories and proverbs that match Kirundi’s cultural context. The model is trained on a curated corpus of Kirundi texts, ensuring the generated content feels authentic, not generic.

- **Voice interaction:** Speech‑to‑text and text‑to‑speech models are fine‑tuned on Kirundi pronunciation and intonation patterns. This makes the voice features accurate for a language that most commercial speech APIs treat as an afterthought.

- **Adaptive feedback:** When a learner speaks a phrase, the AI evaluates pronunciation, suggests corrections, and explains why a certain intonation matters in Kirundi culture (e.g., the respect encoded in pitch when addressing elders).

This AI stack isn’t just about technology—it’s about enabling cultural transmission at scale. It’s what turns lingu.africa from a static app into a living, adapting companion for heritage‑language learners.

Each feature was a small step toward a bigger vision: lingu.africa as an AI‑powered cultural and educational project, not just a language app.\n"""

print("oldText JSON:", json.dumps(oldText))
print("newText JSON:", json.dumps(newText))