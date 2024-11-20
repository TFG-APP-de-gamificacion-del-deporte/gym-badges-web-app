import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import { redirect } from "next/navigation"
import { API_ENDPOINTS, API_KEYS } from "@/config/API"
import { cookies } from "next/headers"
import { FaArrowsRotate, FaCircleXmark, FaPen, FaStar, FaToggleOff } from "react-icons/fa6"
import UserPreferences from "@/components/user-preferences/user-preferences"

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
    title: "Badge Title 1",
    description: "This is the description for the badge, explaining what it is.",
  },
  {
    title: "Badge Title 2",
    description: "This is the description for the badge, explaining what it is.",
  },
  {
    title: "Badge Title 3",
    description: "This is the description for the badge, explaining what it is.",
  },
]


export default async function Page({ params }: { params: { user_id: string } }) {
  const authUserID = cookies().get(API_KEYS.AUTH_USER_ID_KEY);
  const token = cookies().get(API_KEYS.TOKEN_KEY);

  if (!authUserID || !token) {
    redirect("/login");
  }  

  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.getUser}/${params.user_id}`, {
      method: "GET",
      headers: {
        [API_KEYS.AUTH_USER_ID_KEY]: authUserID.value,
        [API_KEYS.TOKEN_KEY]: token.value,
      }
    });
  } catch (error) {
    // API connection error
    redirect("/internal-error");
  } 

  if (res.status == 401) {  // Unauthorized
    redirect("/login");
  }
  if (res.status == 404) {  // User not found
    return <div className={styles.user_not_found}>
      <FaCircleXmark size="1.2rem"/>
      User not found
    </div>
  }
  if (!res.ok) {  // Other errors
    redirect("/internal-error");
  }

  const resBody = await res.json();
  const userInfo: GetUserResponse = {
    user_id: resBody.user_id,
    body_fat: resBody.body_fat,
    current_week: resBody.current_week,
    experience: resBody.experience,
    image: resBody.image,
    name: resBody.name,
    streak: resBody.streak,
    weight: resBody.weight,
  };

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
            <span className={styles.weight}>{userInfo.weight} KG</span>
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
          {topFeats.slice(0, 3).map(({ title, description }) =>
            <div key={title}>
              <div className={styles.badge_icon}><FaStar size="35px"/></div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
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