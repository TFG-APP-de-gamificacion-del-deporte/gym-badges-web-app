import Dashboard from "@/components/dashboard/dashboard";
import Header from "@/components/header/header";
import styles from "@/app/(home)/home.module.scss";
import { Suspense } from "react";
import Footer from "@/components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.dashboard_main_layout}>
        <Suspense fallback={"Loading Dashboard..."} >
          <Dashboard />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
