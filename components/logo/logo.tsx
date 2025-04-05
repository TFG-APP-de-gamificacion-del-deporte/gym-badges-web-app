import styles from "@/components/logo/logo.module.scss";
import Image from "next/image";
import logo from "@/static/logo.svg";
import Link from "next/link";

export default function Logo({ noTitle=false }: { noTitle?: boolean }) {
  return (
    <Link className={styles.logo} href="/">
      <Image src={logo} width={45} alt="Logo"/>
      { !noTitle &&
        <h1 className={styles.title}>Gym Badges</h1>
      }
    </Link>
  );
}
