import AccountButton from "./account-button/account-button";
import styles from "./header.module.scss";
import LevelBar from "./level-bar/level-bar";
import Nav from "./nav/nav";

export default function Header() {
  return (
    <div className={styles.header}>
      <Nav/>
      <div className={styles.gap}></div>
      <LevelBar/>
      <AccountButton/>
    </div>
  );
}
