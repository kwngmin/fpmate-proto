import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-20 overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row gap-6">
        <Link
          href="https://www.ibksystem.co.kr/"
          target="_blank"
          className="mr-12 flex items-center"
        >
          <Image
            src="/assets/logo/IBKSystem_CI_gray.svg"
            alt="IBKSystem CI"
            width={120}
            height={120}
            className="shrink-0 min-w-28 md:min-w-32"
          />
        </Link>
        <div className="flex flex-col gap-2 grow">
          <span className="font-semibold underline underline-offset-4">
            이용자 약관 및 개인정보 처리지침
          </span>
          <div className="flex flex-col py-2">
            <span className="leading-tight break-keep">
              서울시 중구 퇴계로 141-7 뉴서울빌딩 10F (주)IBK 시스템
              <br className="lg:hidden" />
              (구 주소 : 서울시 중구 충무로 2가 62-7)
            </span>
            <div className="flex items-center flex-wrap gap-x-2">
              <span>
                대표전화{" "}
                <Link href="tel:02-3407-6600" className="font-medium">
                  02-3407-6600
                </Link>
              </span>
              <div className="h-5 w-px bg-border-primary" />
              <span>
                팩스 <span className="font-medium">02-3407-6601</span>
              </span>
              <div className="h-5 w-px bg-border-primary" />
              <span>
                제품문의{" "}
                <Link
                  href="mailto:fpmate@ibksystem.co.kr"
                  target="_blank"
                  className="font-medium"
                >
                  fpmate@ibksystem.co.kr
                </Link>
              </span>
            </div>
          </div>
          <span>© 2023 IBK System Co. Ltd All rights reserved.</span>
        </div>
        <Link
          href="https://www.gs.tta.or.kr/ko"
          target="_blank"
          className="flex items-center"
        >
          <Image
            src="/fpmate-gs.png"
            alt="FPMate Good Software"
            width={120}
            height={32}
            className="min-w-16 hidden sm:block"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
