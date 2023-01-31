import { useState } from "react";
import styles from "./Dropdown.module.css"

const Dropdown = (props: any) => {
    const [value, setValue] = useState(props.value);

    const handleChange = (event: any) => {
      setValue(event.target.value);
      props.onChange(event);
    }

    return (
      <label className={styles.label}>
        {props.label}:
        <select value={value} onChange={handleChange} className={styles.menu}>
          {props.options.map((option: any, index: number) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
   };

export default Dropdown;