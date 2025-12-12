"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { useScrollTo } from "../lib/use-scroll-to";

interface InsightCardProps {
  chips: {
    id: number;
    label: string;
    color: string;
  }[];
  title: string;
  fp: number;
  amount: number;
  date: string;
  cardIndex: number;
}

// 툴팁 컴포넌트 분리 (DRY 원칙)
const Tooltip = ({
  label,
  isVisible,
  className = "",
}: {
  label: string;
  isVisible: boolean;
  className?: string;
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`absolute -top-10.5 left-1/2 translate-x-[-50%] translate-y-1 flex items-center justify-center h-7 pb-0.5 w-22 bg-black rounded text-white font-semibold text-sm ${className}`}
    >
      {label}
      <div
        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "0.375rem solid transparent",
          borderRight: "0.375rem solid transparent",
          borderTop: "0.375rem solid black",
        }}
      />
    </div>
  );
};

const GradientRingButton = ({
  onClick,
  isFirstCard = false,
  children,
  order = 1,
}: {
  onClick: () => void;
  isFirstCard: boolean;
  children: React.ReactNode;
  order?: number;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative group size-9 rounded-full flex items-center justify-center bg-white z-10 ${
        isFirstCard
          ? "cursor-pointer active:scale-90"
          : "xl:cursor-pointer xl:active:scale-90"
      }`}
    >
      {/* 회전하는 그라데이션 ring */}
      <span
        className={`absolute inset-0 rounded-full -z-10 animate-spin ${
          isFirstCard ? "" : "hidden xl:block"
        }`}
        style={{
          padding: "1px",
          background:
            "conic-gradient(from 0deg, #10b981, #119799, white, #066847)",
          animationDuration: `${order * 0.5 * 3}s`,
        }}
      >
        <span className="flex size-full rounded-full bg-white" />
      </span>
      {children}
    </button>
  );
};

const InsightCard = ({
  chips,
  title,
  fp,
  amount,
  date,
  cardIndex,
}: InsightCardProps) => {
  const { scrollTo: scrollToTable } = useScrollTo(64);
  const { scrollTo: scrollToChart } = useScrollTo(316);

  const isFirst = cardIndex === 1;

  // 모바일에서 isFirst일 때 툴팁 번갈아 표시 (0: 최종 리포트, 1: 분석 그래프)
  const [activeTooltip, setActiveTooltip] = useState<0 | 1>(0);

  useEffect(() => {
    if (!isFirst) return;

    const interval = setInterval(() => {
      setActiveTooltip((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [isFirst]);

  return (
    <Card
      variant="bordered"
      hoverable
      padding="sm"
      className={`flex flex-col gap-4 ${
        isFirst
          ? "translate-y-[-4px] shadow-card xl:shadow-none outline! outline-border-secondary xl:outline-0! xl:hover:outline-border-secondary! border-action-active!"
          : "opacity-50 sm:opacity-80 md:opacity-100 pointer-events-none xl:pointer-events-auto"
      }`}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-1">
          {chips.map((chip) => (
            <Badge
              key={chip.id}
              color={chip.color}
              className={`select-none font-medium ${
                isFirst
                  ? "cursor-pointer active:scale-90"
                  : "xl:cursor-pointer xl:active:scale-90"
              }`}
              variant={
                chip.color === "red"
                  ? "error"
                  : chip.color === "blue"
                  ? "info"
                  : chip.color === "green"
                  ? "success"
                  : "default"
              }
              size="lg"
            >
              {chip.label}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <GradientRingButton
            onClick={() => scrollToTable("section3-table")}
            isFirstCard={isFirst}
          >
            {/* isFirst: 모바일에서 번갈아 표시, 데스크톱에서 hover 시 표시 */}
            {isFirst && (
              <>
                {/* 모바일: 3초 간격 번갈아 표시 */}
                <Tooltip
                  label="최종 리포트"
                  isVisible={activeTooltip === 0}
                  className="flex xl:hidden animate-bounce"
                />
                {/* 데스크톱: hover 시 표시 */}
                <Tooltip
                  label="최종 리포트"
                  isVisible
                  className="hidden xl:group-hover:flex"
                />
              </>
            )}
            {/* cardIndex === 2: 데스크톱에서만 bounce 애니메이션 */}
            {cardIndex === 2 && (
              <Tooltip
                label="최종 리포트"
                isVisible
                className="hidden xl:flex animate-bounce"
              />
            )}
            {/* cardIndex === 3: hover 시에만 표시 (데스크톱 제외) */}
            {cardIndex === 3 && (
              <Tooltip
                label="최종 리포트"
                isVisible
                className="hidden group-hover:flex xl:group-hover:hidden"
              />
            )}
            <Image
              src="/assets/svgs/note.svg"
              alt="note-icon"
              width={28}
              height={28}
              className="size-5.5"
            />
          </GradientRingButton>
          <GradientRingButton
            onClick={() => scrollToChart("section3-chart")}
            isFirstCard={isFirst}
            order={2}
          >
            {/* isFirst: 모바일에서 번갈아 표시, 데스크톱에서 hover 시 표시 */}
            {isFirst && (
              <>
                {/* 모바일: 3초 간격 번갈아 표시 */}
                <Tooltip
                  label="분석 그래프"
                  isVisible={activeTooltip === 1}
                  className="flex xl:hidden animate-bounce"
                />
                {/* 데스크톱: hover 시 표시 */}
                <Tooltip
                  label="분석 그래프"
                  isVisible
                  className="hidden xl:group-hover:flex"
                />
              </>
            )}
            {/* cardIndex === 2: hover 시에만 표시 (데스크톱 제외) */}
            {cardIndex === 2 && (
              <Tooltip
                label="분석 그래프"
                isVisible
                className="hidden group-hover:flex xl:group-hover:hidden"
              />
            )}
            {/* cardIndex === 3: 데스크톱에서만 bounce 애니메이션 */}
            {cardIndex === 3 && (
              <Tooltip
                label="분석 그래프"
                isVisible
                className="hidden xl:flex animate-bounce delay-200"
              />
            )}
            <Image
              src="/assets/svgs/chart-bar.svg"
              alt="chart-icon"
              width={28}
              height={28}
              className="size-5.5"
            />
          </GradientRingButton>
        </div>
      </div>

      {/* 프로젝트 정보 */}
      <div className="flex flex-col gap-0.25">
        <span className="text-[1.0625rem] tracking-tight font-semibold">
          {title}
        </span>
      </div>

      {/* 내역 */}
      <div className="flex flex-col">
        <div className="flex justify-between gap-2">
          <span className="text-[0.875rem] leading-normal tracking-[-0.013em] font-medium">
            총 기능 점수
          </span>
          <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
            <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-bold mr-2">
              {fp}
            </span>
            FP
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-[0.875rem] leading-normal tracking-[-0.013em] font-medium">
            소프트웨어 개발비
          </span>
          <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
            <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-bold mr-2">
              {amount.toLocaleString()}
            </span>
            원
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center gap-2">
        <span className="text-[0.875rem] tracking-[-0.013em]">
          {`선정완료일: ${date} 담당자:`}
        </span>{" "}
        <div className="size-8 bg-gray-300 rounded-full relative">
          <div className="absolute size-3 top-3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full" />
          <div className="absolute size-6 top-5 left-1/2 -translate-x-1/2 bg-white/80 rounded-full" />
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;
