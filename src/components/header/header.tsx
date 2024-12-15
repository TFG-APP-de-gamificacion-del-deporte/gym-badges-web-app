import LineSeparator from "../line-separator/line-separator";
import Logo from "../logo/logo";
import styles from "./header.module.scss";
import LevelBar from "./level-bar/level-bar";
import Nav from "../nav/nav";
import Link from "next/link";
import { cookies } from "next/headers";
import { AUTH_KEYS } from "@/api/constants";
import ProfilePicture from "../default-profile-picture/default-profile-picture";
import { getUserAction } from "@/actions/user";

export default async function Header() {
  const user = await getUserAction();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo_container}>
          <Logo noTitle/>
          <h1 className={styles.title}>Gym Badges</h1>
        </div>
        <div className={styles.nav_container}>
          <Nav/>
        </div>
        <div className={styles.account_container}>
          <LevelBar/>
          <Link href={`/user/${user.user_id}`}>
            <div className={styles.image_container}>
              <ProfilePicture image_b64={user.image}/>
            </div>
          </Link>
        </div>
      </div>
      <LineSeparator/>
    </>
  );
}
