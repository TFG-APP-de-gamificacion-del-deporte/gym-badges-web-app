import TextInput from "@/components/skewed-text-input/text-input"
import styles from "./friends.module.scss"
import { FaEllipsis, FaMagnifyingGlass, FaStar } from "react-icons/fa6"
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"

type Friend = {
  image: string,
  name: string,
  userID: string,
  level: number,
  streak: number,
  weight?: number,
  bodyFat?: number,
  topFeats: [string, string, string]
}

const friends: Friend[] = Array.from({length: 10}).map(_ => {return {
  image: "",
  name: "Friend Name",
  userID: `@Friend${Math.floor(Math.random()*1000)}`,
  level: 21,
  streak: 103,
  weight: 64.9,
  bodyFat: 22.4,
  topFeats: ["badge_id_1", "badge_id_2", "badge_id_3"]
}})


export default function Page() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div>
          <h2>Friends</h2>
          <small>({friends.length})</small>
        </div>
        <TextInput icon=<FaMagnifyingGlass/> placeholder="Find friends"/>
      </header>
      {friends.map(friend => 
        <div className={styles.friend_container} key={friend.userID}>
          <div className={styles.friend} >
            <div className={styles.avatar}>
              <div className={styles.image_container}><DefaultProfilePicture/></div>
              <span>{friend.name}<br/>{friend.userID}</span>
              <button>
                <FaEllipsis size="1.5rem"/>
              </button>
            </div>
            <div className={styles.stats_top_feats}>
              <div className={styles.stats}>
                <div>
                  <small>Lvl</small>
                  <span className={styles.level}><p>{friend.level}</p></span>
                </div>
                <div>
                  <small>Streak</small>
                  <span className={styles.streak}><p>{friend.streak} Weeks</p></span>
                </div>
                {friend.weight &&
                <div>
                  <small>Weight</small>
                  <span className={styles.weight}><p>{friend.weight} KG</p></span>
                </div>
                }
                {friend.bodyFat &&
                  <div>
                    <small>Fat</small>
                    <span className={styles.fat}><p>{friend.bodyFat}%</p></span>
                  </div>
                }
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
          {/* Divider */}
          <hr className={styles.divider}/>
        </div>
      )}
    </div>
  )
}