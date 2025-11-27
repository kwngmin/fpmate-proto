import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

/**
 * Section 4 서비스 카드 데이터
 */
const Contents = [
  {
    id: 1,
    key: "ai-recommendation",
    title: "AI 추천 기능",
    icon: "robot",
    listItems: [
      {
        title: "업무 및 기능 식별 자동화",
        description: "업무 및 기능 추천",
      },
      {
        title: "기능 유형 판단 자동화",
        description: "EI, EO, EQ, ILF 등 기능 유형 추천",
      },
    ],
  },
  {
    id: 2,
    key: "fp-automation",
    title: "FP산정 자동화",
    icon: "arrows-clockwise",
    listItems: [
      {
        title: "산정 유형에 따른 기능 점수 자동 계산",
        description: null,
      },
      {
        title: "업무별 기능 점수 합계 자동 계산",
        description: null,
      },
      {
        title: "FP 측정 결과 즉시 확인",
        description: null,
      },
      {
        title: "FP 기반 SW 사업비용 산정",
        description: null,
      },
    ],
  },
  {
    id: 3,
    key: "data-verification",
    title: "데이터 검증",
    icon: "list-checks",
    listItems: [
      {
        title: "중복검사",
        description: null,
      },
      {
        title: "명칭 오류 검사",
        description: null,
      },
      {
        title: "속성 미작성 검사",
        description: null,
      },
      {
        title: "기능 유형 판단 오류 검증",
        description: null,
      },
    ],
  },
  {
    id: 4,
    key: "guidance",
    title: "오류 수정 가이드",
    icon: "warning",
    listItems: [
      {
        title: "오류 유형별 수정 가이드",
        description: null,
      },
      {
        title: "확인 필요 사항에 대한 쉬운 탐색",
        description: null,
      },
      {
        title: "정확한 산정 유도",
        description: null,
      },
    ],
  },
  {
    id: 5,
    key: "report",
    title: "산정결과 리포트",
    icon: "newspaper",
    listItems: [
      {
        title: "산정 내역 축척",
        description: null,
      },
      {
        title: "산정 내역 접근 권한 관리",
        description: null,
      },
      {
        title: "비용 산정 진행 관리",
        description: null,
      },
      {
        title: "산정 보고서",
        description: null,
      },
      {
        title: "산정 내역 분석",
        description: null,
      },
    ],
  },
  {
    id: 6,
    key: "data-utilization",
    title: "데이터 활용",
    icon: "database",
    listItems: [
      {
        title: "산정 결과 재활용",
        description: null,
      },
      {
        title: "산정 데이터를 활용한 추천",
        description: null,
      },
      {
        title: "산정 결과 통계 및 시각화",
        description: null,
      },
      {
        title: "산정결과 비교 기능 제공",
        description: null,
      },
      {
        title: "경영 인사이트 제공",
        description: null,
      },
    ],
  },
];

const Section4 = () => {
  return (
    <section className="bg-white py-20 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-[2rem] md:text-[3.5rem] leading-tight tracking-tighter font-semibold break-keep text-center text-text-primary">
            <span className="font-extrabold text-brand-primary">FPMate</span>{" "}
            주요 기능
          </div>

          {/* icons */}
          <div className="flex justify-center flex-wrap gap-3">
            {Contents.map((content) => (
              <div
                key={content.id}
                className="rounded-full bg-white md:p-2 md:border border-border-primary"
              >
                <Image
                  src={`/assets/svgs/${content.icon}.svg`}
                  alt={content.title}
                  width={100}
                  height={100}
                  className="size-6"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 my-6 max-w-2xl lg:max-w-none mx-auto w-full">
          {Contents.map((content, index) => {
            const backgroundColor =
              (index + 1) % 3 === 0
                ? "bg-green-600"
                : (index + 1) % 3 === 1
                ? "bg-lime-600"
                : "bg-teal-600";

            return (
              <div
                className="flex flex-col gap-2 h-full shrink-0 overflow-hidden w-full max-w-sm mx-auto md:max-w-none"
                key={content.id}
              >
                <div
                  className={`relative text-[1.0625rem] sm:text-base tracking-tight text-white font-semibold h-12 px-6 pb-0.5 flex justify-center items-center rounded-md shadow-lg ${backgroundColor}`}
                >
                  {content.title}
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: "0.5rem solid transparent",
                      borderRight: "0.5rem solid transparent",
                      borderTop: `0.5rem solid green`,
                    }}
                  />
                </div>
                <ul className="flex flex-col gap-1 px-6 pt-8 pb-10 bg-gray-50 grow border border-transparent hover:border-border-primary transition-colors duration-300 rounded-md">
                  {content.listItems.map((item) => (
                    <li
                      key={item.title}
                      className="text-base sm:text-[0.9375rem] leading-snug tracking-tight break-keep list-disc ml-4 text-text-primary font-medium"
                    >
                      {item.title}
                      {item?.description && (
                        <Fragment>
                          <br />
                          <span className="text-[0.875rem] text-text-secondary">
                            ({item.description})
                          </span>
                        </Fragment>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section4;
