import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import UserPreferences from "@/app/(home)/user/[user_id]/user-preferences/user-preferences"
import Badge from "@/components/badge/badge"
import { getUserAction } from "@/actions/user"
import EditProfileMenu from "./edit-profile-menu/edit-profile-menu"
import ChangeTopFeatsMenu from "./change-top-feats-menu/change-top-feats-menu"
import getAuthCookies from "@/utils/getAuthCookies"
import { getFriendsAction } from "@/actions/friends"
import { PREFERENCES } from "@/api/constants"
import { FaEyeSlash } from "react-icons/fa6"


export default async function Page({ params }: { params: { user_id: string } }) {

  const { authUserID } = getAuthCookies();
  const user = await getUserAction(params.user_id);
  const friends = await getFriendsAction(params.user_id);

  const isOwnProfile = user.user_id === authUserID;
  const isFriend = friends.some(f => f.user === authUserID);
  const privateProfile = user.preferences[PREFERENCES.PRIVATE_ACCOUNT.ID - 1].on;
  const hideStats = user.preferences[PREFERENCES.HIDE_WEIGHT_AND_FAT.ID - 1].on;

  // Private profiles for non-friends
  if (!isOwnProfile && privateProfile && !isFriend) {
    return (
      <div className={styles.layout}>
        <section>
          <div className={styles.image_container}>
            <DefaultProfilePicture/>
          </div>
          <div className={styles.info_card}>
            <div className={styles.name}>
              <span>{user.name}</span>  
              <p>@{user.user_id}</p>
            </div>
          </div>
        </section>
        <p className={styles.private_msg}>
          <FaEyeSlash size="1.2rem"/>
          <span>This profile is private.</span>
        </p>
      </div>
    )
  }

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
          { (isOwnProfile || !hideStats) &&
            <div>
              <span className={styles.fat}>{user.body_fat || "--"}%</span>
              <p>Fat</p>
            </div>
          }
          <div className={styles.name}>
            <span>{user.name}</span>  
            <p>@{user.user_id}</p>
          </div>
          { (isOwnProfile || !hideStats) &&
            <div>
              <span className={styles.weight}>{user.weight || "--"} kg</span>
              <p>Weight</p>
            </div>
          }
          <div>
            <span>{friends.length}</span>
            <p>Friend{friends.length !== 1 && "s"}</p>
          </div>
        </div>
        { isOwnProfile && <EditProfileMenu/> }
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
        { isOwnProfile && <ChangeTopFeatsMenu/> }
      </section>

      {/* PREFERENCES */}
      { isOwnProfile &&
        <section>
          <UserPreferences dbPreferences={user.preferences}/>
        </section>
      }
    </div>
  )
}