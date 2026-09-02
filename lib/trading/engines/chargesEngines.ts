import { TradingCalculationResult } from "../types";

export interface BrokerageInput {
  turnover: number;
  orderType: "intraday" | "delivery" | "futures" | "options";
  ordersCount: number;
}

export function calculateTradingCharges(input: BrokerageInput): TradingCalculationResult {
  const turnover = Math.max(0, input.turnover || 0);
  const orders = Math.max(1, input.ordersCount || 1);

  const flatBrokerage = orders * 20;
  const stt = turnover * 0.00025;
  const exchangeTurnover = turnover * 0.0000325;
  const sebi = turnover * 0.000001;
  const stampDuty = turnover * 0.00003;
  const gst = (flatBrokerage + exchangeTurnover + sebi) * 0.18;
  const totalTaxes = flatBrokerage + stt + exchangeTurnover + sebi + stampDuty + gst;

  return {
    primaryMetric: {
      label: "Total Trading Cost",
      value: totalTaxes,
      formatted: `₹${totalTaxes.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: false,
    },
    secondaryMetrics: [
      {
        label: "Brokerage Share",
        value: flatBrokerage,
        formatted: `₹${flatBrokerage.toFixed(2)}`,
        highlight: "neutral",
      },
      {
        label: "Statutory Taxes (STT/GST/SEBI)",
        value: totalTaxes - flatBrokerage,
        formatted: `₹${(totalTaxes - flatBrokerage).toFixed(2)}`,
        highlight: "red",
      },
    ],
    breakdown: [
      { item: "Brokerage", amount: flatBrokerage, formatted: `₹${flatBrokerage.toFixed(2)}`, type: "debit" },
      { item: "Securities Transaction Tax (STT)", amount: stt, formatted: `₹${stt.toFixed(2)}`, type: "debit" },
      { item: "Exchange Turnover Charges", amount: exchangeTurnover, formatted: `₹${exchangeTurnover.toFixed(2)}`, type: "debit" },
      { item: "GST (18%)", amount: gst, formatted: `₹${gst.toFixed(2)}`, type: "debit" },
      { item: "SEBI Turnover Fees", amount: sebi, formatted: `₹${sebi.toFixed(2)}`, type: "debit" },
      { item: "Stamp Duty", amount: stampDuty, formatted: `₹${stampDuty.toFixed(2)}`, type: "debit" },
    ],
  };
}
