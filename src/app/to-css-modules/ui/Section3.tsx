"use client";

import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import SkeletonBar from "./SkeletonBar";
import { motion, AnimatePresence, animate, useMotionValue } from "motion/react";
import styles from "./Section3.module.css";

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
const CHART_DATA_INTERVAL_MS = 5000;
const RATE_DATA_INTERVAL_MS = 4000;

interface ChartDataItem {
  label: string;
  colorClass: string;
  width: number;
}

interface FloatingLabelData {
  value: number;
  position: number;
  colorClass: string;
  label: string;
}

interface RateFloatingData {
  label: string;
  percentage: number;
  colorClass: string;
}

interface ReportData {
  amount: number;
  manMonth: number;
}

const COLOR_MAP: Record<string, string> = {
  blue: "oklch(62.3% 0.214 259.815)",
  emerald: "oklch(69.6% 0.17 162.48)",
  amber: "oklch(76.9% 0.188 70.08)",
  violet: "oklch(60.6% 0.25 292.717)",
  rose: "oklch(64.5% 0.246 16.439)",
};

const COLOR_CLASSES: Record<string, string> = {
  blue: styles.bgBlue500,
  emerald: styles.bgEmerald500,
  amber: styles.bgAmber500,
  violet: styles.bgViolet500,
  rose: styles.bgRose500,
};

const chartDataSets: ChartDataItem[][] = [
  [
    { label: "ILF", colorClass: "blue", width: 25 },
    { label: "EIF", colorClass: "emerald", width: 65 },
    { label: "EI", colorClass: "amber", width: 90 },
    { label: "EO", colorClass: "violet", width: 38 },
    { label: "EQ", colorClass: "rose", width: 54 },
  ],
  [
    { label: "ILF", colorClass: "blue", width: 36 },
    { label: "EIF", colorClass: "emerald", width: 18 },
    { label: "EI", colorClass: "amber", width: 51 },
    { label: "EO", colorClass: "violet", width: 75 },
    { label: "EQ", colorClass: "rose", width: 42 },
  ],
];

const floatingBarGraphLabelData: FloatingLabelData[] = [
  { value: 4813.8, position: 24, colorClass: "amber", label: "EI" },
  { value: 3942.5, position: 64, colorClass: "violet", label: "EO" },
];

const rateDataSets: ChartDataItem[][] = [
  [
    { label: "ILF", colorClass: "blue", width: 15 },
    { label: "EIF", colorClass: "emerald", width: 65 },
    { label: "EI", colorClass: "amber", width: 32 },
    { label: "EO", colorClass: "violet", width: 138 },
    { label: "EQ", colorClass: "rose", width: 34 },
  ],
  [
    { label: "ILF", colorClass: "blue", width: 62 },
    { label: "EIF", colorClass: "emerald", width: 28 },
    { label: "EI", colorClass: "amber", width: 71 },
    { label: "EO", colorClass: "violet", width: 28 },
    { label: "EQ", colorClass: "rose", width: 42 },
  ],
];

const floatingChartLabelData: RateFloatingData[] = [
  { label: "EO", percentage: 48.6, colorClass: "violet" },
  { label: "EI", percentage: 30.74, colorClass: "amber" },
];

const reportDataSets: ReportData[] = [
  { amount: 740141670, manMonth: 497.5 },
  { amount: 1285930420, manMonth: 823.2 },
];

const X_AXIS_LABELS = ["0", "1000", "2000", "3000", "4000", "5000"];

const getHighlightCellClass = (
  cellId: HighlightCellId,
  activeCell: HighlightCellId | null
): string => {
  if (activeCell === cellId) {
    return `${styles.tdCellCenter} ${styles.tdCellHighlight}`;
  }
  return styles.tdCellCenter;
};

const getHighlightCellClassEnd = (
  cellId: HighlightCellId,
  activeCell: HighlightCellId | null
): string => {
  if (activeCell === cellId) {
    return `${styles.tdCellEnd} ${styles.tdCellHighlight}`;
  }
  return styles.tdCellEnd;
};

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

const AnimatedNumber = ({
  value,
  duration = 1.2,
  formatOptions,
}: AnimatedNumberProps) => {
  const motionValue = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(formatOptions ? latest : Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value, motionValue, duration, formatOptions]);

  return <>{displayValue.toLocaleString("ko-KR", formatOptions)}</>;
};

interface ChartLegendProps {
  data: ChartDataItem[];
}

const ChartLegend = ({ data }: ChartLegendProps) => (
  <div className={styles.chartLegend}>
    {data.map((item) => (
      <div key={item.label} className={styles.legendItem}>
        <div
          className={`${styles.legendDot} ${COLOR_CLASSES[item.colorClass]}`}
        />
        <span className={styles.legendLabel}>{item.label}</span>
      </div>
    ))}
  </div>
);

interface FpChartProps {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}

const FpChart = ({ chartKey, selectedChart, floatingOffset }: FpChartProps) => {
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev === 0 ? 1 : 0));
    }, CHART_DATA_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const currentData = chartDataSets[dataIndex];
  const currentFloating = floatingBarGraphLabelData[dataIndex];

  return (
    <div
      className={styles.chartCard}
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
      }}
    >
      <ChartLegend data={currentData} />

      <div className={styles.barChartContainer}>
        <motion.div
          className={styles.floatingLabel}
          animate={{ y: floatingOffset + currentFloating.position }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className={`${styles.floatingDot} ${
              COLOR_CLASSES[currentFloating.colorClass]
            }`}
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

        {currentData.map((item) => (
          <motion.div
            key={item.label}
            className={`${styles.barChartBar} ${
              COLOR_CLASSES[item.colorClass]
            }`}
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

      <div className={styles.xAxis}>
        {X_AXIS_LABELS.map((item) => (
          <span key={item} className={styles.xAxisLabel}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const FpRate = ({ chartKey, selectedChart, floatingOffset }: FpChartProps) => {
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev === 0 ? 1 : 0));
    }, RATE_DATA_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const currentData = rateDataSets[dataIndex];
  const currentFloating = floatingChartLabelData[dataIndex];
  const total = currentData.reduce((sum, item) => sum + item.width, 0);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

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
      className={styles.chartCardNoGap}
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
      }}
    >
      <ChartLegend data={currentData} />

      <div className={styles.donutContainer}>
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          className={styles.donutSvg}
        >
          {segments.map(({ item, strokeLength, offset }) => (
            <motion.circle
              key={item.label}
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke={COLOR_MAP[item.colorClass] || "#gray"}
              strokeWidth="48"
              initial={false}
              animate={{
                strokeDasharray: `${strokeLength} ${
                  circumference - strokeLength
                }`,
                strokeDashoffset: -offset,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </svg>

        <div className={styles.donutCenter}>
          <div className={styles.donutValue}>
            <AnimatedNumber value={total} />
          </div>
          <div className={styles.donutLabel}>Total FP</div>
        </div>

        <motion.div
          className={styles.floatingLabelDark}
          animate={{ y: floatingOffset }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className={`${styles.floatingDot} ${
              COLOR_CLASSES[currentFloating.colorClass]
            }`}
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

const FpReport = ({
  chartKey,
  selectedChart,
  floatingOffset,
}: FpChartProps) => {
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev === 0 ? 1 : 0));
    }, CHART_DATA_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const currentData = reportDataSets[dataIndex];

  return (
    <div
      className={styles.chartCard}
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
      }}
    >
      <div
        className={styles.reportCardText}
        style={{ transform: `translateY(${floatingOffset / 2}px)` }}
      >
        <p>소프트웨어 개발비는</p>
        <p className={styles.reportCardValue}>
          <AnimatedNumber value={currentData.amount} duration={0.5} />
          원,
        </p>
        <p>입력된 1인 생산성 20(FP/MM) 기준</p>
        <p className={styles.reportCardValue}>
          소요 M/M는{" "}
          <AnimatedNumber
            value={currentData.manMonth}
            duration={0.5}
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
        className={styles.skeletonRows}
        style={{ transform: `translateY(${floatingOffset}px)` }}
      >
        <div className={styles.skeletonRow}>
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={5} height={1} />
          <SkeletonBar width={3} height={1} />
          <SkeletonBar width={6} height={1} />
        </div>
        <div className={styles.skeletonRow}>
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={1} height={1} />
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={3.5} height={1} />
        </div>
        <div className={styles.skeletonRow}>
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

interface ChartConfig {
  id: number;
  key: string;
  title: string;
  image: string;
  slider: React.ComponentType<FpChartProps>;
}

const chartData: ChartConfig[] = [
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

const ReportTable = ({
  activeCell,
}: {
  activeCell: HighlightCellId | null;
}) => (
  <>
    <div className={styles.tableHeader}>
      <span className={styles.tableTitle}>개발원가 산정</span>
      <span>(단위: 원)</span>
    </div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th rowSpan={2} className={styles.thCell}>
            총 기능점수
          </th>
          <th rowSpan={2} className={styles.thCell}>
            기능점수당 단가
          </th>
          <th colSpan={5} className={styles.thCell}>
            보정 계수
          </th>
          <th rowSpan={2} className={styles.thCell}>
            개발 원가
          </th>
        </tr>
        <tr>
          <th className={styles.thCell}>SW 규모</th>
          <th className={styles.thCell}>연계복잡성</th>
          <th className={styles.thCell}>성능 요구수준</th>
          <th className={styles.thCell}>운영환경 호환성</th>
          <th className={styles.thCell}>보안성 요구수준</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={getHighlightCellClass("totalFp", activeCell)}>
            2505.5
          </td>
          <td className={getHighlightCellClass("unitPrice", activeCell)}>
            <span>605,784</span>원
          </td>
          <td className={styles.tdCellCenter}>1.0480</td>
          <td className={styles.tdCellCenter}>0.94</td>
          <td className={getHighlightCellClass("performance", activeCell)}>
            1.00
          </td>
          <td className={styles.tdCellCenter}>1.00</td>
          <td className={styles.tdCellCenter}>1.06</td>
          <td className={getHighlightCellClassEnd("devCost", activeCell)}>
            <span>1,584,961,395</span>원
          </td>
        </tr>
        <tr>
          <td className={styles.tdCell} colSpan={7}>
            합계(보정 후 개발원가)
          </td>
          <td className={styles.tdCellEnd}>
            <span>1,584,961,395</span>원
          </td>
        </tr>
        <tr>
          <td className={styles.tdCell} colSpan={6}>
            이윤 (※이윤은 개발원가의 25% 이내에서 산정한다.)
          </td>
          <td className={styles.tdCellCenter}>
            <span>11</span>%
          </td>
          <td className={styles.tdCellEnd}>
            <span>79,248,070</span>원
          </td>
        </tr>
        <tr>
          <td className={styles.tdCellSecondary} colSpan={6}>
            소프트웨어 개발비 (부가세 별도)
          </td>
          <td
            className={`${styles.tdCellEnd} ${
              activeCell === "swDevCost"
                ? styles.tdCellHighlight
                : styles.tdCellSecondary
            }`}
            colSpan={2}
          >
            합계: <span>1,664,209,464</span>원
          </td>
        </tr>
      </tbody>
    </table>
    <p className={styles.tableNote}>※ 적용 단가: 605,784원(2024년 기준)</p>

    <div className={styles.tableHeader}>
      <span className={styles.tableTitle}>직접경비</span>
      <div
        className={styles.skeletonBox}
        style={{ width: "3rem", height: "1.25rem" }}
      />
    </div>
    <table className={styles.tableSecondary}>
      <thead>
        <tr>
          <th className={styles.thCell}>
            <div
              className={styles.skeletonBoxDark}
              style={{ width: "7rem", height: "1.25rem" }}
            />
          </th>
          <th className={styles.thCell}>
            <div
              className={styles.skeletonBoxDark}
              style={{ width: "4rem", height: "1.25rem" }}
            />
          </th>
          <th className={styles.thCell}>
            <div
              className={styles.skeletonBoxDark}
              style={{ width: "5rem", height: "1.25rem" }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={styles.tdCellCenter}>
            <div
              className={styles.skeletonBox}
              style={{ width: "3rem", height: "1.25rem" }}
            />
          </td>
          <td className={styles.tdCellCenter}>
            <div
              className={styles.skeletonBox}
              style={{ width: "6rem", height: "1.25rem" }}
            />
          </td>
          <td className={styles.tdCellCenter}>
            <div
              className={styles.skeletonBox}
              style={{ width: "4rem", height: "1.25rem" }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return activeCell;
};

const Section3 = () => {
  const [selectedChart, setSelectedChart] = useState<string>("function");
  const [floatingOffset, setFloatingOffset] = useState<number>(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const activeCell = useAutoHighlight();

  const handleChartClick = useCallback((key: string) => {
    setSelectedChart(key);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!chartContainerRef.current) return;

      const rect = chartContainerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const progress =
          (windowHeight - elementTop) / (windowHeight + elementHeight);
        const offset = progress * 60;
        setFloatingOffset(offset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      <section className={styles.sectionTable}>
        <div id="section3-table" className={styles.tableContainer}>
          <div className={styles.header}>
            <div className={styles.title}>
              <span className={styles.titleHighlight}>데이터 기반</span>의{" "}
              <br className={styles.titleBreak} />
              합리적인 의사결정 지원
            </div>
            <p className={styles.description}>
              <span className={styles.fontSemibold}>축적된 데이터</span>를
              활용하여 유사 사업 비용을 빠르게 예측하고,{" "}
              <span className={styles.fontSemibold}>보고서</span>,{" "}
              <span className={styles.fontSemibold}>시각화된 통계</span>{" "}
              제공으로 객관적인 의사결정을 돕습니다.
            </p>
          </div>

          <div className={styles.reportWrapper}>
            <span className={styles.reportLabel}>보고서</span>
            <div className={styles.reportDesktop}>
              <ReportTable activeCell={activeCell} />
            </div>

            <div className={styles.reportMobile}>
              <div className={styles.stackedCardFront}>
                <div className={styles.stackedCardInnerWhite}>
                  <ReportTable activeCell={activeCell} />
                </div>
              </div>
              <div className={styles.stackedCardMiddle}>
                <div className={styles.stackedCardInnerGray} />
              </div>
              <div className={styles.stackedCardBack}>
                <div className={styles.stackedCardInnerDarkGray} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.stickyGradient} />

      <section className={styles.sectionChart}>
        <div id="section3-chart" className={styles.chartContainer}>
          <div className={styles.chartSelector}>
            <span className={styles.chartSelectorLabel}>시각화된 통계</span>
            {chartData.map((chart) => (
              <button
                key={chart.id}
                className={styles.chartButton}
                onClick={() => handleChartClick(chart.key)}
              >
                <div
                  className={
                    selectedChart === chart.key
                      ? styles.chartButtonIndicatorActive
                      : styles.chartButtonIndicatorInactive
                  }
                />
                <span
                  className={
                    selectedChart === chart.key
                      ? styles.chartButtonTextActive
                      : styles.chartButtonTextInactive
                  }
                >
                  {chart.title}
                </span>
              </button>
            ))}
          </div>

          <div ref={chartContainerRef} className={styles.chartFrameDesktop}>
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={
                  selectedChart === chart.key
                    ? styles.chartFrameItemActive
                    : styles.chartFrameItemInactive
                }
                style={{
                  width: selectedChart === chart.key ? "35rem" : "3rem",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                }}
              >
                <chart.slider
                  chartKey={chart.key}
                  selectedChart={selectedChart}
                  floatingOffset={floatingOffset}
                />
              </div>
            ))}
          </div>

          <div className={styles.chartFrameTablet}>
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={
                  selectedChart === chart.key
                    ? styles.chartFrameItemActive
                    : styles.chartFrameItemInactive
                }
                style={{
                  height: selectedChart === chart.key ? "12rem" : "1.5rem",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                }}
              >
                <chart.slider
                  chartKey={chart.key}
                  selectedChart={selectedChart}
                  floatingOffset={floatingOffset}
                />
              </div>
            ))}
          </div>

          <div className={styles.chartFrameMobile}>
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={
                  selectedChart === chart.key
                    ? styles.chartFrameItemMobileActive
                    : styles.chartFrameItemMobileInactive
                }
                style={{
                  width: selectedChart === chart.key ? "80%" : "0%",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                }}
              >
                <chart.slider
                  chartKey={chart.key}
                  selectedChart={selectedChart}
                  floatingOffset={floatingOffset}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Section3;
