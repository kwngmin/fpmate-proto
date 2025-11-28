"use client";

import { Fragment, useEffect, useRef, useState } from "react";
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
      className="scale-90 origin-bottom md:scale-100 w-96 h-88 object-cover flex flex-col gap-8 border-t border-x border-border-primary px-10 pt-12 rounded-t-xl shadow-2xl bg-white"
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
        transition: "opacity 0.3s ease-in-out, filter 0.4s ease-in-out",
      }}
    >
      <div className="flex items-center justify-between gap-4 z-10">
        {chart1Data.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`size-3 rounded-full ${item.color}`} />
            <span className="[0.9375rem] leading-none tracking-tight text-text-primary font-medium pb-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 relative after:content-[''] after:absolute after:h-full after:left-0 after:top-0 after:bg-linear-to-r after:from-white/80 after:to-transparent after:w-1/3 after:z-20 after:pointer-events-none">
        <div
          className="absolute top-8 left-2/5 z-30 bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-lg flex items-center gap-2 pl-4 pr-6 h-11 rounded-md border border-border-primary/50 text-text-primary font-medium transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(${floatingOffset}px)`,
          }}
        >
          <div className="rounded-full size-4 bg-amber-500 ring-3 ring-white mr-1" />
          <span>ELF</span>
          <span>2683.8</span>
        </div>
        {chart1Data.map((item) => (
          <div
            key={item.label}
            className={`z-10 relative h-8 rounded-r shadow-sm ${item.color}`}
            style={{ width: `${item.width}%` }}
          ></div>
        ))}
      </div>
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
      className="scale-90 origin-bottom md:scale-100 w-96 h-88 object-cover flex flex-col border-t border-x border-border-primary px-10 pt-12 rounded-t-xl shadow-2xl bg-white"
      style={{
        opacity: selectedChart === chartKey ? 1 : 0,
        filter: selectedChart === chartKey ? "blur(0rem)" : "blur(2rem)",
        transition: "opacity 0.3s ease-in-out, filter 0.4s ease-in-out",
      }}
    >
      <div className="flex items-center justify-between gap-4 z-10">
        {chart1Data.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`size-3 rounded-full ${item.color}`} />
            <span className="[0.9375rem] leading-none tracking-tight text-text-primary font-medium pb-0.5">
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
          {(() => {
            const total = chart1Data.reduce((sum, item) => sum + item.width, 0);
            const radius = 100;
            const circumference = 2 * Math.PI * radius;

            const colorMap: { [key: string]: string } = {
              "bg-green-500": "#22c55e",
              "bg-amber-500": "#f59e0b",
              "bg-sky-500": "#0ea5e9",
              "bg-red-500": "#ef4444",
              "bg-teal-500": "#14b8a6",
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
                stroke={colorMap[item.color] || "#gray"}
                strokeWidth="48"
                strokeDasharray={`${strokeLength} ${
                  circumference - strokeLength
                }`}
                strokeDashoffset={-offset}
                className="transition-all duration-500"
              />
            ));
          })()}
        </svg>

        {/* 중앙 정보 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <div className="text-[2.5rem] font-extrabold text-text-primary leading-tight tracking-tighter">
            {chart1Data.reduce((sum, item) => sum + item.width, 0)}
          </div>
          <div className="text-[0.9375rem] text-text-secondary font-medium">
            Total FP
          </div>
        </div>

        {/* Floating 정보 카드 */}
        <div
          className="absolute bottom-20 left-0 z-20 bg-black/20 backdrop-blur-md backdrop-saturate-150 shadow-lg flex items-center gap-2 pl-4 pr-6 h-11 rounded-md border border-border-primary/50 text-white font-medium transition-transform duration-200 ease-out"
          style={{
            transform: `translateY(${floatingOffset}px)`,
          }}
        >
          <div className="rounded-full size-4 bg-red-500 ring-3 ring-white mr-1" />
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
          {amount.toLocaleString()}원,
        </p>
        <p>입력된 1인 생산성 20(FP/MM) 기준</p>
        <p className="text-[1.3125rem] sm:text-[1.5rem] font-bold mb-2">
          소요 M/M는 {manMonth.toLocaleString()} M/M
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

const chart1Data = [
  {
    color: "bg-green-500",
    label: "ILF",
    width: 25,
  },
  {
    color: "bg-amber-500",
    label: "EIF",
    width: 50,
  },
  {
    color: "bg-sky-500",
    label: "EL",
    width: 20,
  },
  {
    color: "bg-red-500",
    label: "EO",
    width: 86,
  },
  {
    color: "bg-teal-500",
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
      <section
        className="bg-gray-50 py-16 md:py-40 sticky top-16 md:top-0 z-10"
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
            <p className="text-[1.0625rem] md:text-[1.3125rem] leading-snug tracking-tight break-keep text-text-primary max-w-xl md:max-w-3xl">
              <span className="font-semibold">축적된 데이터</span>를 활용하여
              유사 사업 비용을 빠르게 예측하고,{" "}
              {/* <br className="hidden sm:block" /> */}
              <span className="font-semibold">보고서</span>,{" "}
              <span className="font-semibold">시각화된 통계</span> 제공으로
              객관적인 의사결정을 돕습니다.
            </p>
          </div>

          {/* 테이블 */}
          <div className="flex flex-col gap-2 px-6 overflow-hidden">
            <span className="text-[0.9375rem] tracking-tight text-text-tertiary font-medium">
              보고서
            </span>
            <div className="relative p-6 bg-white rounded-lg flex flex-col gap-4 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-gray-50 after:h-1/3 after:pointer-events-none after:z-10 min-w-[1152px] before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-t before:border-x before:border-border-primary before:pointer-events-none before:z-0 *:cursor-default">
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
                    <td
                      className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent"
                      // rowSpan={4}
                    >
                      1000.6
                    </td>
                    <td
                      className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent"
                      // rowSpan={4}
                    >
                      <span>605,784</span>원
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
                      1.1530
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
                      0.94
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
                      1.00
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
                      1.00
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
                      1.03
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-end transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
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
                    <td className="border border-border-primary bg-bg-primary p-3 text-end transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
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
                    <td className="border border-border-primary bg-bg-primary p-3 text-center transition-all ease-in-out duration-300 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
                      <span>11</span>%
                    </td>
                    <td className="border border-border-primary bg-bg-primary p-3 text-end transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent">
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
                      className="border border-border-primary bg-bg-secondary p-3 text-end transition-all ease-in-out duration-200 hover:bg-amber-50 hover:outline-1 hover:outline-accent-hover outline-transparent"
                      colSpan={2}
                    >
                      {/* <div className="w-full flex justify-between">
                <span>합계:</span>
                <span>
                  <span>740,141,670</span>원
                </span>
              </div> */}
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
            </div>
          </div>
        </div>
      </section>

      {/* 스티커 영역 - 그라데이션 효과 */}
      <div className="bg-linear-to-b from-transparent to-gray-50 w-full h-12 z-20" />

      {/* 차트 그래픽 영역 */}
      <section className="bg-gray-50 pb-20 md:pb-40 z-30">
        <div
          id="section3-chart"
          className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center gap-4 lg:gap-20 z-10"
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
                    ? "shadow-card grow bg-linear-to-b from-white via-white to-gray-200/50"
                    : "bg-white/50"
                }`}
                // className={`bg-white rounded h-72 overflow-hidden ${
                //   selectedChart === chart.key ? "shadow-card grow" : ""
                // }`}
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
