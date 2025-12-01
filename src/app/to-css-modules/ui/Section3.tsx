"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./Section3.module.css";
import SkeletonBar from "./SkeletonBar";

const FpChart = ({
  chartKey,
  selectedChart,
  floatingOffset,
}: {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}) => {
  return (
    <div
      className={styles.fpChart}
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
      }}
    >
      <div className={styles.fpChartLegend}>
        {chart1Data.map((item) => (
          <div key={item.label} className={styles.fpChartLegendItem}>
            <div
              className={`${styles.fpChartLegendDot} ${
                styles[item.colorClass]
              }`}
            />
            <span className={styles.fpChartLegendLabel}>{item.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.fpChartBars}>
        <div
          className={styles.fpChartFloating}
          style={{
            transform: `translateY(${floatingOffset}px)`,
          }}
        >
          <div className={styles.fpChartFloatingDot} />
          <span>ELF</span>
          <span>2683.8</span>
        </div>
        {chart1Data.map((item) => (
          <div
            key={item.label}
            className={`${styles.fpChartBar} ${styles[item.colorClass]}`}
            style={{ width: `${item.width}%` }}
          ></div>
        ))}
      </div>
      <div className={styles.fpChartAxis}>
        {["0", "1000", "2000", "3000", "4000", "5000"].map((item) => (
          <span key={item} className={styles.fpChartAxisLabel}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const FpRate = ({
  chartKey,
  selectedChart,
  floatingOffset,
}: {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}) => {
  return (
    <div
      className={styles.fpRate}
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
      }}
    >
      <div className={styles.fpChartLegend}>
        {chart1Data.map((item) => (
          <div key={item.label} className={styles.fpChartLegendItem}>
            <div
              className={`${styles.fpChartLegendDot} ${
                styles[item.colorClass]
              }`}
            />
            <span className={styles.fpChartLegendLabel}>{item.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.fpRateDonutContainer}>
        {/* 도넛 차트 */}
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          className={styles.fpRateDonut}
        >
          {(() => {
            const total = chart1Data.reduce((sum, item) => sum + item.width, 0);
            const radius = 100;
            const circumference = 2 * Math.PI * radius;

            const colorMap: { [key: string]: string } = {
              bgGreen500: "#22c55e",
              bgAmber500: "#f59e0b",
              bgSky500: "#0ea5e9",
              bgRed500: "#ef4444",
              bgTeal500: "#14b8a6",
            };

            // 각 항목의 offset을 미리 계산
            const segments = chart1Data.map((item, index) => {
              const percentage = (item.width / total) * 100;
              const strokeLength = (percentage / 100) * circumference;
              const offset = chart1Data
                .slice(0, index)
                .reduce((sum, prevItem) => {
                  const prevPercentage = (prevItem.width / total) * 100;
                  return sum + (prevPercentage / 100) * circumference;
                }, 0);

              return { item, strokeLength, offset };
            });

            return segments.map(({ item, strokeLength, offset }) => (
              <circle
                key={item.label}
                cx="140"
                cy="140"
                r={radius}
                fill="none"
                stroke={colorMap[item.colorClass] || "#gray"}
                strokeWidth="48"
                strokeDasharray={`${strokeLength} ${
                  circumference - strokeLength
                }`}
                strokeDashoffset={-offset}
                style={{ transition: "all 0.5s" }}
              />
            ));
          })()}
        </svg>

        {/* 중앙 정보 */}
        <div className={styles.fpRateCenter}>
          <div className={styles.fpRateCenterValue}>
            {chart1Data.reduce((sum, item) => sum + item.width, 0)}
          </div>
          <div className={styles.fpRateCenterLabel}>Total FP</div>
        </div>

        {/* Floating 정보 카드 */}
        <div
          className={styles.fpRateFloating}
          style={{
            transform: `translateY(${floatingOffset}px)`,
          }}
        >
          <div className={styles.fpRateFloatingDot} />
          <span>EO</span>
          <span>40%</span>
        </div>
      </div>
    </div>
  );
};

const FpReport = ({
  chartKey,
  selectedChart,
  floatingOffset,
}: {
  chartKey: string;
  selectedChart: string;
  floatingOffset: number;
}) => {
  const amount = 740141670;
  const manMonth = 497.5;
  return (
    <div
      className={styles.fpReport}
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
      }}
    >
      <div
        className={styles.fpReportText}
        style={{
          transform: `translateY(${floatingOffset / 2}px)`,
        }}
      >
        <p>소프트웨어 개발비는</p>
        <p className={styles.fpReportAmount}>{amount.toLocaleString()}원,</p>
        <p>입력된 1인 생산성 20(FP/MM) 기준</p>
        <p className={styles.fpReportAmount}>
          소요 M/M는 {manMonth.toLocaleString()} M/M
        </p>
        <p>로 추정됩니다.</p>
      </div>
      <div
        className={styles.fpReportSkeleton}
        style={{
          transform: `translateY(${floatingOffset}px)`,
        }}
      >
        <div className={styles.fpReportSkeletonRow}>
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={5} height={1} />
          <SkeletonBar width={3} height={1} />
          <SkeletonBar width={6} height={1} />
        </div>
        <div className={styles.fpReportSkeletonRow}>
          <SkeletonBar width={2} height={1} />
          <SkeletonBar width={1} height={1} />
          <SkeletonBar width={2.5} height={1} />
          <SkeletonBar width={3.5} height={1} />
        </div>
        <div className={styles.fpReportSkeletonRow}>
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

const chart1Data = [
  {
    colorClass: "bgGreen500",
    label: "ILF",
    width: 25,
  },
  {
    colorClass: "bgAmber500",
    label: "EIF",
    width: 50,
  },
  {
    colorClass: "bgSky500",
    label: "EL",
    width: 20,
  },
  {
    colorClass: "bgRed500",
    label: "EO",
    width: 86,
  },
  {
    colorClass: "bgTeal500",
    label: "EQ",
    width: 35,
  },
];

const Section3 = () => {
  const [selectedChart, setSelectedChart] = useState<string>("function");
  const [floatingOffset, setFloatingOffset] = useState<number>(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

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
      <section className={styles.sectionSticky}>
        {/* 테이블 영역 */}
        <div id="section3-table" className={styles.tableArea}>
          <div className={styles.header}>
            <div className={styles.title}>
              <span className={styles.brandText}>데이터 기반</span>
              의 <br className="lg:hidden" />
              합리적인 의사결정 지원
            </div>
            <p className={styles.description}>
              <span className={styles.semibold}>축적된 데이터</span>를 활용하여
              유사 사업 비용을 빠르게 예측하고,{" "}
              <span className={styles.semibold}>보고서</span>,{" "}
              <span className={styles.semibold}>시각화된 통계</span> 제공으로
              객관적인 의사결정을 돕습니다.
            </p>
          </div>

          {/* 테이블 */}
          <div className={styles.tableWrapper}>
            <span className={styles.sectionLabel}>보고서</span>
            {/* 보고서 내역 - desktop */}
            <div className={styles.reportDesktop}>
              {/* 개발원가 산정 */}
              <div className={styles.reportHeader}>
                <span className={styles.reportTitle}>개발원가 산정</span>
                <span>(단위: 원)</span>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th
                      rowSpan={2}
                      className={`${styles.tableCell} ${styles.tableHeader}`}
                    >
                      총 기능점수
                    </th>
                    <th
                      rowSpan={2}
                      className={`${styles.tableCell} ${styles.tableHeader}`}
                    >
                      기능점수당 단가
                    </th>
                    <th
                      colSpan={5}
                      className={`${styles.tableCell} ${styles.tableHeader}`}
                    >
                      보정 계수
                    </th>
                    <th
                      rowSpan={2}
                      className={`${styles.tableCell} ${styles.tableHeader}`}
                    >
                      개발 원가
                    </th>
                  </tr>
                  <tr>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      SW 규모
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      연계복잡성
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      성능 요구수준
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      운영환경 호환성
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      보안성 요구수준
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* 1row */}
                  <tr>
                    <td className={styles.tableCell}>1000.6</td>
                    <td className={styles.tableCell}>
                      <span>605,784</span>원
                    </td>
                    <td className={styles.tableCell}>1.1530</td>
                    <td className={styles.tableCell}>0.94</td>
                    <td className={styles.tableCell}>1.00</td>
                    <td className={styles.tableCell}>1.00</td>
                    <td className={styles.tableCell}>1.03</td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellEnd}`}
                    >
                      <span>6,728,560,634</span>원
                    </td>
                  </tr>

                  {/* 2row */}
                  <tr>
                    <td className={styles.tableCell} colSpan={7}>
                      합계(보정 후 개발원가)
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellEnd}`}
                    >
                      <span>6,728,560,634</span>원
                    </td>
                  </tr>

                  {/* 3row */}
                  <tr>
                    <td className={styles.tableCell} colSpan={6}>
                      이윤 (※이윤은 개발원가의 25% 이내에서 산정한다.)
                    </td>
                    <td className={styles.tableCell}>
                      <span>11</span>%
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellEnd}`}
                    >
                      <span>740,141,670</span>원
                    </td>
                  </tr>

                  {/* 4row */}
                  <tr>
                    <td
                      className={`${styles.tableCell} ${styles.tableSecondary}`}
                      colSpan={6}
                    >
                      소프트웨어 개발비 (부가세 별도)
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableSecondary} ${styles.tableCellEnd}`}
                      colSpan={2}
                    >
                      합계: <span>740,141,670</span>원
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className={styles.reportNote}>
                ※ 적용 단가: 553,111원(2024년 기준)
              </p>

              <div className={styles.reportHeader}>
                <span className={styles.reportTitle}>직접경비</span>
                <div
                  style={{
                    width: "3rem",
                    height: "1.25rem",
                    borderRadius: "0.25rem",
                    backgroundColor: "rgb(243 244 246)",
                  }}
                />
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      <div
                        style={{
                          width: "7rem",
                          height: "1.25rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "rgb(229 231 235)",
                        }}
                      />
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      <div
                        style={{
                          width: "4rem",
                          height: "1.25rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "rgb(229 231 235)",
                        }}
                      />
                    </th>
                    <th className={`${styles.tableCell} ${styles.tableHeader}`}>
                      <div
                        style={{
                          width: "5rem",
                          height: "1.25rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "rgb(229 231 235)",
                        }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* 1row */}
                  <tr>
                    <td className={styles.tableCell}>
                      <div
                        style={{
                          width: "3rem",
                          height: "1.25rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "rgb(243 244 246)",
                        }}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <div
                        style={{
                          width: "6rem",
                          height: "1.25rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "rgb(243 244 246)",
                        }}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <div
                        style={{
                          width: "4rem",
                          height: "1.25rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "rgb(243 244 246)",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 보고서 내역 - mobile & tablet */}
            <div className={styles.reportMobileContainer}>
              <div className={styles.reportMobile}>
                <div className={styles.reportMobileCard}>
                  {/* 개발원가 산정 */}
                  <div className={styles.reportHeader}>
                    <span className={styles.reportTitle}>개발원가 산정</span>
                    <span>(단위: 원)</span>
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th
                          rowSpan={2}
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          총 기능점수
                        </th>
                        <th
                          rowSpan={2}
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          기능점수당 단가
                        </th>
                        <th
                          colSpan={5}
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          보정 계수
                        </th>
                        <th
                          rowSpan={2}
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          개발 원가
                        </th>
                      </tr>
                      <tr>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          SW 규모
                        </th>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          연계복잡성
                        </th>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          성능 요구수준
                        </th>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          운영환경 호환성
                        </th>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          보안성 요구수준
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 1row */}
                      <tr>
                        <td className={styles.tableCell}>1000.6</td>
                        <td className={styles.tableCell}>
                          <span>605,784</span>원
                        </td>
                        <td className={styles.tableCell}>1.1530</td>
                        <td className={styles.tableCell}>0.94</td>
                        <td className={styles.tableCell}>1.00</td>
                        <td className={styles.tableCell}>1.00</td>
                        <td className={styles.tableCell}>1.03</td>
                        <td
                          className={`${styles.tableCell} ${styles.tableCellEnd}`}
                        >
                          <span>6,728,560,634</span>원
                        </td>
                      </tr>

                      {/* 2row */}
                      <tr>
                        <td className={styles.tableCell} colSpan={7}>
                          합계(보정 후 개발원가)
                        </td>
                        <td
                          className={`${styles.tableCell} ${styles.tableCellEnd}`}
                        >
                          <span>6,728,560,634</span>원
                        </td>
                      </tr>

                      {/* 3row */}
                      <tr>
                        <td className={styles.tableCell} colSpan={6}>
                          이윤 (※이윤은 개발원가의 25% 이내에서 산정한다.)
                        </td>
                        <td className={styles.tableCell}>
                          <span>11</span>%
                        </td>
                        <td
                          className={`${styles.tableCell} ${styles.tableCellEnd}`}
                        >
                          <span>740,141,670</span>원
                        </td>
                      </tr>

                      {/* 4row */}
                      <tr>
                        <td
                          className={`${styles.tableCell} ${styles.tableSecondary}`}
                          colSpan={6}
                        >
                          소프트웨어 개발비 (부가세 별도)
                        </td>
                        <td
                          className={`${styles.tableCell} ${styles.tableSecondary} ${styles.tableCellEnd}`}
                          colSpan={2}
                        >
                          합계: <span>740,141,670</span>원
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={styles.reportNote}>
                    ※ 적용 단가: 553,111원(2024년 기준)
                  </p>

                  <div className={styles.reportHeader}>
                    <span className={styles.reportTitle}>직접경비</span>
                    <div
                      style={{
                        width: "3rem",
                        height: "1.25rem",
                        borderRadius: "0.25rem",
                        backgroundColor: "rgb(243 244 246)",
                      }}
                    />
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          <div
                            style={{
                              width: "7rem",
                              height: "1.25rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "rgb(229 231 235)",
                            }}
                          />
                        </th>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          <div
                            style={{
                              width: "4rem",
                              height: "1.25rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "rgb(229 231 235)",
                            }}
                          />
                        </th>
                        <th
                          className={`${styles.tableCell} ${styles.tableHeader}`}
                        >
                          <div
                            style={{
                              width: "5rem",
                              height: "1.25rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "rgb(229 231 235)",
                            }}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 1row */}
                      <tr>
                        <td className={styles.tableCell}>
                          <div
                            style={{
                              width: "3rem",
                              height: "1.25rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "rgb(243 244 246)",
                            }}
                          />
                        </td>
                        <td className={styles.tableCell}>
                          <div
                            style={{
                              width: "6rem",
                              height: "1.25rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "rgb(243 244 246)",
                            }}
                          />
                        </td>
                        <td className={styles.tableCell}>
                          <div
                            style={{
                              width: "4rem",
                              height: "1.25rem",
                              borderRadius: "0.25rem",
                              backgroundColor: "rgb(243 244 246)",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={styles.reportStack2}>
                <div className={styles.reportStackCard2} />
              </div>
              <div className={styles.reportStack3}>
                <div className={styles.reportStackCard3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 스티커 영역 - 그라데이션 효과 */}
      <div className={styles.gradientDivider} />

      {/* 차트 그래픽 영역 */}
      <section className={styles.sectionChart}>
        <div id="section3-chart" className={styles.chartContainer}>
          {/* 차트 셀렉터 */}
          <div className={styles.chartSelector}>
            <span className={`${styles.sectionLabel} mb-2`}>시각화된 통계</span>
            {chartData.map((chart) => (
              <button
                key={chart.id}
                className={styles.chartButton}
                onClick={() => handleChartClick(chart.key)}
              >
                <div
                  className={`${styles.chartIndicator} ${
                    selectedChart === chart.key
                      ? styles.chartIndicatorActive
                      : styles.chartIndicatorInactive
                  }`}
                />
                <span
                  className={`${styles.chartLabel} ${
                    selectedChart === chart.key
                      ? styles.chartLabelActive
                      : styles.chartLabelInactive
                  }`}
                >
                  {chart.title}
                </span>
              </button>
            ))}
          </div>

          {/* 차트 프레임 - desktop */}
          <div ref={chartContainerRef} className={styles.chartFrameDesktop}>
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={`${styles.chartSlide} ${
                  selectedChart === chart.key
                    ? styles.chartSlideActive
                    : styles.chartSlideInactive
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
          <div className={styles.chartFrameTablet}>
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={`${styles.chartSlideTablet} ${
                  selectedChart === chart.key
                    ? styles.chartSlideTabletActive
                    : styles.chartSlideTabletInactive
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
          <div className={styles.chartFrameMobile}>
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className={`${styles.chartSlideMobile} ${
                  selectedChart === chart.key
                    ? styles.chartSlideMobileActive
                    : styles.chartSlideMobileInactive
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
