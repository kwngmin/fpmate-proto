import Image from "next/image";

const page = () => {
  return (
    <div
      className="min-h-screen"
      // className="min-h-screen py-20"
    >
      <div className="relative w-full overflow-hidden">
        {/* selected section */}
        <div className="px-6 py-20 h-128">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="z-10 flex grow flex-col justify-end md:max-w-prose gap-6">
              <div className="relative">
                <div className="pointer-events-none flex w-full cursor-pointer items-center justify-center gap-2 py-2 transition-all duration-300 md:pointer-events-auto md:justify-start text-fg3">
                  <span
                    className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter text-text-primary ${
                      true
                        ? "opacity-100 font-semibold"
                        : "opacity-50 hover:opacity-80 font-medium"
                    }`}
                  >
                    AI와 자동산정으로 구현하는 스마트 대가산정
                  </span>
                </div>
                <p className="text-base max-w-96 break-keep">
                  요구사항 문서를 입력하는 순간, AI가 내용을 분석해 기능을 자동
                  추천하고 전문가 도움 없이도 누구나 쉽게 비용을 산정 할 수
                  있습니다.
                </p>
              </div>
              <div className="relative">
                <div className="pointer-events-none flex w-full cursor-pointer items-center justify-center gap-2 py-2 transition-all duration-300 md:pointer-events-auto md:justify-start text-fg3">
                  <span
                    className={`text-[1.0625rem] sm:text-[1.3125rem] leading-tight tracking-tighter text-text-primary ${
                      false
                        ? "opacity-100 font-semibold"
                        : "opacity-50 hover:opacity-80 font-medium"
                    }`}
                  >
                    {" "}
                    편리한 오류 검증으로 향상되는 업무 효율
                  </span>
                </div>
                <p className="text-base max-w-96 break-keep">
                  FPMate가 데이터의 중복, 오류, 누락을 확인해 업무 부담은 줄이고
                  결과의 신뢰도는 높입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* background grid */}
        <div className="absolute top-0 h-[838px] w-full -translate-x-1/3 translate-y-20 scale-[0.5] md:-top-20 md:-translate-x-1/4 md:translate-y-8 md:scale-[0.94] lg:translate-x-0 lg:translate-y-0 hidden md:block">
          <div className="h-[838px] w-full" style={{ opacity: 1 }}>
            <div className="absolute left-[calc(50%-600px)] -top-20 h-[1095px] w-[1580px] -rotate-30 skew-x-30">
              {/* grid image */}
              <Image
                src="/hero-grid.svg"
                alt="FPMate"
                width={1579.97}
                height={1096.29}
                className="absolute left-0 top-0 object-none opacity-10"
              />

              {/* user */}
              <div className='flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out absolute left-[calc(50%-139px)] top-[297px] z-20 h-12 w-12 justify-center"'>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  className="h-5 w-5 text-fg0"
                >
                  <path
                    d="M12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2Z"
                    fill="currentcolor"
                  ></path>
                  <path
                    d="M11.9989 12C7.21736 12 3.91209 15.7691 3.50083 20.4563L3.45312 21H20.5447L20.497 20.4563C20.0857 15.7691 16.7805 12 11.9989 12Z"
                    fill="currentcolor"
                  ></path>
                </svg>
              </div>

              {/* 요구사항 label */}
              <div className="absolute left-[calc(50%+8px)] top-[298px] z-30 preserve-3d">
                <div
                  className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    opacity: 1,
                  }}
                >
                  <div className="rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out border-separator1 w-16 text-center">
                    <span style={{ opacity: 1 }}>요구사항</span>
                  </div>
                </div>
              </div>

              {/* pdf/hwp/xls */}
              <div className="absolute left-[calc(50%+18px)] top-[289px] z-20 preserve-3d">
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <div className="flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out h-12 w-12 px-3 py-3"></div>
                </div>
              </div>

              {/* form */}
              <div className="absolute left-[calc(50%-56px)] top-[339px] z-20 preserve-3d">
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <div className="flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out h-12 w-12 px-3 py-3"></div>
                </div>
              </div>

              {/* 업로드 */}
              <div className="rounded-full border bg-white px-3 py-1 text-[0.8125rem] text-fg1 transition-all duration-500 ease-out border-fg0 absolute left-[calc(50%+112px)] top-[310px] z-20 text-fg0 flex items-center gap-1.5">
                <Image
                  src="/assets/svgs/upload-simple.svg"
                  alt="upload"
                  width={16}
                  height={16}
                  className="size-4"
                />
                <span style={{ opacity: 1 }}>업로드</span>
              </div>

              {/* 사용자 입력 */}
              <div className="rounded-full border bg-white px-3 py-1 text-[0.8125rem] text-fg1 transition-all duration-500 ease-out border-fg0 absolute left-[calc(50%+74px)] top-[360px] z-20 text-fg0 flex items-center gap-1.5">
                <Image
                  src="/assets/svgs/key-return.svg"
                  alt="upload"
                  width={16}
                  height={16}
                  className="size-4"
                />
                <span style={{ opacity: 1 }}>사용자 입력</span>
              </div>

              {/* FPMate AI */}
              <div className="absolute left-[1043px] top-[274px] flex h-[150px] w-[250px] flex-col items-center justify-center gap-3 rounded bg-white border transition-colors border-dashed border-separator">
                {/* FPMate logo */}
                <div className="flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out absolute -top-[76px] left-1 z-0 h-12 w-12">
                  <div className="relative flex items-center justify-center ">
                    <Image
                      src="/assets/logo/fpmate-symbol.svg"
                      alt="FPMate"
                      width={16}
                      height={16}
                      className="size-8"
                    />
                  </div>
                </div>

                {/* FPMate A.I. label */}
                <div className="absolute -left-5 -top-4">
                  <div className="rounded-full border bg-white px-3 py-0.5 text-xxs text-text-primary transition-all duration-500 ease-out border-accent-primary">
                    <span style={{ opacity: 1 }}>FPMate A.I.</span>
                  </div>
                </div>

                {/* 개발규모 식별 */}
                <div className="rounded-md border border-border-secondary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out px-3 py-1.5 text-[0.8125rem] text-fg0 relative z-20 flex gap-1.5 items-center justify-center">
                  <Image
                    src="/assets/svgs/scan.svg"
                    alt="upload"
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  개발규모 식별
                </div>

                {/* 자동 검증 */}
                <div className="rounded-md border border-border-secondary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out px-3 py-1.5 text-[0.8125rem] text-fg0 relative z-20 flex gap-1.5 items-center justify-center">
                  <Image
                    src="/assets/svgs/arrows-clockwise.svg"
                    alt="upload"
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  자동 검증
                </div>
              </div>

              {/* 비용 산정 */}
              <div className="flex items-center justify-center rounded-md border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out px-3 py-1.5 text-xs text-fg0 absolute left-[calc(50%+180px)] top-[484px] z-20">
                <div
                  className="relative flex items-center justify-center"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-center gap-1.5 text-[0.8125rem]">
                    <Image
                      src="/assets/svgs/table.svg"
                      alt="dollar-sign"
                      width={16}
                      height={16}
                      className="size-4"
                    />
                    비용 산정
                  </div>
                </div>
              </div>

              {/* 데이터 중복 */}
              <div className="flex items-center justify-center rounded-md border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out px-3 py-1.5 text-xs text-fg0 absolute left-[calc(50%+320px)] top-[556px] z-20">
                <div
                  className="relative flex items-center justify-center"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-center gap-1.5 text-[0.8125rem]">
                    <Image
                      src="/assets/svgs/check.svg"
                      alt="dollar-sign"
                      width={16}
                      height={16}
                      className="size-4"
                    />
                    데이터 중복
                  </div>
                </div>
              </div>

              {/* 데이터 오류 */}
              <div className="flex items-center justify-center rounded-md border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out px-3 py-1.5 text-xs text-fg0 absolute left-[calc(50%+320px)] top-[606px] z-20">
                <div
                  className="relative flex items-center justify-center"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-center gap-1.5 text-[0.8125rem]">
                    <Image
                      src="/assets/svgs/check.svg"
                      alt="dollar-sign"
                      width={16}
                      height={16}
                      className="size-4"
                    />
                    데이터 오류
                  </div>
                </div>
              </div>

              {/* 중복 데이터 */}
              <div className="flex items-center justify-center rounded-md border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out px-3 py-1.5 text-xs text-fg0 absolute left-[calc(50%+320px)] top-[656px] z-20">
                <div
                  className="relative flex items-center justify-center"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-center gap-1.5 text-[0.8125rem]">
                    <Image
                      src="/assets/svgs/check.svg"
                      alt="dollar-sign"
                      width={16}
                      height={16}
                      className="size-4"
                    />
                    데이터 누락
                  </div>
                </div>
              </div>

              {/* 요구사항 label */}
              <div className="absolute left-[calc(50%+8px)] top-[298px] z-30 preserve-3d">
                <div
                  className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    opacity: 1,
                  }}
                >
                  <div className="rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out border-separator1 w-16 text-center">
                    <span style={{ opacity: 1 }}>요구사항</span>
                  </div>
                </div>
              </div>

              {/* web */}
              <div className="absolute left-[calc(50%-32px)] top-[589px] z-20 preserve-3d">
                <div
                  className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    opacity: 1,
                  }}
                >
                  <div className="rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out border-separator1 w-12 text-center">
                    <span style={{ opacity: 1 }}>Web</span>
                  </div>
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <div className="flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out h-12 w-12 p-2">
                    <Image
                      src="/assets/svgs/globe.svg"
                      alt="web"
                      width={16}
                      height={16}
                      className="size-6"
                    />
                  </div>
                </div>
              </div>

              {/* pdf */}
              <div className="absolute left-[calc(50%+68px)] top-[589px] z-20 preserve-3d">
                <div
                  className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    opacity: 1,
                  }}
                >
                  <div className="rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out border-separator1 w-12 text-center">
                    <span style={{ opacity: 1 }}>PDF</span>
                  </div>
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <div className="flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out h-12 w-12 px-3 py-3"></div>
                </div>
              </div>

              {/* xls */}
              <div className="absolute left-[calc(50%+168px)] top-[589px] z-20 preserve-3d">
                <div
                  className="absolute left-0 top-1 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    opacity: 1,
                  }}
                >
                  <div className="rounded-full border bg-white px-2 py-0.5 text-xs transition-all duration-500 ease-out border-separator1 w-12 text-center">
                    <span style={{ opacity: 1 }}>XLS</span>
                  </div>
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 0.8,
                    zIndex: 0,
                    transform: "translateY(8px) translateX(-8px)",
                  }}
                >
                  <div className="flex items-center justify-center rounded-md bg-white border border-border-primary shadow-[-3px_3px_0px_0px_lightgray] hover:border-brand-primary hover:shadow-[-3px_3px_0px_0px_green] transition-all duration-500 ease-out h-12 w-12 px-3 py-3"></div>
                </div>
              </div>

              {/* backboard panel */}
              <div
                className="absolute bg-white/50 border border-border-primary left-[calc(50%-95px)] top-[450px] z-5 flex h-[300px] w-[597px] px-3 py-2"
                style={{
                  opacity: 1, //
                  // backgroundColor: "rgba(7, 7, 7, 0.8)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
