import TextInput from "@/components/skewed-text-input/text-input"
import styles from "./friends.module.scss"
import { FaEllipsis, FaMagnifyingGlass, FaStar } from "react-icons/fa6"
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"

export default function Page() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div>
          <h2>Friends</h2>
          <small>(28)</small>
        </div>
        <TextInput icon=<FaMagnifyingGlass/> placeholder="Find friends"/>
      </header>
      <div className={styles.friend}>
        <div className={styles.avatar}>
          <div className={styles.image_container}><DefaultProfilePicture/></div>
          <span>Alice<br/>@Alice_33</span>
          <button>
            <FaEllipsis size="1.5rem"/>
          </button>
        </div>
        <div className={styles.stats_top_feats}>
          <div className={styles.stats}>
            <div>
              <small>Lvl</small>
              <span className={styles.level}><p>21</p></span>
            </div>
            <div>
              <small>Streak</small>
              <span className={styles.streak}><p>103 Weeks</p></span>
            </div>
            <div>
              <small>Weight</small>
              <span className={styles.weight}><p>64 KG</p></span>
            </div>
            <div>
              <small>Fat</small>
              <span className={styles.fat}><p>22%</p></span>
            </div>
          </div>
          <div className={styles.top_feats}>
            <small>Top Feats</small>
            <div className={styles.badge_container}>
              <div className={styles.top_feat}><FaStar size="20px"/></div>
              <div className={styles.top_feat}><FaStar size="20px"/></div>
              <div className={styles.top_feat}><FaStar size="20px"/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}