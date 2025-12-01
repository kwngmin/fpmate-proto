import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link
          href="https://www.ibksystem.co.kr/"
          target="_blank"
          className={styles.logoLink}
        >
          <Image
            src="/assets/logo/IBKSystem_CI_gray.svg"
            alt="IBKSystem CI"
            width={120}
            height={120}
            className={styles.logoImage}
          />
        </Link>
        <div className={styles.content}>
          <span className={styles.termsLink}>
            이용자 약관 및 개인정보 처리지침
          </span>
          <div className={styles.addressSection}>
            <span className={styles.address}>
              서울시 중구 퇴계로 141-7 뉴서울빌딩 10F (주)IBK 시스템
              <br className="lg:hidden" />
              (구 주소 : 서울시 중구 충무로 2가 62-7)
            </span>
            <div className={styles.contactInfo}>
              <span>
                대표전화{" "}
                <Link href="tel:02-3407-6600" className={styles.contactLink}>
                  02-3407-6600
                </Link>
              </span>
              <div className={styles.divider} />
              <span>
                팩스 <span className={styles.contactLink}>02-3407-6601</span>
              </span>
              <div className={styles.divider} />
              <span>
                제품문의{" "}
                <Link
                  href="mailto:fpmate@ibksystem.co.kr"
                  target="_blank"
                  className={styles.contactLink}
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
          className={styles.gsLink}
        >
          <Image
            src="/fpmate-gs.png"
            alt="FPMate Good Software"
            width={120}
            height={32}
            className={styles.gsImage}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

