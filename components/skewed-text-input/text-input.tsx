import { Dispatch, HTMLInputTypeAttribute, ReactNode, RefObject, SetStateAction } from "react";
import styles from "./text-input.module.scss"


export default function TextInput({ 
  icon,
  type="text",
  placeholder,
  required=false,
  name="",
  minLength,
  step,
  min,
  max,
  ref,
  value,
  setValue,
}: {
  icon: ReactNode,
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  required?: boolean,
  name?: string,
  minLength?: number,
  step?: number,
  min?: number,
  max?: number,
  ref?: RefObject<HTMLInputElement>,
  value?: string | undefined,
  setValue?: Dispatch<SetStateAction<string | undefined>>
}) {
  return (
    <label htmlFor={`input-${name}`} className={styles.text_field}>
      <div>
        {icon}
        <input 
          type={type} 
          id={`input-${name}`} 
          name={name} 
          placeholder={placeholder} 
          required={required} 
          minLength={minLength} 
          step={step} 
          min={min} 
          max={max} 
          ref={ref}
          value={value}
          onChange={(e => setValue && setValue(e.target.value))}
        /> 
      </div>
    </label>
  )
}