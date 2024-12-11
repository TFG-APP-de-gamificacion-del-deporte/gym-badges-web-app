import Link from "next/link";
import styles from "./rankings.module.scss"
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture";
import clsx from "clsx";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_KEYS } from "@/api/constants";

interface RankingUser {
  image: string,
  name: string,
  userID: string,
  level: number,
  streak: number,
}

const MAX_USERS = 20;

const myself: RankingUser = {
  image: "",
  name: "Diego",
  userID: "Diego02",
  level: 5,
  streak: 33,
}

const rankingUsers: RankingUser[] = Array.from({length: MAX_USERS}).map(_ => {return {
  image: "",
  name: "Name",
  userID: `@User_${Math.floor(Math.random()*10000)}`,
  level: 21,
  streak: 103,
}});


function RankingUser({ user, index, selfUserID }: { user: RankingUser, index: number, selfUserID: string }) {
  return (
    <div className={clsx(styles.user, {[styles.yourself]: user.userID === selfUserID})}>
      {/* RANK */}
      <div className={styles.rank}><span>{index + 1}</span></div>
      {/* IMAGE, NAME AND USERNAME */}
      <Link href={`user/${user.userID}`} className={styles.image_container}>
        <DefaultProfilePicture/>
      </Link>
      <Link href={`user/${user.userID}`} className={styles.username}>
        {user.name}<br/><small>{user.userID}</small>
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

function RankingList({ userList, selfUserID }: { userList: RankingUser[], selfUserID: string }) {
  return (
    <>
      <div className={styles.list}>
        { userList.map((user, index) => 
          <RankingUser user={user} index={index} key={user.userID} selfUserID={selfUserID}/>
        )}
      </div>
      {/* IF YOU ARE NOT IN THE LIST -> SHOW YOURSELF BELLOW */}
      { !rankingUsers.find(u => u.userID === selfUserID) &&
        <RankingUser user={myself} index={209} selfUserID={selfUserID}/>
      }
    </>
  )
}


export default function Page() {
  const selfUserID = cookies().get(AUTH_KEYS.AUTH_USER_ID);
  if (!selfUserID) {
    redirect("/login");
  }

  return (
    <div className={styles.layout}>
      {/* FRIENDS RANKING */}
      <section className={styles.ranking}>
        <h2>Friends Ranking</h2>
        <RankingList userList={rankingUsers} selfUserID={selfUserID?.value}/>
      </section>
      {/* GLOBAL RANKING */}
      <section className={styles.ranking}>
        <h2>Global Ranking</h2>
        <RankingList userList={rankingUsers} selfUserID={selfUserID?.value}/>
      </section>
    </div>
  )
}