"use client";

import Logo from "@/components/logo/logo"
import styles from "./login.module.scss"
import Link from "next/link"
import LineSeparator from "@/components/line-separator/line-separator"
import TextInput from "@/components/skewed-text-input/text-input"
import login from "@/actions/login"
import { useFormState } from "react-dom";
import { FaCircleXmark, FaLock, FaUser } from "react-icons/fa6";
import { USER_KEYS } from "@/api/models";

export default function Login() {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(login, initialState)

  return (
    <div className={styles.login_layout}>
      <Logo/>

      <span className={styles.slogan}>Add Progression to the Gym</span>

      <form action={formAction} className={styles.form}>
        {/* TEXT INPUTS */}
        <TextInput icon=<FaUser size="1.2rem"/> required placeholder="Username" name={USER_KEYS.USER_ID}/>
        <TextInput icon=<FaLock size="1.2rem"/> required placeholder="Password" name={USER_KEYS.PASSWORD} type="password" minLength={10}/>
        {/* ERROR MESSAGE */}
        {state?.message && <span className={styles.error}>
          <FaCircleXmark size="1.2rem"/> 
          {state?.message}
        </span>}
        {/* SUBMIT BUTTON */}
        <button type="submit" className={styles.login}>
          <div>
            <h3>Log In</h3>
          </div>
        </button>
      </form>

      <div className={styles.form}>
        <p>Or continue with</p>
        <div className={styles.separator}><LineSeparator/></div>
        <button type="button" className={styles.google}>
          <div><h3>Google</h3></div>
        </button>
        
        <p>New arround?</p>
        <Link href="signup" className={styles.signup}>
          <div><h3>Join Now for Free!</h3></div>
        </Link>
      </div>
    </div>
  )
}