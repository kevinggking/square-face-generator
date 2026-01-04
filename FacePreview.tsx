"use client";

import { useMemo } from "react";

type FaceProps = {
  skinColor: string;
  hairStyle: number;     // 0~5
  hairColor: string;
  eyeStyle: number;      // 0~4
  mouthStyle: number;    // 0~4
  bgColor: string;
};

export default function FacePreview({
  skinColor,
  hairStyle,
  hairColor,
  eyeStyle,
  mouthStyle,
  bgColor,
}: FaceProps) {

  const hairPaths = useMemo(() => [
    // 0: short straight
    <path key="h0" d="M100,120 Q256,40 412,120 L420,180 Q256,260 92,180 Z" fill={hairColor} />,
    // 1: bob
    <path key="h1" d="M90,140 Q256,30 420,140 Q430,220 380,260 Q256,300 132,260 Q80,220 90,140 Z" fill={hairColor} />,
    // 2: long side
    <g key="h2">
      <path d="M140,100 Q100,180 90,300 L60,340 Q80,380 140,340 Z" fill={hairColor} />
      <path d="M372,100 Q412,180 422,300 L452,340 Q432,380 372,340 Z" fill={hairColor} />
      <rect x="130" y="90" width="252" height="140" rx="60" fill={hairColor} />
    </g>,
    // 3: messy
    <g key="h3">
      <ellipse cx="180" cy="140" rx="110" ry="90" fill={hairColor} />
      <ellipse cx="340" cy="160" rx="120" ry="100" fill={hairColor} />
      <ellipse cx="256" cy="100" rx="140" ry="80" fill={hairColor} />
    </g>,
    // 4: ponytail
    <g key="h4">
      <path d="M120,140 Q256,20 392,140 L400,200 Q380,280 320,340 Q256,380 192,340 Q128,280 120,200 Z" fill={hairColor} />
      <ellipse cx="256" cy="360" rx="50" ry="80" fill={hairColor} />
    </g>,
    // 5: none / bald
  ], [hairColor]);

  const eyeShapes = useMemo(() => [
    // 0: round open
    <circle key="e0" cx="180" cy="220" r="28" fill="white" />,
    <circle key="e0p" cx="180" cy="220" r="14" fill="black" />,
    <circle key="e0r" cx="332" cy="220" r="28" fill="white" />,
    <circle key="e0rp" cx="332" cy="220" r="14" fill="black" />,
    // 1: half-closed
    <ellipse key="e1" cx="180" cy="225" rx="32" ry="18" fill="black" />,
    <ellipse key="e1r" cx="332" cy="225" rx="32" ry="18" fill="black" />,
    // 2: smiling closed
    <path key="e2" d="M160,220 Q180,200 200,220" stroke="black" strokeWidth="10" fill="none" />,
    <path key="e2r" d="M312,220 Q332,200 352,220" stroke="black" strokeWidth="10" fill="none" />,
    // 3: winking left
    <circle key="e3" cx="180" cy="220" r="28" fill="white" />,
    <circle key="e3p" cx="180" cy="220" r="14" fill="black" />,
    <path  key="e3r" d="M312,220 Q332,215 352,220" stroke="black" strokeWidth="12" fill="none" />,
    // 4: surprised
    <ellipse key="e4" cx="180" cy="220" rx="22" ry="38" fill="white" />,
    <circle key="e4p" cx="180" cy="220" r="12" fill="black" />,
    <ellipse key="e4r" cx="332" cy="220" rx="22" ry="38" fill="white" />,
    <circle key="e4rp" cx="332" cy="220" r="12" fill="black" />,
  ], []);

  const mouthShapes = useMemo(() => [
    // 0: smile
    <path key="m0" d="M180,320 Q256,360 332,320" stroke="black" strokeWidth="12" fill="none" />,
    // 1: big laugh
    <ellipse key="m1" cx="256" cy="330" rx="60" ry="40" fill="pink" stroke="black" strokeWidth="8" />,
    // 2: neutral
    <line key="m2" x1="190" y1="330" x2="322" y2="330" stroke="black" strokeWidth="12" />,
    // 3: surprised O
    <circle key="m3" cx="256" cy="330" r="38" fill="white" stroke="black" strokeWidth="10" />,
    // 4: cat mouth
    <path key="m4" d="M240,320 Q256,340 272,320" stroke="black" strokeWidth="10" fill="none" />,
  ], []);

  return (
    <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-2xl">
      {/* background */}
      <rect width="512" height="512" fill={bgColor} rx="80" />

      {/* hair back layer */}
      {hairStyle >= 0 && hairStyle < 5 && hairPaths[hairStyle]}

      {/* face */}
      <circle cx="256" cy="256" r="160" fill={skinColor} stroke="#333" strokeWidth="8" />

      {/* eyes */}
      {eyeStyle * 4 < eyeShapes.length && eyeShapes.slice(eyeStyle * 4, eyeStyle * 4 + 4)}

      {/* mouth */}
      {mouthShapes[mouthStyle]}

      {/* blush */}
      <circle cx="180" cy="280" r="38" fill="#ff9999" opacity="0.4" />
      <circle cx="332" cy="280" r="38" fill="#ff9999" opacity="0.4" />
    </svg>
  );
}