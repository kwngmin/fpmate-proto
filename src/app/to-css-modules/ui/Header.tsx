import { Button } from "@/shared/ui";
import Image from "next/image";
import styles from "./Header.module.css";

/**
 * Header 컴포넌트 - CSS Modules 버전
 * Tailwind CSS를 바닐라 CSS로 변환한 버전
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/assets/logo/fpmate-logo-black.svg"
            alt="FPmate"
            width={112}
            height={40}
            priority
          />
        </div>

        {/* Action Buttons - Mobile */}
        <div className={styles.actionsMobile}>
          <Button variant="primary" size="sm">
            도입문의
          </Button>
          <Button variant="outline" size="sm">
            로그인
          </Button>
        </div>

        {/* Action Buttons - Desktop */}
        <div className={styles.actionsDesktop}>
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
