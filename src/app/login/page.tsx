"use client";

import Logo from '@/components/logo/logo'
import styles from './login.module.scss'
import Link from 'next/link'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

import LineSeparator from '@/components/line-separator/line-separator'
import TextInput from '@/components/skewed-text-input/text-input'
import login from '@/actions/login'
import { useFormState } from 'react-dom';
import { XCircleIcon } from '@heroicons/react/16/solid';

export default function Login() {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(login, initialState)

  return (
    <div className={styles.login_layout}>
      <Logo/>

      <span className={styles.slogan}>Add Progression to the Gym</span>

      <form action={formAction} className={styles.form}>
        {/* TEXT INPUTS */}
        {/* TODO Poner type="email" */}
        <TextInput icon=<EnvelopeIcon/> placeholder="Email" required name="email" />
        <TextInput icon=<LockClosedIcon/> type="password" placeholder="Password" required name="password" />
        {/* ERROR MESSAGE */}
        {state?.message && <span className={styles.error}>
          <XCircleIcon /> 
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