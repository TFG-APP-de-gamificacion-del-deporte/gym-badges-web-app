import styles from "./friends.module.scss"
import { FaMagnifyingGlass, FaPlus, FaXmark } from "react-icons/fa6"
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import Script from "next/script"
import Link from "next/link"
import Badge, { BadgeInfo } from "@/components/badge/badge"
import TextInput from "@/components/skewed-text-input/text-input"
import FriendOptions from "./friend-options/friend-options"
import { getFriendsAction } from "@/actions/friends"
import AddFriendMenu from "./add-friend-menu/add-friend-menu"

export interface Friend {
  image: string,
  name: string,
  user: string,
  level: number,
  streak: number,
  weight?: number,
  fat?: number,
  top_feats: BadgeInfo[]
}

export default async function Page() {
  const friends = await getFriendsAction();

  return (
    <>
      <Script id="css-anchor-polyfill">{`
        if (!("anchorName" in document.documentElement.style)) 
          import("https://unpkg.com/@oddbird/css-anchor-positioning");
      `}</Script>
      <div className={styles.layout}>

        <header className={styles.header}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Friends</h2>
            <small>({friends.length})</small>
          </div>
          <AddFriendMenu/>
        </header>

        <div className={styles.friends_list}>
          {friends.map(friend => 
            <div className={styles.friend_container} key={friend.user}>
              <div className={styles.friend} >

                <div className={styles.avatar}>
                  {/* IMAGE, NAME AND USERNAME */}
                  <Link href={`user/${friend.user}`} className={styles.image_container}>
                    <DefaultProfilePicture/>
                  </Link>
                  <Link href={`user/${friend.user}`} className={styles.username}>
                    {friend.name}<br/><small>@{friend.user}</small>
                  </Link>
                  <FriendOptions friend={friend}/>
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
                    {friend.weight !== undefined &&
                      <div>
                        <small>Weight</small>
                        <span className={styles.weight}><p>{friend.weight} kg</p></span>
                      </div>
                    }
                    {friend.fat !== undefined &&
                      <div>
                        <small>Fat</small>
                        <span className={styles.fat}><p>{friend.fat}%</p></span>
                      </div>
                    }
                  </div>

                  {/* TOP FEATS */}
                  { friend.top_feats.length > 0 && 
                    <div className={styles.top_feats}>
                      <small>Top Feats</small>
                      <div className={styles.badges}>
                        <div className={styles.badge_container}><Badge badgeInfo={friend.top_feats[0]} tooltip={false}/></div>
                        <div className={styles.badge_container}><Badge badgeInfo={friend.top_feats[1]} tooltip={false}/></div>
                        <div className={styles.badge_container}><Badge badgeInfo={friend.top_feats[2]} tooltip={false}/></div>
                      </div>
                    </div>
                  }
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
