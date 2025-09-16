import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import SwitchInput from "./components/ui/switch-input";
import uppercase from "./assets/uppercase.png";
import lowercase from "./assets/lowercase.png";
import numbers from "./assets/numbers.png";
import symbols from "./assets/symbols.png";
import InputField from "./components/ui/input-field";
import { Slider } from "./components/ui/slider";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/ui/mode-toogle";
import { Button } from "./components/ui/button";
import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import * as chars from "./constants/characters";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";

const DEFAULT_PASSWORD_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 25;

function App() {
  const [passLength, setPassLength] = useState(6);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSliderValue = (value: number[]) => {
    setPassLength(value[0]);
  };
  const handleHasUpperValue = (checked: boolean) => {
    setHasUpper(checked);
  };
  const handleHasLowerValue = (checked: boolean) => {
    setHasLower(checked);
  };
  const handleHasNumberValue = (checked: boolean) => {
    setHasNumber(checked);
  };
  const handleHasSymbolsValue = (checked: boolean) => {
    setHasSymbols(checked);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const choice = (value: string): string => {
    const array = new Uint32Array(1);
    const maxValidValue = Math.floor(0xffffffff / value.length) * value.length;
    do {
      crypto.getRandomValues(array);
    } while (array[0] >= maxValidValue);
    return value[array[0] % value.length];
  };

  const shuffleArray = (value: string): string => {
    const array = value.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  };

  const asyncGeneration = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    let requiredChars: string = "";
    let allChars: string = "";
    let password: string = "";
    if (hasUpper) {
      allChars += chars.ASCII_UPPERCASE;
      requiredChars += choice(chars.ASCII_UPPERCASE);
    }
    if (hasLower) {
      allChars += chars.ASCII_LOWERCASE;
      requiredChars += choice(chars.ASCII_LOWERCASE);
    }
    if (hasNumber) {
      allChars += chars.DIGITS;
      requiredChars += choice(chars.DIGITS);
    }
    if (hasSymbols) {
      allChars += chars.PUNCTUATION;
      requiredChars += choice(chars.PUNCTUATION);
    }
    password += requiredChars;
    let charsLeft: number = passLength - requiredChars.length;
    while (charsLeft > 0) {
      password += choice(allChars);
      charsLeft--;
    }
    password = shuffleArray(password);
    setPassword(password);
    setIsGenerating(false);
    return password;
  };

  useEffect(() => {
    async function generatePassword() {
      let password: string = "";
      password = await asyncGeneration();
      setPassword(password);
    }
    generatePassword();
  }, []);

  useEffect(() => {
    if (!hasUpper && !hasLower && !hasNumber && !hasSymbols) {
      setHasLower(true);
      setHasNumber(true);
    }
  }, [hasUpper, hasSymbols, hasLower, hasNumber]);

  const switchOptions = [
    {
      id: "uppercase",
      src: uppercase,
      label: "Uppercase letters",
      checked: hasUpper,
      onCheckedChange: handleHasUpperValue,
    },
    {
      id: "lowercase",
      src: lowercase,
      label: "Lowercase letters",
      checked: hasLower,
      onCheckedChange: handleHasLowerValue,
    },
    {
      id: "number",
      src: numbers,
      label: "Numbers",
      checked: hasNumber,
      onCheckedChange: handleHasNumberValue,
    },
    {
      id: "symbols",
      src: symbols,
      label: "Symbols",
      checked: hasSymbols,
      onCheckedChange: handleHasSymbolsValue,
    },
  ];
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
        <CardFooter className="flex flex-col gap-3">
          <div className="flex gap-1 items-center w-full h-[35px]">
            <p className="flex grow justify-center p-1 border-2 rounded-md h-full">
              {password}
            </p>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="secondary" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <CopyIcon />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {copied ? <p>Copied !</p> : <p>Copy password to clipboard</p>}
              </TooltipContent>
            </Tooltip>
          </div>
          <Button
            className="w-full cursor-pointer"
            onClick={asyncGeneration}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" />
                Generating...
              </>
            ) : (
              "Generate password"
            )}
          </Button>
        </CardFooter>
      </Card>
    </ThemeProvider>
  );
}

export default App;
