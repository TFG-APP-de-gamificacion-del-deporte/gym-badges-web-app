import styles from "./profile-picture.module.scss"

export default function ProfilePicture({ image_b64 }: { image_b64: string }) {
  return (
    image_b64 
      // eslint-disable-next-line @next/next/no-img-element
      ? <img className={styles.image} src={"data:image/png;base64," + image_b64} alt=" "/>
      : <div className={styles.no_image}></div>
  )
}