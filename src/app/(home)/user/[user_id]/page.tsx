import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture"
import styles from "./user_id.module.scss"
import { StarIcon } from "@heroicons/react/24/outline"
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/16/solid"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

const preferences = [
  {
    name: "Private account",
    description: "Only your friends will be able to see your profile.",
  },
  {
    name: "Hide weight and fat",
    description: "Don’t show weight and fat for anyone (not even your friends).",
  },
  {
    name: "Some other setting 1",
    description: "Description for this other setting",
  },
  {
    name: "Some other setting 2",
    description: "Description for this other setting",
  },
  {
    name: "Some other setting 3",
    description: "Description for this other setting",
  },
]

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


export default function Page({ params }: { params: { user_id: string } }) {
  return (
    <div className={styles.layout}>
      {/* IMAGE AND MAIN INFO */}
      <section>
        <div className={styles.image_container}>
          <DefaultProfilePicture/>
        </div>
        <div className={styles.info_card}>
          <div>
            <span>33 Weeks</span>
            <p>Streak</p>
          </div>
          <div>
            <span>18%</span>
            <p>Fat</p>
          </div>
          <div>
            <span>Name</span>
            <p>@Username</p>
          </div>
          <div>
            <span>86 KG</span>
            <p>Weight</p>
          </div>
          <div>
            <span>28</span>
            <p>Friends</p>
          </div>
        </div>
        <button className={styles.edit_button}>
          <PencilIcon/>
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
              <div className={styles.badge_icon}><StarIcon/></div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          )}
        </div>
        <button className={styles.edit_button}>
          <ArrowPathIcon/>
          <p>Edit profile</p>
        </button>
      </section>

      {/* PREFERENCES */}
      <section>
        <h2>Preferences</h2>
        <ul className={styles.settings}>
          {preferences.map(({ name, description }) => 
            <li key={name}>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <CheckCircleIcon/>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}