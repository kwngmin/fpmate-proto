"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useId, useMemo } from "react";

type FocusState = "smart-pricing" | "error-validation";

interface Point {
  x: number;
  y: number;
}

interface AnimatedLineProps {
  points: Point[];
  isActive: boolean;
  color?: string;
}

/**
 * 애니메이션 라인 컴포넌트 (수정됨)
 * - 기존: 원이 이동하는 애니메이션
 * - 변경: LiveKit 스타일의 흐르는 점선 애니메이션 (stroke-dasharray + stroke-dashoffset)
 */
const AnimatedLine = ({
  points,
  isActive,
  color = "#22c55e", // 기본값 Green
}: AnimatedLineProps) => {
  // 경로 생성 로직 (Quadratic Curve로 모서리 둥글게 처리)
  const generatePath = useCallback((pts: Point[]): string => {
    if (pts.length < 2) return "";

    const radius = 10; // 모서리 둥글기 반경
    let d = `M${pts[0].x},${pts[0].y}`;

    for (let i = 1; i < pts.length - 1; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      const dx1 = curr.x - prev.x;
      const dy1 = curr.y - prev.y;
      const dx2 = next.x - curr.x;
      const dy2 = next.y - curr.y;

      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      // 선분이 너무 짧으면 둥글기 제한
      const r = Math.min(radius, dist1 / 2, dist2 / 2);

      // 시작점/끝점 계산 (직선 -> 곡선 -> 직선)
      const startX = curr.x - (dx1 / dist1) * r;
      const startY = curr.y - (dy1 / dist1) * r;
      const endX = curr.x + (dx2 / dist2) * r;
      const endY = curr.y + (dy2 / dist2) * r;

      d += ` L${startX},${startY}`;
      d += ` Q${curr.x},${curr.y} ${endX},${endY}`;
    }

    const last = pts[pts.length - 1];
    d += ` L${last.x},${last.y}`;

    return d;
  }, []);

  const pathD = useMemo(() => generatePath(points), [points, generatePath]);

  return (
    <g>
      {/* 1. 배경 라인 (비활성 상태일 때 연하게, 활성일 때 조금 더 진하게) */}
      <path
        d={pathD}
        stroke={isActive ? color : "#e5e7eb"} // 활성: Green, 비활성: Gray
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={isActive ? 0.3 : 0.5}
        className="transition-colors duration-500"
      />

      {/* 2. 흐르는 애니메이션 라인 (활성화 상태일 때만 표시) */}
      {isActive && (
        <path
          d={pathD}
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 8" // 점선 간격
          strokeLinecap="round"
          className="animate-flow" // 아래 style 태그에 정의된 keyframes 사용
          style={{
            opacity: 0.8,
            animation: "flow 1s linear infinite", // 흐르는 속도 조절
          }}
        />
      )}
    </g>
  );
};

/**
 * 공통 카드 컴포넌트 (초록색 테마 통일)
 */
interface CardProps {
  children?: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Card = ({
  children,
  className = "",
  isHighlighted = false,
}: CardProps) => (
  <div
    className={`flex items-center justify-center rounded-md bg-white border transition-all duration-500 ease-out ${
      isHighlighted
        ? "border-green-500 shadow-[-3px_3px_0px_0px_#22c55e]" // Active: Green
        : "border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-green-500 hover:shadow-[-3px_3px_0px_0px_#22c55e]"
    } ${className}`}
  >
    {children}
  </div>
);

/**
 * 공통 라벨 컴포넌트
 */
interface LabelProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Label = ({
  children,
  className = "",
  isHighlighted = false,
}: LabelProps) => (
  <div
    className={`rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out text-center ${
      isHighlighted
        ? "border-green-500 text-green-600 font-bold" // Active: Green
        : "border-separator1 text-gray-500"
    } ${className}`}
  >
    <span style={{ opacity: 1 }}>{children}</span>
  </div>
);

/**
 * 버튼 스타일 라벨 컴포넌트
 */
interface ButtonLabelProps {
  children: React.ReactNode;
  icon: string;
  isHighlighted?: boolean;
}

const ButtonLabel = ({
  children,
  icon,
  isHighlighted = false,
}: ButtonLabelProps) => (
  <div
    className={`rounded-full border bg-white px-3 py-1 text-[0.8125rem] transition-all duration-500 ease-out flex items-center gap-1.5 ${
      isHighlighted
        ? "border-green-500 text-green-600 scale-105" // Active: Green & Scale
        : "border-fg0 text-fg0"
    }`}
  >
    <Image src={icon} alt="" width={16} height={16} className="size-4" />
    <span style={{ opacity: 1 }}>{children}</span>
  </div>
);

/**
 * 기능 카드 컴포넌트
 */
interface FeatureCardProps {
  children: React.ReactNode;
  icon: string;
  isHighlighted?: boolean;
}

const FeatureCard = ({
  children,
  icon,
  isHighlighted = false,
}: FeatureCardProps) => (
  <div
    className={`rounded-md border px-3 py-1.5 text-[0.8125rem] relative z-20 flex gap-1.5 items-center justify-center transition-all duration-500 ease-out ${
      isHighlighted
        ? "border-green-500 shadow-[-3px_3px_0px_0px_#22c55e] bg-green-50 text-green-700" // Active: Green Theme
        : "border-border-secondary shadow-[-3px_3px_0px_0px_lightgray] text-fg0 bg-white"
    }`}
  >
    <Image src={icon} alt="" width={16} height={16} className="size-4" />
    {children}
  </div>
);

/**
 * 결과 카드 컴포넌트
 */
interface ResultCardProps {
  children: React.ReactNode;
  icon: string;
  isHighlighted?: boolean;
}

const ResultCard = ({
  children,
  icon,
  isHighlighted = false,
}: ResultCardProps) => (
  <div
    className={`flex items-center justify-center rounded-md border px-3 py-1.5 text-xs transition-all duration-500 ease-out ${
      isHighlighted
        ? "border-green-500 shadow-[-3px_3px_0px_0px_#22c55e] text-green-700 bg-white scale-105" // Active: Green
        : "border-border-primary shadow-[-3px_3px_0px_0px_lightgray] text-fg0"
    }`}
  >
    <div className="relative flex items-center justify-center">
      <div className="flex items-center justify-center gap-1.5 text-[0.8125rem]">
        <Image src={icon} alt="" width={16} height={16} className="size-4" />
        {children}
      </div>
    </div>
  </div>
);

const Page = () => {
  const [focusState, setFocusState] = useState<FocusState>("smart-pricing");

  // 5초마다 focus 상태 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusState((prev) =>
        prev === "smart-pricing" ? "error-validation" : "smart-pricing"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const isSmartPricing = focusState === "smart-pricing";
  const isErrorValidation = focusState === "error-validation";

  /**
   * 라인 경로 좌표 정의
   * (기존 코드의 좌표 로직 유지)
   */
  const BASE_X = 790; // calc(50%) 기준점

  const pos = {
    // 스마트 대가산정 경로 요소
    user: { x: BASE_X - 139 + 36, y: 297 + 28 },
    requirement: { x: BASE_X + 8, y: 297 + 28 },
    upload: { x: BASE_X + 112 + 40, y: 297 + 28 },
    developmentScale: { x: 1043 + 70 + 40, y: 297 + 28 },
    costEstimation: { x: BASE_X + 180 + 50, y: 484 + 15 },
    web: { x: BASE_X - 32, y: 589 + 30 },
    pdf: { x: BASE_X + 68, y: 589 + 30 },
    xls: { x: BASE_X + 168, y: 589 + 30 },

    // 오류 검증 경로 요소
    form: { x: BASE_X - 56 + 34, y: 339 + 24 },
    userInput: { x: BASE_X + 74 + 50, y: 339 + 24 },
    autoValidation: { x: 1043 + 70, y: 339 + 24 },
    dataDuplicate: { x: BASE_X + 320 + 50, y: 556 + 15 },
    dataError: { x: BASE_X + 320 + 50, y: 606 + 15 },
    dataMissing: { x: BASE_X + 320 + 50, y: 656 + 15 },
  };

  // 스마트 대가산정 경로
  const smartPaths = {
    path1: [
      { x: pos.user.x, y: pos.user.y },
      { x: pos.requirement.x, y: pos.requirement.y },
    ],
    path2: [
      { x: pos.requirement.x + 35, y: pos.requirement.y },
      { x: pos.upload.x - 40, y: pos.upload.y },
    ],
    path3: [
      { x: pos.upload.x + 30, y: pos.upload.y },
      { x: pos.developmentScale.x - 50, y: pos.developmentScale.y },
    ],
    path4: [
      { x: pos.developmentScale.x + 50, y: pos.developmentScale.y },
      { x: pos.developmentScale.x + 114, y: pos.developmentScale.y },
      { x: pos.developmentScale.x + 114, y: pos.costEstimation.y },
      { x: pos.costEstimation.x + 50, y: pos.costEstimation.y },
    ],
    pathToWeb: [
      { x: pos.costEstimation.x, y: pos.costEstimation.y + 20 },
      { x: pos.costEstimation.x, y: pos.web.y - 70 },
      { x: pos.web.x + 20, y: pos.web.y - 70 },
      { x: pos.web.x + 20, y: pos.web.y - 20 },
    ],
    pathToPdf: [
      { x: pos.costEstimation.x, y: pos.costEstimation.y + 20 },
      { x: pos.costEstimation.x, y: pos.pdf.y - 70 },
      { x: pos.pdf.x + 20, y: pos.pdf.y - 70 },
      { x: pos.pdf.x + 20, y: pos.pdf.y - 20 },
    ],
    pathToXls: [
      { x: pos.costEstimation.x, y: pos.costEstimation.y + 20 },
      { x: pos.costEstimation.x, y: pos.xls.y - 70 },
      { x: pos.xls.x + 20, y: pos.xls.y - 70 },
      { x: pos.xls.x + 20, y: pos.xls.y - 20 },
    ],
  };

  // 오류 검증 경로
  const errorPaths = {
    path1: [
      { x: pos.user.x - 18, y: pos.user.y + 20 },
      { x: pos.user.x - 18, y: pos.form.y + 12 },
      { x: pos.form.x - 30, y: pos.form.y + 12 },
    ],
    path2: [
      { x: pos.form.x + 20, y: pos.form.y + 12 },
      { x: pos.userInput.x - 50, y: pos.userInput.y + 12 },
    ],
    path3: [
      { x: pos.userInput.x + 50, y: pos.userInput.y + 12 },
      { x: pos.autoValidation.x + 10, y: pos.autoValidation.y + 12 },
    ],
    path4: [
      { x: pos.autoValidation.x + 50, y: pos.autoValidation.y },
      { x: pos.dataDuplicate.x - 10, y: pos.dataDuplicate.y - 15 },
    ],
    path5: [
      { x: pos.dataDuplicate.x - 10, y: pos.dataDuplicate.y + 20 },
      { x: pos.dataError.x - 10, y: pos.dataError.y - 15 },
    ],
    path6: [
      { x: pos.dataError.x - 10, y: pos.dataError.y + 20 },
      { x: pos.dataMissing.x - 10, y: pos.dataMissing.y - 15 },
    ],
  };

  // 모든 라인 컬러는 Green (#22c55e) 사용
  const ACTIVE_COLOR = "#22c55e";

  return (
    <div className="min-h-screen bg-white">
      {/* 
        Tailwind 설정에 animate-flow가 없다면 아래 스타일을 추가해야 합니다.
        LiveKit과 같은 흐르는 효과를 줍니다.
      */}
      <style jsx global>{`
        @keyframes flow {
          from {
            stroke-dashoffset: 16;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="relative w-full overflow-hidden">
        {/* selected section */}
        <div className="px-6 py-20 h-128">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="z-10 flex grow flex-col justify-end md:max-w-prose gap-6">
              {/* 스마트 대가산정 버튼 */}
              <button
                type="button"
                onClick={() => setFocusState("smart-pricing")}
                className="relative text-left group"
              >
                <div className="pointer-events-none flex w-full cursor-pointer items-center justify-center gap-2 py-2 transition-all duration-300 md:pointer-events-auto md:justify-start text-fg3">
                  <span
                    className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter transition-all duration-300 ${
                      isSmartPricing
                        ? "opacity-100 font-semibold text-black scale-105 origin-left"
                        : "opacity-50 hover:opacity-80 font-medium text-gray-500"
                    }`}
                  >
                    AI와 자동산정으로 구현하는 스마트 대가산정
                  </span>
                  {isSmartPricing && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </div>
                <p
                  className={`text-base max-w-96 break-keep transition-all duration-300 overflow-hidden ${
                    isSmartPricing
                      ? "opacity-100 max-h-24"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  요구사항 문서를 입력하는 순간, AI가 내용을 분석해 기능을 자동
                  추천하고 전문가 도움 없이도 누구나 쉽게 비용을 산정 할 수
                  있습니다.
                </p>
              </button>

              {/* 오류 검증 버튼 */}
              <button
                type="button"
                onClick={() => setFocusState("error-validation")}
                className="relative text-left group"
              >
                <div className="pointer-events-none flex w-full cursor-pointer items-center justify-center gap-2 py-2 transition-all duration-300 md:pointer-events-auto md:justify-start text-fg3">
                  <span
                    className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter transition-all duration-300 ${
                      isErrorValidation
                        ? "opacity-100 font-semibold text-black scale-105 origin-left"
                        : "opacity-50 hover:opacity-80 font-medium text-gray-500"
                    }`}
                  >
                    편리한 오류 검증으로 향상되는 업무 효율
                  </span>
                  {isErrorValidation && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </div>
                <p
                  className={`text-base max-w-96 break-keep transition-all duration-300 overflow-hidden ${
                    isErrorValidation
                      ? "opacity-100 max-h-24"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  FPMate가 데이터의 중복, 오류, 누락을 확인해 업무 부담은 줄이고
                  결과의 신뢰도는 높입니다.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* background grid */}
        <div className="absolute top-0 h-[838px] w-full -translate-x-1/3 translate-y-20 scale-[0.5] md:-top-20 md:-translate-x-1/4 md:translate-y-8 md:scale-[0.94] lg:translate-x-0 lg:translate-y-0 hidden md:block pointer-events-none">
          <div className="h-[838px] w-full" style={{ opacity: 1 }}>
            <div className="absolute left-[calc(50%-600px)] -top-20 h-[1095px] w-[1580px] -rotate-30 skew-x-30">
              {/* grid image */}
              <Image
                src="/hero-grid.svg"
                alt="FPMate"
                width={1579.97}
                height={1096.29}
                className="absolute left-0 top-0 object-none opacity-10"
              />

              {/* SVG 라인 애니메이션 레이어 */}
              <svg
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
              >
                {/* 스마트 대가산정 라인 */}
                <AnimatedLine
                  points={smartPaths.path1}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.path2}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.path3}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.path4}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.pathToWeb}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.pathToPdf}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={smartPaths.pathToXls}
                  isActive={isSmartPricing}
                  color={ACTIVE_COLOR}
                />

                {/* 오류 검증 라인 */}
                <AnimatedLine
                  points={errorPaths.path1}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path2}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path3}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path4}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path5}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path6}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
              </svg>

              {/* === DOM Elements (Cards, Labels) === */}

              {/* user */}
              <div className="absolute left-[calc(50%-139px)] top-[297px] z-20">
                <Card
                  className="h-12 w-12"
                  isHighlighted={isSmartPricing || isErrorValidation} // 항상 활성
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-fg0"
                  >
                    <path
                      d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11.9989 12C7.21736 12 3.91209 15.7691 3.50083 20.4563L3.45312 21H20.5447L20.497 20.4563C20.0857 15.7691 16.7805 12 11.9989 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </Card>
              </div>

              {/* 요구사항 label */}
              <div className="absolute left-[calc(50%+8px)] top-[298px] z-30 preserve-3d">
                <div className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                  <Label className="w-16" isHighlighted={isSmartPricing}>
                    요구사항
                  </Label>
                </div>
              </div>

              {/* pdf/hwp/xls placeholder */}
              <div className="absolute left-[calc(50%+18px)] top-[289px] z-20 preserve-3d">
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <Card
                    className="h-12 w-12 px-3 py-3"
                    isHighlighted={isSmartPricing}
                  />
                </div>
              </div>

              {/* form placeholder */}
              <div className="absolute left-[calc(50%-40px)] top-[339px] z-20 preserve-3d">
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <Card
                    className="h-12 w-12 px-3 py-3"
                    isHighlighted={isErrorValidation}
                  />
                </div>
              </div>

              {/* 업로드 */}
              <div className="absolute left-[calc(50%+112px)] top-[310px] z-20">
                <ButtonLabel
                  icon="/assets/svgs/upload-simple.svg"
                  isHighlighted={isSmartPricing}
                >
                  업로드
                </ButtonLabel>
              </div>

              {/* 사용자 입력 */}
              <div className="absolute left-[calc(50%+74px)] top-[360px] z-20">
                <ButtonLabel
                  icon="/assets/svgs/key-return.svg"
                  isHighlighted={isErrorValidation}
                >
                  사용자 입력
                </ButtonLabel>
              </div>

              {/* FPMate AI Container */}
              <div
                className={`absolute left-[1043px] top-[274px] flex h-[150px] w-[250px] flex-col items-center justify-center gap-3.75 rounded border transition-colors duration-500 pb-2 ${
                  isSmartPricing || isErrorValidation
                    ? "border-green-400 bg-green-50/10"
                    : "border-dashed border-separator bg-white/10"
                }`}
              >
                {/* FPMate logo */}
                <div className="absolute -top-[76px] left-1 z-0">
                  <Card className="h-12 w-12">
                    <div className="relative flex items-center justify-center ">
                      <Image
                        src="/assets/logo/fpmate-symbol.svg"
                        alt="FPMate"
                        width={16}
                        height={16}
                        className="size-8"
                      />
                    </div>
                  </Card>
                </div>

                {/* FPMate A.I. label */}
                <div className="absolute -left-5 -top-4">
                  <div className="rounded-full border bg-white px-3 py-0.5 text-xxs text-text-primary transition-all duration-500 ease-out border-accent-primary">
                    <span style={{ opacity: 1 }}>FPMate A.I.</span>
                  </div>
                </div>

                {/* 개발규모 식별 */}
                <FeatureCard
                  icon="/assets/svgs/scan.svg"
                  isHighlighted={isSmartPricing}
                >
                  개발규모 식별
                </FeatureCard>

                {/* 자동 검증 */}
                <FeatureCard
                  icon="/assets/svgs/arrows-clockwise.svg"
                  isHighlighted={isErrorValidation}
                >
                  자동 검증
                </FeatureCard>
              </div>

              {/* 비용 산정 */}
              <div className="absolute left-[calc(50%+180px)] top-[484px] z-20">
                <ResultCard
                  icon="/assets/svgs/table.svg"
                  isHighlighted={isSmartPricing}
                >
                  비용 산정
                </ResultCard>
              </div>

              {/* 데이터 중복/오류/누락 */}
              <div className="absolute left-[calc(50%+320px)] top-[556px] z-20">
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 중복
                </ResultCard>
              </div>

              <div className="absolute left-[calc(50%+320px)] top-[606px] z-20">
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 오류
                </ResultCard>
              </div>

              <div className="absolute left-[calc(50%+320px)] top-[656px] z-20">
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 누락
                </ResultCard>
              </div>

              {/* Web */}
              <div className="absolute left-[calc(50%-32px)] top-[589px] z-20 preserve-3d">
                <div className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2">
                  <Label className="w-12" isHighlighted={isSmartPricing}>
                    Web
                  </Label>
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <Card
                    className="h-12 w-12 p-2"
                    isHighlighted={isSmartPricing}
                  >
                    <Image
                      src="/assets/svgs/globe.svg"
                      alt="web"
                      width={16}
                      height={16}
                      className="size-6"
                    />
                  </Card>
                </div>
              </div>

              {/* PDF */}
              <div className="absolute left-[calc(50%+68px)] top-[589px] z-20 preserve-3d">
                <div className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2">
                  <Label className="w-12" isHighlighted={isSmartPricing}>
                    PDF
                  </Label>
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <Card
                    className="h-12 w-12 px-3 py-3"
                    isHighlighted={isSmartPricing}
                  />
                </div>
              </div>

              {/* XLS */}
              <div className="absolute left-[calc(50%+168px)] top-[589px] z-20 preserve-3d">
                <div className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2">
                  <Label className="w-12" isHighlighted={isSmartPricing}>
                    XLS
                  </Label>
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <Card
                    className="h-12 w-12 px-3 py-3"
                    isHighlighted={isSmartPricing}
                  />
                </div>
              </div>

              {/* backboard panel */}
              <div
                className="absolute border border-border-primary left-[calc(50%-95px)] top-[450px] z-5 flex h-[300px] w-[597px] px-3 py-2"
                style={{ opacity: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
