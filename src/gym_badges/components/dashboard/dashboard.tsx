import styles from "@/components/dashboard/dashboard.module.scss";
import Logo from "@/components/logo/logo";
import StreakCard from "@/components/dashboard/streak-card/streak-card";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Logo/>
      <Suspense fallback={<>Loading Streak...</>}>
        <StreakCard/>
      </Suspense>
    </div>
  );
}
