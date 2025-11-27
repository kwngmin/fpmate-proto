import { Button } from "@/shared/ui";
import Image from "next/image";

const Header = () => {
  return (
    <header
      style={{
        height: "64px",
      }}
      className="sticky top-0 z-100 bg-(--header-bg) backdrop-blur-(--header-blur) border-b border-(--header-border)"
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/logo/fpmate-symbol-black.svg"
            alt="FPmate"
            width={112}
            height={40}
            priority
          />
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="primary" size="sm">
            도입문의
          </Button>
          <Button variant="outline" size="sm">
            로그인
          </Button>
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="primary" size="md">
            제품도입문의
          </Button>
          <Button variant="outline" size="md">
            로그인/회원가입
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
