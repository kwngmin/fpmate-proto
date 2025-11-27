"use client";

import { Typography } from "@/shared/ui";
import Image from "next/image";
import { Fragment, useState } from "react";

/**
 * Section 3 차트 그래픽 데이터
 */
const section3Charts = [
  {
    id: 1,
    key: "function",
    title: "기능점수",
    image: "/assets/images/section3-chart-1.png",
  },
  {
    id: 2,
    key: "ratio",
    title: "기능별 비율",
    image: "/assets/images/section3-chart-3.png",
  },
  {
    id: 3,
    key: "cost",
    title: "기능 점수 산정 결과",
    image: "/assets/images/section3-chart-4.png",
  },
];

const Section3 = () => {
  const [selectedChart, setSelectedChart] = useState<string>("function");

  const handleChartClick = (key: string) => {
    setSelectedChart(key);
  };

  return (
    <Fragment>
      <section className="bg-gray-50 py-20 md:py-40 overflow-hidden sticky top-16 md:top-0">
        {/* 테이블 영역 */}
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12 mb-20">
          <div className="flex flex-col gap-4">
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

          {/* <p className="text-[1.5rem] sm:text-[2rem] leading-tight tracking-tighter break-keep text-text-primary">
            <span className="font-semibold">리포팅 기능</span>을 통해{" "}
            <br className="sm:hidden" />
            <span className="font-semibold">소프트웨어 사업 추진</span>에{" "}
            <br className="hidden sm:block" />
            <span className="font-bold text-brand-primary">인사이트</span>를
            더해 드립니다.
          </p> */}

          {/* 테이블 */}
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
      </section>

      {/* 스티커 영역 - 그라데이션 효과 */}
      <div className="bg-linear-to-b from-transparent to-gray-50 w-full h-12 z-10" />

      {/* 차트 그래픽 영역 */}
      <section className="bg-gray-50 pb-20 md:pb-40 overflow-hidden z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row md:items-center gap-4 lg:gap-20 sticky z-30">
          {/* 차트 셀렉터 */}
          <div className="flex flex-col gap-2 min-w-xs sm:min-w-2/5 lg:min-w-1/3 py-4 sm:py-6">
            {section3Charts.map((chart) => (
              <button
                key={chart.id}
                className={`flex gap-3 items-center rounded overflow-hidden`}
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
          <div className="hidden lg:flex gap-2">
            {section3Charts.map((chart) => (
              <div
                key={chart.id}
                className={`bg-white rounded h-96 overflow-hidden ${
                  selectedChart === chart.key ? "shadow-card grow" : ""
                }`}
                style={{
                  width: selectedChart === chart.key ? "70%" : "3rem",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                  transition:
                    "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Image
                  src={chart.image}
                  alt={`section3-chart-${chart.key}`}
                  width={608}
                  height={304}
                  unoptimized
                  className="h-full w-full object-cover mt-8"
                  style={{
                    opacity: selectedChart === chart.key ? 1 : 0,
                    filter:
                      selectedChart === chart.key ? "blur(0rem)" : "blur(2rem)",
                    transition:
                      "opacity 0.5s ease-in-out, filter 0.5s ease-in-out",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 차트 프레임 - tablet */}
          <div className="hidden md:flex lg:hidden flex-col justify-center gap-2 h-128">
            {section3Charts.map((chart) => (
              <div
                key={chart.id}
                className={`bg-white rounded overflow-hidden ${
                  selectedChart === chart.key ? "shadow-card" : ""
                }`}
                style={{
                  height: selectedChart === chart.key ? "60%" : "24px",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                  transition:
                    "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Image
                  src={chart.image}
                  alt={`section3-chart-${chart.key}`}
                  width={608}
                  height={304}
                  unoptimized
                  className="h-full w-full object-cover mt-8"
                  style={{
                    opacity: selectedChart === chart.key ? 1 : 0,
                    filter:
                      selectedChart === chart.key ? "blur(0rem)" : "blur(1rem)",
                    transition:
                      "opacity 0.5s ease-in-out, filter 0.5s ease-in-out",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 차트 프레임 - mobile */}
          <div className="flex md:hidden">
            {section3Charts.map((chart) => (
              <div
                key={chart.id}
                className={`bg-white rounded h-72 overflow-hidden ${
                  selectedChart === chart.key ? "shadow-card grow" : ""
                }`}
                style={{
                  width: selectedChart === chart.key ? "80%" : "0%",
                  flexShrink: selectedChart === chart.key ? 0 : 1,
                  transition:
                    "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Image
                  src={chart.image}
                  alt={`section3-chart-${chart.key}`}
                  width={608}
                  height={304}
                  unoptimized
                  className="h-full w-full object-cover mt-5 scale-110"
                  style={{
                    opacity: selectedChart === chart.key ? 1 : 0,
                    filter:
                      selectedChart === chart.key ? "blur(0rem)" : "blur(1rem)",
                    transition:
                      "opacity 0.5s ease-in-out, filter 0.5s ease-in-out",
                  }}
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
