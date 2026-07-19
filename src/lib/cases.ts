/**
 * THE CASES — the four real jobs behind the hanging sheets. The viewer's
 * anatomy comes from the prototype (context-first meta rail, plate hero,
 * THE BRIEF / THE NERVE, specimen duo, outcome figures, a quote, the NEXT
 * PROOF handoff); the prototype shipped it with invented clients, and this
 * file retires the fiction. Facts trace to the legacy case copy
 * (src/data/projects.ts) and the WorkIndex rows — nothing is claimed the
 * data can't back, and nobody is invented to praise the work: every quote
 * is pulled from the shop's own paper (handover notes, the dev log, the
 * pitch to myself).
 *
 * House mark law: no em dashes on the sheet — machine fields take the
 * middot, prose writes colons, hyphens and periods; en dashes only in
 * ranges. The pens (notes) stay lowercase, two hands, as everywhere.
 */

export interface CaseNote {
  pen: "hand-k" | "hand-b";
  pos: "n-pv1" | "n-pv2" | "n-pv3";
  text: string;
}

export interface Case {
  client: string;
  role: string;
  stack: string;
  when: string;
  brief: string;
  nerve: string;
  made: string[];
  outcome: Array<[string, string]>;
  quote: string;
  attr: string;
  notes: CaseNote[];
}

export const CASES: Case[] = [
  /* 01 · UVEEC · REF//UVE-24 */
  {
    client: "UVic Environmental Engineering Club",
    role: "Front-end · Rebuild · Handover",
    stack: "Next.js · TypeScript · Tailwind",
    when: "2024 · one developer",
    brief:
      "The club’s site had rotted in the usual ways: broken components, drifting content, and a Teams page hardcoded so tightly that a roster change meant a pull request. The ask was plain: make it modern, make it maintainable, make it survive the next handover.",
    nerve:
      "No rewrite. The constraint was to fix the ship at sea, so I audited the whole codebase and touched nothing until the map was done. Then the Teams page became data: structured types, reusable cards, a roster the club edits without opening a component. A mobile-first pass replaced the breakpoint roulette, images went through the framework’s own press, and the site shipped with documentation the next maintainer can actually read.",
    made: [
      "Full code audit, mapped",
      "Data-driven Teams system",
      "Mobile-first responsive pass",
      "Maintainer documentation",
    ],
    outcome: [
      ["0", "CODE CHANGES TO UPDATE THE ROSTER"],
      ["1", "LEGACY CODEBASE, KEPT AFLOAT"],
      ["100%", "OF PAGES, FINALLY RESPONSIVE"],
    ],
    quote:
      "“The best feature is the one the next maintainer never has to ask about.”",
    attr: "HANDOVER NOTES, LAST PAGE",
    notes: [
      { pen: "hand-k", pos: "n-pv1", text: "the audit found things. we don’t discuss the audit." },
      { pen: "hand-b", pos: "n-pv2", text: "a roster change is a data change. as it should be." },
      { pen: "hand-k", pos: "n-pv3", text: "left the docs better than i found the code." },
    ],
  },
  /* 02 · RELAY · REF//RLY-25 */
  {
    client: "In-house · the client is me",
    role: "Product design · Full-stack · Both sides of the ticket",
    stack: "Next.js · TypeScript · Postgres · Prisma",
    when: "Ongoing · in development",
    brief:
      "Team tools come in two sizes: toys that run out of road, and cockpits nobody wants to board. Relay is the wager that project management can stay simple and still move in real time: tasks, boards, presence, all live, all at once.",
    nerve:
      "The websockets fought back: every live update wanted to re-render the world. I built an event layer that batches the socket’s opinions and lets React reconcile on my schedule, not the wire’s. Optimistic UI everywhere, so the interface commits first and apologizes rarely. The schema is drawn for features that don’t exist yet, on purpose.",
    made: [
      "Real-time sync layer",
      "Drag-and-drop boards",
      "Postgres schema · Prisma models",
      "Optimistic UI system",
    ],
    outcome: [
      ["<1s", "MOST OPERATIONS, ROUND TRIP"],
      ["1", "RENDER PER BATCH, NOT PER EVENT"],
      ["0", "LOST UPDATES UNDER CONCURRENCY"],
    ],
    quote: "“It updates before you doubt it.”",
    attr: "THE PITCH, TO MYSELF",
    notes: [
      { pen: "hand-k", pos: "n-pv1", text: "drag-and-drop broke twice. the second time built character." },
      { pen: "hand-b", pos: "n-pv2", text: "the schema knows about features i haven’t written yet." },
      { pen: "hand-k", pos: "n-pv3", text: "ongoing. relay never quite lands. that’s the point." },
    ],
  },
  /* 03 · PORTFOLIO · REF//PRT-25 */
  {
    client: "Also me · the hardest client in the building",
    role: "Design · Motion · Build · Rebuild",
    stack: "Next.js · TypeScript · CSS, hand-set",
    when: "2025 · fourth version this year",
    brief:
      "A portfolio has one honest job: prove the taste it claims. Three earlier versions made promises the scroll couldn’t keep. This one is a print shop because that is the discipline I trust: everything on the sheet earns its place, and the working layer stays in the record.",
    nerve:
      "Static-fast first: the DOM ships settled, printed. Then the motion engine arms it and strikes every piece back on in press order. The animation answers to a budget: compositor-cheap transforms, observers instead of scroll math, nothing that shakes the type for free. The margins argue back. The mess is not a decoration; it is the second author.",
    made: [
      "Design language, print-true",
      "Motion engine, observer-armed",
      "Static build, SSR-settled",
      "The mess layer, on purpose",
    ],
    outcome: [
      ["90+", "EVERY CORE WEB VITAL"],
      ["100", "LIGHTHOUSE, ACCESSIBILITY"],
      ["4", "VERSIONS THIS YEAR, ONE SURVIVED"],
    ],
    quote: "“The site is done.”",
    attr: "NO ONE, EVER",
    notes: [
      { pen: "hand-k", pos: "n-pv1", text: "v1 through v3 sleep in the branches. let them." },
      { pen: "hand-b", pos: "n-pv2", text: "the cat stays. non-negotiable." },
      { pen: "hand-k", pos: "n-pv3", text: "done is a strong word. shipped is honest." },
    ],
  },
  /* 04 · SYNAPSE · REF//SYN-24 */
  {
    client: "NwHacks · team of two",
    role: "Front-end · Serverless pipeline · Prompt discipline",
    stack: "TypeScript · Lambda · LangChain · GPT-4 · Mermaid",
    when: "2024 · one weekend",
    brief:
      "Dense technical PDFs go in; editable diagrams come out. The wager: a cold serverless pipeline, a 10MB document, and an answer on screen in under five seconds, built in a weekend with one teammate and a countdown clock.",
    nerve:
      "Lambda offered 512MB and cold starts; the PDFs didn’t care. Streaming parse kept memory flat, intelligent chunking kept context whole, and the model’s every answer walked through validation: schema checks, Mermaid syntax verification, fallbacks for the weird ones. The demo never got to flinch.",
    made: [
      "Upload-to-diagram pipeline",
      "Cold-start mitigation",
      "Prompt + validation layer",
      "Editable Mermaid rendering",
    ],
    outcome: [
      ["10MB", "PDF, COLD START"],
      ["<5s", "UPLOAD TO DIAGRAM"],
      ["512MB", "OF LAMBDA, NO EXCUSES"],
    ],
    quote: "“The pipeline held. The demo gods were merciful.”",
    attr: "POST-DEMO DEBRIEF",
    notes: [
      { pen: "hand-b", pos: "n-pv1", text: "prompt v9 finally stopped inventing arrows." },
      { pen: "hand-k", pos: "n-pv2", text: "cold starts are a personality test." },
      { pen: "hand-b", pos: "n-pv3", text: "built in a weekend. slept in a week." },
    ],
  },
];
