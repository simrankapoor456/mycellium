"use client";

import {
  FOUNDATION_STATE_LABELS,
  signatureBlossoms,
  signatureCanopyPaths,
  signatureFoundationNodes,
  signatureFruits,
  signatureGrowthPaths,
  signatureLeaves,
  signatureValueLabels,
  type FoundationState,
} from "@/lib/marketing/signature-growth";

function FoundationStateMark({ state }: Readonly<{ state: FoundationState }>) {
  if (state === "confirmed") {
    return <path className="signature-growth__state-symbol" d="M-4 0 L-1 3 L5 -4" />;
  }

  if (state === "emerging") {
    return <path className="signature-growth__state-symbol signature-growth__state-symbol--fill" d="M0 -7 A7 7 0 0 0 0 7 Z" />;
  }

  if (state === "blocked") {
    return (
      <g className="signature-growth__state-symbol">
        <path d="M-4 -4 L4 4" />
        <path d="M4 -4 L-4 4" />
      </g>
    );
  }

  return <text className="signature-growth__state-question" textAnchor="middle" x="0" y="4">?</text>;
}

export function SignatureGrowthVisual({ activeIndex, label }: Readonly<{ activeIndex: number; label: string }>) {
  return (
    <div
      className="signature-growth"
      data-active-level={activeIndex}
      data-signature-growth
    >
      <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 960 760">
        <defs>
          <linearGradient id="signature-soil" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#15231a" />
            <stop offset="0.36" stopColor="#0b1711" />
            <stop offset="1" stopColor="#07100c" />
          </linearGradient>
          <linearGradient id="signature-trunk" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stopColor="#d7e8c1" />
            <stop offset="0.58" stopColor="#b9ed66" />
            <stop offset="1" stopColor="#e9f7bd" />
          </linearGradient>
          <radialGradient id="signature-intent-glow">
            <stop offset="0" stopColor="#b9ed66" stopOpacity="0.34" />
            <stop offset="0.48" stopColor="#b9ed66" stopOpacity="0.07" />
            <stop offset="1" stopColor="#b9ed66" stopOpacity="0" />
          </radialGradient>
          <filter height="170%" id="signature-soft-glow" width="170%" x="-35%" y="-35%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g className="signature-growth__environment">
          <path className="signature-growth__soil-line" d="M42 288 C175 272 260 300 378 286 C492 272 595 302 712 286 C792 275 858 280 918 292" />
          <path className="signature-growth__soil" d="M24 289 C180 270 262 302 380 287 C496 272 595 302 715 286 C796 275 862 281 936 298 V744 H24 Z" />
          <path className="signature-growth__soil-strata" d="M44 410 C189 386 297 432 418 408 C553 382 681 431 916 395" />
          <path className="signature-growth__soil-strata" d="M38 548 C201 520 302 570 454 541 C614 510 742 568 922 530" />
          <g className="signature-growth__soil-grain">
            <circle cx="104" cy="356" r="2" /><circle cx="176" cy="454" r="1.5" /><circle cx="248" cy="336" r="1.6" />
            <circle cx="316" cy="590" r="1.4" /><circle cx="418" cy="376" r="1.7" /><circle cx="542" cy="334" r="1.5" />
            <circle cx="576" cy="474" r="1.8" /><circle cx="746" cy="354" r="1.5" /><circle cx="826" cy="488" r="1.7" />
            <circle cx="878" cy="624" r="1.4" /><circle cx="706" cy="692" r="1.5" /><circle cx="194" cy="684" r="1.4" />
          </g>
        </g>

        <g className="signature-growth__seed" data-level="0">
          <circle className="signature-growth__seed-light" cx="480" cy="243" filter="url(#signature-soft-glow)" r="58" />
          <ellipse cx="480" cy="269" rx="65" ry="17" />
          <path className="signature-growth__seed-shell signature-growth__seed-shell--left" d="M480 202 C448 212 430 238 435 266 C440 292 459 308 480 309 C470 282 470 231 480 202 Z" />
          <path className="signature-growth__seed-shell signature-growth__seed-shell--right" d="M480 202 C511 213 529 239 525 267 C521 292 501 308 480 309 C491 282 491 231 480 202 Z" />
          <ellipse className="signature-growth__embryo" cx="480" cy="254" rx="8" ry="19" />
        </g>

        <g className="signature-growth__germination" data-level="1">
          <path data-growth-path d="M481 207 C473 224 489 236 478 251 C468 264 484 275 477 291" pathLength="1" />
          <path className="signature-growth__radicle" data-growth-path d="M480 289 C481 296 480 301 480 309" pathLength="1" />
        </g>

        <g className="signature-growth__root-network">
          {signatureGrowthPaths.map((path) => (
            <path
              className={`signature-growth__root signature-growth__root--${path.kind}`}
              d={path.d}
              data-growth-path
              data-level={path.level}
              data-parent-id={path.parentId ?? undefined}
              data-path-id={path.id}
              data-path-kind={path.kind}
              key={path.id}
              pathLength="1"
            />
          ))}
          <circle className="signature-growth__root-tip" cx="480" cy="304" data-level="1" data-root-tip="primary" r="4" />
        </g>

        <g className="signature-growth__foundation" data-level="2">
          {signatureFoundationNodes.map((node) => {
            const left = node.x < 480;
            return (
              <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                <g
                  className="signature-growth__foundation-node"
                  data-foundation-id={node.id}
                  data-state={node.state}
                >
                  <circle r="10" />
                  <FoundationStateMark state={node.state} />
                  <text
                    className="signature-growth__foundation-label"
                    textAnchor={left ? "end" : "start"}
                    x={left ? -17 : 17}
                    y="-2"
                  >
                    {node.label}
                  </text>
                  <text
                    className="signature-growth__foundation-state"
                    textAnchor={left ? "end" : "start"}
                    x={left ? -17 : 17}
                    y="12"
                  >
                    {FOUNDATION_STATE_LABELS[node.state]}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        <g className="signature-growth__canopy">
          {signatureCanopyPaths.map((path) => (
            <path
              className={`signature-growth__${path.kind}`}
              d={path.d}
              data-growth-path
              data-level={path.kind === "trunk" ? 3 : 4}
              data-parent-id={path.parentId ?? undefined}
              data-path-id={path.id}
              data-path-kind={path.kind}
              key={path.id}
              pathLength="1"
            />
          ))}
        </g>

        <g className="signature-growth__leaves" data-level="5">
          {signatureLeaves.map((leaf) => (
            <path
              className="signature-growth__leaf"
              d={leaf.d}
              data-anchor-x={leaf.anchorX}
              data-anchor-y={leaf.anchorY}
              data-leaf={leaf.id}
              key={leaf.id}
            />
          ))}
        </g>

        <g className="signature-growth__blossoms" data-level="6">
          {signatureBlossoms.map((blossom) => (
            <g key={blossom.id} transform={`translate(${blossom.x} ${blossom.y})`}>
              <g className="signature-growth__blossom" data-blossom={blossom.id}>
                <circle cx="-7" cy="0" r="6" />
                <circle cx="0" cy="-7" r="6" />
                <circle cx="7" cy="0" r="6" />
                <circle cx="0" cy="7" r="6" />
                <circle className="signature-growth__blossom-core" r="3.5" />
              </g>
            </g>
          ))}
        </g>

        <g className="signature-growth__fruits" data-level="7">
          {signatureFruits.map((fruit) => (
            <g key={fruit.id} transform={`translate(${fruit.x} ${fruit.y})`}>
              <g className="signature-growth__fruit" data-fruit={fruit.id} data-value-state={fruit.state}>
                <path d="M0 -13 C-2 -20 1 -24 6 -27" />
                <ellipse cy="1" rx="13" ry="16" />
                <path className="signature-growth__fruit-line" d="M-7 -2 C-2 2 2 5 8 7" />
              </g>
            </g>
          ))}
        </g>

        <g className="signature-growth__value" data-level="8">
          {signatureValueLabels.map((value) => (
            <g className="signature-growth__value-label" data-value-label={value.id} key={value.id}>
              <path d={value.line} />
              <text textAnchor="middle" x={value.x} y={value.y}>{value.label}</text>
            </g>
          ))}
          <path className="signature-growth__value-bracket" d="M252 705 H708" />
          <text className="signature-growth__value-title" textAnchor="middle" x="480" y="728">LIVING PRODUCT VALUE</text>
        </g>

        <g className="signature-growth__renewal" data-level="9">
          <path className="signature-growth__renewal-path" data-growth-path d="M617 126 C690 153 748 207 781 270" pathLength="1" />
          <g transform="translate(617 126)">
            <g className="signature-growth__renewal-seed" data-renewal-seed>
              <ellipse rx="9" ry="13" />
              <path d="M0 -9 C-3 -3 -3 4 1 9" />
            </g>
          </g>
          <text className="signature-growth__renewal-label" textAnchor="middle" x="780" y="302">NEW INTENT</text>
        </g>
      </svg>

      <ul
        aria-label="Foundation state legend"
        className="signature-growth__legend"
        data-visible={activeIndex >= 2}
      >
        {(Object.entries(FOUNDATION_STATE_LABELS) as Array<[FoundationState, string]>).map(([state, stateLabel]) => (
          <li data-state={state} key={state}>
            <span aria-hidden="true" />
            {stateLabel}
          </li>
        ))}
      </ul>

      <p className="sr-only">
        {label}. One intent forms a seed. Evidence grows into a reviewable Foundation, then rises through architecture, requirements, stories, review points, and an editable Product Blueprint. Mature product value returns learning as a new seed.
      </p>
    </div>
  );
}
