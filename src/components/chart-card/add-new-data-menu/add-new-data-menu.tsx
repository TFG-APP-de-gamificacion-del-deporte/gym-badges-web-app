"use client";

import { StatsKeys } from "@/api/models";
import styles from "./add-new-data-menu.module.scss"
import { FaPlus, FaXmark } from "react-icons/fa6";
import { useFormState } from "react-dom";
import TextInput from "@/components/skewed-text-input/text-input";
import { addNewDataAction } from "@/actions/stats";
import { mutate } from "swr";
import { useEffect } from "react";

export default function AddNewDataMenu({ title, unit, dataKey }: { title: string, unit: string, dataKey: StatsKeys }) {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(addNewDataAction.bind(null, title, dataKey), initialState)
  
  const popoverID = `add-friend-popover-${dataKey}`

  useEffect(() => {
    mutate(`getDataAction-${dataKey}`)
  }, [state, dataKey])

  return (
    <>
      {/* @ts-ignore  */}
      <button className={styles.new_button} popovertarget={popoverID}>
        <FaPlus/>
        <span>New {title}</span>
      </button>
      {/* POPOVER */}
      <div className={styles.add_friend_popover} id={popoverID} popover="auto">
        {/* @ts-ignore  */}
        <header><button popovertarget={popoverID}>
          <FaXmark size="1.5rem"/>
        </button></header>
        <h3>New {title}</h3>
        <form action={formAction} className={styles.form}>
          <TextInput icon=<FaPlus/> placeholder={unit} name={dataKey} type="number" step={.01} required/>
          { state?.message && <span>{state.message}</span>}
          <button className={styles.new_button} type="submit">
            <FaPlus/>
            <span>Add New {title}</span>
          </button>
        </form>
      </div>
    </>
  )
}