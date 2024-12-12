"use client";

import styles from "./user-preferences.module.scss"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useState } from "react";
import { Preference } from "@/api/models";


export default function UserPreferences({ dbPreferences }: { dbPreferences: Preference[] }) {

  const [on1, setOn1] = useState(dbPreferences[0].on);
  const [on2, setOn2] = useState(dbPreferences[1].on);

  const preferences = [
    // preference_id -> 1
    {
      name: "Private account",
      description: "Only your friends will be able to see your profile.",
      on: on1,
      toggle: () => setOn1(!on1),
    },
    // preference_id -> 2
    {
      name: "Hide weight and fat",
      description: "Don’t show weight and fat to anyone (not even your friends).",
      on: on2,
      toggle: () => setOn2(!on2),
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