"use client";

import { StatsKeys, USER_KEYS } from "@/api/constants";
import styles from "./add-new-data-menu.module.scss"
import { FaPlus, FaXmark } from "react-icons/fa6";
import { useFormState } from "react-dom";
import TextInput from "@/components/skewed-text-input/text-input";
import { addNewDataAction } from "@/actions/stats";
import { mutate } from "swr";
import { useEffect, useRef, useState } from "react";
import FatCalculator from "../fat-calculator/fat-calculator";

export default function AddNewDataMenu({ title, unit, dataKey }: { title: string, unit: string, dataKey: StatsKeys }) {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(addNewDataAction.bind(null, title, dataKey), initialState)
  
  const popoverID = `add-friend-popover-${dataKey}`

  useEffect(() => {
    mutate(`getDataAction-${dataKey}`)
  }, [state, dataKey])

  const [dataInput, setDataInput] = useState<string | undefined>(undefined);

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
        { dataKey === USER_KEYS.BODY_FAT && 
          <FatCalculator setResult={setDataInput}/>
        }
        <h3>New {title}</h3>
        <form action={formAction} className={styles.form}>
          <TextInput icon=<FaPlus/> placeholder={unit} name={dataKey} type="number" step={.01} required value={dataInput} setValue={setDataInput} />
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