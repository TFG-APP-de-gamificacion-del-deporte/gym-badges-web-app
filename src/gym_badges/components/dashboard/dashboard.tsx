import { getStats } from "@/lib/stats-info";
import ClientDashboard from "./client-dashboard";
import { getCurrentWeek, getStreak } from "@/lib/streak-info";

export default async function Dashboard() {
  const stats = await getStats();

  const streak = await getStreak();
  const currentWeek = await getCurrentWeek();

  return <ClientDashboard streakCardProps={{streak, currentWeek}} statsCardProps={stats} />
}
