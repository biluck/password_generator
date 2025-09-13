import { useState } from "react";
import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SliderInput from "./components/ui/sliderInput";

const DEFAULT_PASSWORD_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 25;

function App() {
  const [passLength, setPassLength] = useState(6);
  const handleSliderValue = (value: number[]) => {
    setPassLength(value[0]);
  }
  return (
    <Card className="w-[40%] m-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Generate random password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SliderInput
          label={`Password length : ${passLength}`}
          defaultValue={[DEFAULT_PASSWORD_LENGTH]}
          minValue={MIN_PASSWORD_LENGTH}
          maxValue={MAX_PASSWORD_LENGTH}
          step={1}
          onValueChange={handleSliderValue}
        ></SliderInput>
      </CardContent>
    </Card>
  );
}

export default App;
