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
import * as vals from "./constants/values";
import * as random from "./lib/random";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";

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

  const asyncGeneration = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    let requiredChars: string = "";
    let allChars: string = "";
    let password: string = "";
    if (hasUpper) {
      allChars += chars.ASCII_UPPERCASE;
      requiredChars += random.choice(chars.ASCII_UPPERCASE);
    }
    if (hasLower) {
      allChars += chars.ASCII_LOWERCASE;
      requiredChars += random.choice(chars.ASCII_LOWERCASE);
    }
    if (hasNumber) {
      allChars += chars.DIGITS;
      requiredChars += random.choice(chars.DIGITS);
    }
    if (hasSymbols) {
      allChars += chars.PUNCTUATION;
      requiredChars += random.choice(chars.PUNCTUATION);
    }
    password += requiredChars;
    let charsLeft: number = passLength - requiredChars.length;
    while (charsLeft > 0) {
      password += random.choice(allChars);
      charsLeft--;
    }
    password = random.shuffleArray(password);
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
      <div className="flex justify-center items-center w-dvw h-dvh">
        <Card className="w-[80%] m-auto md:w-[50%] lg:w-[40%]">
          <CardHeader className="flex flex-row items-center justify-center">
            <CardTitle className="text-center grow">
              Generate random password
            </CardTitle>
            <ModeToggle></ModeToggle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <InputField label={`Password length : ${passLength}`}>
              <Slider
                value={[passLength]}
                min={vals.MIN_PASSWORD_LENGTH}
                max={vals.MAX_PASSWORD_LENGTH}
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
                <TooltipTrigger asChild>
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
      </div>
    </ThemeProvider>
  );
}

export default App;
