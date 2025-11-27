import { Card } from "@/shared/ui";
import InsightCard from "@/shared/ui/InsightCard";

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
    title: "대금 결제 APP 구축",
    description: "",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "김철수",
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
        label: "금융",
        color: "blue",
      },
      {
        id: 3,
        label: "사업 기획",
        color: "green",
      },
    ],
    title: "대금 결제 APP 구축",
    description: "",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "김철수",
  },
  {
    id: 3,
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
    title: "대금 결제 APP 구축",
    description: "",
    fp: 339.08,
    amount: 209815430,
    date: "2025.06.20",
    managerImage: "김철수",
  },
];

const SkeletonBar = ({
  width,
  height = 7,
}: {
  width: number;
  height?: number;
}) => {
  return (
    <div
      className={`w-${width} h-${height} bg-gray-100 rounded-full animate-pulse`}
    />
  );
};

const Section2 = () => {
  return (
    <section className="bg-white py-20 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-6">
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

        {/* Insight Cards */}
        <div className="grid grid-cols-3 gap-2 w-[1000px] md:w-[1152px]">
          <InsightCard />
          <InsightCard />
          <InsightCard />
        </div>

        {/* Dummy cards */}
        <div className="relative grid grid-cols-3 gap-2 after:content-[''] after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:to-white after:pointer-events-none w-[1000px] md:w-[1152px]">
          <Card variant="bordered" padding="sm" className="flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="flex gap-1 items-center">
                <SkeletonBar width={12} height={7} />
                <SkeletonBar width={14} height={7} />
                <SkeletonBar width={20} height={7} />
              </div>
              <div className="flex gap-2 items-center">
                <SkeletonBar width={7} height={7} />
                <SkeletonBar width={7} height={7} />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <SkeletonBar width={14} height={4} />
              <SkeletonBar width={28} height={4} />
              <SkeletonBar width={8} height={4} />
            </div>
          </Card>
          <Card variant="bordered" padding="sm" className="flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="flex gap-1 items-center">
                <SkeletonBar width={12} height={7} />
                <SkeletonBar width={14} height={7} />
                <SkeletonBar width={20} height={7} />
              </div>
              <div className="flex gap-2 items-center">
                <SkeletonBar width={7} height={7} />
                <SkeletonBar width={7} height={7} />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <SkeletonBar width={10} height={4} />
              <SkeletonBar width={20} height={4} />
              <SkeletonBar width={12} height={4} />
            </div>
          </Card>
          <Card variant="bordered" padding="sm" className="flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="flex gap-1 items-center">
                <SkeletonBar width={12} height={7} />
                <SkeletonBar width={14} height={7} />
                <SkeletonBar width={20} height={7} />
              </div>
              <div className="flex gap-2 items-center">
                <SkeletonBar width={7} height={7} />
                <SkeletonBar width={7} height={7} />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <SkeletonBar width={10} height={4} />
              <SkeletonBar width={20} height={4} />
              <SkeletonBar width={12} height={4} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Section2;
