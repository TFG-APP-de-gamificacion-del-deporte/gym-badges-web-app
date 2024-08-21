import styles from "@/components/dashboard/dashboard.module.scss";
import Logo from "@/components/logo/logo";
import StreakCard from "@/components/dashboard/streak-card/streak-card";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Logo></Logo>
      <StreakCard></StreakCard>
    </div>
  );
}


