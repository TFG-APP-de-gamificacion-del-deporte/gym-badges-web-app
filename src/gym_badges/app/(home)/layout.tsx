import Dashboard from "@/components/dashboard/dashboard";
import Header from "@/components/header/header";
import styles from "@/app/(home)/home.module.scss";
import LineSeparator from "@/components/line-separator/line-separator";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.layout}>
      <Header/>
      <div className={styles.dashboard_main_layout}>
        <Dashboard/>
        <main>{children}</main>
      </div>
    </div>
  );
}
