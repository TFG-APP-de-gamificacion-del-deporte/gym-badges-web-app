import TextInput from "@/components/skewed-text-input/text-input"
import styles from "./friends.module.scss"
import { FaCircleUser, FaEllipsis, FaMagnifyingGlass, FaStar, FaUserSlash } from "react-icons/fa6"
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import Script from "next/script"
import Link from "next/link"

interface Friend {
  image: string,
  name: string,
  userID: string,
  level: number,
  streak: number,
  weight?: number,
  bodyFat?: number,
  topFeats: [string, string, string]
}

const MAX_FRIENDS = Number(styles.MAX_FRIENDS);
const friends: Friend[] = Array.from({length: MAX_FRIENDS}).map(_ => {return {
  image: "",
  name: "Friend Name",
  userID: `@Friend${Math.floor(Math.random()*1000)}`,
  level: 21,
  streak: 103,
  weight: 84.9,
  bodyFat: 22.4,
  topFeats: ["badge_id_1", "badge_id_2", "badge_id_3"]
}})


export default function Page() {
  return (
    <>
      <Script>
        if (!("anchorName" in document.documentElement.style)) 
          import("https://unpkg.com/@oddbird/css-anchor-positioning");  
      </Script>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div>
            <h2>Friends</h2>
            <small>({friends.length})</small>
          </div>
          <TextInput icon=<FaMagnifyingGlass/> placeholder="Find friends"/>
        </header>
        <div className={styles.friends_list}>
          {friends.map(friend => 
            <div className={styles.friend_container} key={friend.userID}>
              <div className={styles.friend} >

                <div className={styles.avatar}>
                  {/* IMAGE, NAME AND USERNAME */}
                  <Link href={`user/${friend.userID}`} className={styles.image_container}>
                    <DefaultProfilePicture/>
                  </Link>
                  <Link href={`user/${friend.userID}`} className={styles.username}>
                    {friend.name}<br/><small>{friend.userID}</small>
                  </Link>
                  {/* OPTIONS BUTTON */}
                  {/* @ts-ignore */}
                  <button popovertarget={`options_popover_${friend.userID}`} className={styles.options_button}>
                    <FaEllipsis size="1.5rem"/>
                  </button>
                  {/* OPTIONS MENU */}
                  <div id={`options_popover_${friend.userID}`} className={styles.options_popover} popover="auto">
                    <Link href={`user/${friend.userID}`}>
                      <FaCircleUser/>
                      <span>See profile</span>
                    </Link>
                    <button>
                      <FaUserSlash/>
                      <span>Remove friend</span>
                    </button>
                  </div>
                </div>

                <div className={styles.stats_top_feats}>
                  {/* STATS */}
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

                  {/* TOP FEATS */}
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
              {/* DIVIDER */}
              <hr className={styles.divider}/>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
