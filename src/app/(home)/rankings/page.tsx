"use client";

import Link from "next/link";
import styles from "./rankings.module.scss"
import clsx from "clsx";
import { redirect } from "next/navigation";
import ProfilePicture from "@/components/profile-picture/profile-picture";
import { useState } from "react";
import useSWR from "swr";
import { getFriendsRankingAction, getGlobalRankingAction } from "@/actions/rankings";
import { Ranking, RankedUser } from "@/api/models";
import useUser from "@/utils/useUser";


function RankingUser({ user, selfUserID }: { user: RankedUser, selfUserID: string }) {
  return (
    <div className={clsx(styles.user, {[styles.yourself]: user.user_id === selfUserID})}>
      {/* RANK */}
      <div className={styles.rank}><span>{Math.max(1, user.rank)}</span></div>
      {/* IMAGE, NAME AND USERNAME */}
      <Link href={`user/${user.user_id}`} className={styles.image_container}>
        <ProfilePicture image_b64={user.image}/>
      </Link>
      <Link href={`user/${user.user_id}`} className={styles.username}>
        {user.name}<br/><small>{user.user_id}</small>
      </Link>
      {/* LEVEL */}
      <div className={styles.stat}>
        <small>Lvl</small>
        <span className={styles.level}><p>{user.level}</p></span>
      </div>
      {/* STREAK */}
      <div className={styles.stat}>
        <small className={styles.streak_title}>Streak</small>
        <span className={styles.streak}><p>{user.streak} Weeks</p></span>
      </div>
    </div>
  )
}

function RankingList({ ranking, selfUserID }: { ranking: Ranking, selfUserID: string }) {
  return (
    <>
      { ranking.ranking.length > 0 &&
        <div className={styles.list}>
          { ranking.ranking.map(user => 
            <RankingUser user={user} selfUserID={selfUserID} key={user.user_id}/>
          )}
        </div>
      }
      {/* IF YOU ARE NOT IN THE LIST -> SHOW YOURSELF BELLOW */}
      { ranking.yourself &&
        <RankingUser user={ranking.yourself} selfUserID={ranking.yourself.user_id}/>
      }
    </>
  )
}


export default function Page() {
  const [globalPage, setGlobalPage] = useState(1);
  const [friendsPage, setFriendsPage] = useState(1);
  
  const { data: globalRanking, error: globalError, isLoading: globalLoading } = useSWR("getGlobalRanking", getGlobalRankingAction.bind(null, globalPage));
  const { data: friendsRanking, error: friendsRrror, isLoading: friendsLoading } = useSWR("getFriendsRanking", getFriendsRankingAction.bind(null, friendsPage));
  const { user, error: userError, isLoading: userLoading } = useUser();
  
  if (globalError || friendsRrror || userError) {
    redirect("/internal-error");
  }
  
  return (
    <div className={styles.layout}>
      {/* FRIENDS RANKING */}
      <section className={styles.ranking}>
        <h2>Friends Ranking</h2>
        { friendsRanking && user && <RankingList ranking={friendsRanking} selfUserID={user.user_id}/> }
      </section>
      {/* GLOBAL RANKING */}
      <section className={styles.ranking}>
        <h2>Global Ranking</h2>
        { globalRanking && user && <RankingList ranking={globalRanking} selfUserID={user.user_id}/> }
      </section>
    </div>
  )
}