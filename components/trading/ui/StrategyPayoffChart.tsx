"use client";

import React from "react";
import { PayoffPoint } from "@/lib/trading/types";

interface Props {
  payoffCurve: PayoffPoint[];
  breakevens: number[];
  currentSpot: number;
  maxProfit: number | "Unlimited";
  maxLoss: number | "Unlimited";
}

export function StrategyPayoffChart({
  payoffCurve,
  breakevens,
  currentSpot,
  maxProfit,
  maxLoss,
}: Props) {
  if (!payoffCurve || payoffCurve.length < 2) {
    return null;
  }

  const width = 600;
  const height = 260;
  const padX = 45;
  const padY = 30;

  const prices = payoffCurve.map((p) => p.underlyingPrice);
  const profits = payoffCurve.map((p) => p.profit);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const rawMinProfit = Math.min(...profits);
  const rawMaxProfit = Math.max(...profits);
  const maxAbs = Math.max(Math.abs(rawMinProfit), Math.abs(rawMaxProfit), 100);

  const minProfit = -maxAbs * 1.15;
  const maxProfitVal = maxAbs * 1.15;

  const scaleX = (x: number) => padX + ((x - minPrice) / (maxPrice - minPrice)) * (width - 2 * padX);
  const scaleY = (y: number) => height - padY - ((y - minProfit) / (maxProfitVal - minProfit)) * (height - 2 * padY);

  const zeroY = scaleY(0);

  const pointsString = payoffCurve.map((p) => `${scaleX(p.underlyingPrice)},${scaleY(p.profit)}`).join(" ");

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-steel block">
            Mathematical Payoff Profile
          </span>
          <h3 className="text-sm font-bold text-navy">Expiry P&amp;L Visualization</h3>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Max: {typeof maxProfit === "number" ? `₹${maxProfit.toFixed(0)}` : maxProfit}
          </span>
          <span className="flex items-center gap-1 text-rose-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Risk: {typeof maxLoss === "number" ? `₹${maxLoss.toFixed(0)}` : maxLoss}
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[320px] font-sans">
          {/* Zero P&L Axis */}
          <line
            x1={padX}
            y1={zeroY}
            x2={width - padX}
            y2={zeroY}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Payoff Curve Line */}
          <polyline
            fill="none"
            stroke="#50727B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsString}
          />

          {/* Breakeven Marker Dots */}
          {breakevens.map((be, idx) => {
            const bx = scaleX(be);
            if (bx >= padX && bx <= width - padX) {
              return (
                <g key={idx}>
                  <circle cx={bx} cy={zeroY} r="4.5" fill="#e89d67" stroke="#ffffff" strokeWidth="2" />
                  <text x={bx} y={zeroY - 9} textAnchor="middle" fontSize="9" fill="#0f172a" fontWeight="bold">
                    BE: ₹{be.toFixed(0)}
                  </text>
                </g>
              );
            }
            return null;
          })}

          {/* Current Spot Indicator */}
          {currentSpot >= minPrice && currentSpot <= maxPrice && (
            <line
              x1={scaleX(currentSpot)}
              y1={padY}
              x2={scaleX(currentSpot)}
              y2={height - padY}
              stroke="#00f59b"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          )}

          {/* X Axis Labels */}
          <text x={padX} y={height - 10} fontSize="9" fill="#64748b" textAnchor="start">
            ₹{minPrice.toFixed(0)}
          </text>
          <text x={width - padX} y={height - 10} fontSize="9" fill="#64748b" textAnchor="end">
            ₹{maxPrice.toFixed(0)}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] text-navy/70 pt-1 border-t border-navy/10">
        <span>Dashed line: Zero Break-Even baseline</span>
        <span>Orange marker: Expiry Breakeven threshold</span>
      </div>
    </div>
  );
}

export default StrategyPayoffChart;
