"use client";

import Logo from "@/components/logo/logo";
import styles from "./signup.module.scss"
import TextInput from "@/components/skewed-text-input/text-input";
import { useFormState } from "react-dom";
import signupAction from "@/actions/signup";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaAt, FaCircleXmark, FaEnvelope, FaIdBadge, FaLock, FaPerson, FaUpload } from "react-icons/fa6";
import { USER_KEYS } from "@/api/constants";
import useDefaultImage from "@/utils/defaultImage";
import ProfilePicture from "@/components/profile-picture/profile-picture";

const MAX_IMAGE_SIZE = 2.5;

export default function Signup() {
  const defaultImage_b64 = useDefaultImage();
  
  const [image_b64, setImage_b64] = useState("");
  const [maxSizeError, setMaxSizeError] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  
  const initialState = { message: "" }
  const [state, formAction] = useFormState(signupAction.bind(null, image_b64), initialState)
  
  function handleFileChange(evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.target?.files?.item(0)
    if (!file) {
      return;
    }
 
    // Check size is less than 2.5mb
    if (file.size > MAX_IMAGE_SIZE * 1048576) {
      setMaxSizeError(true);
      return;
    }
    setMaxSizeError(false);

    setImgUploaded(true)
    
    // Convert the image file to base64
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage_b64(reader.result.split(",")[1]);  // Exclude the "data:image/*;base64," prefix
      }
    };
    reader.readAsDataURL(file);
  }
  
  function handleRemoveImage() {
    setImgUploaded(false)
    setImage_b64(defaultImage_b64);
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  }
  
  // Initialize image to default profile picture
  const [imgUploaded, setImgUploaded] = useState(false);
  useEffect(() => {
    setImage_b64(defaultImage_b64);
  }, [defaultImage_b64]);

  return (
    <div className={styles.signup_layout}>
      <Logo/>
      <form action={formAction} className={styles.form}>
        <div className={styles.image_container}>
          { image_b64 && <ProfilePicture image_b64={image_b64}/> }
        </div>
        {/* UPLOAD OR DELETE BUTTON */}
        { imgUploaded
          ? <button className={styles.remove_image_button} type="button" onClick={handleRemoveImage}>
              <FaCircleXmark/>
              <p>Delete Image</p>
            </button>
          : <label className={styles.upload_picture_button} htmlFor="files">
              <FaUpload/>
              <p>Select Image</p>
            </label>
        }
        <input type="file" accept="image/png, image/jpeg" id="files" name={USER_KEYS.IMAGE} onChange={handleFileChange} ref={imgInputRef} hidden/>
        { maxSizeError && 
          <span className={styles.error}>
            <FaCircleXmark size="1.2rem"/>
            Images can only be up to {MAX_IMAGE_SIZE}mb in size.
          </span>
        }
        {/* TEXT INPUTS */}
        <br/>
        <TextInput icon=<FaIdBadge size="1.2rem"/>  placeholder="Name"            name={USER_KEYS.NAME}                         required/>
        <TextInput icon=<FaAt size="1.2rem"/>       placeholder="Username"        name={USER_KEYS.USER_ID}                      required/>
        <TextInput icon=<FaEnvelope size="1.2rem"/> placeholder="Email"           name={USER_KEYS.EMAIL}        type="email"    required/>
        <TextInput icon=<FaPerson size="1.2rem"/>   placeholder="Height (cm)"     name={USER_KEYS.HEIGHT}       type="number"   required min={100} max={300}/>
        <br/>
        <section className={styles.sex_selector}>
          <div>
            <input type="radio" id="feminine" name="sex" value="feminine" required/>
            <label htmlFor="feminine">Feminine</label>
          </div>
          <div>
            <input type="radio" id="masculine" name="sex" value="masculine" required/>
            <label htmlFor="masculine">Masculine</label>
          </div>
        </section>
        <br/>
        <TextInput icon=<FaLock size="1.2rem"/>     placeholder="Password"        name={USER_KEYS.PASSWORD}     type="password" required minLength={10}/>
        <TextInput icon=<FaLock size="1.2rem"/>     placeholder="Repeat Password" name={USER_KEYS.PASSWORD+"2"} type="password" required minLength={10}/>
        {/* ERROR MESSAGE */}
        { state?.message && 
          <span className={styles.error}>
            <FaCircleXmark size="1.2rem"/> 
            {state?.message}
          </span>
        }
        <br/>
        {/* SUBMIT BUTTON */}
        <button type="submit" className={styles.signup}>
          <h3>Sign In</h3>
        </button>
      </form>

      {/* LOGIN BUTTON */}
      <div className={styles.login_form}>
        <p>Already have an account?</p>
        <a href="/login" className={styles.login}>
          <h3>Log In</h3>
        </a>
      </div>

    </div>
  )
}