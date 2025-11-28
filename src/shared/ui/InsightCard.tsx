"use client";

import Image from "next/image";
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
  // description: string;
  fp: number;
  amount: number;
  date: string;
  managerImage: string;
  isFirst?: boolean;
}

const GradientRingButton = ({
  onClick,
  isFirstCard = false,
  children,
}: {
  onClick: () => void;
  isFirstCard: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative size-9 rounded-full flex items-center justify-center bg-white z-10 ${
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
          animationDuration: "3s",
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
  // description,
  fp,
  amount,
  date,
  managerImage,
  isFirst = false,
}: InsightCardProps) => {
  const { scrollTo: scrollToTable } = useScrollTo(64);
  const { scrollTo: scrollToChart } = useScrollTo(316);

  return (
    <Card
      variant="bordered"
      hoverable
      padding="sm"
      className={`flex flex-col gap-4 hover:translate-y-[-4px] ${
        isFirst
          ? "translate-y-[-4px] shadow-card xl:translate-y-0 xl:shadow-none"
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
                  ? "cursor-pointer active:scale-85"
                  : "xl:cursor-pointer xl:active:scale-85"
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
              // variant="info"
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
            <Image
              src="/assets/svgs/note.svg"
              alt="noter-icon"
              width={28}
              height={28}
              className="size-5.5"
            />
          </GradientRingButton>
          <GradientRingButton
            onClick={() => scrollToChart("section3-chart")}
            isFirstCard={isFirst}
          >
            <Image
              src="/assets/svgs/chart-bar.svg"
              alt="noter-icon"
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
        {/* <span className="text-[0.9375rem] tracking-tight text-text-tertiary">
          {description} FP
        </span> */}
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
        <Image
          src={managerImage}
          alt="avatar-placeholder"
          width={36}
          height={36}
          className="size-8 bg-gray-200 rounded-full"
        />
      </div>
    </Card>
  );
};

export default InsightCard;
