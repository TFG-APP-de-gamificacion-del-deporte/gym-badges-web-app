"use client";

import styles from "./friends.module.scss"
import Script from "next/script"
import Link from "next/link"
import Badge from "@/components/badge/badge"
import FriendOptions from "./friend-options/friend-options"
import { getFriendsAction } from "@/actions/friends"
import AddFriendMenu from "./add-friend-menu/add-friend-menu"
import { BadgeInfo } from "@/api/models"
import ProfilePicture from "@/components/profile-picture/profile-picture"
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { redirect } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import FriendRequestsMenu from "./friend-requests-menu/friend-request-menu";

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

export default function Page() {
  const [page, setPage] = useState(1);

  const { data: friends, error, isLoading } = useSWR(["getFriends", page], ([_, p]) => getFriendsAction(undefined, p), { refreshInterval: 5000 });

  if (error) {
    redirect("/internal-error");
  }

  function changePage(n: number) {
    setPage(Math.max(1, page + n));
    mutate(["getFriends", page]);
  }

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
            {friends && <small>({friends.length})</small>}
          </div>
          <FriendRequestsMenu />
          <AddFriendMenu />
        </header>

        <div className={styles.friends_list}>
          {friends && friends.map(friend =>
            <div className={styles.friend_container} key={friend.user}>
              <div className={styles.friend}>

                <div className={styles.avatar}>
                  {/* IMAGE, NAME AND USERNAME */}
                  <div className={styles.image_container}>
                    <ProfilePicture image_b64={friend.image} />
                  </div>
                  <Link href={`user/${friend.user}`} className={styles.username}>
                    {friend.name}<br /><small>{friend.user}</small>
                  </Link>
                  <FriendOptions friend={friend} />
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
                    {friend.weight !== null &&
                      <div>
                        <small>Weight</small>
                        <span className={styles.weight}><p>{friend.weight} kg</p></span>
                      </div>
                    }
                    {friend.fat !== null &&
                      <div>
                        <small>Fat</small>
                        <span className={styles.fat}><p>{friend.fat}%</p></span>
                      </div>
                    }
                  </div>

                  {/* TOP FEATS */}
                  {friend.top_feats.length > 0 &&
                    <div className={styles.top_feats}>
                      <small>Top Feats</small>
                      <div className={styles.badges}>
                        {friend.top_feats[0] && <div className={styles.badge_container}><Badge badgeInfo={friend.top_feats[0]} tooltip={false} /></div>}
                        {friend.top_feats[1] && <div className={styles.badge_container}><Badge badgeInfo={friend.top_feats[1]} tooltip={false} /></div>}
                        {friend.top_feats[2] && <div className={styles.badge_container}><Badge badgeInfo={friend.top_feats[2]} tooltip={false} /></div>}
                      </div>
                    </div>
                  }
                </div>
              </div>
              {/* DIVIDER */}
              <hr className={styles.divider} />
            </div>
          )}
        </div>
        <div className={styles.paginate}>
          <button className={styles.page_button} onClick={() => changePage(-1)}><FaChevronLeft /></button>
          <span>Page {page}</span>
          <button className={styles.page_button} onClick={() => changePage(+1)}><FaChevronRight /></button>
        </div>
      </div>
    </>
  )
}
