import Header from "@/app/ui/Header";
import Image from "next/image";
import Link from "next/link";

const BoardsDetailsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      <div className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-4 sm:gap-6">
          {/* category badge */}
          <div
            className={`text-[0.8125rem] font-medium leading-tight h-5.5 tracking-tighter text-text-secondary px-1 w-fit bg-bg-neutral border border-border-primary rounded-sm flex items-center`}
          >
            서비스 공지사항
          </div>

          {/* title & info section */}
          <div className="flex flex-col gap-2">
            {/* 제목 */}
            <div className="text-[1.3125rem] sm:text-[1.5rem] leading-tight tracking-tighter font-semibold break-keep text-text-primary">
              첨부파일 테스트
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <div className="flex items-center gap-2 sm:order-2 text-[0.8125rem] sm:text-sm leading-tight">
                {/* separator */}
                <div className="h-3 w-px bg-border-primary hidden sm:block" />

                {/* date label */}
                <span className="text-text-tertiary">등록일시</span>

                {/* date data */}
                <span className="text-text-secondary font-medium">
                  2015년 8월 13일 오전 11:00
                </span>

                {/* separator */}
                <div className="h-3 w-px bg-border-primary" />

                {/* view count label */}
                <span className="text-text-tertiary">조회수</span>

                {/* view count data */}
                <span className="text-text-secondary font-medium">20</span>
              </div>

              {/* author */}
              <div className="flex items-center gap-2 py-2">
                <div className="text-[0.8125rem] tracking-tight size-8 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
                  김
                </div>
                <span className="text-text-secondary leading-tight text-start break-keep">
                  <span className="font-medium text-text-primary">김광민</span>
                </span>
              </div>
            </div>
          </div>

          {/* content section */}
          <p className="p-4 border-y border-border-primary min-h-[360px]">
            첨부파일 테스트
          </p>

          {/* attachment section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-bg-neutral rounded-sm p-3 w-fit cursor-pointer hover:bg-bg-secondary active:scale-95 transition-[background-color,scale] duration-200 select-none">
              <Image
                src="/assets/svgs/paperclip.svg"
                alt="paperclip-icon"
                width={24}
                height={24}
                className="size-5"
              />
              <span className="text-sm text-text-secondary font-medium">
                SW사업대가_산정_가이드.pdf
              </span>
            </div>
          </div>

          {/* navigation section */}
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/boards"
              className="flex items-center gap-2 border border-border-primary hover:border-accent-primary rounded-sm px-3 h-11 w-fit cursor-pointer active:scale-95 transition-[border-color] duration-200 select-none"
            >
              <Image
                src="/assets/svgs/list.svg"
                alt="list-icon"
                width={24}
                height={24}
                className="size-5"
              />
              목록으로
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border border-border-primary hover:border-accent-primary rounded-sm px-3 pr-4 h-11 w-fit cursor-pointer active:scale-95 transition-[border-color] duration-200 select-none">
                <Image
                  src="/assets/svgs/caret-left.svg"
                  alt="caret-left-icon"
                  width={24}
                  height={24}
                  className="size-5"
                />
                이전
              </div>
              <div className="flex items-center gap-1 border border-border-primary hover:border-accent-primary rounded-sm px-3 pl-4 h-11 w-fit cursor-pointer active:scale-95 transition-[border-color] duration-200 select-none">
                다음
                <Image
                  src="/assets/svgs/caret-right.svg"
                  alt="caret-right-icon"
                  width={24}
                  height={24}
                  className="size-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetailsPage;
