import Logo from '@/components/logo/logo'
import styles from './login.module.scss'
import Link from 'next/link'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import TextInput from '@/components/skewed-text-input/text-input'
import clsx from 'clsx'
import LineSeparator from '@/components/line-separator/line-separator'

export default function Login() {
  const input_btn_style = { width: "min(80vw, 25rem)" }

  return (
    <div className={styles.login_layout}>
      <Logo/>

      <span className={styles.slogan}>Add Progression to the Gym</span>

      <form action="" className={styles.login_form}>
        <TextInput icon=<EnvelopeIcon/> placeholder="Email" required />
        <TextInput icon=<LockClosedIcon/> type="password" placeholder="Password" required />
        <button type="submit" className={styles.login}>
          <div>
            <h3>Log In</h3>
          </div>
        </button>
        
        <p>Or continue with</p>
        <div className={styles.separator}><LineSeparator/></div>
        <button type="button" className={styles.google}>
          <div><h3>Google</h3></div>
        </button>
        
        <p>New arround?</p>
        <Link href="signup" className={styles.signup}>
          <div><h3>Join Now for Free!</h3></div>
        </Link>
      </form>
    </div>
  )
}