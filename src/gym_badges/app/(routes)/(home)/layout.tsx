import LeftPanel from "@/app/ui/left-pannel/left-panel"
import Header from "@/app/ui/header/header"

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <LeftPanel></LeftPanel>
      <Header></Header>
      <main>{children}</main>
    </>
  )
}