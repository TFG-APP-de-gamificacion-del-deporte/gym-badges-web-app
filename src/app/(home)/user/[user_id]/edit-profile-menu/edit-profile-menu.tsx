"use client";

import styles from "./edit-profile-menu.module.scss"
import { FaCircleXmark, FaEnvelope, FaFloppyDisk, FaIdBadge, FaPen, FaUpload, FaXmark } from "react-icons/fa6";
import { useFormState } from "react-dom";
import { editProfileAction } from "@/actions/user";
import TextInput from "@/components/skewed-text-input/text-input";
import { USER_KEYS } from "@/api/constants";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProfilePicture from "@/components/profile-picture/profile-picture";
import useDefaultImage from "@/utils/defaultImage";
import useUser from "@/utils/useUser";
import { redirect } from "next/navigation";

const MAX_IMAGE_SIZE = 2.5;

export default function EditProfileMenu() {
  const { user, error, isLoading } = useUser();
  
  const defaultImage_b64 = useDefaultImage();
  
  const [image_b64, setImage_b64] = useState("");
  const [maxSizeError, setMaxSizeError] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  
  const initialState = { message: "" }
  const [state, formAction] = useFormState(editProfileAction.bind(null, image_b64), initialState)
  
  function handleFileChange(evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.target?.files?.item(0)
    if (!file) {
      return;
    }
    
    // Check size is less than 2.5mb
    if (file.size > MAX_IMAGE_SIZE * 1048576) {
      setMaxSizeError(true);
      return;
    }
    setMaxSizeError(false);

    setImgUploaded(true)
    
    // Convert the image file to base64
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage_b64(reader.result.split(",")[1]);  // Exclude the "data:image/*;base64," prefix
      }
    };
    reader.readAsDataURL(file);
  }
  
  function handleRemoveImage() {
    setImgUploaded(false)
    setImage_b64(defaultImage_b64);
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  }
  
  // Initialize image to user's current one
  const [imgUploaded, setImgUploaded] = useState(true);
  useEffect(() => {
    if (user) {
      setImage_b64(user.image);
    }
  }, [user]);

  if (error) {
    redirect("/internal-error");
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
            { image_b64 && <ProfilePicture image_b64={image_b64}/> }
          </div>
          { // UPLOAD OR DELETE BUTTON 
            imgUploaded
            ? <button className={styles.remove_image_button} type="button" onClick={handleRemoveImage}>
                <FaCircleXmark size="1.2rem"/>
                <p>Delete Image</p>
              </button>
            : <label htmlFor="files" className={styles.upload_picture_button}>
                <FaUpload/>
                <p>Select Image</p>
              </label>
          }
          <input type="file" accept="image/png, image/jpeg" id="files" name={USER_KEYS.IMAGE} onChange={handleFileChange} ref={imgInputRef} hidden/>
          { maxSizeError && 
            <span className={styles.error}>
              <FaCircleXmark size="1.2rem"/>
              Images can only be up to {MAX_IMAGE_SIZE}mb in size.
            </span>
          }
          {/* NAME */}
          <TextInput icon=<FaIdBadge size="1.2rem"/> placeholder="New name" name={USER_KEYS.NAME}/>
          {/* EMAIL */}
          <TextInput icon=<FaEnvelope size="1.2rem"/> placeholder="New email" name={USER_KEYS.EMAIL} type="email"/>
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