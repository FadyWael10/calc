import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Calculator from "../components/Calculator";
import { calculateExpression , deleteLast, shiftKeys , toFraction , formatNumber , prettyExpression} from "../utils/calculatorLogic";

const typedKeys = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  ".", "+", "−", "×", "÷", "(", ")",
];

const tokens: Record<string, string> = {
  "(-)": "-",
  "sin": "sin(",
  "cos": "cos(",
  "tan": "tan(",
  "log": "log(",
  "ln": "ln(",
  "√": "sqrt(",
  "x²": "^2",
  "xʸ": "^",
  "x⁻¹": "^(-1)",
  "×10ˣ": "×10^",

  "sin⁻¹": "asin(",
  "cos⁻¹": "acos(",
  "tan⁻¹": "atan(",
  "∛": "cbrt(",
  "x³": "^3",
  "x!": "!",
  "10ˣ": "10^(",
  "eˣ": "e^(",
  "π": "π",
};

export default function Index() {

  const [expression, setExpression] = useState("");

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const [previousAnswer, setPreviousAnswer] = useState(0);
  const [justCalculated, setJustCalculated] = useState(false);

  const [shift, setShift] = useState(false);

  const [showModes, setShowModes] = useState(false);

  const addToExpression = (text: string) => {
    const startsWithOperator = "+−×÷^!".includes(text[0]);

    if (justCalculated) {
      setExpression((startsWithOperator ? "Ans" : "") + text);
    } else {
      setExpression((current) => current + text);
    }

    setJustCalculated(false);
    setResult("");
  };

  const handlePress = (pressedKey: string) => {
    setError("");

    if (showModes) {
      if (pressedKey === "AC" || pressedKey === "MODE") setShowModes(false);
      return;
    }

    if (pressedKey === "SHIFT") {
      setShift(!shift);
      return;
    }

    if (pressedKey === "MODE") {
      setShift(false);
      setShowModes(true);
      return;
    }

    const key = shift ? (shiftKeys[pressedKey] ?? pressedKey) : pressedKey;
    setShift(false);
    
    if (key === "=") {
      try {
        const calculation = calculateExpression(expression, previousAnswer);
        setResult(calculation.display);
        setPreviousAnswer(calculation.value);
        setJustCalculated(true);
      } catch {
        setError("Math ERROR");
        setResult("");
      }
      return;
    }
    if (key === "AC") {
      setExpression("");
      setResult("");
      setJustCalculated(false);
      return;
    }
    if (key === "DEL") {
      if (justCalculated) {
        setJustCalculated(false);
        setResult("");
      } else {
        setExpression((current) => deleteLast(current));
      }
      return;
    }
    if (key === "Ans") {
      addToExpression("Ans");
      return;
    }
    if (key === "S⇔D") {
      if (!justCalculated) return;

      if (result.includes("/")) {
        setResult(formatNumber(previousAnswer));
      } else {
        const fraction = toFraction(previousAnswer);
        if (fraction) setResult(fraction);
      }
      return;
    }
    if (typedKeys.includes(key)) {
      addToExpression(key);
      return;
    }

    if (key in tokens) {
      addToExpression(tokens[key]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calculator expression={prettyExpression(expression)} onPress={handlePress} result={result} error={error} shift={shift} showModes={showModes}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});