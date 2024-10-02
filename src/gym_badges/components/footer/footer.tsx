import LineSeparator from "../line-separator/line-separator";
import Nav from "../nav/nav";
import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <div className={styles.footer}>
      <LineSeparator />
      <Nav />
    </div>
  )
}