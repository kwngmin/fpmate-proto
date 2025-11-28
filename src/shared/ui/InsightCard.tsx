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
  description: string;
  fp: number;
  amount: number;
  date: string;
  managerImage: string;
  isFirst?: boolean;
}
const InsightCard = ({
  chips,
  title,
  description,
  fp,
  amount,
  date,
  managerImage,
  isFirst = false,
}: InsightCardProps) => {
  const { scrollTo: scrollToTable } = useScrollTo(64);
  const { scrollTo: scrollToChart } = useScrollTo(320);

  return (
    <Card
      variant="bordered"
      hoverable
      padding="sm"
      className={`flex flex-col gap-3 hover:translate-y-[-4px] ${
        isFirst
          ? "translate-y-[-4px] shadow-card xl:translate-y-0 xl:shadow-none"
          : "opacity-80 md:opacity-100 pointer-events-none xl:pointer-events-auto"
      }`}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-1">
          {chips.map((chip) => (
            <Badge
              key={chip.id}
              color={chip.color}
              className="active:scale-90 select-none"
            >
              {chip.label}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => scrollToTable("section3-table")}
            className="size-7 rounded flex items-center justify-center"
          >
            <Image
              src="/assets/svgs/note.svg"
              alt="noter-icon"
              width={28}
              height={28}
              className="size-6"
            />
          </button>
          <button
            type="button"
            onClick={() => scrollToChart("section3-chart")}
            className="size-7 rounded flex items-center justify-center"
          >
            <Image
              src="/assets/svgs/chart-bar.svg"
              alt="noter-icon"
              width={28}
              height={28}
              className="size-6"
            />
          </button>
        </div>
      </div>

      {/* 프로젝트 정보 */}
      <div className="flex flex-col">
        <span className="text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold">
          {title}
        </span>
        <span className="text-[0.9375rem] leading-[1.6] tracking-[-0.011em]">
          {description} FP
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
        <Image
          src={managerImage}
          alt="avatar-placeholder"
          width={28}
          height={28}
          className="size-7 bg-gray-200 rounded-full"
        />
      </div>
    </Card>
  );
};

export default InsightCard;
