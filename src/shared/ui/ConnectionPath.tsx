"use client";

import { motion } from "motion/react";

interface ConnectionPathProps {
  startX: string; // 예: "16.66%"
  endX: string; // 예: "12.5%"
  delay?: number;
  duration?: number;
  color?: string;
}

export const ConnectionPath = ({
  startX,
  endX,
  delay = 0,
  duration = 2.5,
  color = "#3b82f6",
}: ConnectionPathProps) => {
  // [수정된 부분]
  // SVG d 속성에는 '%' 단위가 들어갈 수 없습니다.
  // parseFloat를 사용해 "16.66%" -> 16.66 (숫자)로 변환합니다.
  // 부모 SVG의 viewBox가 "0 0 100 100"이므로 16.66은 곧 16.66% 위치가 됩니다.
  const sX = parseFloat(startX);
  const eX = parseFloat(endX);

  // 좌표 계산 (숫자만 사용)
  const pathData = `M ${sX} 0 L ${sX} 50 L ${eX} 50 L ${eX} 100`;

  // 그라데이션용 ID (특수문자 제거)
  const gradientId = `gradient-${sX}-${eX}`.replace(/\./g, "-");

  return (
    <>
      {/* 1. 배경 트랙 (경로 확인용, 연한 회색) */}
      <path
        d={pathData}
        fill="none"
        stroke="#e5e7eb" // gray-200
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        className="opacity-40"
      />

      {/* 2. 애니메이션 라인 */}
      <motion.path
        d={pathData}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="square" // 직각 느낌을 위해 square 또는 round
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1], // 그려짐 -> 유지
          pathOffset: [0, 0, 1], // 라인이 흘러가는 효과
          opacity: [0, 1, 0], // 나타났다 사라짐
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear", // 끊김 없는 흐름을 위해 linear 추천
          delay: delay,
          repeatDelay: 0.5,
        }}
      />

      {/* 3. 그라데이션 정의 */}
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          {/* 위쪽은 투명하다가 중간부터 색상이 나타나고 끝에서 다시 투명해짐 */}
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="20%" stopColor={color} stopOpacity="1" />
          <stop offset="80%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
};
