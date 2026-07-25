# Phase 9A.2 Signature Growth

## Outcome

Phase 9A.2 turns the public landing-page story into one continuous Seed-to-New-Seed product lifecycle. The implementation no longer stops at a static Foundation. One original SVG organism grows from intent through evidence, structure, actionable work, review, portable value, and renewed context.

Earlier Phase 9A documentation described nine stages ending at Foundation. The shipped implementation has ten configured stages and nine transitions. The canonical order lives in `lib/marketing/signature-experience.ts`.

## Actual ten-stage narrative

| Stage | Product meaning | Visible change |
| --- | --- | --- |
| 1. Seed of intent | A product idea gains a clear center without pretending the whole product is known. | A warm two-part seed rests above a restrained soil horizon. |
| 2. First root | Evidence establishes the first traceable lineage. | The shell opens, a radicle appears, and one lime primary root visibly draws into the soil. |
| 3. Branching roots | Evidence becomes a reviewable product Foundation. | Seven child roots and five cross-connections draw from existing paths; Foundation nodes retain confirmed, emerging, unknown, and blocked states. |
| 4. Trunk | Approved understanding becomes structure. | One architecture spine draws upward from the same seed and root system. |
| 5. Branches | Decisions divide into accountable paths. | Six canopy paths draw from the trunk to represent requirements and boundaries. |
| 6. Leaves | Work becomes specific enough to act on. | Six leaves grow at branch endpoints to represent stories and tasks. |
| 7. Blossoms | Candidate outcomes become ready to validate. | Four restrained blossoms appear as human review checkpoints. |
| 8. Fruit | The system produces portable value. | Three fruit forms appear for grounded context, reviewable structure, and a portable Product Blueprint. |
| 9. Mature product value | The product can move forward without losing why. | Value labels and a quiet bracket make the connected outcome explicit. |
| 10. New seed | Learning becomes the next intent. | A dotted renewal path draws from mature value and carries a new seed back toward the soil. |

The sequence is product-led rather than a decorative plant lifecycle. Root lineage maps to evidence, the trunk maps to architecture, branches map to decisions and requirements, leaves map to actionable work, blossoms map to review, fruit maps to portable output, and renewal maps to learned context.

## Implementation architecture

`components/marketing/ScrollProductNarrative.tsx` is the narrow Client Component that owns the GSAP lifecycle, responsive mode selection, stage state, ordered controls, progress semantics, and cleanup. `components/marketing/SignatureGrowthVisual.tsx` owns the deterministic 960 by 760 SVG and the Foundation-state legend. Geometry and typed state are kept in `lib/marketing/signature-growth.ts`.

The SVG uses:

- one seed and independent shell halves
- crack and radicle paths
- one primary root, seven child roots, and five mycelium connections
- seven Foundation nodes with non-color state marks
- one trunk and six canopy branches
- six leaves, four blossoms, and three fruit forms
- three mature-value labels
- one renewal path and one new seed

Every animated path uses `pathLength="1"`. GSAP initializes its normalized dash offset to `1` and draws it to `0`, so the visible line growth is independent of raw path length and rewinds through the same geometry.

Static coordinate transforms are on outer SVG groups. GSAP scale and translation are applied to nested inner groups. This prevents animation transforms from overwriting the permanent coordinates of Foundation nodes, blossoms, fruit, or the renewal seed.

No raster sequence, production photograph, canvas, WebGL, Three.js, Lottie, or additional animation runtime is used.

## Reference-image policy

The five uploaded seed and root images were used only as private mood and sequencing references. They informed soil depth, restrained overhead light, structural shell opening, ordered root hierarchy, and the seed-to-root-to-shoot rhythm.

They are not included in the repository, copied into `public/`, requested by the browser, traced into the SVG, or used as production animation frames. The shipped composition is original deterministic SVG and DOM work built from Mycellium tokens.

## Responsive behavior

- At 1024 pixels and wider, one ScrollTrigger scrubs the master timeline while the visual uses CSS sticky positioning beside long native document chapters.
- From 768 through 1023 pixels, the same single ScrollTrigger and reversible timeline remain active with shorter chapter travel.
- Below 768 pixels, no ScrollTrigger is created. Native vertical scrolling stays authoritative, the visual remains lightweight and sticky within the public section, and `IntersectionObserver` moves the paused GSAP timeline between ten semantic stage targets.
- Under `prefers-reduced-motion: reduce`, no timeline or ScrollTrigger is created. The complete mature organism, Foundation, value labels, renewal path, and new seed render as one static composition.

Desktop and tablet stage state is derived from the master timeline's actual progress. Copy, progress, and geometry therefore cannot claim a later stage while its path is still undrawn. Forward scrolling grows the organism; reverse scrolling retracts the same paths and elements in reverse order.

## Runtime boundaries

GSAP, ScrollTrigger, and `useGSAP` come through `lib/motion/gsap-client.ts`. `gsap.matchMedia()` selects desktop, tablet, mobile, and reduced-motion branches, and `useGSAP` scopes cleanup to the public story section.

Lenis remains owned only by `MarketingMotionProvider` on the public marketing route. It is not activated for reduced motion and is not imported by authentication, forms, editors, dialogs, or protected workspace layouts. Touch remains native.

## Accessibility model

- The story is an ordered list of ten real buttons with complete stage copy.
- The active button uses `aria-current="step"` and `aria-pressed`.
- A named progressbar exposes the active stage and the total stage count.
- A skip link moves directly past the long story.
- The SVG is decorative and `aria-hidden`; equivalent product meaning is present in headings, chapter copy, the Foundation-state legend, a screen-reader summary, and a `noscript` fallback.
- Confirmed, emerging, unknown, and blocked states use wording and distinct marks in addition to color.
- There is no live region announcing every scroll frame.
- Reduced motion preserves all meaning without pinning or spatial animation.

## Test coverage

`tests/phase-9a-signature-growth.test.tsx`, `tests/signature-experience.test.tsx`, and `tests/living-product-experience.test.tsx` protect the ten-stage contract, deterministic geometry, responsive modes, cleanup, public-only Lenis boundary, reduced-motion composition, and accessible semantics.

`e2e/phase-9a-signature-growth.spec.ts` verifies:

- actual computed dash-offset changes for the primary root, branch roots, trunk, and canopy
- leaves, blossoms, fruit, mature value, and renewal visibility
- full forward progression and reverse retraction
- one desktop or tablet ScrollTrigger and zero mobile triggers
- mobile native-stage progression
- complete reduced-motion rendering at 375, 768, and 1440 pixels
- no page-level horizontal overflow
- no console or hydration errors in the signature journey

The broader public Playwright suite retains responsive, keyboard, navigation, anchor, and signed-out access coverage.

## Performance impact

- Dependency impact: none. Phase 9A.2 uses the already installed `gsap`, `@gsap/react`, and Lenis boundary.
- Network asset impact: none. The reference images are not production assets.
- Runtime impact: one paused timeline and, on desktop or tablet, one ScrollTrigger. There is no idle animation loop.
- React impact: state changes only when rounded timeline progress crosses a stage boundary, not on every scroll frame.
- Mobile impact: no ScrollTrigger, no pinned spacer, no second smooth-scroll owner, and no frame-by-frame scroll listener.
- Protected-route impact: none. The public motion provider boundary is unchanged.

A paired local production-build measurement before and after Phase 9A.2 recorded:

- public page entry JavaScript: 218,419 to 223,412 raw bytes, and 74,503 to 75,901 gzip bytes
- public page CSS: 192,714 to 201,738 raw bytes, and 35,154 to 36,525 gzip bytes
- largest public page chunk: unchanged at 121,516 raw bytes and 47,391 gzip bytes
- SVG component source: 8,964 to 10,345 bytes, with 57 to 74 explicit SVG JSX tags

The increases are the expected cost of canopy, lifecycle, responsive, and renewal styling. They add no new runtime dependency or asset request, and the largest public JavaScript chunk is unchanged.

## Known limitations

- Mobile uses staged interpolation between semantic chapters rather than continuous scrub; this is intentional for touch stability and reading pace.
- The public Foundation is a concise narrative model, not a replacement for the authenticated Living Foundation Map.
- Tiny SVG Foundation and value labels are hidden below 768 pixels; their complete meaning remains in the DOM stage copy and legend.
- Physical-device touch, representative screen-reader combinations, and low-powered mobile GPU checks remain manual release work.
- Browser zoom can change available sticky space; zoom-equivalent layout is covered, but unusually short desktop viewports may show less of the scene at one time.

## Phase 9B continuation point

Phase 9A.2 ends with renewed context, not with an unfinished botanical stage. Phase 9B should begin from the new seed and connect that renewed intent to real product history, version lineage, or workspace intelligence. It should not add another decorative maturity stage or replace the deterministic organism.

This phase changes public storytelling only. It does not change Supabase, authentication, persistence, generation, billing, teams, or integrations.
