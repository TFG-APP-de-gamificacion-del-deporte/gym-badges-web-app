"use client";

import Logo from "@/components/logo/logo";
import styles from "./signup.module.scss"
import TextInput from "@/components/skewed-text-input/text-input";
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture";
import { useFormState } from "react-dom";
import signup from "@/actions/signup";
import { ChangeEvent, useRef, useState } from "react";
import { FaAt, FaCircleXmark, FaEnvelope, FaIdBadge, FaLock, FaUpload } from "react-icons/fa6";
import { USER_KEYS } from "@/api/models";

export default function Signup() {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(signup, initialState)

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
    <div className={styles.signup_layout}>
      <Logo/>
      <form action={formAction} className={styles.form}>
        <div className={styles.image_container}>
          { // DEFAULT OR UPLOADED IMAGE
            image
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
        {/* TEXT INPUTS */}
        <br/>
        <TextInput icon=<FaIdBadge size="1.2rem"/>  placeholder="Name"            name={USER_KEYS.NAME}                         required/>
        <TextInput icon=<FaAt size="1.2rem"/>       placeholder="Username"        name={USER_KEYS.USER_ID}                      required/>
        <TextInput icon=<FaEnvelope size="1.2rem"/> placeholder="Email"           name={USER_KEYS.EMAIL}        type="email"    required/>
        <br/>
        <TextInput icon=<FaLock size="1.2rem"/>     placeholder="Password"        name={USER_KEYS.PASSWORD}     type="password" required minLength={10}/>
        <TextInput icon=<FaLock size="1.2rem"/>     placeholder="Repeat Password" name={USER_KEYS.PASSWORD+"2"} type="password" required minLength={10}/>
        {/* ERROR MESSAGE */}
        {state?.message && <span className={styles.error}>
          <FaCircleXmark size="1.2rem"/> 
          {state?.message}
        </span>}
        <br/>
        {/* SUBMIT BUTTON */}
        <button type="submit" className={styles.signup}>
          <h3>Sign In</h3>
        </button>
      </form>

      {/* LOGIN BUTTON */}
      <div className={styles.login_form}>
        <p>Already have an account?</p>
        <a href="/login" className={styles.login}>
          <h3>Log In</h3>
        </a>
      </div>

    </div>
  )
}