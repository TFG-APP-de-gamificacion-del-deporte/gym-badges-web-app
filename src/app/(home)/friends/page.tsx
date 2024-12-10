import TextInput from "@/components/skewed-text-input/text-input"
import styles from "./friends.module.scss"
import { FaCircleUser, FaEllipsis, FaMagnifyingGlass, FaPlus, FaUserSlash } from "react-icons/fa6"
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import Script from "next/script"
import Link from "next/link"
import Badge, { BadgeInfo } from "@/components/badge/badge"
import { AUTH_KEYS } from "@/api/models"
import { redirect } from "next/navigation"
import { FRIENDS_ENDPOINTS } from "@/api/endpoints"
import getAuthCookies from "@/utils/getAuthCookies"

interface Friend {
  image: string,
  name: string,
  user: string,
  level: number,
  streak: number,
  weight?: number,
  fat?: number,
  top_feats: BadgeInfo[]
}

async function getFriends() {
  const { userID, token } = getAuthCookies();

  let url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.GET_FRIENDS(userID)}`)
  url.searchParams.append("page", "0")

  const res = await fetch(url, {
    method: "GET",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: userID,
      [AUTH_KEYS.TOKEN]: token,
    },
  })

  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    redirect("/internal-error");
  }

  return (await res.json()).friends as Friend[]
}


export default async function Page() {
  const friends = await getFriends();

  return (
    <>
      <Script id="css-anchor-polyfill">{`
        if (!("anchorName" in document.documentElement.style)) 
          import("https://unpkg.com/@oddbird/css-anchor-positioning");
      `}</Script>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div>
            <h2>Friends</h2>
            <small>({friends.length})</small>
          </div>
          <button className={styles.add_friend}>
            <FaPlus/>
            <span>Add friend</span>
          </button>
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
                  {/* OPTIONS BUTTON */}
                  {/* @ts-ignore */}
                  <button popovertarget={`options_popover_${friend.userID}`} className={styles.options_button}>
                    <FaEllipsis size="1.5rem"/>
                  </button>
                  {/* OPTIONS MENU */}
                  <div id={`options_popover_${friend.user}`} className={styles.options_popover} popover="auto">
                    <Link href={`user/${friend.user}`}>
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
