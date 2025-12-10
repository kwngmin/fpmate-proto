import Image from "next/image";
import Header from "../ui/Header";

const BoardsPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-y-scroll">
      {/* Header */}
      <Header />
      <div className="py-12 relative z-40 space-y-6 ">
        {/* 상단 navigation */}
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="text-[2rem] leading-tight tracking-tighter font-semibold break-keep text-text-primary">
              공지사항 / 게시글
            </div>

            <div className="flex justify-between items-center gap-6">
              <div>
                <div></div>
                <div>내 글 조회</div>
              </div>
              <button
                type="button"
                className="bg-brand-primary flex items-center h-11 overflow-hidden rounded-lg text-white gap-3 w-28 font-semibold cursor-pointer active:scale-95 transition-[scale] duration-200"
              >
                <div className="size-11 flex items-center justify-center bg-[#007B55]">
                  <Image
                    src={`/assets/svgs/pencil-simple-fill.svg`}
                    alt="pencil"
                    width={24}
                    height={24}
                    className="size-6 brightness-0 invert"
                  />
                </div>
                글쓰기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
