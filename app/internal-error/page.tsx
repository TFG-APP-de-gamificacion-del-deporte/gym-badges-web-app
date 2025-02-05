import Logo from "@/components/logo/logo"
import styles from "./internal-error.module.scss"

export default function InternalError() {
  return (
    <div className={styles.error_layout}>
      <Logo/>
      <div className={styles.error}>
        <h2>
          500<hr/>
          Internal Error
        </h2>
        <p>Please try again later :(</p>
      </div>
    </div>
  )
}