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
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 2,
    title: "신규 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 3,
    title: "새 글 테스트",
    category: "공지사항",
    date: "2025.12.10",
    author: "김광민",
  },
  {
    id: 4,
    title: "라이센스 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 5,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 6,
    title: "작업 권한 테스트",
    category: "공지사항",
    date: "2025.12.10",
    author: "백은비",
  },
];

const ThumbnailPlus = ({ title }: { title: string }) => {
  return (
    <div className="size-14 sm:size-16 lg:size-20 xl:size-28 flex items-center justify-center bg-gradient-to-t from-emerald-100 to-emerald-50 relative z-10 overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
      {/* Object Container - Abstract Shape */}
      <div className="absolute size-12 sm:size-14 lg:size-16 xl:size-24 -top-3 -left-3 bg-gradient-to-br from-emerald-400/20 to-emerald-300/20 rounded-full blur-xl" />
      <div className="absolute size-10 sm:size-12 lg:size-14 xl:size-20 bottom-0 right-0 bg-gradient-to-tl from-emerald-400/10 to-transparent rounded-full blur-lg" />

      {/* Icon Container */}
      <div className="size-10 sm:size-12 xl:size-14 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-white/50 relative z-30 group-hover:shadow-emerald-200/50 group-hover:shadow-lg transition-all duration-300">
        <Image
          src={`/assets/svgs/plus-bold.svg`}
          alt={title}
          width={24}
          height={24}
          className="size-5 xl:size-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 invert"
        />
      </div>
    </div>
  );
};

const ThumbnailClock = ({ title }: { title: string }) => {
  return (
    <div className="size-14 sm:size-16 lg:size-20 xl:size-28 flex items-center justify-center bg-gradient-to-t from-indigo-100 to-indigo-50 relative z-10 overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
      <div className="absolute size-16 sm:size-18 lg:size-20 xl:size-28 -bottom-5 -left-5 bg-indigo-400/20 rounded-full blur-xl" />

      <div className="size-10 sm:size-12 xl:size-14 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-white/50 relative z-30 group-hover:shadow-indigo-200/50 group-hover:shadow-lg transition-all duration-300">
        <Image
          src={`/assets/svgs/clock-bold.svg`}
          alt={title}
          width={24}
          height={24}
          className="size-5 xl:size-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 invert"
        />
      </div>
    </div>
  );
};

const ThumbnailList = ({ title }: { title: string }) => {
  return (
    <div className="size-14 sm:size-16 lg:size-20 xl:size-28 flex items-center justify-center bg-gradient-to-t from-orange-100 to-orange-50 relative z-10 overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
      <div className="absolute size-12 sm:size-14 lg:size-16 xl:size-24 -top-2 -right-2 bg-orange-400/20 rounded-full blur-xl" />

      <div className="size-10 sm:size-12 xl:size-14 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-white/50 relative z-30 group-hover:shadow-orange-200/50 group-hover:shadow-lg transition-all duration-300">
        <Image
          src={`/assets/svgs/list-magnifying-glass-bold.svg`}
          alt={title}
          width={24}
          height={24}
          className="size-5 xl:size-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 invert"
        />
      </div>
    </div>
  );
};

const workspaceNav = [
  {
    id: 1,
    title: "신규 사업 등록",
    description: "새로운 프로젝트를 시작하세요",
    thumbnail: <ThumbnailPlus title="신규 사업 등록" />,
  },
  {
    id: 2,
    title: "마지막 편집 불러오기",
    description: "작업하던 내용을 계속하세요",
    thumbnail: <ThumbnailClock title="마지막 편집 불러오기" />,
  },
  {
    id: 3,
    title: "산정 내역 전체 조회",
    description: "모든 프로젝트 이력을 확인하세요",
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
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />

      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 sm:gap-10">
        {/* Top Navigation Section */}
        <section className="flex flex-col gap-5 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            무엇을 하시겠습니까?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {workspaceNav.map((nav) => (
              <button
                type="button"
                key={nav.id}
                className="group relative flex items-center bg-white rounded-2xl p-4 lg:p-5 border border-gray-200 hover:border-transparent hover:ring-2 hover:ring-emerald-500/20 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-left"
              >
                {nav.thumbnail}
                <div className="ml-5 flex flex-col justify-center h-full">
                  <span className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                    {nav.title}
                  </span>
                  <span className="text-sm text-gray-500 mt-0.5 font-medium">
                    {nav.description}
                  </span>
                </div>

                {/* Hover Arrow Indicator */}
                <div className="absolute right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <Image
                    src="/assets/svgs/arrow-right.svg"
                    alt="Go"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-gray-400"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Main List Column */}
          <section className="flex flex-col grow w-full">
            {/* Tabs Header */}
            <div className="bg-white/80 backdrop-blur-sm sticky top-0 sm:top-16 z-20 border-b border-gray-200">
              <div className="flex items-center justify-between h-16">
                {/* Desktop Tabs */}
                <div className="hidden sm:flex items-center gap-8 h-full">
                  <button
                    type="button"
                    className="relative h-full flex items-center gap-2.5 px-1 cursor-pointer group"
                  >
                    <span className="text-lg font-bold text-gray-900">
                      3개월 내 갱신목록
                    </span>
                    <span className="flex items-center justify-center h-5 px-1.5 min-w-[20px] rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm shadow-rose-200">
                      12
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full" />
                  </button>

                  <button
                    type="button"
                    className="relative h-full flex items-center gap-2.5 px-1 cursor-pointer group text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <span className="text-lg font-medium">
                      임박(5일내)/지연목록
                    </span>
                    <span className="flex items-center justify-center h-5 px-1.5 min-w-[20px] rounded-full bg-gray-200 text-gray-600 text-xs font-bold group-hover:bg-gray-300 transition-colors">
                      5
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-gray-300 rounded-t-full transition-colors" />
                  </button>
                </div>

                {/* Mobile Dropdown */}
                <div className="relative w-full sm:hidden py-3">
                  <select
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleChange(e.target.value)}
                    value={selectedValue}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="w-full flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">
                        {selectedOption?.label}
                      </span>
                      <span className="bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        12
                      </span>
                    </div>
                    <Image
                      src="/assets/svgs/caret-down.svg"
                      alt="펼치기"
                      width={20}
                      height={20}
                      className="w-5 h-5 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-medium text-gray-500">
                    김광민님이 담당자(수정권한)인 건만 조회합니다.
                  </span>
                </div>
                <button
                  type="button"
                  className="relative h-6 w-11 bg-emerald-500 rounded-full transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
                >
                  <span className="sr-only">내 담당 건만 보기</span>
                  <span className="translate-x-6 inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out mt-0.5 ml-0.5" />
                </button>
              </div>
            </div>

            {/* List Items */}
            <div className="flex flex-col gap-3 mt-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={`group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 bg-white rounded-2xl border transition-all duration-200 ${
                    index === 0
                      ? "border-sky-200 hover:border-sky-400 shadow-sm shadow-sky-100 hover:shadow-md hover:shadow-sky-200/50"
                      : "border-gray-200 hover:border-emerald-400 hover:shadow-md hover:shadow-gray-200/50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-lg font-bold text-gray-900 truncate pr-4">
                        유망한 사업 ABC 프로젝트
                      </h4>
                      {/* Mobile Action Text */}
                      <span
                        className={`sm:hidden text-sm font-bold whitespace-nowrap ${
                          index === 0 ? "text-sky-600" : "text-emerald-600"
                        }`}
                      >
                        {index === 0 ? "이어서 진행" : "내역 보기"} &rarr;
                      </span>
                    </div>

                    <p className="text-sm font-medium text-gray-500 mb-4 truncate font-mono">
                      ABC_futsal_tournament_20251114_V01
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-600">
                      {/* Last Activity */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 flex items-center justify-center ring-1 ring-gray-200">
                          김
                        </div>
                        <span className="truncate">
                          <span className="font-semibold text-gray-900">
                            김광민
                          </span>
                          <span className="text-gray-400 mx-1">|</span>
                          2025.11.12 15:32 수정
                        </span>
                      </div>

                      {/* Members */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Members
                        </span>
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 flex items-center justify-center ring-2 ring-white shadow-xs"
                            >
                              김
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Action Button */}
                  <button
                    className={`hidden sm:flex items-center justify-center h-10 px-6 rounded-full text-sm font-bold text-white transition-all duration-200 shadow-sm whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${
                      index === 0
                        ? "bg-sky-500 hover:bg-sky-600 shadow-sky-200"
                        : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200"
                    }`}
                  >
                    {index === 0 ? "이어서 진행" : "내역 보기"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar Column */}
          <aside className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-2">
            <div className="sticky top-16">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between h-16 mb-2 border-b border-gray-200 bg-white/50 backdrop-blur-sm z-10">
                <h3 className="text-xl font-bold text-gray-900">공지사항</h3>
                <Link
                  href="/boards"
                  className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100"
                >
                  전체보기
                  <Image
                    src={`/assets/svgs/caret-right.svg`}
                    alt="arrow-right"
                    width={16}
                    height={16}
                    className="w-4 h-4 opacity-50"
                  />
                </Link>
              </div>

              {/* Notices List */}
              <div className="flex flex-col gap-1">
                {articles.map((article) => (
                  <Link
                    href={`/boards/details`}
                    key={article.id}
                    className="group block p-4 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2 text-xs font-medium">
                      <span
                        className={`px-2 py-1 rounded-md ${
                          article.category.includes("서비스")
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {article.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{article.date}</span>
                    </div>

                    <h4 className="text-[15px] font-semibold text-gray-800 group-hover:text-indigo-600 leading-snug transition-colors line-clamp-1 mb-1.5">
                      {article.title}
                    </h4>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[9px] text-gray-500 ring-1 ring-gray-200">
                        {article.author[0]}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {article.author}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default WorkspacePage;
