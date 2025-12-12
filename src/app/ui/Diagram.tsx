"use client";

import { useIntersectionObserver } from "@/shared/lib/use-intersection-observer";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

export function GradientBeamAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 123, 85, 0.025), transparent)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 171, 85, 0.1), transparent)",
        }}
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

type FocusState = "smart-pricing" | "error-validation";
type FileType = "hwp" | "pdf" | "xls";

const FILE_TYPE_CONFIG: Record<
  FileType,
  { label: string; display: string; bgColor: string }
> = {
  hwp: { label: "한글", display: "HWP", bgColor: "bg-blue-600" },
  pdf: { label: "PDF", display: "PDF", bgColor: "bg-red-500" },
  xls: { label: "엑셀", display: "XLS", bgColor: "bg-green-700" },
};

const FILE_TYPE_ORDER: FileType[] = ["hwp", "pdf", "xls"];

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
        stroke={isActive ? color : "#bababa"} // 활성: Green, 비활성: Gray
        strokeWidth={isActive ? "3" : "2"}
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
          strokeWidth={isActive ? "3" : "2"}
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
        : "border-gray-400 shadow-[-3px_3px_0px_0px_gray] hover:border-brand-primary bg-white hover:shadow-[-3px_3px_0px_0px_green]"
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
    className={`rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out text-center font-medium ${
      isHighlighted
        ? "border-brand-primary text-text-primary"
        : "border-gray-400 text-text-primary"
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
        ? "border-brand-primary text-text-primary"
        : "border-gray-400 text-text-primary"
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
        : "border-gray-400 shadow-[-3px_3px_0px_0px_gray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] bg-white"
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
    className={`flex items-center justify-center rounded-md border px-3 py-1.5 text-xs transition-all duration-500 ease-out bg-white ${
      isHighlighted
        ? "border-brand-primary shadow-[-3px_3px_0px_0px_green]"
        : "border-gray-400 shadow-[-3px_3px_0px_0px_gray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green]"
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

/**
 * 파일 타입 카드 컴포넌트 (애니메이션 포함)
 */
interface FileTypeCardProps {
  fileType: FileType;
  isHighlighted?: boolean;
}

const FileTypeCard = ({
  fileType,
  isHighlighted = false,
}: FileTypeCardProps) => {
  const config = FILE_TYPE_CONFIG[fileType];

  return (
    <motion.div
      key={fileType}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      {/* 라벨 */}
      <div className="absolute left-[calc(50%+16px+25px)] top-[-6px] z-30 preserve-3d">
        <div
          className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 1 }}
        >
          <Label className="w-12" isHighlighted={isHighlighted}>
            {config.label}
          </Label>
        </div>
      </div>

      {/* 카드 */}
      <div className="absolute left-[calc(50%+18px+25px)] top-[-12px] z-20 preserve-3d">
        <div
          className="absolute"
          style={{
            opacity: 0.8,
            zIndex: 0,
            transform: "translateY(8px) translateX(-8px)",
          }}
        >
          <Card className="h-12 w-12 px-3 py-3" isHighlighted={isHighlighted}>
            <span
              className={`text-white ${config.bgColor} font-bold text-sm px-1 rounded-xs`}
            >
              {config.display}
            </span>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

const Diagram = () => {
  const [focusState, setFocusState] = useState<FocusState>("smart-pricing");
  const [fileTypeIndex, setFileTypeIndex] = useState<number>(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const { ref: diagramRef, isIntersecting: isDiagramIntersecting } =
    useIntersectionObserver({
      threshold: 0.3,
      once: true,
    });

  const currentFileType = FILE_TYPE_ORDER[fileTypeIndex];

  useEffect(() => {
    // 300ms 후에 애니메이션 시작
    const initialDelay = setTimeout(() => {
      setIsAnimationStarted(true);
    }, 300);

    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  // 10초마다 focus 상태 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusState((prev) =>
        prev === "smart-pricing" ? "error-validation" : "smart-pricing"
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [resetTrigger, isAnimationStarted]);

  // 3초마다 파일 타입 순환 (focusState와 독립적)
  useEffect(() => {
    if (focusState === "error-validation") return;

    const fileTypeInterval = setInterval(() => {
      setFileTypeIndex((prev) => (prev + 1) % FILE_TYPE_ORDER.length);
    }, 3000);

    return () => clearInterval(fileTypeInterval);
  }, [focusState]);

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
    <div
      className="mt-20 md:mt-40 space-y-2 md:space-y-0"
      ref={diagramRef as React.RefObject<HTMLDivElement>}
    >
      {/* title */}
      <div className="relative z-30 max-w-[1200px] mx-auto px-6 space-y-6">
        <div className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-tight tracking-tighter font-semibold break-keep">
          <span className="font-extrabold text-brand-primary">FPMate</span>로
          쉽게 <br />
          {/* <br className="sm:hidden" /> */}
          SW 사업비용을 산정해 보세요
        </div>
        <div className="leading-normal tracking-tight break-keep max-w-xl md:max-w-3xl space-y-4">
          <p className="text-[1.0625rem] md:text-[1.3125rem] text-text-primary">
            반복되고 소모적인 작업은 줄이고 더 합리적인 비용 판단 분석에 집중해
            보세요. <br className="hidden sm:block" />
            <span className="outline outline-amber-400 outline-dashed bg-amber-50 px-1 leading-none h-6 md:h-7 mx-0.5 pt-0.75 inline-block text-amber-700">
              표준화된 프로세스
            </span>
            로 일관된 산정을 제공합니다.
            <br />
          </p>
          <p className="text-[0.9375rem] text-text-secondary">
            <span className="font-medium">FPMate</span>는{" "}
            <span className="font-semibold text-text-primary">기능점수</span>{" "}
            기반의 소프트웨어 대가산정 가이드를 준수합니다.
          </p>
        </div>
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
        <div className="py-16 md:pt-20 z-30 mb-6 mt-64 sm:mt-108 md:mt-80 lg:mt-0">
          <div className="mx-auto w-full max-w-[1200px] lg:h-96 px-6">
            <div className="relative z-10 flex grow flex-col justify-end md:max-w-prose gap-4">
              {/* 스마트 대가산정 버튼 */}
              <button
                type="button"
                style={{
                  opacity: isDiagramIntersecting ? 1 : 0,
                  transform: isDiagramIntersecting
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  transition:
                    "opacity 0.6s ease-out 0.9s, transform 0.6s ease-out 0.9s",
                  willChange: "opacity, transform",
                }}
                onClick={() => {
                  if (focusState !== "smart-pricing") {
                    setFocusState("smart-pricing");
                  }
                  setResetTrigger((prev) => prev + 1);
                }}
                className={`relative text-left p-6 gap-3 rounded-md md:max-w-md lg:h-40 bg-zinc-100/50 backdrop-blur-xs sm:cursor-pointer flex flex-col ${
                  isSmartPricing ? "bg-white outline" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row w-full sm:items-center gap-3 transition-all duration-400 ease-out">
                  <div className="flex items-center justify-between">
                    <Image
                      src={`/assets/svgs/cpu.svg`}
                      alt="AI와 자동산정으로 구현하는 스마트 대가산정"
                      width={24}
                      height={24}
                      className="size-6 shrink-0"
                    />
                    {isSmartPricing && (
                      <span className="relative flex sm:hidden h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[1.0625rem] leading-tight tracking-tighter text-text-primary max-w-96 break-keep font-semibold`}
                    >
                      AI와 자동산정으로 구현하는 스마트 대가산정
                    </span>
                    {isSmartPricing && (
                      <span className="relative hidden sm:flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[0.9375rem] leading-normal sm:max-w-4/5 md:max-w-96 break-keep transition-all duration-400 ease-out overflow-hidden text-text-secondary">
                  요구사항 문서를 입력하는 순간, AI가 내용을 분석해 기능을 자동
                  추천하고 전문가 도움 없이도 누구나 쉽게 비용을 산정 할 수
                  있습니다.
                </p>
              </button>

              {/* 오류 검증 버튼 */}
              <button
                type="button"
                style={{
                  opacity: isDiagramIntersecting ? 1 : 0,
                  transform: isDiagramIntersecting
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  transition:
                    "opacity 0.6s ease-out 1.2s, transform 0.6s ease-out 1.2s",
                  willChange: "opacity, transform",
                }}
                onClick={() => {
                  if (focusState !== "error-validation") {
                    setFocusState("error-validation");
                  }
                  setResetTrigger((prev) => prev + 1);
                }}
                className={`relative text-left p-6 gap-3 rounded-md md:max-w-md lg:h-40 bg-zinc-100/50 backdrop-blur-xs sm:cursor-pointer flex flex-col ${
                  isErrorValidation ? "bg-white outline" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row w-full sm:items-center gap-3 transition-all duration-400 ease-out">
                  <div className="flex items-center justify-between">
                    <Image
                      src={`/assets/svgs/chart-line-up.svg`}
                      alt="편리한 오류 검증으로 향상되는 업무 효율"
                      width={16}
                      height={16}
                      className="size-6 shrink-0"
                    />
                    {isErrorValidation && (
                      <span className="relative flex sm:hidden h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[1.0625rem] leading-tight tracking-tighter text-text-primary max-w-96 break-keep font-semibold`}
                    >
                      편리한 오류 검증으로 향상되는 업무 효율
                    </span>
                    {isErrorValidation && (
                      <span className="relative hidden sm:flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[0.9375rem] leading-normal sm:max-w-4/5 md:max-w-96 break-keep transition-all duration-400 ease-out overflow-hidden text-text-secondary">
                  FPMate가 데이터의 중복, 오류, 누락을 확인해 업무 부담은 줄이고
                  결과의 신뢰도는 높입니다.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* background grid */}
        <div
          className="absolute -top-72 h-[838px] left-1/2 transform -translate-x-38 translate-y-20 scale-[0.55] sm:scale-[0.875] sm:-top-40 sm:-translate-x-60 md:-top-28 lg:-top-20 md:-translate-x-48 md:translate-y-8 md:scale-[0.94] lg:translate-x-0 lg:translate-y-0 pointer-events-none bg-red-500"
          style={{
            opacity: isDiagramIntersecting ? 1 : 0,
            transform: isDiagramIntersecting
              ? "translateY(0)"
              : "translateY(-10px)",
            transition:
              "opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s",
            willChange: "opacity, transform",
          }}
        >
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
                  <div className="min-w-48 shrink-0">
                    요구사항 (
                    <span className="text-red-500 font-medium">PDF</span>
                    <span className="text-text-tertiary">/</span>
                    <span className="text-blue-500 font-medium">HWP</span>
                    <span className="text-text-tertiary">/</span>
                    <span className="text-green-700 font-medium">XLS</span>)
                  </div>
                </div>
              </div>

              {/* 파일 타입 카드 (애니메이션 적용) */}
              <div className="absolute left-[calc(50%-8px)] top-[301px] z-20 preserve-3d">
                <AnimatePresence mode="wait">
                  <FileTypeCard
                    key={currentFileType}
                    fileType={currentFileType}
                    isHighlighted={isSmartPricing}
                  />
                </AnimatePresence>
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
              <div className="absolute left-[1043px] top-[274px] flex h-[150px] w-[250px] flex-col items-center justify-center gap-3.75 rounded border transition-colors border-dashed border-separator pb-2">
                {/* FPMate logo */}
                <Card
                  className="absolute -top-[76px] left-1 z-0 h-12 w-12"
                  isHighlighted
                >
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
                  <div className="rounded-full border bg-white px-3 py-0.5 text-xxs text-text-primary transition-all duration-500 ease-out border-brand-primary">
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
                className="absolute border border-action-disabled left-[calc(50%-95px)] top-[450px] z-5 flex h-[250px] w-[597px] px-3 py-2"
                style={{ opacity: 1 }}
              >
                {/* background pulse */}
                <div className="animate-pulse absolute left-0 top-0 w-full h-full bg-green-100/20" />

                {/* content */}
                <div className="absolute left-4 top-2 z-30 preserve-3d">
                  <div
                    className="absolute left-0 top-0 z-30"
                    style={{ opacity: 1 }}
                  >
                    <div className="min-w-48 shrink-0 text-[#007B55]">
                      산정에서 관리까지,
                      <br />
                      쉽고 빠르게, AI로 스마트하게!
                      {/* FPMate */}
                    </div>
                  </div>
                </div>
                <GradientBeamAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
