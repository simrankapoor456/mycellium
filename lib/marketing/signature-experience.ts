export const signatureStoryConfig = {
  beatCount: 10,
  desktopMinimumWidth: 768,
  pinnedMinimumWidth: 1024,
  scrollScrub: 0.24,
  animationIntensity: 0.9,
  dimensions: { width: 960, height: 760 },
  reducedMotionComposition: "complete",
} as const;

export const signatureStoryStages = [
  {
    id: "seed",
    label: "Seed of intent",
    title: "A product idea gains a center.",
    description: "The change worth making is held clearly without pretending the whole product is known.",
    artifact: "Original intent",
    level: 0,
  },
  {
    id: "first-root",
    label: "First root",
    title: "Evidence establishes the first lineage.",
    description: "One primary root grows before any answer is allowed to branch.",
    artifact: "Evidence lineage",
    level: 1,
  },
  {
    id: "root-network",
    label: "Branching roots",
    title: "A product Foundation spreads from evidence.",
    description: "Users, problem, outcomes, scope, feasibility, and risk keep a traceable path to intent.",
    artifact: "Product Foundation",
    level: 2,
  },
  {
    id: "trunk",
    label: "Trunk",
    title: "Approved understanding becomes structure.",
    description: "A stable architecture spine grows from the reviewed Foundation.",
    artifact: "Architecture spine",
    level: 3,
  },
  {
    id: "branches",
    label: "Branches",
    title: "Decisions divide into accountable paths.",
    description: "Boundaries and requirements emerge from one shared structure instead of separate documents.",
    artifact: "Requirements and boundaries",
    level: 4,
  },
  {
    id: "leaves",
    label: "Leaves",
    title: "The work becomes specific enough to act on.",
    description: "Stories and tasks stay attached to the decisions that produced them.",
    artifact: "Stories and tasks",
    level: 5,
  },
  {
    id: "blossoms",
    label: "Blossoms",
    title: "Candidate outcomes become ready to validate.",
    description: "Review points appear where product judgment still matters.",
    artifact: "Review checkpoints",
    level: 6,
  },
  {
    id: "fruit",
    label: "Fruit",
    title: "The system produces portable product value.",
    description: "The Product Blueprint carries grounded context into a form the builder can review and edit.",
    artifact: "Product Blueprint",
    level: 7,
  },
  {
    id: "value",
    label: "Mature product value",
    title: "The product can move forward without losing why.",
    description: "Grounded context, reviewable structure, and portable output remain connected.",
    artifact: "Living product value",
    level: 8,
  },
  {
    id: "renewal",
    label: "New seed",
    title: "What the product teaches becomes the next intent.",
    description: "Learning returns to the system as a new seed, ready for another deliberate cycle.",
    artifact: "Renewed context",
    level: 9,
  },
] as const;

export type SignatureStageId = (typeof signatureStoryStages)[number]["id"];

export const productGraphNodes = [
  { id: "seed", label: "Seed", detail: "Original intent", x: 360, y: 52, width: 116, level: 0, kind: "seed" },
  { id: "need", label: "User need", detail: "Desired outcome", x: 132, y: 152, width: 136, level: 1, kind: "question" },
  { id: "unknown", label: "Open question", detail: "Evidence needed", x: 360, y: 152, width: 150, level: 1, kind: "question" },
  { id: "constraint", label: "Constraint", detail: "Boundary identified", x: 588, y: 152, width: 132, level: 1, kind: "question" },
  { id: "requirement", label: "Requirement", detail: "Reviewed behavior", x: 92, y: 276, width: 142, level: 2, kind: "requirement" },
  { id: "scope", label: "Scope", detail: "Included and excluded", x: 268, y: 276, width: 142, level: 2, kind: "requirement" },
  { id: "identity", label: "Identity", detail: "Trusted actor", x: 452, y: 276, width: 142, level: 3, kind: "architecture" },
  { id: "data", label: "Data boundary", detail: "Validated state", x: 628, y: 276, width: 142, level: 3, kind: "architecture" },
  { id: "epic", label: "Epic", detail: "Outcome group", x: 148, y: 402, width: 132, level: 4, kind: "execution" },
  { id: "story", label: "Story", detail: "User value", x: 360, y: 402, width: 132, level: 4, kind: "execution" },
  { id: "task", label: "Task", detail: "Implementation step", x: 572, y: 402, width: 132, level: 4, kind: "execution" },
  { id: "sprint", label: "Sprint 01", detail: "Delivery sequence", x: 360, y: 504, width: 148, level: 4, kind: "sprint" },
] as const;

export const productGraphEdges = [
  { id: "seed-need", path: "M360 78C360 112 132 105 132 130", level: 1 },
  { id: "seed-unknown", path: "M360 78V130", level: 1 },
  { id: "seed-constraint", path: "M360 78C360 112 588 105 588 130", level: 1 },
  { id: "need-requirement", path: "M132 174C132 222 92 224 92 254", level: 2 },
  { id: "unknown-scope", path: "M360 174C360 222 268 224 268 254", level: 2 },
  { id: "constraint-identity", path: "M588 174C588 216 452 222 452 254", level: 3 },
  { id: "constraint-data", path: "M588 174C588 218 628 224 628 254", level: 3 },
  { id: "requirement-epic", path: "M92 298C92 346 148 350 148 380", level: 4 },
  { id: "scope-story", path: "M268 298C268 346 360 348 360 380", level: 4 },
  { id: "identity-task", path: "M452 298C452 346 572 348 572 380", level: 4 },
  { id: "data-task", path: "M628 298C628 338 572 348 572 380", level: 4 },
  { id: "epic-sprint", path: "M148 424C148 466 360 458 360 482", level: 4 },
  { id: "story-sprint", path: "M360 424V482", level: 4 },
  { id: "task-sprint", path: "M572 424C572 466 360 458 360 482", level: 4 },
] as const;

export const discoverConversation = [
  { speaker: "Builder", message: "I have a product direction, but the primary need and boundary are still unclear." },
  { speaker: "Mycellium", message: "What outcome should change, and who needs it first?" },
  { speaker: "Builder", message: "The outcome is clearer. The primary user and constraints still need evidence." },
] as const;

export const discoveredFacts = [
  "The original intent is recorded without turning it into a requirement.",
  "The desired outcome is clear enough to review.",
  "The primary user and constraints remain open decisions.",
] as const;

export const architectureSummary = {
  goal: "Turn reviewed product context into a traceable blueprint.",
  inScope: ["Confirmed needs", "Reviewed scope", "Core requirements"],
  outOfScope: ["Unverified assumptions", "Deferred capabilities", "Unowned dependencies"],
  risks: ["Assumptions presented as facts", "Unclear boundaries", "Missing recovery paths"],
  decisions: ["Explicit trust boundaries", "Schema-valid contracts", "Traceable state changes"],
} as const;

export const executionSummary = {
  epic: "Deliver the approved product foundation",
  stories: ["Establish the core outcome", "Protect trusted state", "Verify the primary journey"],
  tasks: ["Validate inputs", "Persist approved changes", "Enforce access rules", "Verify recovery states"],
  sprints: [
    { label: "Sprint 01", work: "Foundation and model" },
    { label: "Sprint 02", work: "Core journey" },
    { label: "Sprint 03", work: "Hardening and release" },
  ],
} as const;
