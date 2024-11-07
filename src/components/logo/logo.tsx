import styles from "@/components/logo/logo.module.scss";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Image src={logo} width={45} alt="Logo"/>
      <h1 className={styles.title}>Gym Badges</h1>
    </div>
  );
}
