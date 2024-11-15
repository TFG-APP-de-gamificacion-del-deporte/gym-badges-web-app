import LineSeparator from "../line-separator/line-separator";
import Logo from "../logo/logo";
import AccountButton from "./account-button/account-button";
import styles from "./header.module.scss";
import LevelBar from "./level-bar/level-bar";
import Nav from "../nav/nav";
import Link from "next/link";
import { cookies } from "next/headers";
import { AUTH_USER_ID_KEY } from "@/config/API";
import DefaultProfilePicture from "../default-profile-picture/default-profile-picture";

export default function Header() {
  const user_id = cookies().get(AUTH_USER_ID_KEY);

  return (
    <>
      <div className={styles.header}>
        <Logo/>
        <div className={styles.nav_container}>
          <Nav/>
        </div>
        <div className={styles.account_container}>
          <LevelBar/>
          <Link href={`/user/${user_id?.value}`}>
            <div className={styles.image_container}>
              <DefaultProfilePicture/>
            </div>
          </Link>
        </div>
      </div>
      <LineSeparator/>
    </>
  );
}
