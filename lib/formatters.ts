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

export function formatInLakhCrore(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";
  const abs = Math.abs(amount);
  if (abs >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  } else if (abs >= 100000) {
    const l = amount / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(2)} Lakh`;
  } else if (abs >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return formatINR(amount);
}

export function formatLakhCrore(amount: number): string {
  return formatInLakhCrore(amount);
}

export function parseCleanNumber(val: string | number, fallback: number = 0): number {
  if (typeof val === "number") return isNaN(val) ? fallback : val;
  const cleaned = String(val).replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? fallback : parsed;
}
