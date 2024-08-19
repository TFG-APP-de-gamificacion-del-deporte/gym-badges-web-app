import LeftPanel from "@/components/left-panel/left-panel"
import Header from "@/components/header/header"
import styles from "@/app/(home)/home.module.scss"
import LineSeparator from "@/components/line-separator/line-separator"

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className={styles.left_layout}>
      <LeftPanel></LeftPanel>
      <LineSeparator vertical></LineSeparator>
      <div className={styles.header_layout}>
        <Header></Header>
        <LineSeparator></LineSeparator>
        <main>{children}</main>
      </div>
    </div>
  )
}