import styles from "./dashboard.module.scss";
import StreakCard from "@/components/dashboard/streak-card/streak-card";
import { Suspense } from "react";
import StatsCard from "./stats-card/stats-card";
import LineSeparator from "../line-separator/line-separator";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      
      <div className={styles.widgets}>
        <Suspense fallback={<>Loading Streak...</>}>
        {/* TODO Streak card loading fallback  */}
          <StreakCard/>
        </Suspense>
        {/* TODO Streak card loading fallback  */}
        <Suspense fallback={<>Loading Stats...</>}>
          <StatsCard/>
        </Suspense>
      </div>

      <LineSeparator vertical/>

      <div className={styles.collapse_button}>
        <button>
          <ChevronLeftIcon className={styles.icon}/>
        </button>
      </div>

    </div>
  );
}
