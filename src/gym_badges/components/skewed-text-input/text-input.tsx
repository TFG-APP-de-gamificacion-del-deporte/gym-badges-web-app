import { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./text-input.module.scss"


export default function TextInput({ 
  icon,
  type="text",
  placeholder,
}: {
  icon: ReactNode,
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
}) {
  return (
    <label htmlFor="input" className={styles.text_field}>
      <div>
        {icon}
        <input type={type} id="input" placeholder={placeholder}/> 
      </div>
    </label>
  )
}