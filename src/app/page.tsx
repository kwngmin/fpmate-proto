"use client";

import { Button, Card } from "@/shared/ui";
import InsightCard from "@/shared/ui/InsightCard";
import Image from "next/image";
import { Fragment, useState } from "react";

/**
 * 프로세스 단계 카드 데이터
 */
const processSteps = [
  {
    id: 1,
    number: "01",
    key: "one",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-01.png",
  },
  {
    id: 2,
    number: "02",
    key: "two",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-02.png",
  },
  {
    id: 3,
    number: "03",
    key: "three",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-03.png",
  },
  {
    id: 4,
    number: "04",
    key: "four",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-04.png",
  },
  {
    id: 5,
    number: "05",
    key: "five",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-05.png",
  },
  {
    id: 6,
    number: "06",
    key: "six",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-06.png",
  },
  {
    id: 7,
    number: "07",
    key: "seven",
    title: "SW 사업 정보 정보 등록",
    image: "/assets/images/main-card-07.png",
  },
];

/**
 * Section 1 카드 데이터
 */
const section1Contents = [
  {
    id: 1,
    title: "SW 사업을 기획하고 계신가요?",
    description: "FPMate에서 필요한 비용을 알아보세요.",
    image: "/assets/images/section1-lamp.png",
  },
  {
    id: 2,
    title: "SW 사업을 진행하고 계신가요?",
    description: "FPMate로 프로젝트의 비용을 추척해보세요.",
    image: "/assets/images/section1-play.png",
  },
  {
    id: 3,
    title: "SW 사업이 완료되셨나요?",
    description: "FPMate로 운영에 필요한 비용을 알아보세요.",
    image: "/assets/images/section1-check.png",
  },
];

/**
 * Section 3 차트 그래픽 데이터
 */
const section3Charts = [
  {
    id: 1,
    key: "function",
    title: "기능유형별 기능점수",
    image: "/assets/images/section3-chart-1.png",
  },
  {
    id: 2,
    key: "app-category",
    title: "애플리케이션/업무별 기능 점수",
    image: "/assets/images/section3-chart-2.png",
  },
  {
    id: 3,
    key: "ratio",
    title: "기능유형별 비율",
    image: "/assets/images/section3-chart-3.png",
  },
  {
    id: 4,
    key: "cost",
    title: "소프트웨어 개발비 산정 결과",
    image: "/assets/images/section3-chart-4.png",
  },
];

export default function Home() {
  const [selectedChart, setSelectedChart] = useState<{
    key: string;
    image: string;
  }>({
    key: "function",
    image: "/assets/images/section3-chart-1.png",
  });

  const handleChartClick = (key: string) => {
    setSelectedChart({
      key,
      image: section3Charts.find((chart) => chart.key === key)?.image || "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-100 bg-(--header-bg) backdrop-blur-(--header-blur) border-b border-(--header-border)">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/logo/fpmate-symbol-black.svg"
              alt="FPmate"
              width={112}
              height={40}
              priority
            />
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="primary" size="sm">
              도입문의
            </Button>
            <Button variant="outline" size="sm">
              로그인
            </Button>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="primary" size="md">
              제품도입문의
            </Button>
            <Button variant="outline" size="md">
              로그인/회원가입
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main
        // className="py-40 overflow-hidden"
        className="pb-20 md:pb-40 overflow-hidden scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Title */}
          <div
            className="py-10 space-y-6 flex flex-col"
            // className="px-6 py-10 space-y-6 flex flex-col bg-gray-50 border border-gray-200"
          >
            <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold">
              FINE PROJECT MATE
            </span>
            <div className="text-[2.5rem] md:text-[3.75rem] leading-[1.1] tracking-[-0.022em] font-bold">
              <div>
                <span className="font-bold text-brand-primary">FPMate</span>
                <span>로</span>
              </div>
              <div className="break-keep">
                SW 사업 비용 산정과 관리를 한번에
              </div>
            </div>
            <p className="text-[1.3125rem] leading-[1.33] tracking-[-0.012em] font-medium break-keep">
              <span className="font-bold">FPMate</span>는 AI 비서와 함께 쉽고
              빠르게 SW 사업 비용을 알아 볼 수 있습니다. <br />
              사업 단계별 변경 관리도 어렵지 않아요.
            </p>
          </div>

          {/* Action Buttons - Mobile*/}
          {/* <div className="flex items-center gap-2 md:hidden">
            <Button variant="primary" size="md">
              제품도입문의
            </Button>
            <Button variant="ghost" size="md">
              로그인/회원가입
            </Button>
          </div> */}

          {/* Action Buttons - Desktop*/}
          {/* <div className="hidden md:flex items-center gap-2">
            <Button variant="primary" size="lg">
              제품도입문의
            </Button>
            <Button variant="ghost" size="lg">
              로그인/회원가입
            </Button>
          </div> */}

          {/* progress bar */}
          <div className="flex items-center w-full max-w-xs sm:max-w-lg md:max-w-2xl pb-6 md:pt-6">
            {processSteps.map((step, index) => (
              <Fragment key={step.id}>
                <div className="size-8 sm:size-9 md:size-10 bg-brand-primary rounded-full flex items-center justify-center">
                  <Image
                    src={`/assets/svgs/number-${step.key}-bold.svg`}
                    alt={`process-step-${step.id}`}
                    width={32}
                    height={32}
                    className="size-5 brightness-0 invert"
                  />
                </div>
                {index < processSteps.length - 1 && (
                  <div className="grow h-1 border-t border-border-primary" />
                )}
              </Fragment>
            ))}
          </div>

          {/* 카드 영역 */}
          <div className="flex gap-2 py-4">
            {processSteps.map((step) => (
              <Card
                key={step.id}
                variant="elevated"
                padding="none"
                className="w-64 shrink-0"
              >
                <Image
                  src={step.image}
                  alt={`step-${step.number}`}
                  width={256}
                  height={152}
                  className="w-[256px] h-[130px] object-cover"
                />
                <div className="flex flex-col px-4 py-6">
                  <span className="text-[27px] text-brand-primary font-base">
                    {step.number}
                  </span>
                  <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold">
                    {step.title}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Section 1 */}
      <section className="bg-gray-50 py-20 md:py-40 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-6">
          <div className="text-[2rem] leading-[1.325] tracking-[-0.022em] font-semibold break-keep">
            <span className="font-bold text-brand-primary">FPMate</span>는 SW
            사업 파트너로서 <br />
            SW 사업 관리를 돕고자 탄생하였습니다.
          </div>

          {/* 카드 영역 */}
          <div className="flex gap-2 py-4">
            {section1Contents.map((content) => (
              <Card
                key={content.id}
                variant="elevated"
                padding="none"
                className="grow w-64 min-w-72 shrink-0"
              >
                <div className="flex flex-col gap-1 items-center px-4 pt-6 pb-8">
                  <Image
                    src={content.image}
                    alt={`section1-${content.id}`}
                    width={124}
                    height={124}
                    className="shrink-0 size-28 mb-2"
                  />
                  <span className="text-[1.0625rem] leading-tight tracking-[-0.012em] font-bold break-keep">
                    {content.title}
                  </span>
                  <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em] font-medium text-center break-keep max-w-48">
                    {content.description}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Section 1 Description */}
          <p className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em] break-keep">
            FPMate에서는 국제표준(ISO/IEC 14143)에 기반한 방법으로 SW 사업
            비용을 산정합니다.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white py-20 md:py-40 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-6">
          <div className="text-[2rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.022em] font-semibold break-keep">
            SW 사업 추진{" "}
            <span className="font-bold text-brand-primary">인사이트+</span>
          </div>
          <p className="text-[1.0625rem] leading-[1.6] tracking-[0] font-medium break-keep">
            고유 작업 공간에서 그동안 작업했던 <br />
            SW 사업 비용 산정 내역을 한눈에 파악해보세요.
          </p>

          {/* Insight Cards */}
          <div className="grid grid-cols-3 gap-2 w-[1000px] md:w-[1152px]">
            <InsightCard />
            <InsightCard />
            <InsightCard />
          </div>

          {/* Dummy cards */}
          <div className="relative grid grid-cols-3 gap-2 after:content-[''] after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:to-white after:pointer-events-none w-[1000px] md:w-[1152px]">
            <Card
              variant="bordered"
              padding="sm"
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-12 h-7 rounded-full bg-gray-100" />
                  <div className="w-14 h-7 rounded-full bg-gray-100" />
                  <div className="w-20 h-7 rounded-full bg-gray-100" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="size-7 bg-gray-100 rounded-full" />
                  <div className="size-7 bg-gray-100 rounded-full" />
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <div className="w-14 h-4 rounded bg-gray-200" />
                <div className="w-28 h-4 rounded bg-gray-200" />
                <div className="w-8 h-4 rounded bg-gray-200" />
              </div>
            </Card>
            <Card
              variant="bordered"
              padding="sm"
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-12 h-7 rounded-full bg-gray-100" />
                  <div className="w-14 h-7 rounded-full bg-gray-100" />
                  <div className="w-20 h-7 rounded-full bg-gray-100" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="size-7 bg-gray-100 rounded-full" />
                  <div className="size-7 bg-gray-100 rounded-full" />
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <div className="w-10 h-4 rounded bg-gray-200" />
                <div className="w-20 h-4 rounded bg-gray-200" />
                <div className="w-12 h-4 rounded bg-gray-200" />
              </div>
            </Card>
            <Card
              variant="bordered"
              padding="sm"
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-12 h-7 rounded-full bg-gray-100" />
                  <div className="w-14 h-7 rounded-full bg-gray-100" />
                  <div className="w-20 h-7 rounded-full bg-gray-100" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="size-7 bg-gray-100 rounded-full" />
                  <div className="size-7 bg-gray-100 rounded-full" />
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <div className="w-14 h-4 rounded bg-gray-200" />
                <div className="w-6 h-4 rounded bg-gray-200" />
                <div className="w-20 h-4 rounded bg-gray-200" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-gray-50 py-20 md:py-40 overflow-hidden">
        {/* 테이블 영역 */}
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8 mb-20">
          <div className="text-[2rem] md:text-[2rem] leading-tight tracking-[-0.022em] font-semibold break-keep">
            리포팅 기능을 통해 소프트웨어 사업 추진에{" "}
            <br className="hidden sm:block" />
            <span className="font-bold text-brand-primary">인사이트</span>를
            더해 드립니다.
          </div>

          {/* 테이블 */}
          <div className="relative p-6 bg-white rounded-lg flex flex-col gap-4 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-gray-50 after:h-1/3 after:pointer-events-none after:z-10 min-w-[1152px] before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-t before:border-x before:border-border-primary before:pointer-events-none before:z-0">
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

        {/* 차트 그래픽 영역 */}
        <div className="max-w-[1200px] mx-auto px-6 flex gap-20">
          {/* 차트 셀렉터 */}
          <div className="flex flex-col gap-2 min-w-lg">
            {section3Charts.map((chart) => (
              <button
                key={chart.id}
                className={`flex gap-3 items-center hover:bg-white rounded overflow-hidden ${
                  selectedChart.key === chart.key ? "bg-white" : "bg-black/2"
                }`}
                onClick={() => handleChartClick(chart.key)}
              >
                <div
                  className={`w-1.5 h-14 rounded-full ${
                    selectedChart.key === chart.key
                      ? "bg-brand-primary"
                      : "bg-gray-200"
                  }`}
                />
                <span
                  className={`text-[1.0625rem] leading-[1.4] tracking-[-0.012em]
                    ${selectedChart.key === chart.key ? "font-semibold" : ""}
                  `}
                >
                  {chart.title}
                </span>
              </button>
            ))}
          </div>

          {/* 차트 프레임 */}
          <div className="bg-white rounded-xl grow h-96 overflow-hidden">
            <Image
              src={selectedChart.image}
              alt={`section3-chart-${selectedChart.key}`}
              width={608}
              height={304}
              unoptimized
              className="h-full w-full object-cover mt-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
