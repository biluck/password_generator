import { useEffect, useState } from "react";
import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SliderInput from "./components/ui/sliderInput";
import SwitchInput from "./components/ui/switchInput";
import uppercase from "./assets/uppercase.png"
import lowercase from "./assets/lowercase.png"
import numbers from "./assets/numbers.png"
import symbols from "./assets/symbols.png"

const DEFAULT_PASSWORD_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 25;

function App() {
  const [passLength, setPassLength] = useState(6);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(false);

  const handleSliderValue = (value: number[]) => {
    setPassLength(value[0]);
  }
  const handleHasUpperValue = (checked: boolean) => {
    setHasUpper(checked);
  }
  const handleHasLowerValue = (checked: boolean) => {
    setHasLower(checked);
  }
  const handleHasNumberValue = (checked: boolean) => {
    setHasNumber(checked);
  }
  const handleHasSymbolsValue = (checked: boolean) => {
    setHasSymbols(checked);
  }

  useEffect(() => {
    console.log(`Password length = ${passLength}`);
    console.log(`Uppercase = ${hasUpper}`);
    console.log(`Lowercase ${hasLower}`);
    console.log(`Numbers = ${hasNumber}`);
    console.log(`Symbols = ${hasSymbols}`);
  }, [hasUpper, passLength, hasSymbols, hasLower, hasNumber])

  return (
    <Card className="w-[40%] m-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Generate random password
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <SliderInput
          label={`Password length : ${passLength}`}
          defaultValue={[DEFAULT_PASSWORD_LENGTH]}
          minValue={MIN_PASSWORD_LENGTH}
          maxValue={MAX_PASSWORD_LENGTH}
          step={1}
          onValueChange={handleSliderValue}
        ></SliderInput>
        <SwitchInput
          src={uppercase}
          label="Uppercase letters"
          checked={hasUpper}
          onCheckedChange={handleHasUpperValue}
        ></SwitchInput>
        <SwitchInput
          src={lowercase}
          label="Lowercase letters"
          checked={hasLower}
          onCheckedChange={handleHasLowerValue}
        ></SwitchInput>
        <SwitchInput
          src={numbers}
          label="Numbers"
          checked={hasNumber}
          onCheckedChange={handleHasNumberValue}
        ></SwitchInput>
        <SwitchInput
          src={symbols}
          label="Symbols"
          checked={hasSymbols}
          onCheckedChange={handleHasSymbolsValue}
        ></SwitchInput>
      </CardContent>
    </Card>
  );
}

export default App;
