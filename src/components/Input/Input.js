import React, { useEffect } from "react";
import "./Input.css";

export default function Input(props) {
  const { value, setValue } = props.input;

  function handleChange(e) {
    setValue(e.target.value);
  }

  useEffect(()=>{props.onChange();},[value])

  return (
    <input
      className={`input ${props.class}`}
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      name={props.name}
      value={value}
      onChange={handleChange}
    />
  );
}
