import { readFileSync } from "node:fs";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ScrollProductNarrative } from "@/components/marketing/ScrollProductNarrative";
import { signatureStoryConfig, signatureStoryStages } from "@/lib/marketing/signature-experience";
import { signatureFoundationNodes, signatureGrowthPaths } from "@/lib/marketing/signature-growth";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("Phase 9A signature growth story", () => {
  it("configures one ten-stage story from intent through renewal", () => {
    expect(signatureStoryConfig.beatCount).toBe(10);
    expect(signatureStoryStages).toHaveLength(10);
    expect(signatureStoryStages.map((stage) => stage.id)).toEqual([
      "seed", "first-root", "root-network", "trunk", "branches",
      "leaves", "blossoms", "fruit", "value", "renewal",
    ]);
  });

  it("renders one story, all accessible stages, and a non-color state legend", () => {
    const { container } = render(<ScrollProductNarrative />);

    expect(container.querySelectorAll("[data-signature-growth]")).toHaveLength(1);
    expect(screen.getByRole("list", { name: "Seed to living product story" })).toBeVisible();
    expect(screen.getAllByRole("button", { name: /Stage \d{2}/ })).toHaveLength(10);
    expect(screen.getByRole("list", { name: "Foundation state legend" })).toHaveTextContent(
      "ConfirmedEmergingUnknownBlocked",
    );
  });

  it("moves current-stage semantics forward and backward", async () => {
    const user = userEvent.setup();
    render(<ScrollProductNarrative />);
    const first = screen.getByRole("button", { name: /Seed of intent/ });
    const final = screen.getByRole("button", { name: /New seed/ });

    await user.click(final);
    expect(final).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "10");

    await user.click(first);
    expect(first).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
  });

  it("uses deterministic parent-child root geometry", () => {
    const ids = new Set(signatureGrowthPaths.map((path) => path.id));
    expect(ids.size).toBe(signatureGrowthPaths.length);
    expect(signatureGrowthPaths[0]).toMatchObject({ id: "primary-root", kind: "primary", parentId: null });
    for (const path of signatureGrowthPaths.slice(1)) {
      expect(path.d).toMatch(/^M\d/);
      expect(path.parentId ? ids.has(path.parentId) : false).toBe(true);
    }
    expect(signatureFoundationNodes.map((node) => node.id)).toEqual([
      "problem", "users", "outcome", "evidence", "scope", "feasibility", "risks",
    ]);
    expect(new Set(signatureFoundationNodes.map((node) => node.state))).toEqual(
      new Set(["confirmed", "emerging", "blocked", "unknown"]),
    );
  });

  it("resolves reduced motion to the complete static lifecycle", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<ScrollProductNarrative />);
    await waitFor(() => expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "10"));
    expect(container.querySelector("[data-signature-growth]")).toHaveAttribute("data-active-level", "9");
  });

  it("keeps scrubbed desktop, staged mobile motion, and teardown explicit", () => {
    const story = readFileSync("components/marketing/ScrollProductNarrative.tsx", "utf8");
    const styles = readFileSync("app/phase-8.css", "utf8");

    expect(story).toContain('desktop: "(min-width: 1024px)"');
    expect(story).toContain('setMotionMode("mobile-staged")');
    expect(story).toContain("scrub: signatureStoryConfig.scrollScrub");
    expect(story).not.toContain("pinSpacing: false");
    expect(story).toContain("progressTrigger.kill()");
    expect(story).toContain("timeline.revert()");
    expect(story).toContain("media.revert()");
    expect(story).toContain("dataset.timelineProgress");
    expect(styles).toContain("@media (max-width: 767px)");
    expect(styles).toContain("grid-auto-flow: row");
    expect(styles).toContain("position: sticky");
  });

  it("keeps Lenis public-only and protected routes free of the signature story", () => {
    const publicPage = readFileSync("app/page.tsx", "utf8");
    const provider = readFileSync("components/marketing/MarketingMotionProvider.tsx", "utf8");
    const protectedLayout = readFileSync("app/(protected)/layout.tsx", "utf8");

    expect(publicPage).toContain("MarketingMotionProvider");
    expect(publicPage).toContain("ScrollProductNarrative");
    expect(provider).toContain('import("lenis")');
    expect(protectedLayout).not.toContain("MarketingMotionProvider");
    expect(protectedLayout).not.toContain("ScrollProductNarrative");
  });
});
