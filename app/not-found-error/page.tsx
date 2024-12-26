import Logo from "@/components/logo/logo"
import styles from "./not-found-error.module.scss"

export default function InternalError() {
  return (
    <div className={styles.error_layout}>
      <Logo/>
      <div className={styles.error}>
        <h2>
          404<hr/>
          User not found :(
        </h2>
      </div>
    </div>
  )
}