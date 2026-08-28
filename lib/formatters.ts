export function formatINR(amount: number, showDecimals: boolean = false): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

export function formatNumberIN(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(value);
}

export function parseCleanNumber(val: string | number, fallback: number = 0): number {
  if (typeof val === "number") return isNaN(val) ? fallback : val;
  const cleaned = val.replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? fallback : parsed;
}
