import { create, all } from "mathjs";

const math = create(all);

function closeParentheses(text: string): string {
const open = (text.match(/\(/g) || []).length;
const close = (text.match(/\)/g) || []).length;
return text + ")".repeat(Math.max(0, open - close));
}

export function calculateExpression(expression: string, previousAnswer: number) {
  const normalized = closeParentheses(expression)
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, "pi");

   const withMultiplication = normalized
     .replace(/(\d|\))(?=[a-z(])/g, "$1*")
     .replace(/\)(?=\d)/g, ")*");

    const withAnswer = withMultiplication.replace(/Ans/g, `(${previousAnswer})`);

  const toRadians = (x: number) => (x * Math.PI) / 180;
  const clean = (x: number) => (Math.abs(x) < 1e-12 ? 0 : x);
  const fromRadians = (x: number) => (x * 180) / Math.PI;

  const scope = {
    sin: (x: number) => clean(Math.sin(toRadians(x))),
    cos: (x: number) => clean(Math.cos(toRadians(x))),
    tan: (x: number) => clean(Math.tan(toRadians(x))),
    log: (x: number) => Math.log10(x),
    ln: (x: number) => Math.log(x),
    asin: (x: number) => clean(fromRadians(Math.asin(x))),
    acos: (x: number) => clean(fromRadians(Math.acos(x))),
    atan: (x: number) => clean(fromRadians(Math.atan(x))),
  };

  const result = math.evaluate(withAnswer, scope);

  if (typeof result !== "number" || !Number.isFinite(result)) {
    throw new Error("Math error");
  }

  return {
    value: result,
    display: Number(result.toPrecision(10)).toString(),
  };
}
export function deleteLast(expression: string): string {
  return expression.replace(
    /(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|log\(|ln\(|sqrt\(|cbrt\(|\^\(-1\)|×10\^|Ans|.)$/u,
    ""
  );
}

export function nextTokenLength(text: string): number {
  const match = text.match(
    /^(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|log\(|ln\(|sqrt\(|cbrt\(|\^\(-1\)|×10\^|Ans|.)/u
  );
  return match ? match[0].length : 0;
}

export const shiftKeys: Record<string, string> = {
  "sin": "sin⁻¹",
  "cos": "cos⁻¹",
  "tan": "tan⁻¹",
  "√": "∛",
  "x²": "x³",
  "x⁻¹": "x!",
  "log": "10ˣ",
  "ln": "eˣ",
  "×10ˣ": "π",
};



export function formatNumber(value: number): string {
  return Number(value.toPrecision(10)).toString();
}


export function toFraction(value: number): string | null {
  if (Number.isInteger(value)) return null;

  for (let denominator = 2; denominator <= 1000; denominator++) {
    const numerator = Math.round(value * denominator);
    if (Math.abs(value - numerator / denominator) < 1e-9) {
      return `${numerator}/${denominator}`;
    }
  }
  return null;
}

export function prettyExpression(expression: string): string {
  return expression
    .replace(/asin\(/g, "sin⁻¹(")
    .replace(/acos\(/g, "cos⁻¹(")
    .replace(/atan\(/g, "tan⁻¹(")
    .replace(/sqrt\(/g, "√(")
    .replace(/cbrt\(/g, "∛(")
    .replace(/\^\(-1\)/g, "⁻¹")
    .replace(/\^2(?![0-9.])/g, "²")
    .replace(/\^3(?![0-9.])/g, "³");
}