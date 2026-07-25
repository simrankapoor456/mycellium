# Phase 9A.2 Motion System

## Ownership and runtime

`components/marketing/ScrollProductNarrative.tsx` owns motion. It is a public-route Client Component with a local `useGSAP` scope. `SignatureGrowthVisual` renders deterministic SVG and DOM structure but owns no independent animation lifecycle.

GSAP, ScrollTrigger, and `useGSAP` are imported from `lib/motion/gsap-client.ts`. No additional animation runtime was added.

## Master timeline

One paused GSAP timeline spans normalized positions `0` through `9`.

| Timeline boundary | Motion |
| --- | --- |
| 0 to 1 | Crack and radicle draw; shell halves open; the primary root and moving root tip draw downward. |
| 1 to 2 | Seven root branches draw, five connections follow, and Foundation nodes scale into their fixed endpoints. |
| 2 to 3 | The architecture trunk draws upward. |
| 3 to 4 | Six canopy branches draw from the trunk. |
| 4 to 5 | Six leaves grow from zero scale at their branch anchors. |
| 5 to 6 | Four blossoms appear with a restrained stagger. |
| 6 to 7 | Three fruit forms appear and the blossoms quiet slightly. |
| 7 to 8 | Mature-value labels appear and the primary structure gains a bounded emphasis. |
| 8 to 9 | The renewal path draws and a new seed follows it toward a new soil position. |

Path growth uses `pathLength="1"`, `stroke-dasharray: 1`, and `stroke-dashoffset` from `1` to `0`. Draw phases use linear easing so scroll position and visible line length remain legible. Scale, shell, and label transitions use restrained power easing without bounce or spring.

Timeline progress is the source of truth. The active stage is `round(progress * 9)`, so visual geometry, caption, progressbar, and chapter state stay synchronized.

## Desktop and tablet ScrollTrigger

At 768 pixels and wider, one ScrollTrigger owns the master timeline:

- trigger: the first chapter
- start: first chapter center at viewport center
- end trigger: the last chapter
- end: last chapter center at viewport center
- scrub: `0.24`
- `invalidateOnRefresh: true`

The scene uses CSS sticky positioning rather than a second pin trigger. This preserves native document height, avoids pin-spacer geometry, and keeps exactly one Phase 9A ScrollTrigger. A refresh runs after fonts settle, and ScrollTrigger handles later resize refreshes.

Forward scroll advances the timeline. Reverse scroll rewinds the same timeline, including renewal, value labels, fruit, blossoms, leaves, branches, trunk, Foundation branches, and the first root. No alternate reverse animation or reset state exists.

## Mobile native flow

Below 768 pixels:

- no ScrollTrigger is created
- Lenis does not take over touch scrolling
- the public section uses native vertical chapters
- `IntersectionObserver` identifies the dominant semantic chapter
- a short GSAP tween moves the paused master timeline to that chapter's target
- interrupted movement is killed and replaced by the new target

This preserves the same geometry and lifecycle without continuous scroll-frame work, pin spacers, snap behavior, or a second scrolling owner.

## Reduced motion

When `prefers-reduced-motion: reduce` matches:

- no master timeline or ScrollTrigger is created
- every lifecycle group is visible
- every growth path has zero dash offset
- shell halves render in their open state
- leaves, blossoms, fruit, value, renewal path, and the new seed render complete
- active state is stage 10
- sticky positioning is disabled and copy uses compact natural flow
- Lenis does not start

The result is one complete static composition, not a blank first frame and not a simplified Foundation-only fallback.

## Cleanup

`gsap.matchMedia()` selects desktop, tablet, mobile, and reduced branches. On cleanup:

- the single ScrollTrigger is killed
- the mobile `IntersectionObserver` disconnects
- any in-flight mobile stage tween is killed
- the master timeline reverts
- the match-media context reverts
- delayed font-refresh work is canceled

The separate public `MarketingMotionProvider` removes its GSAP ticker callback and destroys Lenis on unmount.

## Lenis boundary

Lenis remains public-only. It forwards public wheel-scroll updates to ScrollTrigger and is absent from protected application layouts. Reduced motion prevents initialization. Touch synchronization stays disabled, while forms, dialogs, editable controls, browser history, keyboard navigation, and nested native-scroll regions keep their established behavior.

## Accessibility and interruption

Scroll motion is reversible and interruptible. Stage controls are real buttons, a skip link bypasses the long narrative, progress has integer ARIA values, and no live region announces frame-level changes. The decorative SVG is hidden from assistive technology; complete meaning is available in ordered text, state labels, a screen-reader summary, and a `noscript` fallback.

## Performance boundaries

- one paused timeline
- one desktop or tablet ScrollTrigger
- zero mobile or reduced-motion ScrollTriggers
- no per-frame React state update
- no idle animation loop
- no runtime layout measurement inside the animation callback
- no raster frames, video, canvas, WebGL, Lottie, or Three.js
- no protected-route motion or scrolling change

The inline SVG is larger than the prior Foundation-only scene, but it adds no network asset request. Vector geometry and non-scaling strokes keep the composition sharp at supported responsive sizes.
