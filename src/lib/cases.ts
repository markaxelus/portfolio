/**
 * THE CASES — the four real jobs behind the hanging sheets. The viewer's
 * anatomy comes from the prototype (context-first meta rail, plate hero,
 * outcome figures, a quote, the NEXT PROOF handoff), and the sheet tells
 * each job as a press story: THE BRIEF (the problem), THE RUN (the
 * process, station by station), THE NERVE (the one decision with spine),
 * then the figures. Facts trace to the legacy case copy
 * (src/data/projects.ts) and the WorkIndex rows — nothing is claimed the
 * data can't back, and nobody is invented to praise the work: every quote
 * is pulled from the shop's own paper (handover notes, the dev log, the
 * pitch to myself).
 *
 * SIDE B is anchored, never floated (the anchor law): each annotation
 * belongs to the OBJECT it annotates — a pen under the plate, a red ring
 * on one figure, the two hands arguing at the quote's shoulder, a
 * proofreader's insertion inside the nerve itself.
 *
 * House mark law: no em dashes on the sheet — machine fields take the
 * middot, prose writes colons, hyphens and periods; en dashes only in
 * ranges. The pens stay lowercase, two hands, as everywhere.
 */

export interface Pen {
  pen: "hand-k" | "hand-b";
  text: string;
}

export interface Case {
  client: string;
  role: string;
  stack: string;
  when: string;
  brief: string;
  /** the process, station by station: [station label, the move] */
  run: Array<[string, string]>;
  nerve: string;
  made: string[];
  outcome: Array<[string, string]>;
  quote: string;
  attr: string;
  /* ---- SIDE B, anchored ---- */
  plateNote: Pen;
  statRing: { i: 0 | 1 | 2; note: Pen };
  argue: Pen[];
  ins: { find: string; text: string; pen: "hand-k" | "hand-b" };
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
    run: [
      ["THE AUDIT", "Read every component before touching one: dependencies mapped, rot listed, nothing moved yet."],
      ["THE TEAMS PRESS", "The hardcoded page became typed data + reusable cards: a roster edit stopped being a pull request."],
      ["THE RESPONSIVE PASS", "Mobile-first breakpoints, the framework’s image press, honest loading and error states."],
      ["THE HANDOVER", "Documentation written for the next maintainer, tested by me not being there."],
    ],
    nerve:
      "No rewrite. The temptation was a blank repo; the discipline was fixing the ship at sea. I touched nothing until the audit mapped the whole codebase, then rebuilt from the inside: the site never went dark, and the club never noticed the surgery.",
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
    plateNote: { pen: "hand-b", text: "the arcs are the audit: ripples from one dropped stone." },
    statRing: { i: 0, note: { pen: "hand-k", text: "zero. the good kind." } },
    argue: [
      { pen: "hand-k", text: "just rewrite it." },
      { pen: "hand-b", text: "fix the ship at sea." },
      { pen: "hand-k", text: "…audit first. then we talk." },
    ],
    ins: { find: "No rewrite", text: "sadly", pen: "hand-k" },
  },
  /* 02 · RELAY · REF//RLY-25 */
  {
    client: "In-house · the client is me",
    role: "Product design · Full-stack · Both sides of the ticket",
    stack: "Next.js · TypeScript · Postgres · Prisma",
    when: "Ongoing · in development",
    brief:
      "Team tools come in two sizes: toys that run out of road, and cockpits nobody wants to board. Relay is the wager that project management can stay simple and still move in real time: tasks, boards, presence, all live, all at once.",
    run: [
      ["THE SCHEMA", "Postgres drawn wide on purpose: Prisma models that already expect the features I haven’t built."],
      ["THE WIRE", "WebSockets in, chaos out: live updates arrive as a stream and leave as a schedule."],
      ["THE BOARD", "Drag-and-drop that survives a dropped connection: error handling that tells the truth."],
      ["STILL ON PRESS", "Caching, presence, the next feature: this run doesn’t close."],
    ],
    nerve:
      "The websockets fought back: every live update wanted to re-render the world. I built an event layer that batches the socket’s opinions and lets React reconcile on my schedule, not the wire’s. Optimistic UI everywhere, so the interface commits first and apologizes rarely.",
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
    plateNote: { pen: "hand-k", text: "the stripes are the queue. it moves now." },
    statRing: { i: 1, note: { pen: "hand-b", text: "the fan spun down. peace." } },
    argue: [
      { pen: "hand-b", text: "ship it as v1." },
      { pen: "hand-k", text: "the schema isn’t done." },
      { pen: "hand-b", text: "the schema is never done." },
    ],
    ins: { find: "apologizes rarely", text: "rollbacks", pen: "hand-b" },
  },
  /* 03 · PORTFOLIO · REF//PRT-25 */
  {
    client: "Also me · the hardest client in the building",
    role: "Design · Motion · Build · Rebuild",
    stack: "Next.js · TypeScript · CSS, hand-set",
    when: "2025 · fourth version this year",
    brief:
      "A portfolio has one honest job: prove the taste it claims. Three earlier versions made promises the scroll couldn’t keep. This one is a print shop because that is the discipline I trust: everything on the sheet earns its place, and the working layer stays in the record.",
    run: [
      ["THE SPEC", "Three versions rejected for promising more than the scroll kept; the print discipline set in writing."],
      ["THE SETTLED SHEET", "SSR ships the page already printed: no unstruck state, nothing waiting on JavaScript to exist."],
      ["THE ENGINE", "Observers arm the motion after mount; every effect answers to the performance budget."],
      ["SIDE B", "The working layer becomes the second author: two pens, the stamps, the cat."],
    ],
    nerve:
      "The decision was restraint: one serif, one mono, three inks, and nothing moves unless the press would move it. The site performs because it refuses to perform: compositor-cheap transforms, observers instead of scroll math, a budget nobody gets to exceed. The margins argue back; the mess is not a decoration, it is the second author.",
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
    plateNote: { pen: "hand-b", text: "orbits: three dead versions circling the one that shipped." },
    statRing: { i: 2, note: { pen: "hand-k", text: "this one. it’s this one." } },
    argue: [
      { pen: "hand-k", text: "the cat ships?" },
      { pen: "hand-b", text: "the cat ships." },
    ],
    ins: { find: "the second author", text: "unpaid", pen: "hand-b" },
  },
  /* 04 · SYNAPSE · REF//SYN-24 */
  {
    client: "NwHacks · team of two",
    role: "Front-end · Serverless pipeline · Prompt discipline",
    stack: "TypeScript · Lambda · LangChain · GPT-4 · Mermaid",
    when: "2024 · one weekend",
    brief:
      "Dense technical PDFs go in; editable diagrams come out. The wager: a cold serverless pipeline, a 10MB document, and an answer on screen in under five seconds, built in a weekend with one teammate and a countdown clock.",
    run: [
      ["THE SCOPE", "One hour to cut the job into stations: ingest, extract, generate, render. Then we held the line."],
      ["THE PIPELINE", "Streaming parse and intelligent chunking inside Lambda’s 512MB: memory flat, context whole."],
      ["THE DISCIPLINE", "Prompts engineered until the relationships held; every answer validated before a user sees it."],
      ["THE DEMO", "10MB in, diagram out, under five seconds: judged, and it held."],
    ],
    nerve:
      "The nerve was refusing to trust the model. Every answer it gave walked through validation before anyone saw it: schema checks, Mermaid syntax verification, fallbacks for the weird ones. A hackathon demo lives or dies on its worst output, so we engineered the worst output out.",
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
    plateNote: { pen: "hand-k", text: "steps: the pipeline, descending politely." },
    statRing: { i: 1, note: { pen: "hand-b", text: "timed on stage. held." } },
    argue: [
      { pen: "hand-b", text: "it’ll flinch." },
      { pen: "hand-k", text: "it didn’t." },
    ],
    ins: { find: "the worst output out", text: "mostly", pen: "hand-b" },
  },
];
