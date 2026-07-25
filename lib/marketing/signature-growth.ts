export type GrowthPathKind = "primary" | "branch" | "connection";

export type GrowthPath = Readonly<{
  id: string;
  d: string;
  level: number;
  kind: GrowthPathKind;
  parentId: string | null;
}>;

export type FoundationState = "confirmed" | "emerging" | "unknown" | "blocked";

export type FoundationNode = Readonly<{
  id: "users" | "problem" | "outcome" | "evidence" | "scope" | "feasibility" | "risks";
  label: string;
  state: FoundationState;
  x: number;
  y: number;
  level: number;
}>;

export const signatureGrowthPaths = [
  {
    id: "primary-root",
    d: "M480 304 C480 344 474 382 482 420 C489 458 482 510 470 564 C463 596 466 625 480 652",
    level: 1,
    kind: "primary",
    parentId: null,
  },
  {
    id: "problem-root",
    d: "M479 370 C435 380 397 400 356 438 C330 462 300 478 263 486",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "users-root",
    d: "M482 405 C528 414 574 434 612 468 C635 489 663 500 698 503",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "outcome-root",
    d: "M477 444 C432 459 397 485 373 521 C357 545 332 560 300 568",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "evidence-root",
    d: "M484 466 C527 477 558 496 582 526 C602 551 629 565 661 568",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "scope-root",
    d: "M476 505 C437 522 413 548 399 582 C390 604 371 618 344 626",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "feasibility-root",
    d: "M479 536 C521 546 547 566 564 596 C577 619 598 632 625 637",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "risks-root",
    d: "M478 573 C448 590 433 614 429 645 C426 664 414 678 394 688",
    level: 2,
    kind: "branch",
    parentId: "primary-root",
  },
  {
    id: "problem-outcome",
    d: "M263 486 C265 528 278 550 300 568",
    level: 2,
    kind: "connection",
    parentId: "problem-root",
  },
  {
    id: "users-evidence",
    d: "M698 503 C696 540 684 558 661 568",
    level: 2,
    kind: "connection",
    parentId: "users-root",
  },
  {
    id: "outcome-scope",
    d: "M300 568 C305 602 318 619 344 626",
    level: 2,
    kind: "connection",
    parentId: "outcome-root",
  },
  {
    id: "evidence-feasibility",
    d: "M661 568 C658 605 646 627 625 637",
    level: 2,
    kind: "connection",
    parentId: "evidence-root",
  },
  {
    id: "scope-risks",
    d: "M344 626 C350 661 367 682 394 688",
    level: 2,
    kind: "connection",
    parentId: "scope-root",
  },
] as const satisfies readonly GrowthPath[];

export const signatureFoundationNodes = [
  { id: "problem", label: "Problem", state: "confirmed", x: 263, y: 486, level: 2 },
  { id: "users", label: "Users", state: "confirmed", x: 698, y: 503, level: 2 },
  { id: "outcome", label: "Outcome", state: "confirmed", x: 300, y: 568, level: 2 },
  { id: "evidence", label: "Evidence", state: "emerging", x: 661, y: 568, level: 2 },
  { id: "scope", label: "Scope", state: "emerging", x: 344, y: 626, level: 2 },
  { id: "feasibility", label: "Feasibility", state: "blocked", x: 625, y: 637, level: 2 },
  { id: "risks", label: "Risks", state: "unknown", x: 394, y: 688, level: 2 },
] as const satisfies readonly FoundationNode[];

export type CanopyPath = Readonly<{
  id: string;
  d: string;
  kind: "trunk" | "canopy";
  parentId: string | null;
}>;

export const signatureCanopyPaths = [
  {
    id: "trunk",
    d: "M480 214 C477 182 480 132 480 78",
    kind: "trunk",
    parentId: null,
  },
  {
    id: "branch-left-low",
    d: "M479 188 C442 180 408 164 376 137",
    kind: "canopy",
    parentId: "trunk",
  },
  {
    id: "branch-left-high",
    d: "M480 154 C449 140 431 118 421 91",
    kind: "canopy",
    parentId: "trunk",
  },
  {
    id: "branch-right-low",
    d: "M481 184 C520 176 554 159 586 132",
    kind: "canopy",
    parentId: "trunk",
  },
  {
    id: "branch-right-high",
    d: "M481 148 C514 134 535 110 548 82",
    kind: "canopy",
    parentId: "trunk",
  },
  {
    id: "branch-crown-left",
    d: "M480 119 C464 106 456 89 452 66",
    kind: "canopy",
    parentId: "trunk",
  },
  {
    id: "branch-crown-right",
    d: "M480 113 C494 99 502 83 507 61",
    kind: "canopy",
    parentId: "trunk",
  },
] as const satisfies readonly CanopyPath[];

export const signatureLeaves = [
  { id: "leaf-left-low", d: "M376 137 C350 131 334 113 334 89 C360 90 380 108 376 137 Z", anchorX: 376, anchorY: 137 },
  { id: "leaf-left-mid", d: "M421 91 C397 92 380 80 372 59 C397 54 418 68 421 91 Z", anchorX: 421, anchorY: 91 },
  { id: "leaf-left-crown", d: "M452 66 C430 57 419 40 421 19 C445 23 458 42 452 66 Z", anchorX: 452, anchorY: 66 },
  { id: "leaf-right-low", d: "M586 132 C610 121 629 127 643 145 C620 158 597 153 586 132 Z", anchorX: 586, anchorY: 132 },
  { id: "leaf-right-mid", d: "M548 82 C563 62 583 56 605 64 C594 88 572 96 548 82 Z", anchorX: 548, anchorY: 82 },
  { id: "leaf-right-crown", d: "M507 61 C516 38 534 26 556 28 C553 53 534 67 507 61 Z", anchorX: 507, anchorY: 61 },
] as const;

export const signatureBlossoms = [
  { id: "blossom-left", x: 374, y: 88 },
  { id: "blossom-crown", x: 480, y: 52 },
  { id: "blossom-right", x: 604, y: 73 },
  { id: "blossom-right-low", x: 638, y: 143 },
] as const;

export const signatureFruits = [
  { id: "fruit-left", x: 405, y: 111, state: "grounded" },
  { id: "fruit-center", x: 514, y: 88, state: "reviewable" },
  { id: "fruit-right", x: 615, y: 126, state: "portable" },
] as const;

export const signatureValueLabels = [
  { id: "grounded", label: "Grounded context", x: 270, y: 80, line: "M322 84 L392 108" },
  { id: "reviewable", label: "Reviewable structure", x: 480, y: 23, line: "M480 32 L510 79" },
  { id: "portable", label: "Portable Blueprint", x: 690, y: 77, line: "M641 82 L620 119" },
] as const;

export const FOUNDATION_STATE_LABELS = {
  confirmed: "Confirmed",
  emerging: "Emerging",
  unknown: "Unknown",
  blocked: "Blocked",
} as const satisfies Record<FoundationState, string>;
