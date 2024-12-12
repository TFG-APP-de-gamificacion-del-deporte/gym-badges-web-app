"use client";

import { User } from "@/api/models";
import styles from "./edit-profile.module.scss"
import { FaCircleXmark, FaEnvelope, FaFloppyDisk, FaIdBadge, FaPen, FaUpload, FaXmark } from "react-icons/fa6";
import { useFormState } from "react-dom";
import { editProfile } from "@/actions/user";
import TextInput from "@/components/skewed-text-input/text-input";
import { USER_KEYS } from "@/api/constants";
import { ChangeEvent, useRef, useState } from "react";
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture";

export default function EditProfileMenu({ user }: { user: User }) {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(editProfile, initialState)

  // TODO Paint image from the API
  const [image, setImage] = useState<string>();
  const imgInputRef = useRef<HTMLInputElement>(null);
  
  function handleImageUpload(evt: ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files[0]) {
      setImage(URL.createObjectURL(evt.target.files[0]));
    }
  }

  function handleRemoveImage() {
    setImage(undefined)
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  }
  
  return (
    <>
      {/* EDIT PROFILE BUTTON */}
      {/* @ts-ignore  */}
      <button className={styles.edit_button} popovertarget="edit-profile">
        <FaPen/>
        <p>Edit profile</p>
      </button>
      {/* POPOVER */}
      <div className={styles.popover} id="edit-profile" popover="auto">
        {/* @ts-ignore  */}
        <header><button popovertarget="edit-profile">
          <FaXmark size="1.5rem"/>
        </button></header>
        <form action={formAction} className={styles.form}>
          {/* IMAGE */}
          <div className={styles.image_container}>
            { // DEFAULT OR UPLOADED IMAGE
              image
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={image as string} alt="Uploaded image"/>
              : <DefaultProfilePicture/>
            }
            { // UPLOAD OR DELETE BUTTON 
              image
              ? <button className={styles.remove_image_button} type="button" onClick={handleRemoveImage}>
                  <FaCircleXmark size="1.2rem"/>
                  <p>Delete Image</p>
                </button>
              : <label htmlFor="files" className={styles.upload_picture_button}>
                  <FaUpload/>
                  <p>Select Image</p>
                </label>
            }
            <input type="file" accept="image/png, image/jpeg" id="files" name={USER_KEYS.IMAGE} onChange={handleImageUpload} ref={imgInputRef} hidden/>
          </div>
          {/* NAME */}
          <TextInput icon=<FaIdBadge size="1.2rem"/> placeholder="New name" name={USER_KEYS.NAME} required/>
          {/* EMAIL */}
          <TextInput icon=<FaEnvelope size="1.2rem"/> placeholder="New email" name={USER_KEYS.EMAIL} type="email" required/>
          {/* FORM MESSAGE */}
          { state?.message && <span>{state.message}</span>}
          {/* SAVE BUTTON */}
          <button className={styles.save_button} type="submit">
            <FaFloppyDisk/>
            <span>Save</span>
          </button>
        </form>
      </div>
    </>
  )
}