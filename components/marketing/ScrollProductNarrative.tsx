"use client";

import { useEffect, useRef, useState } from "react";

import { SignatureGrowthVisual } from "@/components/marketing/SignatureGrowthVisual";
import { Container } from "@/components/ui/Container";
import { signatureStoryConfig, signatureStoryStages } from "@/lib/marketing/signature-experience";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap-client";

type MotionMode = "pending" | "desktop-scrub" | "tablet-scrub" | "mobile-staged" | "reduced-static";

const finalStageIndex = signatureStoryStages.length - 1;

function stageIndexFromProgress(progress: number) {
  return Math.min(finalStageIndex, Math.max(0, Math.round(progress * finalStageIndex)));
}

function storyTriggerCount() {
  return ScrollTrigger.getAll().filter((trigger) => String(trigger.vars.id ?? "").startsWith("phase-9a")).length;
}

export function ScrollProductNarrative() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionMode, setMotionMode] = useState<MotionMode>("pending");
  const [pinActive, setPinActive] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [triggerBounds, setTriggerBounds] = useState({ start: "none", end: "none" });
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const chapterListRef = useRef<HTMLOListElement>(null);
  const chapterRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeStage = signatureStoryStages[activeIndex] ?? signatureStoryStages[0];

  function updateActiveIndex(index: number) {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }

  function writeTimelineProgress(progress: number) {
    const section = sectionRef.current;
    if (!section) return;
    const boundedProgress = Math.min(1, Math.max(0, progress));
    section.dataset.timelineProgress = boundedProgress.toFixed(3);
    updateActiveIndex(stageIndexFromProgress(boundedProgress));
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== "test") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reducedMotion.matches) return;

    const frame = window.requestAnimationFrame(() => {
      activeIndexRef.current = finalStageIndex;
      setActiveIndex(finalStageIndex);
      setMotionMode("reduced-static");
      if (sectionRef.current) sectionRef.current.dataset.timelineProgress = "1.000";
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useGSAP(() => {
    if (process.env.NODE_ENV === "test") return;

    const section = sectionRef.current;
    if (!section) return;
    const storySection: HTMLElement = section;

    const media = gsap.matchMedia();

    function createGrowthTimeline() {
      const levels = Array.from(storySection.querySelectorAll<SVGElement>("[data-signature-growth] [data-level]"));
      const growthPaths = Array.from(storySection.querySelectorAll<SVGPathElement>("[data-signature-growth] [data-growth-path]"));
      const seed = storySection.querySelector<SVGGElement>(".signature-growth__seed");
      const seedLeft = storySection.querySelector<SVGPathElement>(".signature-growth__seed-shell--left");
      const seedRight = storySection.querySelector<SVGPathElement>(".signature-growth__seed-shell--right");
      const germination = storySection.querySelector<SVGGElement>(".signature-growth__germination");
      const primaryRoot = storySection.querySelector<SVGPathElement>("[data-path-kind='primary']");
      const rootTip = storySection.querySelector<SVGCircleElement>("[data-root-tip='primary']");
      const branchRoots = Array.from(storySection.querySelectorAll<SVGPathElement>("[data-path-kind='branch']"));
      const connections = Array.from(storySection.querySelectorAll<SVGPathElement>("[data-path-kind='connection']"));
      const foundation = storySection.querySelector<SVGGElement>(".signature-growth__foundation");
      const foundationNodes = Array.from(storySection.querySelectorAll<SVGGElement>(".signature-growth__foundation-node"));
      const trunk = storySection.querySelector<SVGPathElement>("[data-path-kind='trunk']");
      const canopyBranches = Array.from(storySection.querySelectorAll<SVGPathElement>("[data-path-kind='canopy']"));
      const leavesGroup = storySection.querySelector<SVGGElement>(".signature-growth__leaves");
      const leaves = Array.from(storySection.querySelectorAll<SVGPathElement>("[data-leaf]"));
      const blossomsGroup = storySection.querySelector<SVGGElement>(".signature-growth__blossoms");
      const blossoms = Array.from(storySection.querySelectorAll<SVGGElement>("[data-blossom]"));
      const fruitsGroup = storySection.querySelector<SVGGElement>(".signature-growth__fruits");
      const fruits = Array.from(storySection.querySelectorAll<SVGGElement>("[data-fruit]"));
      const valueGroup = storySection.querySelector<SVGGElement>(".signature-growth__value");
      const valueLabels = Array.from(storySection.querySelectorAll<SVGGElement>("[data-value-label]"));
      const renewalGroup = storySection.querySelector<SVGGElement>(".signature-growth__renewal");
      const renewalPath = storySection.querySelector<SVGPathElement>(".signature-growth__renewal-path");
      const renewalSeed = storySection.querySelector<SVGGElement>("[data-renewal-seed]");
      const renewalLabel = storySection.querySelector<SVGTextElement>(".signature-growth__renewal-label");

      gsap.set(levels, { autoAlpha: 0 });
      gsap.set(seed, { autoAlpha: 1, scale: 1, transformOrigin: "center" });
      gsap.set(growthPaths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set([seedLeft, seedRight], { rotation: 0, x: 0 });
      gsap.set(rootTip, { autoAlpha: 0, attr: { cx: 480, cy: 304 } });
      gsap.set(foundationNodes, { autoAlpha: 0, scale: 0.82, transformOrigin: "center", y: 8 });
      gsap.set(leaves, { scale: 0, transformOrigin: "center" });
      gsap.set(blossoms, { autoAlpha: 0, scale: 0, transformOrigin: "center" });
      gsap.set(fruits, { autoAlpha: 0, scale: 0, transformOrigin: "center" });
      gsap.set(valueLabels, { autoAlpha: 0, y: 7 });
      gsap.set(renewalSeed, { autoAlpha: 0, scale: 0.7, transformOrigin: "center", x: 0, y: 0 });
      gsap.set(renewalLabel, { autoAlpha: 0, y: 5 });

      const timeline = gsap.timeline({ paused: true });

      timeline
        .addLabel("seed", 0)
        .to(germination, { autoAlpha: 1, duration: 0.08 }, 0.04)
        .to(germination?.querySelectorAll("[data-growth-path]") ?? [], { duration: 0.42, ease: "none", strokeDashoffset: 0 }, 0.06)
        .to(seedLeft, { duration: 0.58, ease: "power3.out", rotation: -7, transformOrigin: "100% 70%", x: -6 }, 0.1)
        .to(seedRight, { duration: 0.58, ease: "power3.out", rotation: 7, transformOrigin: "0% 70%", x: 6 }, 0.1)
        .to(primaryRoot, { autoAlpha: 1, duration: 0.06 }, 0.08)
        .to(rootTip, { autoAlpha: 1, duration: 0.08 }, 0.1)
        .to(primaryRoot, { duration: 0.84, ease: "none", strokeDashoffset: 0 }, 0.12)
        .to(rootTip, { attr: { cx: 480, cy: 652 }, duration: 0.84, ease: "none" }, 0.12)
        .to(rootTip, { autoAlpha: 0, duration: 0.08 }, 0.9)
        .addLabel("first-root", 1)
        .to(branchRoots, { autoAlpha: 1, duration: 0.05 }, 1.03)
        .to(branchRoots, { duration: 0.68, ease: "none", stagger: 0.035, strokeDashoffset: 0 }, 1.06)
        .to(connections, { autoAlpha: 1, duration: 0.05 }, 1.42)
        .to(connections, { duration: 0.42, ease: "none", stagger: 0.035, strokeDashoffset: 0 }, 1.46)
        .to(foundation, { autoAlpha: 1, duration: 0.05 }, 1.47)
        .to(foundationNodes, { autoAlpha: 1, duration: 0.32, ease: "power3.out", scale: 1, stagger: 0.045, y: 0 }, 1.58)
        .addLabel("root-network", 2)
        .to(trunk, { autoAlpha: 1, duration: 0.06 }, 2.04)
        .to(trunk, { duration: 0.9, ease: "none", strokeDashoffset: 0 }, 2.08)
        .addLabel("trunk", 3)
        .to(canopyBranches, { autoAlpha: 1, duration: 0.05 }, 3.03)
        .to(canopyBranches, { duration: 0.64, ease: "none", stagger: 0.045, strokeDashoffset: 0 }, 3.07)
        .addLabel("branches", 4)
        .to(leavesGroup, { autoAlpha: 1, duration: 0.05 }, 4.03)
        .to(leaves, { duration: 0.56, ease: "power3.out", scale: 1, stagger: 0.075 }, 4.08)
        .addLabel("leaves", 5)
        .to(blossomsGroup, { autoAlpha: 1, duration: 0.05 }, 5.03)
        .to(blossoms, { autoAlpha: 1, duration: 0.48, ease: "power3.out", scale: 1, stagger: 0.08 }, 5.08)
        .addLabel("blossoms", 6)
        .to(fruitsGroup, { autoAlpha: 1, duration: 0.05 }, 6.03)
        .to(fruits, { autoAlpha: 1, duration: 0.5, ease: "power3.out", scale: 1, stagger: 0.1 }, 6.08)
        .to(blossoms, { duration: 0.42, ease: "power2.out", opacity: 0.42 }, 6.3)
        .addLabel("fruit", 7)
        .to(valueGroup, { autoAlpha: 1, duration: 0.06 }, 7.03)
        .to(valueLabels, { autoAlpha: 1, duration: 0.42, ease: "power3.out", stagger: 0.08, y: 0 }, 7.08)
        .to([trunk, primaryRoot], { duration: 0.56, ease: "power2.out", filter: "drop-shadow(0 0 6px rgba(185, 237, 102, 0.2))" }, 7.16)
        .addLabel("value", 8)
        .to(renewalGroup, { autoAlpha: 1, duration: 0.06 }, 8.03)
        .to(renewalPath, { duration: 0.72, ease: "none", strokeDashoffset: 0 }, 8.07)
        .to(renewalSeed, { autoAlpha: 1, duration: 0.08 }, 8.1)
        .to(renewalSeed, { duration: 0.78, ease: "power2.inOut", scale: 1, x: 164, y: 151 }, 8.12)
        .to(renewalLabel, { autoAlpha: 1, duration: 0.24, ease: "power2.out", y: 0 }, 8.72)
        .to({}, { duration: 0.01 }, 8.99)
        .addLabel("renewal", 9);

      timeline.eventCallback("onUpdate", () => writeTimelineProgress(timeline.progress()));
      writeTimelineProgress(0);
      return timeline;
    }

    function refreshAfterLayout(trigger?: ScrollTrigger) {
      let cancelled = false;
      let frame = 0;
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        frame = window.requestAnimationFrame(() => {
          if (cancelled) return;
          trigger?.refresh();
          ScrollTrigger.refresh();
        });
      });

      return () => {
        cancelled = true;
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    media.add({
      desktop: "(min-width: 1024px)",
      tablet: "(min-width: 768px) and (max-width: 1023px)",
      mobile: "(max-width: 767px)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const conditions = context.conditions as {
        desktop: boolean;
        tablet: boolean;
        mobile: boolean;
        reduce: boolean;
      };

      setPinActive(false);
      setTriggerCount(0);
      setTriggerBounds({ start: "none", end: "none" });

      if (conditions.reduce) {
        const levels = section.querySelectorAll("[data-signature-growth] [data-level]");
        const growthPaths = section.querySelectorAll("[data-signature-growth] [data-growth-path]");
        const seedLeft = section.querySelector(".signature-growth__seed-shell--left");
        const seedRight = section.querySelector(".signature-growth__seed-shell--right");
        const renewalSeed = section.querySelector("[data-renewal-seed]");

        gsap.set(levels, { autoAlpha: 1 });
        gsap.set(growthPaths, { strokeDasharray: 1, strokeDashoffset: 0 });
        gsap.set(seedLeft, { rotation: -7, transformOrigin: "100% 70%", x: -6 });
        gsap.set(seedRight, { rotation: 7, transformOrigin: "0% 70%", x: 6 });
        gsap.set(renewalSeed, { autoAlpha: 1, scale: 1, x: 164, y: 151 });
        gsap.set("[data-signature-growth] [data-leaf], [data-signature-growth] [data-blossom], [data-signature-growth] [data-fruit]", {
          autoAlpha: 1,
          opacity: 1,
          scale: 1,
        });
        setMotionMode("reduced-static");
        writeTimelineProgress(1);
        return;
      }

      const timeline = createGrowthTimeline();

      if (conditions.mobile) {
        const chapters = chapterRefs.current.filter((chapter): chapter is HTMLLIElement => Boolean(chapter));
        const visibility = new Map<Element, number>();
        let stageTween: gsap.core.Tween | null = null;

        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
          }

          let nextIndex = -1;
          let strongestRatio = 0;
          for (const chapter of chapters) {
            const ratio = visibility.get(chapter) ?? 0;
            if (ratio <= strongestRatio) continue;
            strongestRatio = ratio;
            nextIndex = Number(chapter.dataset.storyIndex);
          }

          if (nextIndex < 0 || nextIndex > finalStageIndex) return;
          stageTween?.kill();
          stageTween = gsap.to(timeline, {
            duration: 0.68,
            ease: "power3.inOut",
            overwrite: true,
            progress: nextIndex / finalStageIndex,
            onUpdate: () => writeTimelineProgress(timeline.progress()),
          });
        }, {
          rootMargin: "-48% 0px -22%",
          threshold: [0.05, 0.2, 0.45, 0.7],
        });

        for (const chapter of chapters) observer.observe(chapter);
        setMotionMode("mobile-staged");
        section.dataset.timelineProgress = "0.000";

        return () => {
          observer.disconnect();
          stageTween?.kill();
          timeline.revert();
        };
      }

      const firstChapter = chapterRefs.current[0];
      const lastChapter = chapterRefs.current.at(-1);
      if (!firstChapter || !lastChapter) {
        timeline.revert();
        return;
      }

      const mode: MotionMode = conditions.desktop ? "desktop-scrub" : "tablet-scrub";
      const progressTrigger = ScrollTrigger.create({
        animation: timeline,
        end: "center center",
        endTrigger: lastChapter,
        id: `phase-9a-${mode}`,
        invalidateOnRefresh: true,
        onRefresh: (trigger) => {
          setTriggerBounds({ start: String(Math.round(trigger.start)), end: String(Math.round(trigger.end)) });
          setTriggerCount(storyTriggerCount());
        },
        onToggle: (trigger) => setPinActive(trigger.isActive),
        scrub: signatureStoryConfig.scrollScrub,
        start: "center center",
        trigger: firstChapter,
      });
      const cancelLayoutRefresh = refreshAfterLayout(progressTrigger);

      setMotionMode(mode);
      setTriggerCount(storyTriggerCount());
      setTriggerBounds({ start: String(Math.round(progressTrigger.start)), end: String(Math.round(progressTrigger.end)) });

      return () => {
        cancelLayoutRefresh();
        progressTrigger.kill();
        timeline.revert();
      };
    });

    return () => media.revert();
  }, { scope: sectionRef });

  function selectChapter(index: number) {
    if (process.env.NODE_ENV === "test") {
      updateActiveIndex(index);
      return;
    }

    const chapter = chapterRefs.current[index];
    if (typeof chapter?.scrollIntoView !== "function") return;
    chapter.scrollIntoView({
      behavior: motionMode === "reduced-static" ? "auto" : "smooth",
      block: "center",
    });
  }

  return (
    <section
      className="scroll-story living-story"
      data-active-stage={activeIndex + 1}
      data-animation-ready={motionMode !== "pending"}
      data-motion-mode={motionMode}
      data-pin-active={pinActive}
      data-pin-end={triggerBounds.end}
      data-pin-start={triggerBounds.start}
      data-pin-strategy={motionMode === "mobile-staged" ? "mobile-sticky" : motionMode.endsWith("scrub") ? "css-sticky" : "none"}
      data-reduced-motion={motionMode === "reduced-static"}
      data-scroll-trigger-count={triggerCount}
      id="how-it-works"
      ref={sectionRef}
    >
      <a className="living-story__skip" href="#living-story-end">Skip the product story</a>
      <Container>
        <header className="living-story__header">
          <span className="eyebrow">Seed to living product</span>
          <h2>Watch one intent become a product that keeps learning.</h2>
          <p>Evidence grows into structure, structure produces value, and learning returns as the next seed.</p>
        </header>

        <div className="living-story__layout">
          <div className="scroll-story__visual-column">
            <figure
              aria-describedby="signature-story-caption"
              className="scroll-story__visual"
              data-story-phase={activeStage.id}
            >
              <div aria-hidden="true" className="scroll-story__root-field"><span /><span /></div>
              <div className="scroll-story__visual-header">
                <span>{activeStage.label}</span>
                {motionMode === "reduced-static" ? <span className="scroll-story__motion-note">Complete static cycle</span> : null}
                <span
                  aria-label={`Stage ${activeIndex + 1} of ${signatureStoryStages.length}`}
                  aria-valuemax={signatureStoryStages.length}
                  aria-valuemin={1}
                  aria-valuenow={activeIndex + 1}
                  role="progressbar"
                >
                  {String(activeIndex + 1).padStart(2, "0")} / {signatureStoryStages.length}
                </span>
              </div>
              <SignatureGrowthVisual activeIndex={activeIndex} label={activeStage.label} />
              <div aria-hidden="true" className="scroll-story__progress">
                {signatureStoryStages.map((stage, index) => (
                  <span data-complete={index <= activeIndex} data-current={index === activeIndex} key={stage.id} />
                ))}
              </div>
              <figcaption className="scroll-story__caption" id="signature-story-caption">
                <small>{activeStage.artifact}</small>
                <strong>{activeStage.title}</strong>
                <span>{activeStage.description}</span>
              </figcaption>
            </figure>
          </div>

          <ol aria-label="Seed to living product story" className="scroll-story__chapters" ref={chapterListRef}>
            {signatureStoryStages.map((stage, index) => (
              <li
                className="scroll-story__chapter"
                data-active={index === activeIndex}
                data-story-index={index}
                id={`signature-stage-${index + 1}`}
                key={stage.id}
                ref={(element) => { chapterRefs.current[index] = element; }}
              >
                <button
                  aria-current={index === activeIndex ? "step" : undefined}
                  aria-pressed={index === activeIndex}
                  className="scroll-story__chapter-control"
                  onClick={() => selectChapter(index)}
                  type="button"
                >
                  <span className="scroll-story__chapter-label">Stage {String(index + 1).padStart(2, "0")} · {stage.label}</span>
                  <strong>{stage.title}</strong>
                  <span>{stage.description}</span>
                  <small>{stage.artifact}</small>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <span aria-hidden="true" id="living-story-end" />
        <noscript>
          <p>One product intent grows through evidence, Foundation, architecture, delivery, and an editable Product Blueprint. Learning returns as the next seed without losing its lineage.</p>
        </noscript>
      </Container>
    </section>
  );
}
