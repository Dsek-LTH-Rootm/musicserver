"use client";

import { getVolume, setVolume } from "@/API";
import { ChangeEvent, useEffect, useState } from "react";
import styles from './player.module.css';

export default function Slider() {
  const [value, setValue] = useState<number>(100);

  useEffect(() => {
    getValue();
  }, []);

  const getValue = async () => {
    const v = await getVolume();
    setValue(Number(v as string));
  }

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