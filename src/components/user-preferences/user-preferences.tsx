"use client";

import styles from "./user-preferences.module.scss"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useState } from "react";

function preferencesData() {
  const [privateAccount, setPrivateAccount] = useState(false);
  const [hideWeightAndFat, setHideWeightAndFat] = useState(false);

  const preferences = [
    {
      name: "Private account",
      description: "Only your friends will be able to see your profile.",
      on: privateAccount,
      toggle: () => setPrivateAccount(!privateAccount)
    },
    {
      name: "Hide weight and fat",
      description: "Don’t show weight and fat to anyone (not even your friends).",
      on: hideWeightAndFat,
      toggle: () => setHideWeightAndFat(!hideWeightAndFat)
    },
  ]

  return preferences;
}

export default function UserPreferences() {
  const preferences = preferencesData();

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