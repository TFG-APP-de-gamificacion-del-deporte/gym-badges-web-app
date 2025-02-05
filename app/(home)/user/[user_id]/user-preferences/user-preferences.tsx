"use client";

import styles from "./user-preferences.module.scss"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useState } from "react";
import { Preference } from "@/api/models";
import { setPreferenceAction } from "@/actions/user";
import { PREFERENCES } from "@/api/constants";


export default function UserPreferences({ dbPreferences }: { dbPreferences: Preference[] }) {

  const [on1, setOn1] = useState(dbPreferences[PREFERENCES.PRIVATE_ACCOUNT.ID - 1].on);
  const [on2, setOn2] = useState(dbPreferences[PREFERENCES.HIDE_WEIGHT_AND_FAT.ID - 1].on);

  const preferences = [
    // preference_id: 1
    {
      name: PREFERENCES.PRIVATE_ACCOUNT.NAME,
      description: PREFERENCES.PRIVATE_ACCOUNT.DESCRIPTION,
      on: on1,
      toggle: () => {
        setPreferenceAction({ preference_id: PREFERENCES.PRIVATE_ACCOUNT.ID, on: !on1 });
        setOn1(!on1);
      },
    },
    // preference_id: 2
    {
      name: PREFERENCES.HIDE_WEIGHT_AND_FAT.NAME,
      description: PREFERENCES.HIDE_WEIGHT_AND_FAT.DESCRIPTION,
      on: on2,
      toggle: () => {
        setPreferenceAction({ preference_id: PREFERENCES.HIDE_WEIGHT_AND_FAT.ID, on: !on2 });
        setOn2(!on2);
      },
    },
  ]

  return (
    <>
      <h2>Preferences</h2>
      <ul className={styles.settings}>
        {preferences.map(({ name, description, on, toggle }) => 
          <li key={name} onClick={toggle}>
            <button>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              { 
                on
                ? <FaToggleOn size="2.25rem" style={{minWidth: "2.25rem"}}/>
                : <FaToggleOff size="2.25rem" style={{minWidth: "2.25rem"}}/>
              } 
            </button>
          </li>
        )}
      </ul>
    </>
  )
}