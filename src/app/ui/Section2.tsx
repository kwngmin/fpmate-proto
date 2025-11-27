import { Card } from "@/shared/ui";
import InsightCard from "@/shared/ui/InsightCard";

const Section2 = () => {
  return (
    <section className="bg-white py-20 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-[2rem] md:text-[3.5rem] leading-tight tracking-tight font-semibold break-keep">
            SW 사업 추진{" "}
            <span className="font-bold text-brand-primary">인사이트+</span>
          </div>
          <p className="text-[1.0625rem] leading-snug tracking-tight break-keep text-text-primary">
            <span className="font-medium">고유 작업 공간</span>에서 그동안
            작업했던 <br />
            <span className="font-medium">SW 사업 비용 산정 내역</span>을 한눈에
            파악해보세요.
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
                <div className="w-12 h-7 rounded-full bg-gray-100" />
                <div className="w-14 h-7 rounded-full bg-gray-100" />
                <div className="w-20 h-7 rounded-full bg-gray-100" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-7 bg-gray-100 rounded-full" />
                <div className="size-7 bg-gray-100 rounded-full" />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="w-14 h-4 rounded bg-gray-200" />
              <div className="w-28 h-4 rounded bg-gray-200" />
              <div className="w-8 h-4 rounded bg-gray-200" />
            </div>
          </Card>
          <Card variant="bordered" padding="sm" className="flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="flex gap-1 items-center">
                <div className="w-12 h-7 rounded-full bg-gray-100" />
                <div className="w-14 h-7 rounded-full bg-gray-100" />
                <div className="w-20 h-7 rounded-full bg-gray-100" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-7 bg-gray-100 rounded-full" />
                <div className="size-7 bg-gray-100 rounded-full" />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="w-10 h-4 rounded bg-gray-200" />
              <div className="w-20 h-4 rounded bg-gray-200" />
              <div className="w-12 h-4 rounded bg-gray-200" />
            </div>
          </Card>
          <Card variant="bordered" padding="sm" className="flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="flex gap-1 items-center">
                <div className="w-12 h-7 rounded-full bg-gray-100" />
                <div className="w-14 h-7 rounded-full bg-gray-100" />
                <div className="w-20 h-7 rounded-full bg-gray-100" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="size-7 bg-gray-100 rounded-full" />
                <div className="size-7 bg-gray-100 rounded-full" />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="w-14 h-4 rounded bg-gray-200" />
              <div className="w-6 h-4 rounded bg-gray-200" />
              <div className="w-20 h-4 rounded bg-gray-200" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Section2;
