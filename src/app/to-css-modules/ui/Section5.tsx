import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";
import styles from "./Section5.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
  isBlack?: boolean;
}

/**
 * Section5 전용 Button 컴포넌트
 */
const Button = ({
  variant = "primary",
  size = "md",
  isBlack = false,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const variantClass =
    variant === "primary"
      ? isBlack
        ? styles.buttonBlack
        : styles.buttonPrimary
      : styles.buttonGhost;
  const sizeClass = size === "md" ? styles.buttonMd : styles.buttonLg;

  return (
    <button
      className={`${styles.buttonBase} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Section5 = () => {
  return (
    <section className={styles.section}>
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          {/* logo */}
          <div className={styles.logoWrapper}>
            <Image
              src="/assets/logo/fpmate-symbol.svg"
              alt="FPMate"
              width={112}
              height={40}
              className={styles.logo}
            />
          </div>

          {/* text content */}
          <div className={styles.textContent}>
            <div className={styles.title}>
              진화하는 <span className={styles.brandText}>FPMate</span>, 사업
              성공 도우미
            </div>
            <p className={styles.description}>
              당신의 <span className={styles.medium}>SW 사업 성공</span>과{" "}
              <span className={styles.medium}>Fine 프로젝트</span>를 위하여{" "}
              <br className="sm:hidden" />
              <span className={styles.semibold}>FPMate</span>는 지속적으로
              성장합니다.
            </p>
          </div>
        </div>

        {/* Action Buttons - Mobile*/}
        <div className={styles.buttonsMobile}>
          <Button variant="primary" size="md" isBlack className={styles.button}>
            제품도입문의
          </Button>
          <Button variant="ghost" size="md" className={styles.button}>
            로그인/회원가입
            <Image
              src="/assets/svgs/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
              className={styles.arrowIcon}
            />
          </Button>
        </div>

        {/* Action Buttons - Desktop*/}
        <div className={styles.buttonsDesktop}>
          <Button
            variant="primary"
            size="lg"
            isBlack
            className={styles.buttonLg}
          >
            제품도입문의
          </Button>
          <Button variant="ghost" size="lg" className={styles.buttonLg}>
            로그인/회원가입
            <Image
              src="/assets/svgs/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
              className={styles.arrowIcon}
            />
          </Button>
        </div>
      </div>

      {/* logo background */}
      <div className={styles.logoBackground}>
        <Image
          src="/assets/logo/fpmate-logo-shape.svg"
          alt="FPMate"
          width={112}
          height={40}
          className={styles.logoBackgroundImage}
        />
      </div>
    </section>
  );
};

export default Section5;
