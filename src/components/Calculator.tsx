import { View, Text, Pressable, StyleSheet } from "react-native";
import { shiftKeys } from "../utils/calculatorLogic";

type Props = {
  expression: string;
  onPress: (key: string) => void;
  result: string;
  error: string;
  shift: boolean;
  showModes: boolean;
};

const keyRows = [
  ["CALC", "∫", "", "x⁻¹", "logₐ"],
  ["a/b", "√", "x²", "xʸ", "log", "ln"],
  ["(-)", "°′″", "hyp", "sin", "cos", "tan"],
  ["RCL", "ENG", "(", ")", "S⇔D", "M+"],
  ["7", "8", "9", "DEL", "AC"],
  ["4", "5", "6", "×", "÷"],
  ["1", "2", "3", "+", "−"],
  ["0", ".", "×10ˣ", "Ans", "="],
];

const modeList = [
  "1:COMP", "2:CMPLX", "3:STAT", "4:BASE-N",
  "5:EQN", "6:MATRIX", "7:TABLE", "8:VECTOR",
];

export default function Calculator({ expression , onPress, result, error , shift, showModes}: Props) {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>CASIO</Text>
          <Text style={styles.model}>fx-991ES PLUS</Text>
          <Text style={styles.natural}>NATURAL-V.P.A.M</Text>
        </View>

        <View style={styles.solar}>
          <Text style={styles.solarText}>TWO WAY POWER</Text>
        </View>
      </View>
      <View style={styles.screen}>
        <Text style={styles.indicator}>{shift ? "S" : ""}</Text>
        {showModes ? (
          <View style={styles.menuGrid}>
            {modeList.map((mode) => (
              <Text key={mode} style={styles.menuItem}>
                {mode}
              </Text>
            ))}
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.expression,
                expression.length > 20 && styles.expressionSmall,
              ]}
            >
              {expression || "0"}
            </Text>
            <Text style={styles.result}>{error || result}</Text>
          </>
        )}
      </View>
      <View style={styles.topRow}>
        <Pressable
          onPress={() => onPress("SHIFT")}
          style={[styles.shiftButton, shift && styles.shiftOn]}
        >
          <Text style={styles.shiftText}>SHIFT</Text>
        </Pressable>

        <Pressable onPress={() => onPress("ALPHA")} style={styles.shiftButton}>
          <Text style={styles.shiftText}>ALPHA</Text>
        </Pressable>

        <View style={styles.replay}>
          <Text style={styles.arrowTop}>▲</Text>
          <Text style={styles.replayText}>REPLAY</Text>
          <Text style={styles.arrowBottom}>▼</Text>
          <Text style={styles.arrowLeft}>◀</Text>
          <Text style={styles.arrowRight}>▶</Text>
        </View>

        <Pressable
          onPress={() => onPress("MODE")}
          style={[styles.shiftButton, styles.modeButton]}
        >
          <Text style={styles.shiftText}>MODE</Text>
        </Pressable>

        <Pressable onPress={() => onPress("ON")} style={styles.shiftButton}>
          <Text style={styles.shiftText}>ON</Text>
        </Pressable>
      </View>
      <View style={styles.keys}>
        {keyRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyRow}>
            {row.map((key, keyIndex) => {
              if (key === "") {
                return <View key={keyIndex} style={styles.cell} />;
              }
              return (
                <View key={key} style={styles.cell}>
                  <Text style={styles.smallLabel}>{shiftKeys[key] ?? ""}</Text>
                  <Pressable
                    onPress={() => onPress(key)}
                    style={[
                      styles.key,
                      (key === "DEL" || key === "AC") && styles.orangeKey,
                    ]}
                  >
                    <Text style={styles.keyText}>{key}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: "#b9b9ad",
    borderRadius: 27,
    borderWidth: 2,
    borderColor: "#77786e",
    padding: 13,
    paddingTop: 18,
  },
  screen: {
    height: 120,
    backgroundColor: "#a2cbb0",
    borderRadius: 6,
    padding: 10,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#657d69",
  },
  expression: {
    fontSize: 23,
    color: "#17271c",
    textAlign: "left",
    marginTop: 10,
  },
  keys: {
    marginTop: 8,
    gap: 2,
  },
  keyRow: {
    flexDirection: "row",
    gap: 5,
  },
  cell: {
    flex: 1,
  },
  key: {
    height: 43,
    borderRadius: 8,
    backgroundColor: "#272727",
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    color: "#f3f3f3",
    fontSize: 14,
    fontWeight: "700",
  },
  result: {
    fontSize: 26,
    fontWeight: "700",
    color: "#17271c",
    textAlign: "right",
    minHeight: 32,
  },
  indicator: {
    position: "absolute",
    top: 4,
    left: 8,
    fontSize: 11,
    fontWeight: "700",
    color: "#17271c",
  },
  topRow: {
    marginTop: 10,
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  shiftButton: {
    width: 55,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#77786f",
    alignItems: "center",
    justifyContent: "center",
  },
  shiftOn: {
    backgroundColor: "#b8860b",
  },
  shiftText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#f3f3f3",
  },
  smallLabel: {
    height: 12,
    textAlign: "center",
    fontSize: 9,
    fontWeight: "800",
    color: "#8a5a00",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  menuItem: {
    width: "50%",
    fontSize: 15,
    lineHeight: 20,
    color: "#17271c",
    paddingVertical: 2,
  },
  orangeKey: {
    backgroundColor: "#ed7d29",
  },
  header: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  brand: {
    color: "#171717",
    fontWeight: "900",
    fontSize: 21,
    letterSpacing: 1,
  },
  model: {
    fontSize: 10,
    color: "#252525",
    fontStyle: "italic",
    fontWeight: "700",
    marginTop: 3,
  },
  natural: {
    color: "#167653",
    fontSize: 10,
    fontWeight: "900",
    marginTop: 7,
  },
  solar: {
    width: "43%",
    height: 54,
    backgroundColor: "#111",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#73736b",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 5,
  },
  solarText: {
    fontSize: 7,
    fontWeight: "700",
    color: "#aaa",
  },
  expressionSmall: {
    fontSize: 16,
  },
  rightButtons: {
    flexDirection: "row",
    gap: 8,
  },
  replay: {
    position: "absolute",
    top: 20,
    left: "50%",
    marginLeft: -38,
    width: 76,
    height: 66,
    borderRadius: 36,
    backgroundColor: "#72736d",
    borderWidth: 2,
    borderColor: "#65665f",
    justifyContent: "center",
    alignItems: "center",
  },
  replayText: {
    color: "#4c4d48",
    fontSize: 9,
    fontWeight: "900",
  },
  arrowTop: {
    position: "absolute",
    top: 4,
    color: "#a0a197",
    fontSize: 9,
  },
  arrowBottom: {
    position: "absolute",
    bottom: 4,
    color: "#a0a197",
    fontSize: 9,
  },
  arrowLeft: {
    position: "absolute",
    left: 7,
    color: "#a0a197",
    fontSize: 9,
  },
  arrowRight: {
    position: "absolute",
    right: 7,
    color: "#a0a197",
    fontSize: 9,
  },
  modeButton: {
    marginLeft: "auto",
  },
});
