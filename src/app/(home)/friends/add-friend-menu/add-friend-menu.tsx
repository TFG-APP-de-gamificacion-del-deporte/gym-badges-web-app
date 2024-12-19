"use client";

import TextInput from "@/components/skewed-text-input/text-input";
import styles from "./add-friend-menu.module.scss"
import { FaMagnifyingGlass, FaPlus, FaXmark } from "react-icons/fa6";
import { searchFriendAction } from "@/actions/friends";
import { useFormState } from "react-dom";
import { USER_KEYS } from "@/api/constants";

export default function AddFriendMenu() {
  const initialState = { message: "" }
  const [state, formAction] = useFormState(searchFriendAction, initialState)

  return (
    <>
      {/* ADD FRIEND BUTTON */}
      {/* @ts-ignore  */}
      <button className={styles.add_friend_button} popovertarget="add-friend-popover">
        <FaPlus/>
        Add friend
      </button>
      {/* ADD FRIEND POPOVER */}
      <div className={styles.add_friend_popover} id="add-friend-popover" popover="auto">
        {/* @ts-ignore  */}
        <header><button popovertarget="add-friend-popover">
          <FaXmark size="1.5rem"/>
        </button></header>
        <form action={formAction} className={styles.form}>
          <TextInput icon=<FaMagnifyingGlass/> placeholder="Search by Username" name={USER_KEYS.USER_ID} required/>
          { state?.message && <span>{state.message}</span>}
          <button className={styles.add_friend_button} type="submit">
            <FaMagnifyingGlass/>
            Search
          </button>
        </form>
      </div>
    </>
  )
}