"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

const features = [
  {
    title: "신규 개발",
    description: "초기 개발 규모 산정의 정확도 향상",
    icon: "magic-wand",
  },
  {
    title: "유지보수",
    description: "변경개선 요청에 대한 업무량 산정의 객관성과 신뢰도 향상",
    icon: "toolbox",
  },
  {
    title: "발주사",
    description: "견적 비교와 기능점수 검증에 효과적으로 대응",
    icon: "building-office",
  },
  {
    title: "개발사",
    description: "견적제안서 작성에 필요한 기능점수 기반 근거 자료 자동 생성",
    icon: "code",
  },
];

type FocusState = "smart-pricing" | "error-validation";

interface Point {
  x: number;
  y: number;
}

interface AnimatedLineProps {
  points: Point[];
  isActive: boolean;
  delay?: number;
  duration?: number;
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
 * 공통 카드 컴포넌트
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
        ? "border-brand-primary shadow-[-3px_3px_0px_0px_green]"
        : "border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green]"
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
        ? "border-brand-primary text-brand-primary"
        : "border-separator1"
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
        ? "border-brand-primary text-brand-primary"
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
    className={`rounded-md border px-3 py-1.5 text-[0.8125rem] text-fg0 relative z-20 flex gap-1.5 items-center justify-center transition-all duration-500 ease-out ${
      isHighlighted
        ? "border-brand-primary shadow-[-3px_3px_0px_0px_green] bg-green-50"
        : "border-border-secondary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green]"
    }`}
  >
    <Image src={icon} alt="" width={16} height={16} className="size-4" />
    {children}
  </div>
);

/**
 * 결과 카드 컴포넌트 (비용 산정, 데이터 검증 결과 등)
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
        ? "border-brand-primary shadow-[-3px_3px_0px_0px_green]"
        : "border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green]"
    }`}
  >
    <div
      className="relative flex items-center justify-center"
      style={{ opacity: 1 }}
    >
      <div className="flex items-center justify-center gap-1.5 text-[0.8125rem]">
        <Image src={icon} alt="" width={16} height={16} className="size-4" />
        {children}
      </div>
    </div>
  </div>
);

const Diagram = () => {
  const [focusState, setFocusState] = useState<FocusState>("smart-pricing");
  const [isAnimationStarted, setIsAnimationStarted] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  useEffect(() => {
    // 1200ms 후에 애니메이션 시작
    const initialDelay = setTimeout(() => {
      setIsAnimationStarted(true);
    }, 300);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  // 5초마다 focus 상태 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusState((prev) =>
        prev === "smart-pricing" ? "error-validation" : "smart-pricing"
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [resetTrigger, isAnimationStarted]);

  const isSmartPricing = focusState === "smart-pricing";
  const isErrorValidation = focusState === "error-validation";

  /**
   * 라인 경로 좌표 정의
   * 아이소메트릭 그리드 변환 (-rotate-30 skew-x-30)이 적용된 컨테이너 내부 좌표
   * CSS의 left/top 값을 기반으로 계산
   */
  const BASE_X = 790; // calc(50%) 기준점

  // 요소별 좌표 (CSS 위치 기반)
  const pos = {
    // 스마트 대가산정 경로 요소
    user: { x: BASE_X - 89 + 36, y: 297 + 28 },
    requirement: { x: BASE_X + 8 + 25, y: 297 + 28 },
    upload: { x: BASE_X + 112 + 40 + 25, y: 297 + 28 },
    developmentScale: { x: 1043 + 70 + 40, y: 297 + 28 },
    costEstimation: { x: BASE_X + 180 + 50, y: 484 + 15 },
    web: { x: BASE_X - 32, y: 589 + 30 },
    pdf: { x: BASE_X + 68, y: 589 + 30 },
    xls: { x: BASE_X + 168, y: 589 + 30 },

    // 오류 검증 경로 요소 (CSS 위치에 맞게 수정)
    userInput: { x: BASE_X + 74 + 50, y: 339 + 24 },
    autoValidation: { x: BASE_X + 320 + 50, y: 339 + 24 },
    dataDuplicate: { x: BASE_X + 320 + 50, y: 530 + 15 }, // top-[530px]
    dataError: { x: BASE_X + 320 + 50, y: 568 + 15 }, // top-[568px]
    dataMissing: { x: BASE_X + 320 + 50, y: 606 + 15 }, // top-[606px]
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
      { x: pos.costEstimation.x - 10, y: pos.costEstimation.y + 20 },
      { x: pos.costEstimation.x - 10, y: pos.web.y - 70 },
      { x: pos.web.x + 20, y: pos.web.y - 70 },
      { x: pos.web.x + 20, y: pos.web.y - 20 },
    ],
    pathToPdf: [
      { x: pos.costEstimation.x - 10, y: pos.costEstimation.y + 20 },
      { x: pos.costEstimation.x - 10, y: pos.pdf.y - 70 },
      { x: pos.pdf.x + 20, y: pos.pdf.y - 70 },
      { x: pos.pdf.x + 20, y: pos.pdf.y - 20 },
    ],
    pathToXls: [
      { x: pos.costEstimation.x - 10, y: pos.costEstimation.y + 20 },
      { x: pos.costEstimation.x - 10, y: pos.xls.y - 70 },
      { x: pos.xls.x + 20, y: pos.xls.y - 70 },
      { x: pos.xls.x + 20, y: pos.xls.y - 20 },
    ],
  };

  // 오류 검증 경로 (좌표 수정됨)
  const errorPaths = {
    path1: [
      { x: pos.user.x - 18, y: pos.user.y + 20 },
      { x: pos.user.x - 18, y: pos.userInput.y + 12 },
      { x: pos.userInput.x - 50, y: pos.userInput.y + 12 },
    ],
    path3: [
      { x: pos.userInput.x + 50, y: pos.userInput.y + 12 },
      { x: pos.autoValidation.x - 40, y: pos.autoValidation.y + 12 },
    ],
    path4: [
      // 자동 검증 → 데이터 중복
      { x: pos.autoValidation.x + 5, y: pos.autoValidation.y },
      { x: pos.dataDuplicate.x + 5, y: pos.dataDuplicate.y - 15 },
    ],
    path5: [
      // 데이터 중복 → 데이터 오류
      { x: pos.dataDuplicate.x + 5, y: pos.dataDuplicate.y + 20 },
      { x: pos.dataError.x + 5, y: pos.dataError.y - 15 },
    ],
    path6: [
      // 데이터 오류 → 데이터 누락
      { x: pos.dataError.x + 5, y: pos.dataError.y + 20 },
      { x: pos.dataMissing.x + 5, y: pos.dataMissing.y - 15 },
    ],
  };

  // 모든 라인 컬러는 Green (#00AB55) 사용
  const ACTIVE_COLOR = "#00AB55";

  return (
    <div className="my-40">
      {/* title */}
      <div className="relative z-30 max-w-[1200px] mx-auto px-6 text-[2rem] md:text-[3.5rem] leading-[1.15] tracking-tighter font-semibold break-keep">
        성공적인 SW 사업을 위한 파트너
        <br />
        <span className="font-bold text-brand-primary">FPMate</span>
      </div>

      {/* Diagram */}
      <div className="relative w-full overflow-hidden">
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

        {/* selected section */}
        <div className="py-20 z-30 mb-6">
          <div className="mx-auto w-full max-w-[1200px] h-96 px-6">
            <div className="relative z-10 flex grow flex-col justify-end md:max-w-prose gap-10">
              {/* 스마트 대가산정 버튼 */}
              <button
                type="button"
                onClick={() => {
                  if (focusState !== "smart-pricing") {
                    setFocusState("smart-pricing");
                  }
                  setResetTrigger((prev) => prev + 1);
                }}
                className="relative text-left"
              >
                <div className="pointer-events-none flex w-full cursor-pointer items-center justify-center gap-3 py-2 transition-all duration-400 ease-out md:pointer-events-auto md:justify-start text-fg3">
                  <span
                    className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter text-text-primary max-w-96 break-keep font-semibold`}
                  >
                    AI와 자동산정으로 구현하는 스마트 대가산정
                  </span>
                  {isSmartPricing && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                    </span>
                  )}
                </div>
                <p
                  className={`text-[0.9375rem] sm:text-base max-w-96 break-keep transition-all duration-400 ease-out overflow-hidden ${
                    isSmartPricing
                      ? "text-text-secondary" // max-h-28
                      : " text-text-tertiary" // max-h-0
                  }`}
                >
                  요구사항 문서를 입력하는 순간, AI가 내용을 분석해 기능을 자동
                  추천하고 전문가 도움 없이도 누구나 쉽게 비용을 산정 할 수
                  있습니다.
                </p>
              </button>

              <div className="h-px bg-border-primary max-w-96" />

              {/* 오류 검증 버튼 */}
              <button
                type="button"
                onClick={() => {
                  if (focusState !== "error-validation") {
                    setFocusState("error-validation");
                  }
                  setResetTrigger((prev) => prev + 1);
                }}
                className="relative text-left"
              >
                <div className="pointer-events-none flex w-full cursor-pointer items-center justify-center gap-3 py-2 transition-all duration-400 ease-out md:pointer-events-auto md:justify-start text-fg3">
                  <span
                    className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter text-text-primary max-w-96 break-keep font-semibold`}
                  >
                    편리한 오류 검증으로 향상되는 업무 효율
                  </span>
                  {isErrorValidation && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                    </span>
                  )}
                </div>
                <p
                  className={`text-[0.9375rem] sm:text-base max-w-96 break-keep transition-all duration-400 ease-out overflow-hidden text-text-secondary ${
                    isErrorValidation
                      ? "text-text-secondary" // max-h-28
                      : " text-text-tertiary" // max-h-0
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
          <div className="h-[838px] w-full relative" style={{ opacity: 1 }}>
            <div className="absolute left-[calc(50%-550px)] -top-20 h-[1095px] w-[1580px] -rotate-30 skew-x-30">
              {/* grid image */}
              <div className="absolute left-0 top-0 after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-linear-to-b after:from-white after:to-transparent z-0">
                <Image
                  src="/hero-grid.svg"
                  alt="FPMate"
                  width={1579.97}
                  height={1096.29}
                  className="object-none opacity-15"
                />
              </div>

              {/* SVG 라인 애니메이션 레이어 */}
              <svg
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* 빛나는 효과 필터 */}
                  <filter
                    id="lineGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

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
                  points={errorPaths.path3}
                  isActive={isErrorValidation}
                  color={ACTIVE_COLOR}
                />
                <AnimatedLine
                  points={errorPaths.path4}
                  isActive={isErrorValidation}
                  delay={0.9}
                  duration={2}
                />
                <AnimatedLine
                  points={errorPaths.path5}
                  isActive={isErrorValidation}
                  delay={1.2}
                  duration={2}
                />
                <AnimatedLine
                  points={errorPaths.path6}
                  isActive={isErrorValidation}
                  delay={1.5}
                  duration={2}
                />
              </svg>

              {/* user */}
              <Card
                className="absolute left-[calc(50%-89px)] top-[297px] z-20 h-12 w-12"
                isHighlighted={isSmartPricing || isErrorValidation}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  className="h-5 w-5 text-fg0"
                >
                  <path
                    d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z"
                    fill="currentcolor"
                  />
                  <path
                    d="M11.9989 12C7.21736 12 3.91209 15.7691 3.50083 20.4563L3.45312 21H20.5447L20.497 20.4563C20.0857 15.7691 16.7805 12 11.9989 12Z"
                    fill="currentcolor"
                  />
                </svg>
              </Card>

              {/* 요구사항 label */}
              <div className="absolute left-[calc(50%+34px+25px)] top-[264px] z-30 preserve-3d">
                <div
                  className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 1 }}
                >
                  <div className="min-w-16 shrink-0">요구사항</div>
                </div>
              </div>

              {/* pdf/hwp/xls label */}
              <div className="absolute left-[calc(50%+16px+25px)] top-[295px] z-30 preserve-3d">
                <div
                  className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 1 }}
                >
                  <Label className="w-12" isHighlighted={isSmartPricing}>
                    한글
                  </Label>
                </div>
              </div>

              {/* pdf/hwp/xls */}
              <div className="absolute left-[calc(50%+18px+25px)] top-[289px] z-20 preserve-3d">
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
                  >
                    <span className="text-white bg-blue-600 font-bold text-sm px-1 rounded-xs">
                      HWP
                    </span>
                  </Card>
                </div>
              </div>

              {/* 업로드 */}
              <div className="absolute left-[calc(50%+112px+25px)] top-[310px] z-20">
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

              {/* FPMate AI */}
              <div className="absolute left-[1043px] top-[274px] flex h-[150px] w-[250px] flex-col items-center justify-center gap-3.75 rounded bg-white/10 border transition-colors border-dashed border-separator pb-2">
                {/* FPMate logo */}
                <Card className="absolute -top-[76px] left-1 z-0 h-12 w-12">
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

              {/* 데이터 중복 */}
              <div className="absolute left-[calc(50%+320px)] top-[530px] z-20">
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 중복
                </ResultCard>
              </div>

              {/* 데이터 오류 */}
              <div className="absolute left-[calc(50%+320px)] top-[568px] z-20">
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 오류
                </ResultCard>
              </div>

              {/* 데이터 누락 */}
              <div className="absolute left-[calc(50%+320px)] top-[606px] z-20">
                <ResultCard
                  icon="/assets/svgs/check.svg"
                  isHighlighted={isErrorValidation}
                >
                  데이터 누락
                </ResultCard>
              </div>

              {/* web */}
              <div className="absolute left-[calc(50%-32px)] top-[589px] z-20 preserve-3d">
                <div
                  className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 1 }}
                >
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
                      className="size-6.5"
                    />
                  </Card>
                </div>
              </div>

              {/* pdf */}
              <div className="absolute left-[calc(50%+68px)] top-[589px] z-20 preserve-3d">
                <div
                  className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 1 }}
                >
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
                  >
                    <span className="text-white bg-red-500 font-bold text-sm px-1 rounded-xs">
                      PDF
                    </span>
                  </Card>
                </div>
              </div>

              {/* xls */}
              <div className="absolute left-[calc(50%+168px)] top-[589px] z-20 preserve-3d">
                <div
                  className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 1 }}
                >
                  <Label className="w-12" isHighlighted={isSmartPricing}>
                    엑셀
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
                  >
                    <span className="text-white bg-green-700 font-bold text-sm px-1 rounded-xs">
                      XLS
                    </span>
                  </Card>
                </div>
              </div>

              {/* backboard panel */}
              <div
                className="absolute border border-border-primary left-[calc(50%-95px)] top-[450px] z-5 flex h-[250px] w-[597px] px-3 py-2"
                style={{ opacity: 1 }}
              >
                <div className="absolute left-4 top-2 z-30 preserve-3d">
                  <div
                    className="absolute left-0 top-0 z-30"
                    style={{ opacity: 1 }}
                  >
                    <div className="min-w-40 shrink-0">
                      SW 사업 파트너
                      <br /> FPMate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-30">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-t border-border-primary lg:px-4 py-6 bg-white hover:border-accent-hover"
            >
              <div className="text-[1.0625rem] leading-tight tracking-tighter text-text-primary max-w-96 break-keep font-medium mb-2 flex items-center gap-2">
                <Image
                  src={`/assets/svgs/${feature.icon}.svg`}
                  alt={feature.title}
                  width={16}
                  height={16}
                  className="size-5"
                />
                {feature.title}
              </div>
              <p className="text-[0.8125rem] sm:text-[0.9375rem] break-keep max-w-56 leading-normal text-text-tertiary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diagram;
