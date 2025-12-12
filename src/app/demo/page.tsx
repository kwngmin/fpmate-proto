import { Card } from "@/shared/ui";
import { CardStep2, CardStep3, CardStep5 } from "../ui/Hero";

const DemoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gap-2">
      <Card
        variant="elevated"
        padding="none"
        className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group outline-1 outline-gray-300 hover:outline-accent-hover`}
        // className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group ${
        //   step.id === currentStep
        //     ? "outline-4 outline-black" // ring-brand-primary
        //     : "outline-1 outline-gray-300 hover:outline-accent-hover"
        // }`}
      >
        <div className="relative">
          <CardStep2 />
        </div>
        <div className="flex flex-col px-4 py-6">
          <span className="text-[27px] text-brand-primary font-base">02</span>
          <span className="text-lg font-semibold tracking-tight">
            비용 산정 시작
          </span>
        </div>
      </Card>
      <Card
        variant="elevated"
        padding="none"
        className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group outline-1 outline-gray-300 hover:outline-accent-hover`}
        // className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group ${
        //   step.id === currentStep
        //     ? "outline-4 outline-black" // ring-brand-primary
        //     : "outline-1 outline-gray-300 hover:outline-accent-hover"
        // }`}
      >
        <div className="relative">
          <CardStep3 />
        </div>
        <div className="flex flex-col px-4 py-6">
          <span className="text-[27px] text-brand-primary font-base">03</span>
          <span className="text-lg font-semibold tracking-tight">
            개발 범위 식별
          </span>
        </div>
      </Card>
      <Card
        variant="elevated"
        padding="none"
        className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group outline-1 outline-gray-300 hover:outline-accent-hover`}
        // className={`w-64 shrink-0 transition-[outline] duration-500 ease-out cursor-pointer overflow-hidden group ${
        //   step.id === currentStep
        //     ? "outline-4 outline-black" // ring-brand-primary
        //     : "outline-1 outline-gray-300 hover:outline-accent-hover"
        // }`}
      >
        <div className="relative">
          <CardStep5 />
        </div>
        <div className="flex flex-col px-4 py-6">
          <span className="text-[27px] text-brand-primary font-base">05</span>
          <span className="text-lg font-semibold tracking-tight">
            보정 계수 결정
          </span>
        </div>
      </Card>
    </div>
  );
};

export default DemoPage;
