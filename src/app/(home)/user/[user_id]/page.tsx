import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import UserPreferences from "@/components/user-preferences/user-preferences"
import Badge from "@/components/badge/badge"
import { getUserAction } from "@/actions/user"
import EditProfileMenu from "./edit-profile-menu/edit-profile-menu"
import ChangeTopFeatsMenu from "./change-top-feats-menu/change-top-feats-menu"


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
          {Array.from({length: 3}).map((_, i) =>
            <div key={i}>
              { user.top_feats[i]
                ? <>
                    <div className={styles.badge_container}>
                      <Badge badgeInfo={user.top_feats[i]} tooltip={false} noButtons/>
                    </div>
                    <div>
                      <h3>{user.top_feats[i].name}</h3>
                      {/* <p>{description}</p> */}
                    </div>
                  </>
                : <div key={i} className={styles.no_badge}/>
              }
            </div>
          )}
        </div>
        <ChangeTopFeatsMenu/>
      </section>

      {/* PREFERENCES */}
      <section>
        <UserPreferences dbPreferences={user.preferences}/>
      </section>
    </div>
  )
}