import { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./text-input.module.scss"


export default function TextInput({ 
  icon,
  type="text",
  placeholder,
  required=false,
  name="",
  minLength,
  step,
}: {
  icon: ReactNode,
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  required?: boolean,
  name?: string,
  minLength?: number,
  step?: number,
}) {
  return (
    <label htmlFor={`input-${name}`} className={styles.text_field}>
      <div>
        {icon}
        <input type={type} id={`input-${name}`} name={name} placeholder={placeholder} required={required} minLength={minLength} step={step}/> 
      </div>
    </label>
  )
}