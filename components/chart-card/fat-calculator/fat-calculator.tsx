import { FaArrowUpRightFromSquare, FaPerson, FaPersonDress, FaPlus, FaUser } from "react-icons/fa6";
import styles from "./fat-calculator.module.scss"
import TextInput from "@/components/skewed-text-input/text-input";
import Link from "next/link";
import useUser from "@/utils/useUser";
import { Dispatch, SetStateAction, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function FatCalculator({ setResult }: { setResult: Dispatch<SetStateAction<string | undefined>> }) {
  const { user, error, isLoading } = useUser();

  const [neck, setNeck] = useState<string>();
  const [waist, setWaist] = useState<string>();
  const [hip, setHip] = useState<string>();

  function calculate() {
    console.log(neck, waist, hip);
    
    if (user === undefined || neck === undefined || waist === undefined || (user.sex === "feminine" && hip === undefined)) { 
      return;
    }

    // TODO Check why the formula works wrong

    let denominator: number;
    if (user.sex === "masculine") {
      denominator = 1.0324 - 0.19077 * Math.log10(Number(waist) - Number(neck)) + 0.15456 * Math.log10(user.height);
    }
    else if (user.sex === "feminine") {
      denominator = 1.29579 - 0.35004 * Math.log10(Number(waist) + (Number(hip)) - Number(neck)) + 0.22100 * Math.log10(user.height);
    }
    else {
      return;
    }
    
    const BFP = 495 / denominator - 450;
    
    setResult(BFP > 0 ? BFP.toFixed(2): "0");
  }

  return (
    <div className="fat-calculator">
      <div className={styles.fat_calculator}>
        <h3>Body fat calculator</h3>
        <TextInput icon=<FaUser/> placeholder="Neck (cm)" type="number" step={.01} setValue={setNeck} name="neck" required />
        <small className={styles.hint}><FaInfoCircle/>Measure around your neck</small>
        <TextInput icon=<FaPerson/> placeholder="Waist (cm)" type="number" step={.01} setValue={setWaist} name="waist" required/>
        <small className={styles.hint}><FaInfoCircle/>Measure around your  waist</small>
        { user?.sex === "feminine" && <>
          <TextInput icon=<FaPersonDress/> placeholder="Hip (cm)" type="number" step={.01} setValue={setHip} name="hip" required/>
          <small className={styles.hint}><FaInfoCircle/>Measure around your hip</small>
        </> }
        <button className={styles.calculate_button} onClick={calculate}>
          <FaPlus/>
          <span>Calculate</span>
        </button>
        <small>
          <Link href="https://www.calculator.net/body-fat-calculator.html" target="_blank">More info <FaArrowUpRightFromSquare/></Link>
        </small>
      </div>
    </div>
  )
}
