"use client";

import { setVolume } from "@/API";
import { ChangeEvent, useState } from "react";
import styles from './player.module.css';

export default function Slider() {
  const [value, setValue] = useState<number>(100);

  const valueChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.valueAsNumber);
    setVolume(event.target.valueAsNumber);
  }

  return (
    <div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={valueChanged}
      />
    </div>
  )
}