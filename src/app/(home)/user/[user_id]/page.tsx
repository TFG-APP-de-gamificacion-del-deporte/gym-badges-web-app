import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import { FaArrowsRotate } from "react-icons/fa6"
import UserPreferences from "@/components/user-preferences/user-preferences"
import Badge from "@/components/badge/badge"
import { getUserAction } from "@/actions/user"
import EditProfileMenu from "./edit-profile/edit-profile"

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

  const user = await getUserAction(params.user_id);

  return (
    <div className={styles.layout}>
      {/* IMAGE AND MAIN INFO */}
      <section>
        <div className={styles.image_container}>
          <DefaultProfilePicture/>
        </div>
        <div className={styles.info_card}>
          <div>
            <span className={styles.streak}>{user.streak} Weeks</span>
            <p>Streak</p>
          </div>
          <div>
            <span className={styles.fat}>{user.body_fat}%</span>
            <p>Fat</p>
          </div>
          <div className={styles.name}>
            <span>{user.name}</span>  
            <p>@{user.user_id}</p>
          </div>
          <div>
            <span className={styles.weight}>{user.weight} kg</span>
            <p>Weight</p>
          </div>
          <div>
            {/* TODO get number of friends from api */}
            <span>28</span>
            <p>Friends</p>
          </div>
        </div>
        <EditProfileMenu user={user}/>
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
        <UserPreferences dbPreferences={user.preferences}/>
      </section>
    </div>
  )
}