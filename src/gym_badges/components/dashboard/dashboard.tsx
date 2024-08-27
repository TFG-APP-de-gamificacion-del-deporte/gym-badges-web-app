import styles from "./dashboard.module.scss";
import Logo from "@/components/logo/logo";
import StreakCard from "@/components/dashboard/streak-card/streak-card";
import { Suspense } from "react";
import StatsCard from "./stats-card/stats-card";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Logo/>
      <Suspense fallback={<>Loading Streak...</>}>
       {/* TODO Streak card loading fallback  */}
        <StreakCard/>
      </Suspense>
      {/* TODO Streak card loading fallback  */}
      <Suspense fallback={<>Loading Stats...</>}>
        <StatsCard/>
      </Suspense>
    </div>
  );
}
