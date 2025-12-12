"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import SkeletonBar from "./SkeletonBar";
import { motion, AnimatePresence, animate, useMotionValue } from "motion/react";

// 자동 hover 순환 대상 셀 식별자
type HighlightCellId =
  | "totalFp"
  | "devCost"
  | "unitPrice"
  | "performance"
  | "swDevCost";

const HIGHLIGHT_CELLS: HighlightCellId[] = [
  "totalFp",
  "devCost",
  "unitPrice",
  "performance",
  "swDevCost",
];

const HIGHLIGHT_INTERVAL_MS = 2500;

// 하이라이트 셀 스타일 유틸리티
const getHighlightCellClass = (
  cellId: HighlightCellId,
  activeCell: HighlightCellId | null
) => {
  const baseClass =
    "border border-border-primary bg-bg-primary p-3 transition-all ease-in-out duration-200 outline-transparent";
  const activeClass = "bg-amber-50! outline-1! outline-accent-hover!";

  if (activeCell === cellId) {
    return `${baseClass} ${activeClass}`;
  }

  return baseClass;
};

// 두 개의 데이터셋 정의
const chartDataSets = [
  [
    { label: "ILF", color: "bg-blue-500", width: 25 },
    { label: "EIF", color: "bg-emerald-500", width: 65 },
    { label: "EI", color: "bg-violet-500", width: 42 },
    { label: "EO", color: "bg-amber-500", width: 78 },
    { label: "EQ", color: "bg-rose-500", width: 54 },
  ],
  [
    { label: "ILF", color: "bg-blue-500", width: 62 },
    { label: "EIF", color: "bg-emerald-500", width: 18 },
    { label: "EI", color: "bg-violet-500", width: 71 },
    { label: "EO", color: "bg-amber-500", width: 95 },
    { label: "EQ", color: "bg-rose-500", width: 42 },
  ],
] as const;

// 플로팅 라벨 데이터
const floatingBarGraphLabelData = [
  { value: 4283.8, position: 8, color: "bg-amber-500", label: "EO" },
  { value: 3942.5, position: 32, color: "bg-violet-500", label: "EI" },
] as const;

interface FpChartProps {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}

const FpChart = ({ chartKey, selectedChart, floatingOffset }: FpChartProps) => {
  const [dataIndex, setDataIndex] = useState(0);

  // 4초마다 데이터셋 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentData = chartDataSets[dataIndex];
  const currentFloating = floatingBarGraphLabelData[dataIndex];

  return (
    <div
      className="scale-90 origin-bottom md:scale-100 w-96 h-88 object-cover flex flex-col gap-8 border-t border-x border-border-primary px-10 pt-12 rounded-t-xl shadow-2xl bg-white"
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
        transition: "opacity 0.3s ease-in-out, filter 0.4s ease-in-out",
      }}
    >
      {/* 범례 */}
      <div className="flex items-center justify-between gap-4 z-10">
        {currentData.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`size-3 rounded-full ${item.color}`} />
            <span className="text-[0.9375rem] leading-none tracking-tight text-text-primary font-medium pb-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="flex flex-col gap-0.5 relative after:content-[''] after:absolute after:h-full after:left-0 after:top-0 after:bg-linear-to-r after:from-white/80 after:to-transparent after:w-1/3 after:z-20 after:pointer-events-none">
        {/* 플로팅 라벨 */}
        <motion.div
          className="absolute top-8 left-2/5 z-30 bg-white/20 backdrop-blur-md shadow-lg flex items-center gap-2 pl-4 pr-6 h-11 rounded-md border border-white/50 text-text-primary font-medium"
          animate={{
            y: floatingOffset + currentFloating.position,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div
            className={`rounded-full size-4 ring-3 ring-white mr-1 transition-[background-color] duration-200 ease-in-out ${currentFloating.color}`}
          />
          <span>{currentFloating.label}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentFloating.value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {currentFloating.value}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* 바 차트 */}
        {currentData.map((item) => (
          <motion.div
            key={item.label}
            className={`z-10 relative h-8 rounded-r shadow-sm ${item.color}`}
            initial={false}
            animate={{ width: `${item.width}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1,
            }}
          />
        ))}
      </div>

      {/* X축 라벨 */}
      <div className="flex justify-between border-t border-border-primary/50 pt-2">
        {["0", "1000", "2000", "3000", "4000", "5000"].map((item) => (
          <span
            key={item}
            className="text-[0.875rem] leading-none tracking-tight text-text-secondary font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// 두 개의 데이터셋 정의
const rateDataSets = [
  [
    { label: "ILF", color: "bg-green-500", width: 15 },
    { label: "EIF", color: "bg-amber-500", width: 65 },
    { label: "EI", color: "bg-sky-500", width: 32 },
    { label: "EO", color: "bg-red-500", width: 138 },
    { label: "EQ", color: "bg-teal-500", width: 34 },
  ],
  [
    { label: "ILF", color: "bg-green-500", width: 62 },
    { label: "EIF", color: "bg-amber-500", width: 28 },
    { label: "EI", color: "bg-sky-500", width: 71 },
    { label: "EO", color: "bg-red-500", width: 28 },
    { label: "EQ", color: "bg-teal-500", width: 42 },
  ],
] as const;

// 플로팅 라벨 데이터
const floatingChartLabelData = [
  { label: "EO", percentage: 48.6, color: "bg-red-500" },
  { label: "EI", percentage: 30.74, color: "bg-sky-500" },
] as const;

const colorMap: Record<string, string> = {
  "bg-green-500": "#22c55e",
  "bg-amber-500": "#f59e0b",
  "bg-sky-500": "#0ea5e9",
  "bg-red-500": "#ef4444",
  "bg-teal-500": "#14b8a6",
};

// 숫자 카운팅 애니메이션 컴포넌트
const AnimatedChartNumber = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value, motionValue]);

  return <>{displayValue.toLocaleString("ko-KR")}</>;
};

interface FpRateProps {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}

const FpRate = ({ chartKey, selectedChart, floatingOffset }: FpRateProps) => {
  const [dataIndex, setDataIndex] = useState(0);

  // 4초마다 데이터셋 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentData = rateDataSets[dataIndex];
  const currentFloating = floatingChartLabelData[dataIndex];
  const total = currentData.reduce((sum, item) => sum + item.width, 0);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  // 각 항목의 segment 계산
  const segments = currentData.map((item, index) => {
    const percentage = (item.width / total) * 100;
    const strokeLength = (percentage / 100) * circumference;
    const offset = currentData.slice(0, index).reduce((sum, prevItem) => {
      const prevPercentage = (prevItem.width / total) * 100;
      return sum + (prevPercentage / 100) * circumference;
    }, 0);

    return { item, strokeLength, offset };
  });

  return (
    <div
      className="scale-90 origin-bottom md:scale-100 w-96 h-88 object-cover flex flex-col border-t border-x border-border-primary px-10 pt-12 rounded-t-xl shadow-2xl bg-white"
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
        transition: "opacity 0.3s ease-in-out, filter 0.4s ease-in-out",
      }}
    >
      {/* 범례 */}
      <div className="flex items-center justify-between gap-4 z-10">
        {currentData.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`size-3 rounded-full ${item.color}`} />
            <span className="text-[0.9375rem] leading-none tracking-tight text-text-primary font-medium pb-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center relative h-full">
        {/* 도넛 차트 */}
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          className="transform -rotate-90 size-64"
        >
          {segments.map(({ item, strokeLength, offset }) => (
            <motion.circle
              key={item.label}
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke={colorMap[item.color] || "#gray"}
              strokeWidth="48"
              initial={false}
              animate={{
                strokeDasharray: `${strokeLength} ${
                  circumference - strokeLength
                }`,
                strokeDashoffset: -offset,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />
          ))}
        </svg>

        {/* 중앙 정보 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <div className="text-[2.5rem] font-extrabold text-text-primary leading-tight tracking-tighter">
            <AnimatedChartNumber value={total} />
          </div>
          <div className="text-[0.9375rem] text-text-secondary font-medium">
            Total FP
          </div>
        </div>

        {/* Floating 정보 카드 */}
        <motion.div
          className="absolute bottom-20 left-0 z-20 bg-black/30 backdrop-blur-md shadow-lg flex items-center gap-2 pl-4 pr-6 h-11 rounded-md border border-border-primary/50 text-white font-medium"
          animate={{
            y: floatingOffset,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div
            className={`rounded-full size-4 ring-3 ring-white mr-1 transition-[background-color] duration-200 ease-in-out ${currentFloating.color}`}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentFloating.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              {currentFloating.label}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentFloating.percentage}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              {currentFloating.percentage}%
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// 두 개의 데이터셋 정의
const reportDataSets = [
  { amount: 740141670, manMonth: 497.5 },
  { amount: 1285930420, manMonth: 823.2 },
] as const;

interface FpReportProps {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}

// 숫자 카운팅 애니메이션 컴포넌트
const AnimatedReportNumber = ({
  value,
  formatOptions,
}: {
  value: number;
  formatOptions?: Intl.NumberFormatOptions;
}) => {
  const motionValue = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: [0.0, 1, 0, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [value, motionValue]);

  return <>{displayValue.toLocaleString("ko-KR", formatOptions)}</>;
};

const FpReport = ({
  chartKey,
  selectedChart,
  floatingOffset,
}: FpReportProps) => {
  const [dataIndex, setDataIndex] = useState(0);

  // 4초마다 데이터셋 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentData = reportDataSets[dataIndex];

  return (
    <div
      className="scale-90 origin-bottom md:scale-100 w-96 h-88 object-cover flex flex-col gap-8 border-t border-x border-border-primary px-10 pt-12 rounded-t-xl shadow-2xl bg-white"
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
        transition: "opacity 0.3s ease-in-out, filter 0.4s ease-in-out",
      }}
    >
      <div
        className="text-center text-[1.0625rem] leading-snug tracking-tight mt-4 md:mt-0"
        style={{
          transform: `translateY(${floatingOffset / 2}px)`,
        }}
      >
        <p>소프트웨어 개발비는</p>
        <p className="text-[1.3125rem] sm:text-[1.5rem] font-bold mb-2">
          <AnimatedReportNumber value={currentData.amount} />
          원,
        </p>
        <p>입력된 1인 생산성 20(FP/MM) 기준</p>
        <p className="text-[1.3125rem] sm:text-[1.5rem] font-bold mb-2">
          소요 M/M는{" "}
          <AnimatedReportNumber
            value={currentData.manMonth}
            formatOptions={{
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }}
          />{" "}
          M/M
        </p>
        <p>로 추정됩니다.</p>
      </div>
      <div
        className="flex flex-col gap-1 items-center"
        style={{
          transform: `translateY(${floatingOffset}px)`,
        }}
      >
        <div className="flex gap-1">
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={5} height={1} />
          <SkeletonBar width={3} height={1} />
          <SkeletonBar width={6} height={1} />
        </div>
        <div className="flex gap-1">
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={1} height={1} />
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={3.5} height={1} />
        </div>
        <div className="flex gap-1">
          <SkeletonBar width={1} height={1} />
          <SkeletonBar width={3} height={1} />
          <SkeletonBar width={1.5} height={1} />
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={4} height={1} />
        </div>
      </div>
    </div>
  );
};

/**
 * Section 3 차트 그래픽 데이터
 */
const chartData = [
  {
    id: 1,
    key: "function",
    title: "기능점수(Function Point)",
    image: "/assets/images/section3-chart-1.png",
    slider: FpChart,
  },
  {
    id: 2,
    key: "ratio",
    title: "기능별 비율",
    image: "/assets/images/section3-chart-3.png",
    slider: FpRate,
  },
  {
    id: 3,
    key: "cost",
    title: "기능 점수 산정 결과",
    image: "/assets/images/section3-chart-4.png",
    slider: FpReport,
  },
];

// 보고서 테이블 컴포넌트 (DRY 원칙 적용)
const ReportTable = ({
  activeCell,
}: {
  activeCell: HighlightCellId | null;
}) => {
  const getCellClass = (
    cellId: HighlightCellId,
    align: "center" | "end" = "center"
  ) => {
    const alignClass = align === "end" ? "text-end" : "text-center";
    return `${getHighlightCellClass(cellId, activeCell)} ${alignClass}`;
  };

  return (
    <>
      {/* 개발원가 산정 */}
      <div className="flex justify-between gap-4">
        <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold">
          개발원가 산정
        </span>
        <span>(단위: 원)</span>
      </div>
      <table className="w-full border-collapse origin-top-left scale-65 sm:scale-90 md:scale-100 -mb-26 sm:-mb-8 md:mb-0">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="border border-border-primary bg-bg-tertiary p-3"
            >
              총 기능점수
            </th>
            <th
              rowSpan={2}
              className="border border-border-primary bg-bg-tertiary p-3"
            >
              기능점수당 단가
            </th>
            <th
              colSpan={5}
              className="border border-border-primary bg-bg-tertiary p-3"
            >
              보정 계수
            </th>
            <th
              rowSpan={2}
              className="border border-border-primary bg-bg-tertiary p-3"
            >
              개발 원가
            </th>
          </tr>
          <tr>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              SW 규모
            </th>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              연계복잡성
            </th>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              성능 요구수준
            </th>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              운영환경 호환성
            </th>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              보안성 요구수준
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 1row */}
          <tr>
            <td className={getCellClass("totalFp")}>1000.6</td>
            <td className={getCellClass("unitPrice")}>
              <span>605,784</span>원
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 outline-transparent">
              1.1530
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 outline-transparent">
              0.94
            </td>
            <td className={getCellClass("performance")}>1.00</td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 outline-transparent">
              1.00
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 outline-transparent">
              1.03
            </td>
            <td className={getCellClass("devCost", "end")}>
              <span>6,728,560,634</span>원
            </td>
          </tr>

          {/* 2row */}
          <tr>
            <td
              className="border border-border-primary bg-bg-primary p-3"
              colSpan={7}
            >
              합계(보정 후 개발원가)
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-end transition-all ease-in-out duration-200 outline-transparent">
              <span>6,728,560,634</span>원
            </td>
          </tr>

          {/* 3row */}
          <tr>
            <td
              className="border border-border-primary bg-bg-primary p-3"
              colSpan={6}
            >
              이윤 (※이윤은 개발원가의 25% 이내에서 산정한다.)
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-300 outline-transparent">
              <span>11</span>%
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-end transition-all ease-in-out duration-200 outline-transparent">
              <span>740,141,670</span>원
            </td>
          </tr>

          {/* 4row */}
          <tr>
            <td
              className="border border-border-primary bg-bg-secondary p-3"
              colSpan={6}
            >
              소프트웨어 개발비 (부가세 별도)
            </td>
            <td
              className={`border border-border-primary p-3 text-end transition-all ease-in-out duration-200 ${
                activeCell === "swDevCost"
                  ? "bg-amber-50 outline-1 outline-accent-hover"
                  : "bg-bg-secondary"
              }`}
              colSpan={2}
            >
              합계: <span>740,141,670</span>원
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mb-10 text-xs md:text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
        ※ 적용 단가: 553,111원(2024년 기준)
      </p>

      <div className="flex justify-between gap-4">
        <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold">
          직접경비
        </span>
        <div className="w-12 h-5 rounded bg-gray-100" />
      </div>
      <table className="w-full border-collapse origin-top-left scale-65 sm:scale-90 md:scale-100 -mb-12 sm:-mb-4 md:mb-0">
        <thead>
          <tr>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              <div className="w-28 h-5 rounded bg-gray-200" />
            </th>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              <div className="w-16 h-5 rounded bg-gray-200" />
            </th>
            <th className="border border-border-primary bg-bg-tertiary p-3">
              <div className="w-20 h-5 rounded bg-gray-200" />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 1row */}
          <tr>
            <td className="border border-border-primary bg-bg-primary p-3 text-center">
              <div className="w-12 h-5 rounded bg-gray-100" />
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center">
              <div className="w-24 h-5 rounded bg-gray-100" />
            </td>
            <td className="border border-border-primary bg-bg-primary p-3 text-center">
              <div className="w-16 h-5 rounded bg-gray-100" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

// 자동 하이라이트 순환 훅
const useAutoHighlight = () => {
  const [activeCell, setActiveCell] = useState<HighlightCellId | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveCell(HIGHLIGHT_CELLS[currentIndexRef.current]);
      currentIndexRef.current =
        (currentIndexRef.current + 1) % HIGHLIGHT_CELLS.length;
    }, HIGHLIGHT_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return activeCell;
};

const Section3 = () => {
  const [selectedChart, setSelectedChart] = useState<string>("function");
  const [floatingOffset, setFloatingOffset] = useState<number>(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const activeCell = useAutoHighlight();

  const handleChartClick = (key: string) => {
    setSelectedChart(key);
  };

  // 스크롤 기반 패럴랙스 효과
  useEffect(() => {
    const handleScroll = () => {
      if (!chartContainerRef.current) return;

      const rect = chartContainerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // 요소가 viewport에 있을 때만 계산
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        // viewport 내에서의 진행도 계산 (0 ~ 1)
        // 요소가 아래에서 들어올 때 0, 위로 나갈 때 1
        const progress =
          (windowHeight - elementTop) / (windowHeight + elementHeight);
        // 30px 범위에서 이동 (위에서 아래로)
        const offset = progress * 60;
        setFloatingOffset(offset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 위치 계산
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      <section
        className="bg-gray-50 py-16 md:pt-40 sticky top-16 md:top-0 z-10"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitPerspective: 1000,
          perspective: 1000,
          willChange: "transform", // iOS 레이어 힌트
        }}
      >
        {/* 테이블 영역 */}
        <div
          id="section3-table"
          className="max-w-[1200px] mx-auto flex flex-col gap-8 mb-20"
        >
          <div className="flex flex-col gap-4 px-6">
            <div className="text-[2rem] md:text-[3.5rem] leading-[1.15] tracking-tighter font-semibold break-keep">
              <span className="font-bold text-brand-primary">데이터 기반</span>
              의 <br className="lg:hidden" />
              합리적인 의사결정 지원
            </div>
            <p className="text-[1.0625rem] md:text-[1.3125rem] leading-normal tracking-tight break-keep text-text-primary max-w-xl md:max-w-3xl">
              <span className="font-semibold">축적된 데이터</span>를 활용하여
              유사 사업 비용을 빠르게 예측하고,{" "}
              <span className="font-semibold">보고서</span>,{" "}
              <span className="font-semibold">시각화된 통계</span> 제공으로
              객관적인 의사결정을 돕습니다.
            </p>
          </div>

          {/* 테이블 */}
          <div className="flex flex-col gap-2 px-6 overflow-hidden perspective-[1000px] transform-3d">
            <span className="text-[0.9375rem] tracking-tight text-text-tertiary font-medium">
              보고서
            </span>
            {/* 보고서 내역 - desktop */}
            <div className="relative p-6 bg-white rounded-lg hidden lg:flex flex-col gap-4 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-gray-50 after:h-1/3 after:pointer-events-none after:z-10 min-w-[1152px] before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-t before:border-x before:border-border-primary before:pointer-events-none before:z-0 *:cursor-default">
              <ReportTable activeCell={activeCell} />
            </div>

            {/* 보고서 내역 - mobile & tablet */}
            <div className="lg:hidden relative h-136 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-16 after:md:bottom-0 after:scale-125 after:bg-linear-to-t after:from-gray-50 after:via-gray-50 after:to-transparent after:h-1/3 after:pointer-events-none after:z-40">
              <div className="absolute top-0 left-0 translate-x-4 translate-y-0 z-30 shadow-lg">
                <div className="relative p-6 bg-white rounded-lg flex flex-col gap-4 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-gray-50 after:h-1/3 after:pointer-events-none after:z-10 min-w-[1152px] before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-t before:border-x before:border-border-primary before:pointer-events-none before:z-0 *:cursor-default">
                  <ReportTable activeCell={activeCell} />
                </div>
              </div>
              <div className="absolute top-0 left-0 rotate-y-12 -translate-x-2 translate-y-8 z-20 shadow-lg">
                <div className="relative p-6 bg-gray-100 rounded-md flex flex-col gap-4 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-gray-50 after:h-1/3 after:pointer-events-none after:z-10 min-w-[1152px] before:content-[''] before:absolute before:inset-0 before:rounded-md before:border-t before:border-x before:border-border-primary before:pointer-events-none before:z-0 *:cursor-default h-108" />
              </div>
              <div className="absolute top-0 left-0 rotate-y-12 -translate-x-4 translate-y-16 z-10 opacity-50 shadow-lg">
                <div className="relative p-6 bg-gray-200 rounded-md flex flex-col gap-4 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-gray-50 after:h-1/3 after:pointer-events-none after:z-10 min-w-[1152px] before:content-[''] before:absolute before:inset-0 before:rounded-md before:border-t before:border-x before:border-border-primary before:pointer-events-none before:z-0 *:cursor-default h-96" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 스티커 영역 - 그라데이션 효과 */}
      <div
        className="bg-linear-to-b from-transparent to-gray-50 w-full h-12 z-20"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          isolation: "isolate",
        }}
      />

      {/* 차트 그래픽 영역 */}
      <section
        className="bg-gray-50 pb-20 md:pb-40 relative z-30"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          isolation: "isolate",
        }}
      >
        <div
          id="section3-chart"
          className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center gap-4 lg:gap-20 relative z-10"
        >
          {/* 차트 셀렉터 */}
          <div className="flex flex-col gap-2 min-w-xs sm:min-w-2/5 lg:min-w-1/3 py-4 sm:py-6">
            <span className="text-[0.9375rem] tracking-tight text-text-tertiary font-medium mb-2">
              시각화된 통계
            </span>
            {chartData.map((chart) => (
              <button
                key={chart.id}
                className={`flex gap-3 items-center rounded overflow-hidden cursor-pointer`}
                onClick={() => handleChartClick(chart.key)}
              >
                <div
                  className={`w-1.5 h-10 md:h-11 rounded-full ${
                    selectedChart === chart.key
                      ? "bg-brand-primary"
                      : "bg-gray-200"
                  }`}
                />
                <span
                  className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter text-text-primary ${
                    selectedChart === chart.key
                      ? "opacity-100 font-semibold"
                      : "opacity-50 hover:opacity-80 font-medium"
                  }`}
                >
                  {chart.title}
                </span>
              </button>
            ))}
          </div>

          {/* 차트 프레임 - desktop */}
          <div ref={chartContainerRef} className="hidden lg:flex gap-2">
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={`rounded h-96 overflow-hidden flex items-end justify-center ${
                  selectedChart === chart.key
                    ? "shadow-card grow bg-linear-to-b from-white via-white to-gray-200/50"
                    : "bg-white/50"
                }`}
                style={{
                  width: selectedChart === chart.key ? "35rem" : "3rem",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                  transition:
                    "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {chart.slider({
                  chartKey: chart.key,
                  selectedChart: selectedChart,
                  floatingOffset: floatingOffset,
                })}
              </div>
            ))}
          </div>

          {/* 차트 프레임 - tablet */}
          <div className="hidden md:flex lg:hidden flex-col justify-center gap-2 h-112 grow">
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={`rounded h-64 overflow-hidden flex items-end justify-center ${
                  selectedChart === chart.key
                    ? "shadow-card grow bg-linear-to-b from-white via-white to-gray-200/50"
                    : "bg-white/50"
                }`}
                style={{
                  height: selectedChart === chart.key ? "12rem" : "1.5rem",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                  transition:
                    "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {chart.slider({
                  chartKey: chart.key,
                  selectedChart: selectedChart,
                  floatingOffset: floatingOffset,
                })}
              </div>
            ))}
          </div>

          {/* 차트 프레임 - mobile */}
          <div className="flex md:hidden">
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={`rounded h-84 overflow-hidden flex items-end justify-center ${
                  selectedChart === chart.key
                    ? "shadow-card grow bg-linear-to-b from-white via-white to-gray-100"
                    : "bg-white/50"
                }`}
                style={{
                  width: selectedChart === chart.key ? "80%" : "0%",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                  transition:
                    "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {chart.slider({
                  chartKey: chart.key,
                  selectedChart: selectedChart,
                  floatingOffset: floatingOffset,
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Section3;
