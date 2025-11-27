import { Card, Typography } from "@/shared/ui";

/**
 * Section 4 서비스 카드 데이터
 */
const section4Contents = [
  {
    id: 1,
    key: "function",
    title: "SW 사업 기획자",
    subTitle: "SW 사업 비용 알아보기",
    sectionTitle: ["SW 개발비/재개발비", "SW 유지관리비"],
    tags: ["AI로 쉽게", "AI로 빠르게", "더 똑똑하게"],
    values: [
      "축척된 데이터를 활용한 AI 추천/자동화",
      "신기술 적용하여 비용산정 정확도 향상",
    ],
    color: "red",
  },
  {
    id: 2,
    key: "function",
    title: "개발자/운영자",
    subTitle: "SW 사업 관리하기",
    sectionTitle: ["SW 사업 진행 관리", "SW 변경 관리"],
    tags: ["프로젝트 현황을 한눈에", "비교 / 추적 / 변경"],
    values: ["상세한 개발규모 파악", "기능 변경에 따른 변경 비용 관리"],
    color: "blue",
  },
  {
    id: 3,
    key: "function",
    title: "SW 사업 관리자",
    subTitle: "SW 사업 관리 +",
    sectionTitle: ["인력 관리", "솔루션 관리", "일감 관리"],
    tags: ["사업에 필요한 모든 것", "All in One SW 사업 관리"],
    values: [
      "SW 사업 발주사/수주사 누구나",
      "업체 규모 상관없이 SW 사업에 필요한 FPMate",
    ],
    color: "green",
  },
];

const Section4 = () => {
  return (
    <section className="bg-white py-20 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-[2rem] md:text-[3.5rem] leading-tight tracking-tighter font-semibold break-keep text-center text-text-primary">
            진화하는{" "}
            <span className="font-extrabold text-brand-primary">FPMate</span>,{" "}
            <br className="sm:hidden" />
            SW 사업 성공 도우미
          </div>
          <p className="text-[1.3125rem] md:text-[2rem]  leading-snug tracking-tighter break-keep text-center text-text-primary">
            당신의 <span className="font-semibold">SW 사업 성공</span>과{" "}
            <span className="font-semibold">Fine 프로젝트</span>를 위하여{" "}
            <br className="hidden sm:block" />
            <span className="font-bold">FPMate</span>는 지속적으로 진화합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-6">
          {section4Contents.map((content) => (
            <Card
              key={content.id}
              variant="bordered"
              hoverable
              padding="none"
              className="shrink-0 overflow-hidden w-full max-w-md mx-auto md:max-w-none"
            >
              <div className="h-4 bg-gray-100" />
              <div className="flex flex-col gap-6 px-6 pt-8 pb-16">
                {/* <div className="w-12 h-12 rounded-full bg-gray-100" /> */}
                <Typography variant="title3">{content.title}</Typography>
                <div className="flex flex-col gap-2">
                  <Typography variant="title2">{content.subTitle}</Typography>
                  <div className="flex flex-col gap-1">
                    {content.sectionTitle.map((title) => (
                      <div key={title} className="flex items-center gap-2">
                        <div className="w-1 h-7 rounded-full bg-gray-200" />
                        <span className="text-[1.0625rem] sm:text-[0.9375rem] font-medium">
                          {title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <ul className="flex  flex-wrap gap-1">
                  {content.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-base sm:text-[0.875rem] px-3 h-8 sm:h-7 rounded-sm bg-gray-100 flex items-center font-medium"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2">
                  <span>제공가치</span>
                  <ul className="flex flex-col gap-1 pl-2">
                    {content.values.map((value) => (
                      <li
                        key={value}
                        className="text-[1.0625rem] sm:text-[0.9375rem]  font-medium break-keep list-disc ml-4"
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;
