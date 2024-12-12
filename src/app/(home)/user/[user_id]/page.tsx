import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { FaArrowsRotate, FaCircleXmark, FaPen } from "react-icons/fa6"
import UserPreferences from "@/components/user-preferences/user-preferences"
import Badge from "@/components/badge/badge"
import { AUTH_KEYS } from "@/api/constants"
import { USER_ENDPOINTS } from "@/api/endpoints"
import { getUserAction } from "@/actions/user"

type GetUserResponse = {
  user_id: string,
  body_fat: number,
  current_week: boolean[],
  experience: number,
  image: string | null,  // url
  name: string,
  streak: number,
  weight: number,
}

const topFeats = [
  {
    id: 4,
    name: "Do thirty push-ups",
  },
  {
    id: 12,
    name: "Bench press 100kg for 5 reps",
  },
  {
    id: 25,
    name: "Biceps curl 30kg dumbbell",
  },
]


export default async function Page({ params }: { params: { user_id: string } }) {

  const userInfo = await getUserAction(params.user_id);

  return (
    <div className={styles.layout}>
      {/* IMAGE AND MAIN INFO */}
      <section>
        <div className={styles.image_container}>
          <DefaultProfilePicture/>
        </div>
        <div className={styles.info_card}>
          <div>
            <span className={styles.streak}>{userInfo.streak} Weeks</span>
            <p>Streak</p>
          </div>
          <div>
            <span className={styles.fat}>{userInfo.body_fat}%</span>
            <p>Fat</p>
          </div>
          <div className={styles.name}>
            <span>{userInfo.name}</span>  
            <p>@{userInfo.user_id}</p>
          </div>
          <div>
            <span className={styles.weight}>{userInfo.weight} kg</span>
            <p>Weight</p>
          </div>
          <div>
            {/* TODO get number of friends from api */}
            <span>28</span>
            <p>Friends</p>
          </div>
        </div>
        <button className={styles.edit_button}>
          <FaPen/>
          <p>Edit profile</p>
        </button>
      </section>

      {/* TOP FEATS */}
      <section>
        <h2>Top Feats</h2>
        <p>Highlight the badges you feel most proud of.</p>
        <div className={styles.top_feats_card}>
          {topFeats.slice(0, 3).map(badgeInfo =>
            <div key={badgeInfo.id}>
              <div className={styles.badge_container}><Badge badgeInfo={badgeInfo} tooltip={false}/></div>
              <div>
                <h3>{badgeInfo.name}</h3>
                {/* <p>{description}</p> */}
              </div>
            </div>
          )}
        </div>
        <button className={styles.edit_button}>
          <FaArrowsRotate/>
          <p>Change badges</p>
        </button>
      </section>

      {/* PREFERENCES */}
      <section>
        <UserPreferences/>
      </section>
    </div>
  )
}