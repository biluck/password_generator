import { useEffect, useState } from "react";
import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SwitchInput from "./components/ui/switchInput";
import uppercase from "./assets/uppercase.png"
import lowercase from "./assets/lowercase.png"
import numbers from "./assets/numbers.png"
import symbols from "./assets/symbols.png"
import InputField from "./components/ui/inputField";
import { Slider } from "./components/ui/slider";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/ui/mode-toogle";

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
    if (!hasUpper && !hasLower && !hasNumber && !hasSymbols) {
      setHasLower(true);
      setHasNumber(true);
    }
  }, [hasUpper, hasSymbols, hasLower, hasNumber])

  const switchOptions = [
    {
      id: 'uppercase',
      src: uppercase,
      label: 'Uppercase letters',
      checked: hasUpper,
      onCheckedChange: handleHasUpperValue
    },
    {
      id: 'lowercase',
      src: lowercase,
      label: 'Lowercase letters',
      checked: hasLower,
      onCheckedChange: handleHasLowerValue
    },
    {
      id: 'number',
      src: numbers,
      label: 'Numbers',
      checked: hasNumber,
      onCheckedChange: handleHasNumberValue
    },
    {
      id: 'symbols',
      src: symbols,
      label: 'Symbols',
      checked: hasSymbols,
      onCheckedChange: handleHasSymbolsValue
    },
  ]
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Card className="w-[40%] m-auto">
        <CardHeader className="flex flex-row items-center justify-center">
          <CardTitle className="text-center grow">
            Generate random password
          </CardTitle>
          <ModeToggle></ModeToggle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InputField label={`Password length : ${passLength}`}>
            <Slider
              defaultValue={[DEFAULT_PASSWORD_LENGTH]}
              min={MIN_PASSWORD_LENGTH}
              max={MAX_PASSWORD_LENGTH}
              step={1}
              onValueChange={handleSliderValue}
            ></Slider>
          </InputField>
          {switchOptions.map((option) => (
            <SwitchInput
              key={option.id}
              label={option.label}
              src={option.src}
              checked={option.checked}
              onCheckedChange={option.onCheckedChange}
            ></SwitchInput>
          ))}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default App;
