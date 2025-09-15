import "../../App.css";
import { Switch } from "./switch";

type SwitchInputType = {
  src: string,
  label: string,
  checked: boolean,
  onCheckedChange?: (checked: boolean) => void
}

function SwitchInput({ src, label, checked, onCheckedChange }: SwitchInputType) {
  return (
    <div className="w-full flex items-center gap-4">
      <img src={src} />
      <div className="grow">{label}</div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export default SwitchInput;
