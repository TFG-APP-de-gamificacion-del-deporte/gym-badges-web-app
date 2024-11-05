"use client";

import Logo from "@/components/logo/logo";
import styles from "./signup.module.scss"
import TextInput from "@/components/skewed-text-input/text-input";
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture";
import { AtSymbolIcon, EnvelopeIcon, IdentificationIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/16/solid";
import signup from "@/actions/signup";
import { ChangeEvent, useRef, useState } from "react";

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
          {
            image
            ? <img src={image as string} alt="Uploaded image" />
            : <DefaultProfilePicture/>
          }
          { 
            image &&
            <button className={styles.remove_image_button} type="button" onClick={handleRemoveImage}>
              <XCircleIcon/>
            </button> 
          }
          <label htmlFor="files" className={styles.upload_picture}>
            <ArrowUpTrayIcon/>
            <p>Select Image</p>
            <input type="file" accept="image/png, image/jpeg" id="files" name="image" onChange={handleImageUpload} ref={imgInputRef}/>
          </label>
        </div>
        <br/>
        <TextInput icon=<IdentificationIcon/> placeholder="Name"            name="name"                       required/>
        <TextInput icon=<AtSymbolIcon/>       placeholder="Username"        name="user_id"                    required/>
        <TextInput icon=<EnvelopeIcon/>       placeholder="Email"           name="email"      type="email"    required/>
        <br/>
        <TextInput icon=<LockClosedIcon/>     placeholder="Password"        name="password"   type="password" required/>
        <TextInput icon=<LockClosedIcon/>     placeholder="Repeat Password" name="password2"  type="password" required/>
        {/* ERROR MESSAGE */}
        {state?.message && <span className={styles.error}>
          <XCircleIcon/> 
          {state?.message}
        </span>}
        <br/>
        {/* SUBMIT BUTTON */}
        <button type="submit" className={styles.signup}>
          <h3>Sign In</h3>
        </button>
      </form>

      <div className={styles.login_form}>
        <p>Already have an account?</p>
        <a href="/login" className={styles.login}>
          <h3>Log In</h3>
        </a>
      </div>

    </div>
  )
}