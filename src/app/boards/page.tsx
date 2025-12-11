"use client";

import Image from "next/image";
import Header from "../ui/Header";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { title: "서비스 공지사항", color: "blue", key: "service" },
  { title: "공지사항", color: "green", key: "notice" },
  { title: "게시글", color: "orange", key: "article" },
];

const dummyData = [
  {
    id: 13,
    title: "공지사항",
    category: categories[0],
    isNew: true,
    date: "2015년 8월 13일 오전 11:00",
    author: "강경희",
  },
  {
    id: 12,
    title: "FPMate 서비스 업데이트 안내",
    category: categories[0],
    isNew: true,
    date: "2015년 8월 12일 오후 2:30",
    author: "김민수",
  },
  {
    id: 11,
    title: "신규 기능 추가: 스마트 대가산정",
    category: categories[1],
    isNew: true,
    date: "2015년 8월 11일 오전 9:15",
    author: "이지은",
  },
  {
    id: 10,
    title: "시스템 점검 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 10일 오후 4:45",
    author: "박준호",
  },
  {
    id: 9,
    title: "오류 검증 기능 개선 사항",
    category: categories[2],
    isNew: false,
    date: "2015년 8월 9일 오전 10:20",
    author: "최수진",
  },
  {
    id: 8,
    title: "사용자 가이드 업데이트",
    category: categories[1],
    isNew: false,
    date: "2015년 8월 8일 오후 3:10",
    author: "정태영",
  },
  {
    id: 7,
    title: "데이터 내보내기 기능 추가",
    category: categories[2],
    isNew: false,
    date: "2015년 8월 7일 오전 11:30",
    author: "한소영",
  },
  {
    id: 6,
    title: "연말 연휴 서비스 운영 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 6일 오후 1:25",
    author: "윤성호",
  },
  {
    id: 5,
    title: "보안 강화 업데이트 완료",
    category: categories[1],
    isNew: false,
    date: "2015년 8월 5일 오전 8:50",
    author: "오지훈",
  },
  {
    id: 4,
    title: "API 문서 업데이트 안내",
    category: categories[2],
    isNew: false,
    date: "2015년 8월 4일 오후 5:15",
    author: "임다혜",
  },
  {
    id: 3,
    title: "성능 최적화 작업 완료",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 3일 오전 10:05",
    author: "송민규",
  },
  {
    id: 2,
    title: "새로운 템플릿 추가",
    category: categories[1],
    isNew: false,
    date: "2015년 8월 2일 오후 2:40",
    author: "배현우",
  },
  {
    id: 1,
    title: "고객 지원 시간 변경 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 1일 오전 9:00",
    author: "신동욱",
  },
  {
    id: 0,
    title: "모바일 앱 출시 예정 안내",
    category: categories[1],
    isNew: false,
    date: "2015년 7월 31일 오후 3:55",
    author: "조은서",
  },
  {
    id: -1,
    title: "데이터 백업 기능 개선",
    category: categories[2],
    isNew: false,
    date: "2015년 7월 30일 오전 11:20",
    author: "홍길동",
  },
  {
    id: -2,
    title: "사용자 피드백 반영 사항",
    category: categories[0],
    isNew: false,
    date: "2015년 7월 29일 오후 4:10",
    author: "김철수",
  },
  {
    id: -3,
    title: "월간 리포트 기능 추가",
    category: categories[1],
    isNew: false,
    date: "2015년 7월 28일 오전 10:35",
    author: "이영희",
  },
  {
    id: -4,
    title: "서비스 이용약관 개정 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 7월 27일 오후 1:50",
    author: "박민수",
  },
  {
    id: -5,
    title: "다국어 지원 확대",
    category: categories[2],
    isNew: false,
    date: "2015년 7월 26일 오전 9:25",
    author: "최지영",
  },
];

const BoardsPage = () => {
  const [myPosts, setMyPosts] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      <div className="py-12 relative z-40 space-y-6 ">
        {/* 상단 title & search + write button */}
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col">
          <div className="text-[1.5rem] sm:text-[2rem] leading-tight tracking-tighter font-semibold break-keep text-text-primary">
            {/* 공지사항 / 게시글 */}
            공지사항 및 게시글을 조회합니다.
          </div>

          <div>
            {/* toolbar */}
            <div className="flex justify-between items-center gap-2 sticky top-16 bg-white z-10 h-16 sm:h-20 border-b border-accent-primary">
              <div className="flex items-center gap-2">
                <div className="h-11 border border-border-primary rounded-md w-72 flex items-center gap-2 px-3 focus-within:border-brand-primary focus-within:outline-2 outline-brand-tint">
                  <Image
                    src={`/assets/svgs/magnifying-glass.svg`}
                    alt="search"
                    width={24}
                    height={24}
                    className="size-5 opacity-30"
                  />
                  <input
                    type="text"
                    className="w-full h-full outline-none border-none ring-0 focus:ring-0! focus-visible:ring-0! focus:outline-none! focus-visible:outline-none! placeholder:text-text-tertiary"
                    placeholder="제목, 작성자, 내용으로 검색하세요."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMyPosts(!myPosts)}
                  className={`border border-border-primary hover:border-accent-primary h-11 rounded-md flex items-center justify-center font-medium sm:pr-5 active:bg-bg-neutral transition-[border, background-color] duration-200 cursor-pointer ${
                    myPosts ? "bg-bg-neutral" : "bg-transparent"
                  }`}
                >
                  <div className="shrink-0 size-11 flex items-center justify-center">
                    <Image
                      src={
                        myPosts
                          ? `/assets/svgs/funnel-fill.svg`
                          : `/assets/svgs/funnel.svg`
                      }
                      alt="funnel"
                      width={24}
                      height={24}
                      className={`size-5 ${
                        myPosts ? "opacity-100" : "opacity-50"
                      }`}
                    />
                  </div>
                  <div className="hidden sm:flex items-center justify-center grow h-full font-medium">
                    내 글 조회
                  </div>
                </button>
              </div>
              <button
                type="button"
                className="shrink-0 flex overflow-hidden rounded-md sm:rounded-lg w-11 sm:w-32 h-11 cursor-pointer active:scale-95 transition-[scale] duration-200"
              >
                <div className="shrink-0 size-11 flex items-center justify-center bg-[#007B55]">
                  <Image
                    src={`/assets/svgs/pencil-simple-fill.svg`}
                    alt="pencil"
                    width={24}
                    height={24}
                    className="size-6 brightness-0 invert"
                  />
                </div>
                <div className="hidden sm:flex items-center justify-center grow h-full bg-brand-primary text-white font-semibold">
                  {/* 글쓰기 */}
                  신규 추가
                </div>
              </button>
            </div>

            {/* 게시글 목록 */}
            <div className="flex flex-col">
              {dummyData.map((item) => (
                <Link
                  href={`/boards/details`}
                  key={item.id}
                  className="flex flex-col md:flex-row py-4 md:py-0 justify-between border-b border-border-primary md:h-16 md:hover:bg-bg-neutral cursor-pointer group"
                >
                  {/* left side */}
                  <div className="flex items-center">
                    {/* 조회수 */}
                    <div className="hidden md:flex items-center justify-center text-text-tertiary text-sm w-14">
                      {item.id}
                    </div>

                    {/* 카테고리, 날짜, 작성자 */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm grow">
                      <div className="flex items-center gap-2">
                        {/* category badge */}
                        <div
                          className={`text-[0.8125rem] font-medium leading-tight h-5.5 tracking-tighter px-1 pt-px border rounded-sm flex items-center w-fit ${
                            item.category.color === "blue"
                              ? "bg-blue-500/10 border-blue-500/20 text-blue-600"
                              : item.category.color === "green"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-green-700"
                              : "bg-orange-500/10 border-orange-500/30 text-orange-700"
                          }`}
                        >
                          {item.category.title}
                        </div>

                        {/* separator */}
                        <div className="h-3 w-px bg-border-primary md:hidden" />

                        {/* date */}
                        <span className="text-sm text-text-secondary leading-tight md:hidden">
                          {item.date}
                        </span>

                        {/* separator */}
                        <div className="h-3 w-px bg-border-primary md:hidden" />

                        {/* author */}
                        <span className="text-[0.8125rem] font-medium text-text-tertiary leading-tight md:hidden">
                          {item.author}
                        </span>
                      </div>

                      {/* title & new badge */}
                      <div className="flex items-center gap-2">
                        {/* title */}
                        <span className="text-[1.0625rem] text-text-primary font-medium md:group-hover:underline md:group-hover:underline-offset-4">
                          {item.category.title}
                        </span>

                        {/* new badge */}
                        {item.isNew && (
                          <div className="flex items-center justify-center h-4.5 w-8.5 text-[11px] bg-red-500 text-white tracking-tight font-extrabold rounded-lg pr-0.5">
                            NEW
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* right side */}
                  <div className="hidden md:flex items-center gap-2">
                    {/* author */}
                    <div className="flex items-center gap-2 text-[0.8125rem] tracking-tight py-2">
                      <div className="size-8 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
                        {item.author.charAt(0)}
                      </div>
                      <span className="text-text-secondary leading-tight text-start break-keep">
                        <span className="text-sm font-medium text-text-primary">
                          {item.author}
                        </span>
                      </span>
                    </div>

                    {/* date */}
                    <span className="w-56 px-3 text-end text-sm text-text-tertiary font-medium">
                      {item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
