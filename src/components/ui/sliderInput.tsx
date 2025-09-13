import "../../App.css";
import { Slider } from "./slider";

type SliderInputProps = {
  label: string;
  defaultValue: number[];
  minValue: number;
  maxValue: number;
  step: number;
  onValueChange: (value: number[]) => void;
}

export default function SliderInput({ label, defaultValue, minValue, maxValue, step, onValueChange }: SliderInputProps) {
  return <div className="w-full flex flex-col gap-4">
    <p className="text-md text-gray-500">{label}</p>
    <Slider defaultValue={defaultValue} min={minValue} max={maxValue} step={step} onValueChange={onValueChange}></Slider>
  </div>;
}
