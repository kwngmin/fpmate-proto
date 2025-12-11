"use client";

import Image from "next/image";
import Header from "../ui/Header";
import Link from "next/link";
import { useState } from "react";

const articles = [
  {
    id: 1,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 2,
    title: "신규 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 3,
    title: "새 글 테스트",
    category: "공지사항",
    color: "green",
    date: "2025.12.10",
    author: "김광민",
  },
  {
    id: 4,
    title: "라이센스 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 5,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 6,
    title: "작업 권한 테스트",
    category: "공지사항",
    color: "green",
    date: "2025.12.10",
    author: "백은비",
  },
];

const ThumbnailPlus = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center xl:w-full xl:pt-8 overflow-hidden">
      <div className="size-14 sm:size-16 lg:size-20 flex items-center justify-center bg-linear-to-t from-emerald-200 to-emerald-100 relative z-10 overflow-hidden xl:rounded-xl shadow-xl shadow-white/20">
        {/* object container */}
        <div className="absolute size-12 sm:size-14 lg:size-16 xl:size-18 -top-2 -left-2 bg-brand-primary to-white/30 rounded-lg shadow-md" />

        {/* icon container */}
        <div className="size-10 sm:size-12 xl:size-20 flex items-center justify-center bg-linear-to-br from-brand-primary/50 to-white/50 backdrop-blur-xs rounded-lg shadow-md shadow-action-focus relative z-30 border border-white/20 overflow-hidden">
          <Image
            src={`/assets/svgs/plus-bold.svg`}
            alt={title}
            width={24}
            height={24}
            className="size-6 xl:size-8 brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
};

const ThumbnailClock = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center xl:w-full xl:pt-8 overflow-hidden">
      <div className="size-14 sm:size-16 lg:size-20 xl:size-20 flex items-center justify-center bg-linear-to-t from-indigo-200 to-indigo-100 relative z-10 overflow-hidden xl:rounded-xl shadow-xl shadow-white/20">
        {/* object container */}
        <div className="absolute size-16 sm:size-18 lg:size-20 -bottom-5 -left-5 bg-[#748CDC] to-white/30 rounded-full shadow-md" />

        {/* icon container */}
        <div className="size-10 sm:size-12 xl:size-20 flex items-center justify-center bg-linear-to-tr from-[#748CDC]/50 to-white/50 backdrop-blur-xs rounded-lg shadow-md shadow-action-focus relative z-30 border border-white/20 overflow-hidden">
          <Image
            src={`/assets/svgs/clock-bold.svg`}
            alt={title}
            width={24}
            height={24}
            className="size-6 xl:size-8 brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
};

const ThumbnailList = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center xl:w-full xl:pt-8 overflow-hidden">
      <div className="size-14 sm:size-16 lg:size-20 flex items-center justify-center bg-linear-to-t from-red-200 to-red-100 relative z-10 overflow-hidden xl:rounded-xl shadow-xl shadow-white/20">
        {/* object container */}
        <div className="absolute size-12 sm:size-14 lg:size-16 xl:size-18 -top-2 -right-2 bg-[#F98D78] to-white/30 rounded-lg shadow-md" />

        {/* icon container */}
        <div className="size-10 sm:size-12 xl:size-20 flex items-center justify-center bg-linear-to-bl from-[#F98D78]/50 to-white/50 backdrop-blur-xs rounded-lg shadow-md shadow-action-focus relative z-30 border border-white/20 overflow-hidden">
          <Image
            src={`/assets/svgs/list-magnifying-glass-bold.svg`}
            alt={title}
            width={24}
            height={24}
            className="size-6 xl:size-8 brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
};

const workspaceNav = [
  {
    id: 1,
    title: "신규 사업 등록",
    thumbnail: <ThumbnailPlus title="신규 사업 등록" />,
  },
  {
    id: 2,
    title: "마지막 편집 불러오기",
    thumbnail: <ThumbnailClock title="마지막 편집 불러오기" />,
  },
  {
    id: 3,
    title: "산정 내역 전체 조회",
    thumbnail: <ThumbnailList title="산정 내역 전체 조회" />,
  },
];

const options = [
  { value: "default", label: "3개월 내 갱신목록" },
  { value: "expiring", label: "임박(5일내)/지연목록" },
];

const WorkspacePage = () => {
  const [selectedValue, setSelectedValue] = useState("default");
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setSelectedOption(
      options.find((option) => option.value === value) ?? options[0]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      <div className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-6">
        {/* 상단 navigation */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="text-[1.5rem] sm:text-[2rem] leading-tight tracking-tighter font-semibold break-keep text-text-primary">
            무엇을 하시겠습니까?
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-1 lg:gap-2">
            {workspaceNav.map((nav) => (
              <button
                type="button"
                key={nav.id}
                className="h-14 sm:h-16 lg:h-20 xl:h-48 flex xl:flex-col items-center border border-border-secondary hover:border-accent-primary rounded-md lg:rounded-xl overflow-hidden shadow-sm hover:shadow-black/20 cursor-pointer active:scale-99 transition-[shadow, scale] duration-100 bg-white"
              >
                {/* thumbnail */}
                {nav.thumbnail}

                {/* label */}
                <div className="text-[1.0625rem] leading-normal tracking-tight break-keep text-text-primary font-medium px-6 h-full xl:h-auto grow flex items-center">
                  {nav.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* content container*/}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* tabs content */}
          <div className="flex flex-col grow">
            {/* header */}
            <div className="bg-white flex items-center justify-between h-16 border-b border-accent-primary z-10 sticky top-16">
              {/* tabs */}
              <div className="hidden sm:flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 h-16 cursor-pointer"
                >
                  <span className="text-[1.3125rem] leading-[1.33] tracking-[-0.012em] font-medium">
                    3개월 내 갱신목록
                  </span>
                  <div className="h-6 px-1.5 pb-0.5 min-w-6 rounded-full bg-red-500 text-white flex items-center justify-center text-base leading-normal font-semibold">
                    12
                  </div>
                </button>
                <div className="h-8 w-px bg-border-primary" />
                <button
                  type="button"
                  className="flex items-center gap-2 h-16 cursor-pointer opacity-50"
                >
                  <span className="text-[1.3125rem] leading-[1.33] tracking-[-0.012em] font-medium">
                    임박(5일내)/지연목록{" "}
                  </span>
                  <div className="h-6 px-1.5 pb-0.5 min-w-6 rounded-full bg-zinc-500 text-white flex items-center justify-center text-base leading-none font-semibold">
                    5
                  </div>
                </button>
              </div>

              {/* combo box - mobile */}
              <div className="relative w-full sm:hidden">
                {/* 실제 동작하는 native select (투명하지만 클릭 가능) */}
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleChange(e.target.value)}
                  value={selectedValue}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* 커스텀 UI (시각적 표시용, 클릭은 위의 select가 받음) */}
                <div className="w-full flex justify-between items-center gap-4 h-16 pointer-events-none">
                  <div className="flex items-center gap-2 grow">
                    <span className="text-[1.3125rem] leading-[1.33] tracking-[-0.012em] font-medium">
                      {selectedOption?.label ?? "3개월 내 갱신목록"}
                    </span>
                    <div className="h-6 px-1.5 pb-0.5 min-w-6 rounded-full bg-red-500 text-white flex items-center justify-center text-base leading-none font-semibold">
                      12
                    </div>
                  </div>
                  <div className="size-10 flex items-center justify-center border border-border-primary rounded-full">
                    <Image
                      src="/assets/svgs/caret-down.svg"
                      alt="펼치기"
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  </div>
                </div>
              </div>

              {/* combo box hidden */}
              <div className="relative">
                <select className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* filter */}
            <div className="h-12 flex items-center justify-between px-3 bg-bg-tertiary">
              <div className="flex items-center gap-1">
                <span className="text-[0.8125rem] sm:text-sm leading-tight text-text-secondary font-medium">
                  김광민님이 담당자(수정권한)인 건만 조회합니다.
                </span>
              </div>
              <div className="border border-brand-primary p-0.5 pl-3 bg-[#00AB55] rounded-full">
                <div className="size-4 rounded-full bg-white" />
              </div>
            </div>

            {/* list content */}
            {Array.from({ length: 10 }).map((_, index) => (
              <button
                type="button"
                key={index}
                className={`flex gap-6 p-6 border-b hover:outline border-border-primary cursor-pointer group mt-2 hover:rounded-xl hover:shadow-lg shadow-black/5 active:scale-99 transition-[scale] duration-100 ${
                  index === 0 ? "outline-sky-400" : "outline-lime-500"
                }`}
              >
                <div className="grow">
                  <h4 className="text-start text-[1.0625rem] leading-[1.4] tracking-[-0.012em] font-semibold text-text-primary group-hover:underline  group-hover:underline-offset-4">
                    유망한 사업 ABC
                  </h4>
                  <p className="text-start font-medium text-text-secondary">
                    ABC futsal tournament_20251114_V01
                  </p>
                  <div className="flex items-center gap-2 text-[0.8125rem] tracking-tight py-2">
                    <div className="size-8 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
                      김
                    </div>
                    <span className="text-text-secondary leading-tight text-start break-keep">
                      <span className="font-medium text-text-primary">
                        김광민
                      </span>
                      님이 2025년 11월 12일 PM 03:32, 비용 산정 절차를
                      진행했습니다.
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2 text-[0.8125rem] tracking-tight">
                    <div className="flex items-center gap-2">
                      <span className="text-text-secondary">사업 담당자</span>
                      <div className="flex items-center">
                        <div className="size-8 rounded-full bg-zinc-200 flex items-center justify-center outline-2 outline-white">
                          김
                        </div>{" "}
                        <div className="-translate-x-2 size-8 rounded-full bg-zinc-200 flex items-center justify-center outline-2 outline-white">
                          김
                        </div>{" "}
                        <div className="-translate-x-4 size-8 rounded-full bg-zinc-200 flex items-center justify-center outline-2 outline-white">
                          김
                        </div>{" "}
                        <div className="-translate-x-6 size-8 rounded-full bg-zinc-200 flex items-center justify-center outline-2 outline-white">
                          김
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:hidden items-center gap-1 text-sm h-8 font-medium text-[#007B55] shrink-0">
                      {index === 0 ? "이어서 진행" : "내역 보기"}
                      <Image
                        src={`/assets/svgs/arrow-right.svg`}
                        alt="arrow-right"
                        width={24}
                        height={24}
                        className="size-4"
                      />
                    </div>
                  </div>
                </div>

                {/* accent primary */}
                <div
                  className={`hidden sm:flex items-center text-sm rounded-full px-5 h-9 my-auto font-medium text-text-primary bg-white border border-border-primary group-hover:border-transparent group-hover:font-semibold group-hover:text-white transition-[background-color,text-color] duration-150 shrink-0 ${
                    index === 0
                      ? "group-hover:bg-sky-500"
                      : "group-hover:bg-brand-primary"
                  }`}
                >
                  {index === 0 ? "이어서 진행" : "내역 보기"}
                </div>

                {/* black primary */}
                {/* <div className="hidden sm:flex items-center text-sm rounded-full px-5 h-9 my-auto bg-zinc-600 font-semibold group-hover:bg-brand-primary text-white group-active:bg-zinc-900 group-active:scale-95 transition-[background-color,scale, text-color] duration-200 shrink-0">
                  {index === 0 ? "이어서 진행" : "내역 보기"}
                </div> */}

                {/* black secondary */}
                {/* <div className="hidden sm:flex items-center text-sm rounded-full px-5 h-9 my-auto group-hover:font-medium group-hover:text-[#007B55] group-hover:bg-white border group-hover:border-brand-primary border-transparent font-semibold bg-zinc-600 text-white group-active:bg-zinc-900 group-active:scale-95 transition-[background-color,scale, text-color] duration-200 shrink-0">
                  {index === 0 ? "이어서 진행" : "내역 보기"}
                </div> */}

                {/* hover black */}
                {/* <div className="hidden sm:flex items-center text-sm rounded-full px-5 h-9 my-auto font-medium text-[#007B55] bg-white border border-brand-primary group-hover:border-transparent group-hover:font-semibold group-hover:bg-zinc-700 group-hover:text-white group-active:bg-zinc-900 group-active:scale-95 transition-[background-color,scale, text-color] duration-200 shrink-0">
                  {index === 0 ? "이어서 진행" : "내역 보기"}
                </div> */}
              </button>
            ))}
          </div>

          {/* boards */}
          <div className="flex flex-col lg:w-[440px] sticky top-16 h-fit">
            {/* boards header */}
            <div className="bg-white flex items-center justify-between h-16 border-b border-accent-primary z-10 sticky top-16 mb-2">
              <span className="text-[1.3125rem] leading-[1.33] tracking-[-0.012em] font-medium">
                공지사항 / 게시글
              </span>

              <Link
                href="/boards"
                className="hover:bg-action-hover active:bg-action-selected flex items-center p-2 pl-3.5 rounded cursor-pointer"
              >
                <span className="text-[0.8125rem] font-medium">
                  자세히 보기
                </span>
                <Image
                  src={`/assets/svgs/caret-right.svg`}
                  alt="arrow-right"
                  width={24}
                  height={24}
                  className="size-4"
                />
              </Link>
            </div>

            {articles.map((article) => (
              <Link
                href={`/boards/details`}
                type="button"
                key={article.id}
                className="py-4 border-b border-action-focus space-y-0.5 group cursor-pointer flex flex-col"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-[0.8125rem] font-medium leading-tight tracking-tighter ${
                        article.color === "blue"
                          ? "text-blue-500"
                          : article.color === "green"
                          ? "text-green-600"
                          : "bg-red-500 text-red-500"
                      }`}
                    >
                      {article.category}
                    </div>
                    <div className="h-3 w-px bg-border-primary" />
                    <span className="text-sm text-text-secondary leading-tight">
                      {article.date}
                    </span>
                    <div className="h-3 w-px bg-border-primary" />
                    <span className="text-[0.8125rem] font-medium text-text-tertiary leading-tight">
                      {article.author}
                    </span>
                  </div>
                </div>
                <div className="text-[1.0625rem] sm:text-[0.9375rem] leading-snug tracking-tight font-medium text-text-primary sm:group-hover:underline group-hover:underline-offset-4 text-start">
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
