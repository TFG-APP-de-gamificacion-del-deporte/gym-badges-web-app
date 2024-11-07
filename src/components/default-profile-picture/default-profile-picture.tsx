import { UserIcon } from "@heroicons/react/24/solid"
import styles from "./default-profile-picture.module.scss"

export default function DefaultProfilePicture({ hexColor }: { hexColor?: string }) {
  let style = {backgroundColor: hexColor};
  
  // If no color 
  if (!hexColor) {
    const red = [178, 22, 22];
    const purple = [140, 25, 231];
    
    // Random color between red and purple
    const pictureColor = [
      Math.floor(Math.random() * Math.abs(red[0] - purple[0]) + Math.min(red[0], purple[0])),
      Math.floor(Math.random() * Math.abs(red[1] - purple[1]) + Math.min(red[1], purple[1])),
      Math.floor(Math.random() * Math.abs(red[2] - purple[2]) + Math.min(red[2], purple[2]))
    ]
    
    style = {backgroundColor: `rgb(${pictureColor[0]}, ${pictureColor[1]}, ${pictureColor[2]})`};
  }

  return (
    <div className={styles.default_profile_picture} style={style}>
      <UserIcon/>
    </div>
  )
}