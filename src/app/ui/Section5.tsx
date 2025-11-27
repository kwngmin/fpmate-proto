import { Button } from "@/shared/ui";
import Image from "next/image";

const Section5 = () => {
  return (
    <section className="bg-gray-50 py-20 md:py-40 overflow-hidden relative">
      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12 relative z-20">
        <div className="flex flex-col gap-4">
          {/* logo */}
          <div className="flex justify-center items-center">
            <Image
              src="/assets/logo/fpmate-symbol.svg"
              alt="FPMate"
              width={112}
              height={40}
              className="size-20 sm:size-32"
            />
          </div>

          {/* text content */}
          <div className="flex flex-col gap-2">
            <div className="text-[1.3125rem] md:text-[2rem]  leading-tight tracking-tighter font-semibold break-keep text-center text-text-primary">
              진화하는{" "}
              <span className="font-extrabold text-brand-primary">FPMate</span>,{" "}
              사업 성공 도우미
            </div>
            <p className="text-[1.0625rem] sm:text-[1.3125rem] leading-snug tracking-tighter break-keep text-center text-text-primary">
              당신의 <span className="font-medium">SW 사업 성공</span>과{" "}
              <span className="font-medium">Fine 프로젝트</span>를 위하여{" "}
              <br className="sm:hidden" />
              <span className="font-semibold">FPMate</span>는 지속적으로
              성장합니다.
            </p>
          </div>
        </div>

        {/* Action Buttons - Mobile*/}
        <div className="flex justify-center items-center gap-2 md:hidden">
          <Button variant="primary" size="md" className="bg-black! min-w-32">
            제품도입문의
          </Button>
          <Button variant="ghost" size="md" className="min-w-32">
            로그인/회원가입
            <Image
              src="/assets/svgs/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
              className="size-4 ml-2"
            />
          </Button>
        </div>

        {/* Action Buttons - Desktop*/}
        <div className="hidden md:flex justify-center items-center gap-2">
          <Button variant="primary" size="lg" className="bg-black! min-w-40">
            제품도입문의
          </Button>
          <Button variant="ghost" size="lg" className="min-w-40">
            로그인/회원가입
            <Image
              src="/assets/svgs/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
              className="size-4 ml-2"
            />
          </Button>
        </div>
      </div>

      {/* logo background */}
      <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center w-full h-full z-10">
        <Image
          src="/assets/logo/fpmate-logo-shape.svg"
          alt="FPMate"
          width={112}
          height={40}
          className="size-3/5"
        />
      </div>
    </section>
  );
};

export default Section5;
