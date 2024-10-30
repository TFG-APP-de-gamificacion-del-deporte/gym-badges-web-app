import { getStats } from "@/actions/stats-info";
import ClientDashboard from "./client-dashboard";
import { getCurrentWeek, getStreak } from "@/actions/streak-info";

export default async function Dashboard() {
  const stats = await getStats();

  const streak = await getStreak();
  const currentWeek = await getCurrentWeek();

  return <ClientDashboard streakCardProps={{streak, currentWeek}} statsCardProps={stats} />
}
