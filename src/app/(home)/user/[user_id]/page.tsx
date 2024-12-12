import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import UserPreferences from "@/components/user-preferences/user-preferences"
import Badge from "@/components/badge/badge"
import { getUserAction } from "@/actions/user"
import EditProfileMenu from "./edit-profile-menu/edit-profile-menu"
import ChangeTopFeatsMenu from "./change-top-feats-menu/change-top-feats-menu"
import { TopFeat } from "@/api/models"

const topFeats = [
  {
    id: 4,
    name: "Do thirty push-ups",
    image: "4.svg",
    description: "",
    achieved: true,
  },
  {
    id: 12,
    name: "Bench press 100kg for 5 reps",
    image: "12.svg",
    description: "",
    achieved: true,
  },
  {
    id: 25,
    name: "Biceps curl 30kg dumbbell",
    image: "25.svg",
    description: "",
    achieved: true,
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
        <EditProfileMenu/>
      </section>

      {/* TOP FEATS */}
      <section>
        <h2>Top Feats</h2>
        <p>Highlight the badges you feel most proud of.</p>
        <div className={styles.top_feats_card}>
          {/* TODO Use api user's top feats */}
          {topFeats.slice(0, 3).map(badgeInfo =>
            <div key={badgeInfo.id}>
              <div className={styles.badge_container}>
                <Badge badgeInfo={badgeInfo} tooltip={false} noButtons/>
              </div>
              <div>
                <h3>{badgeInfo.name}</h3>
                {/* <p>{description}</p> */}
              </div>
            </div>
          )}
        </div>
        <ChangeTopFeatsMenu user={user} tempTF={topFeats}/>
      </section>

      {/* PREFERENCES */}
      <section>
        <UserPreferences dbPreferences={user.preferences}/>
      </section>
    </div>
  )
}