import { Card } from "@/shared/ui";
import InsightCard from "@/shared/ui/InsightCard";
import SkeletonBar from "./SkeletonBar";

const cardData = [
  {
    id: 1,
    chips: [
      {
        id: 1,
        label: "신규",
        color: "red",
      },
      {
        id: 2,
        label: "금융",
        color: "blue",
      },
      {
        id: 3,
        label: "사업 기획",
        color: "green",
      },
    ],
    title: "클라우드 시스템 도입 및 구축",
    description: "클라우드 시스템 도입 및 구축",
    fp: 495.6,
    amount: 384576128,
    date: "2025.10.20",
    managerImage: "/assets/images/avatar-1.png",
  },
  {
    id: 2,
    chips: [
      {
        id: 1,
        label: "신규",
        color: "red",
      },
      {
        id: 2,
        label: "간이법",
        color: "blue",
      },
      {
        id: 3,
        label: "개발 테스트",
        color: "green",
      },
    ],
    title: "대금 결제 APP 구축",
    description: "대금 결제 APP 구축",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "/assets/images/avatar-2.png",
  },
  {
    id: 3,
    chips: [
      {
        id: 1,
        label: "금융",
        color: "blue",
      },
      {
        id: 2,
        label: "프로젝트 종료",
        color: "green",
      },
    ],
    title: "소프트웨어 비용 산정 솔루션 구축",
    description: "소프트웨어 비용 산정 솔루션 구축",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "/assets/images/avatar-3.png",
  },
];

const Section2 = () => {
  return (
    <section className="bg-white py-20 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8 relative">
        <div className="flex flex-col gap-4">
          <div className="text-[2rem] md:text-[3.5rem] leading-[1.15] tracking-tighter font-semibold break-keep">
            SW 사업 추진{" "}
            <span className="font-bold text-brand-primary">인사이트+</span>
          </div>
          <p className="text-[1.0625rem] md:text-[1.3125rem] leading-snug tracking-tight break-keep text-text-primary">
            <span className="font-semibold">고유 작업 공간</span>에서 그동안
            작업했던 <br />
            <span className="font-semibold">SW 사업 비용 산정 내역</span>을
            한눈에 파악해보세요.
          </p>
        </div>

        {/* card container */}
        <div className="flex flex-col gap-4 relative sm:after:content-[''] sm:after:absolute sm:after:inset-0 sm:after:w-1/2 sm:after:w-2/3 sm:after:left-auto sm:after:-right-6 sm:after:bg-linear-to-r sm:after:from-transparent sm:after:to-white/90 sm:after:pointer-events-none xl:after:hidden">
          {/* Insight Cards */}
          <div className="grid grid-cols-3 gap-2 w-[1000px] md:w-[1152px]">
            {cardData.map((card) => (
              <InsightCard key={card.id} {...card} isFirst={card.id === 1} />
            ))}
          </div>

          {/* Dummy cards */}
          <div className="relative grid grid-cols-3 gap-2 after:content-[''] after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:to-white after:pointer-events-none w-[1000px] md:w-[1152px]">
            <Card
              variant="bordered"
              padding="sm"
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-1 items-center">
                  <SkeletonBar width={3} height={1.75} isRound />
                  <SkeletonBar width={3.5} height={1.75} isRound />
                  <SkeletonBar width={5} height={1.75} isRound />
                </div>
                <div className="flex gap-2 items-center">
                  <SkeletonBar width={1.75} height={1.75} isRound />
                  <SkeletonBar width={1.75} height={1.75} isRound />
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <SkeletonBar width={3.5} height={1} />
                <SkeletonBar width={7} height={1} />
                <SkeletonBar width={8} height={1} />
              </div>
            </Card>
            <Card
              variant="bordered"
              padding="sm"
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-1 items-center">
                  <SkeletonBar width={3} height={1.75} isRound />
                  <SkeletonBar width={3.5} height={1.75} isRound />
                  <SkeletonBar width={5} height={1.75} isRound />
                </div>
                <div className="flex gap-2 items-center shrink-0">
                  <SkeletonBar width={1.75} height={1.75} isRound />
                  <SkeletonBar width={1.75} height={1.75} isRound />
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <SkeletonBar width={2.5} height={1} />
                <SkeletonBar width={5} height={1} />
                <SkeletonBar width={3} height={1} />
              </div>
            </Card>
            <Card
              variant="bordered"
              padding="sm"
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-1 items-center">
                  <SkeletonBar width={3} height={1.75} isRound />
                  <SkeletonBar width={3.5} height={1.75} isRound />
                  <SkeletonBar width={5} height={1.75} isRound />
                </div>
                <div className="flex gap-2 items-center">
                  <SkeletonBar width={1.75} height={1.75} isRound />
                  <SkeletonBar width={1.75} height={1.75} isRound />
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <SkeletonBar width={2.5} height={1} />
                <SkeletonBar width={5} height={1} />
                <SkeletonBar width={3} height={1} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
