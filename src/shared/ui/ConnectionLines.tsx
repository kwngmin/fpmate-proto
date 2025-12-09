"use client";

import { ConnectionPath } from "@/shared/ui/ConnectionPath";

const ConnectionLines = () => {
  // === 좌표 상수 (Grid 비율 기반) ===
  // Card Positions (Grid cols-3): 1/6(16.6%), 3/6(50%), 5/6(83.3%)
  const CARD = {
    1: "16.666%", // 신규 개발/기획
    2: "50%", // 진행
    3: "83.333%", // 완료
  };

  // Feature Positions (Grid cols-4): 1/8(12.5%), 3/8(37.5%), 5/8(62.5%), 7/8(87.5%)
  const FEAT = {
    1: "12.5%", // 신규 개발
    2: "37.5%", // 유지보수
    3: "62.5%", // 발주사
    4: "87.5%", // 개발사
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* === Card 1: SW 사업 기획 === */}
        {/* -> 신규 개발 */}
        <ConnectionPath startX={CARD[1]} endX={FEAT[1]} delay={0} />
        {/* -> 발주사 */}
        <ConnectionPath startX={CARD[1]} endX={FEAT[3]} delay={0.6} />

        {/* === Card 2: SW 사업 진행 === */}
        {/* -> 유지보수 */}
        <ConnectionPath startX={CARD[2]} endX={FEAT[2]} delay={1.5} />
        {/* -> 발주사 */}
        <ConnectionPath startX={CARD[2]} endX={FEAT[3]} delay={2.1} />
        {/* -> 개발사 */}
        <ConnectionPath startX={CARD[2]} endX={FEAT[4]} delay={2.7} />

        {/* === Card 3: SW 사업 완료 === */}
        {/* -> 유지보수 */}
        <ConnectionPath startX={CARD[3]} endX={FEAT[2]} delay={3.5} />
        {/* -> 발주사 */}
        <ConnectionPath startX={CARD[3]} endX={FEAT[3]} delay={4.1} />
      </svg>
    </div>
  );
};

export default ConnectionLines;
