# Signature Growth Story

The public signature story is the Phase 9A.2 Seed-to-New-Seed experience. It shows how Mycellium keeps product intent connected as it becomes evidence, structure, actionable work, reviewable value, and renewed context.

## Canonical narrative

The ten configured stages are:

1. Seed of intent
2. First root
3. Branching roots
4. Trunk
5. Branches
6. Leaves
7. Blossoms
8. Fruit
9. Mature product value
10. New seed

Stable ids, labels, product copy, artifacts, and levels live in `lib/marketing/signature-experience.ts`. Deterministic roots, Foundation nodes, canopy paths, leaves, blossoms, fruit, value labels, and renewal geometry live in `lib/marketing/signature-growth.ts`.

## Rendering

`ScrollProductNarrative` renders the semantic story and owns GSAP. `SignatureGrowthVisual` renders one original inline SVG organism, the DOM Foundation-state legend, and an accessible text summary.

The five uploaded images were mood and sequencing references only. They are not included in production. The implementation is not an image sequence and does not use raster frames, video, canvas, WebGL, Three.js, Lottie, or a new animation dependency.

## Motion and scroll

Desktop and tablet use one GSAP timeline scrubbed by one ScrollTrigger, with a CSS-sticky visual beside native document chapters. All growth paths visibly draw through normalized dash offsets, and reverse scrolling rewinds the exact same timeline.

Mobile uses native scrolling, no ScrollTrigger, and coarse `IntersectionObserver` stage targets. Reduced motion renders the full mature composition and renewal seed immediately without scroll-linked movement.

All motion is scoped through `useGSAP` and `gsap.matchMedia()` with complete trigger, observer, tween, timeline, and refresh cleanup.

## Product alignment

The root network preserves Users, Problem, Outcome, Evidence, Scope, Feasibility, and Risks from the authenticated Living Foundation Map. State styling combines labels and marks with color. The later organism maps to real Mycellium concepts:

- trunk: architecture spine
- branches: requirements and boundaries
- leaves: stories and tasks
- blossoms: review checkpoints
- fruit: Product Blueprint
- mature value: grounded context, reviewable structure, portable output
- new seed: renewed product intent

## Runtime boundary

Lenis remains owned only by the public `MarketingMotionProvider`, synchronized with ScrollTrigger for public wheel scrolling, disabled for reduced motion, and absent from protected routes. Touch scrolling remains native.

See:

- [Phase 9A.2 implementation](./phase-9a-signature-growth.md)
- [Storyboard interpretation](./phase-9a-storyboard.md)
- [Motion system](./phase-9a-motion-system.md)
