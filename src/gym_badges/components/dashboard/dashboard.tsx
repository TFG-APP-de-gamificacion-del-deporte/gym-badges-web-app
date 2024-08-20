import styles from "@/components/dashboard/dashboard.module.scss"
import Logo from "@/components/logo/logo"

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
           <Logo></Logo> 
        </div>
    )
}