import { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./text-input.module.scss"


export default function TextInput({ 
  icon,
  type="text",
  placeholder,
  required=false,
}: {
  icon: ReactNode,
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  required?: boolean
}) {
  return (
    <label htmlFor="input" className={styles.text_field}>
      <div>
        {icon}
        <input type={type} id="input" placeholder={placeholder} required={required}/> 
      </div>
    </label>
  )
}