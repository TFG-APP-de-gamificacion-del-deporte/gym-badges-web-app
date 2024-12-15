import styles from "./default-profile-picture.module.scss"

export default function ProfilePicture({ image_b64 }: { image_b64: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={styles.image} src={"data:image/png;base64," + image_b64} alt=" "/>
  )
}