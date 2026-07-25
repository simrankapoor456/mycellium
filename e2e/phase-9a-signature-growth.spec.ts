import { expect, test, type Page } from "@playwright/test";

async function scrollToStage(page: Page, name: RegExp, stage: number) {
  const story = page.locator("#how-it-works");
  const control = page.getByRole("button", { name });
  await control.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(story).toHaveAttribute("data-active-stage", String(stage), { timeout: 5_000 });
  await page.waitForTimeout(320);
}

async function numericStyle(page: Page, selector: string, property: "opacity" | "strokeDashoffset") {
  return page.locator("#how-it-works").locator(selector).first().evaluate((element, propertyName) => {
    const value = getComputedStyle(element)[propertyName];
    return Number.parseFloat(value);
  }, property);
}

test.describe("Phase 9A.2 signature lifecycle", () => {
  test("visibly draws one reversible desktop lifecycle", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1440, height: 960 });
    const consoleProblems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") consoleProblems.push(message.text());
    });
    page.on("pageerror", (error) => consoleProblems.push(error.message));
    await page.goto("/", { waitUntil: "networkidle" });

    const story = page.locator("#how-it-works");
    const visual = story.locator(".scroll-story__visual");
    const primaryRoot = "[data-path-kind='primary']";
    const branchRoot = "[data-path-kind='branch']";
    const trunk = "[data-path-kind='trunk']";
    const canopyBranch = "[data-path-kind='canopy']";
    const renewal = ".signature-growth__renewal";

    await expect(story).toHaveAttribute("data-animation-ready", "true");
    await expect(story).toHaveAttribute("data-motion-mode", "desktop-scrub");
    await expect(story).toHaveAttribute("data-scroll-trigger-count", "1");

    await scrollToStage(page, /Seed of intent/i, 1);
    expect(await numericStyle(page, primaryRoot, "strokeDashoffset")).toBeGreaterThan(0.85);
    expect(await numericStyle(page, renewal, "opacity")).toBeLessThan(0.1);

    await scrollToStage(page, /First root/i, 2);
    expect(await numericStyle(page, primaryRoot, "strokeDashoffset")).toBeLessThan(0.18);
    expect(await numericStyle(page, branchRoot, "strokeDashoffset")).toBeGreaterThan(0.75);

    await scrollToStage(page, /Branching roots/i, 3);
    expect(await numericStyle(page, branchRoot, "strokeDashoffset")).toBeLessThan(0.2);
    expect(await numericStyle(page, trunk, "strokeDashoffset")).toBeGreaterThan(0.8);

    await scrollToStage(page, /Trunk/i, 4);
    expect(await numericStyle(page, trunk, "strokeDashoffset")).toBeLessThan(0.18);
    await expect(visual).toHaveCSS("position", "sticky");
    await expect(story).toHaveAttribute("data-pin-active", "true");

    await scrollToStage(page, /^Stage 05.*Branches/i, 5);
    expect(await numericStyle(page, canopyBranch, "strokeDashoffset")).toBeLessThan(0.2);

    await scrollToStage(page, /Leaves/i, 6);
    await expect(story.locator("[data-leaf]").first()).not.toHaveCSS("transform", "matrix(0, 0, 0, 0, 0, 0)");

    await scrollToStage(page, /Blossoms/i, 7);
    expect(await numericStyle(page, "[data-blossom]", "opacity")).toBeGreaterThan(0.8);

    await scrollToStage(page, /^Stage 08.*Fruit/i, 8);
    expect(await numericStyle(page, "[data-fruit]", "opacity")).toBeGreaterThan(0.8);

    await scrollToStage(page, /Mature product value/i, 9);
    expect(await numericStyle(page, "[data-value-label]", "opacity")).toBeGreaterThan(0.8);

    await scrollToStage(page, /New seed/i, 10);
    const finalRenewalTransform = await story.locator("[data-renewal-seed]").evaluate((element) => getComputedStyle(element).transform);
    expect(finalRenewalTransform).not.toBe("none");
    expect(await numericStyle(page, renewal, "opacity")).toBeGreaterThan(0.8);

    await scrollToStage(page, /Leaves/i, 6);
    expect(await numericStyle(page, renewal, "opacity")).toBeLessThan(0.1);
    expect(await numericStyle(page, primaryRoot, "strokeDashoffset")).toBeLessThan(0.18);
    expect(Number(await story.getAttribute("data-timeline-progress"))).toBeLessThan(0.66);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(consoleProblems).toEqual([]);
  });

  test("keeps tablet scrubbed and mobile progression lightweight", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });

    await page.setViewportSize({ width: 768, height: 960 });
    await page.goto("/", { waitUntil: "networkidle" });
    const story = page.locator("#how-it-works");
    await expect(story).toHaveAttribute("data-motion-mode", "tablet-scrub");
    await scrollToStage(page, /First root/i, 2);
    expect(await numericStyle(page, "[data-path-kind='primary']", "strokeDashoffset")).toBeLessThan(0.2);

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(story).toHaveAttribute("data-motion-mode", "mobile-staged");
    await expect(story).toHaveAttribute("data-scroll-trigger-count", "0");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    expect(Number(await story.getAttribute("data-active-stage"))).toBeLessThan(10);
    expect(await numericStyle(page, ".signature-growth__renewal", "opacity")).toBeLessThan(0.1);

    await scrollToStage(page, /First root/i, 2);
    expect(await numericStyle(page, "[data-path-kind='primary']", "strokeDashoffset")).toBeLessThan(0.2);
    await scrollToStage(page, /New seed/i, 10);
    expect(await numericStyle(page, ".signature-growth__renewal", "opacity")).toBeGreaterThan(0.8);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  for (const width of [375, 768, 1440] as const) {
    test(`renders the complete static lifecycle under reduced motion at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: width === 375 ? 812 : 960 });
      await page.goto("/", { waitUntil: "networkidle" });

      const story = page.locator("#how-it-works");
      await expect(story).toHaveAttribute("data-motion-mode", "reduced-static");
      await expect(story).toHaveAttribute("data-active-stage", "10");
      await expect(story).toHaveAttribute("data-pin-active", "false");
      await expect(story).toHaveAttribute("data-scroll-trigger-count", "0");
      expect(await numericStyle(page, "[data-path-kind='primary']", "strokeDashoffset")).toBeLessThan(0.01);
      expect(await numericStyle(page, "[data-path-kind='trunk']", "strokeDashoffset")).toBeLessThan(0.01);
      expect(await numericStyle(page, ".signature-growth__renewal", "opacity")).toBeGreaterThan(0.9);
      await expect(story.getByText("Complete static cycle")).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
