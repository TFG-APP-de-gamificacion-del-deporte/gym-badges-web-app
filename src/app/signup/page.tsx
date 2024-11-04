"use client";

import Logo from "@/components/logo/logo";
import styles from "./signup.module.scss"
import TextInput from "@/components/skewed-text-input/text-input";
import DefaultProfilePicture from "@/components/default-profile-picture/default-profile-picture";
import { AtSymbolIcon, EnvelopeIcon, IdentificationIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/16/solid";
import signup from "@/actions/signup";

export default function Signup() {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(signup, initialState)

  return (
    <div className={styles.signup_layout}>
      <Logo/>
      <form action={formAction} className={styles.form}>
        <DefaultProfilePicture/>
        <label htmlFor="files" className={styles.upload_picture}>
          <ArrowUpTrayIcon/>
          <p>Select Image</p>
          <input type="file" accept="image/png, image/jpeg" id="files"/>
        </label>
        <br/>
        <TextInput icon=<IdentificationIcon/> placeholder="Name" required name="name"/>
        <TextInput icon=<AtSymbolIcon/> placeholder="Username" required name="user_id"/>
        <TextInput icon=<EnvelopeIcon/> placeholder="Email" type="email" required name="email"/>
        <br/>
        <TextInput icon=<LockClosedIcon/> placeholder="Password" type="password" required name="password"/>
        <TextInput icon=<LockClosedIcon/> placeholder="Repeat Password" type="password" required name="password2"/>
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