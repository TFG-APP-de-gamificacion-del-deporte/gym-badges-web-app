import LineSeparator from "../line-separator/line-separator";
import Logo from "../logo/logo";
import AccountButton from "./account-button/account-button";
import styles from "./header.module.scss";
import LevelBar from "./level-bar/level-bar";
import Nav from "../nav/nav";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <Logo/>
        <div className={styles.nav_container}>
          <Nav/>
        </div>
        <div className={styles.account_container}>
          <LevelBar/>
          <AccountButton/>
        </div>
      </div>
      <LineSeparator/>
    </>
  );
}
