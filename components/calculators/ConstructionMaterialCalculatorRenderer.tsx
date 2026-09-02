"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, Building2, TrendingUp, ShieldAlert, Plus, Trash2 } from "lucide-react";
import { calculateConstructionMaterial, MaterialRowItem } from "@/lib/calculatorEngines";

const DEFAULT_MATERIALS: MaterialRowItem[] = [
  { id: "1", name: "Cement", quantity: 450, unit: "bags", rate: 390, wastagePct: 3 },
  { id: "2", name: "Steel / TMT Bars", quantity: 3500, unit: "kg", rate: 68, wastagePct: 4 },
  { id: "3", name: "Sand (Fine Aggregate)", quantity: 1800, unit: "cu ft", rate: 55, wastagePct: 5 },
  { id: "4", name: "Coarse Aggregate", quantity: 1400, unit: "cu ft", rate: 42, wastagePct: 5 },
  { id: "5", name: "Bricks / Blocks", quantity: 18000, unit: "pcs", rate: 9, wastagePct: 6 },
  { id: "6", name: "Tiles (Floor & Wall)", quantity: 1100, unit: "sq ft", rate: 65, wastagePct: 8 },
  { id: "7", name: "Paint & Primer", quantity: 180, unit: "liters", rate: 320, wastagePct: 4 },
  { id: "8", name: "Electrical Wiring & Conduit", quantity: 1, unit: "set", rate: 55000, wastagePct: 2 },
  { id: "9", name: "Plumbing & Sanitary Lines", quantity: 1, unit: "set", rate: 48000, wastagePct: 3 },
  { id: "10", name: "Doors, Windows & Hardware", quantity: 8, unit: "units", rate: 9500, wastagePct: 2 },
];

export function ConstructionMaterialCalculatorRenderer() {
  const [builtUpArea, setBuiltUpArea] = useState<number>(1000);
  const [areaUnit, setAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [projectType, setProjectType] = useState<string>("Residential");
  const [floors, setFloors] = useState<number>(1);
  const [materials, setMaterials] = useState<MaterialRowItem[]>(DEFAULT_MATERIALS);
  const [labourCost, setLabourCost] = useState<number>(350000);
  const [consultantCost, setConsultantCost] = useState<number>(35000);
  const [permitCost, setPermitCost] = useState<number>(20000);
  const [contingencyPct, setContingencyPct] = useState<number>(5);
  const [sensitivityRatePct, setSensitivityRatePct] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  const areaId = useId();
  const floorId = useId();
  const labourId = useId();
  const feesId = useId();
  const contId = useId();
  const sensId = useId();

  const handleReset = () => {
    setBuiltUpArea(1000);
    setAreaUnit("sqft");
    setProjectType("Residential");
    setFloors(1);
    setMaterials(DEFAULT_MATERIALS);
    setLabourCost(350000);
    setConsultantCost(35000);
    setPermitCost(20000);
    setContingencyPct(5);
    setSensitivityRatePct(5);
  };

  const updateMaterial = (id: string, field: keyof MaterialRowItem, val: string | number) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: val } : m))
    );
  };

  const addMaterialRow = () => {
    const newId = (materials.length + 1).toString();
    setMaterials((prev) => [
      ...prev,
      { id: newId, name: "Custom Material", quantity: 100, unit: "units", rate: 50, wastagePct: 5 },
    ]);
  };

  const removeMaterialRow = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const result = calculateConstructionMaterial({
    builtUpArea,
    areaUnit,
    projectType,
    floors,
    materials,
    labourCost,
    consultantCost,
    permitCost,
    contingencyPct,
    sensitivityRatePct,
  });

  const handleCopy = () => {
    const text = `Construction Material Budget Summary:\nBuilt-up Area: ${builtUpArea} ${areaUnit} (${projectType})\nTotal Material Budget: ₹${result.totalMaterialBudget.toFixed(2)} (₹${result.costPerSqFtMaterial.toFixed(2)}/sq ft)\nMaterial Wastage Allowance: ₹${result.totalWastageCost.toFixed(2)}\nLabour Cost: ₹${labourCost.toFixed(2)}\nConsultancy & Permits: ₹${result.otherProjectCosts.toFixed(2)}\nContingency Buffer (${contingencyPct}%): ₹${result.contingencyAmount.toFixed(2)}\nTotal Estimated Project Budget: ₹${result.totalProjectBudget.toFixed(2)} (₹${result.costPerSqFtProject.toFixed(2)}/sq ft)\n+${sensitivityRatePct}% Price Sensitivity Impact: +₹${result.sensitivityIncreaseCost.toFixed(2)}\nCalculated on https://www.mycalculator.xyz/calculators/construction-material-price-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Construction Material Price Intelligence Calculator",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* Notice Bar: User Local Rates */}
      <div className="bg-sage/40 border border-navy/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-white rounded-xl text-steel shadow-2xs">
            <Building2 className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-black text-navy block">
              Enter Your Local Market Rates (No Fabricated Rates)
            </span>
            <span className="text-[11px] text-navy/70">
              Calculate deterministic quantities, contractor site wastage, and total budgets based on actual quotes in your city.
            </span>
          </div>
        </div>
        <div className="text-xs font-bold text-navy px-3 py-1 bg-white rounded-xl border border-navy/10">
          Top Cost Item: <strong className="text-steel">{result.largestMaterialCategory.name}</strong> ({result.largestMaterialCategory.sharePct.toFixed(1)}%)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-6">
          {/* PROJECT DETAILS */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              Project Specification
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label htmlFor={areaId} className="text-xs font-bold text-navy">
                  Built-up Area
                </label>
                <input
                  id={areaId}
                  type="number"
                  min="1"
                  value={builtUpArea || ""}
                  onChange={(e) => setBuiltUpArea(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1000"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Area Unit</label>
                <div className="inline-flex rounded-xl border border-navy/10 p-0.5 bg-sage/20 w-full h-[38px]">
                  <button
                    type="button"
                    onClick={() => setAreaUnit("sqft")}
                    className={`flex-1 text-xs font-bold rounded-lg ${
                      areaUnit === "sqft" ? "bg-white text-navy shadow-xs" : "text-navy/60"
                    }`}
                  >
                    sq ft
                  </button>
                  <button
                    type="button"
                    onClick={() => setAreaUnit("sqm")}
                    className={`flex-1 text-xs font-bold rounded-lg ${
                      areaUnit === "sqm" ? "bg-white text-navy shadow-xs" : "text-navy/60"
                    }`}
                  >
                    sq m
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl h-[38px]"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor={floorId} className="text-xs font-bold text-navy">
                  Floors (G+N)
                </label>
                <input
                  id={floorId}
                  type="number"
                  min="1"
                  value={floors || ""}
                  onChange={(e) => setFloors(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          {/* EDITABLE MATERIAL TABLE */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80">
                Material Bill of Quantities & Local Rates
              </span>
              <button
                type="button"
                onClick={addMaterialRow}
                className="text-xs font-bold text-steel hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Material
              </button>
            </div>

            <div className="overflow-x-auto border border-navy/10 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-sage/40 text-navy font-black text-[11px] border-b border-navy/10">
                  <tr>
                    <th className="p-2.5">Material</th>
                    <th className="p-2.5">Qty & Unit</th>
                    <th className="p-2.5">Local Rate (₹)</th>
                    <th className="p-2.5">Wastage %</th>
                    <th className="p-2.5 text-right">Subtotal</th>
                    <th className="p-2.5 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {materials.map((m) => {
                    const rowCalc = result.calculatedRows.find((r) => r.id === m.id);
                    return (
                      <tr key={m.id} className="hover:bg-sage/10 transition-colors">
                        <td className="p-2">
                          <input
                            type="text"
                            value={m.name}
                            onChange={(e) => updateMaterial(m.id, "name", e.target.value)}
                            className="w-full px-2 py-1 font-semibold text-navy bg-transparent border border-transparent hover:border-navy/15 rounded"
                          />
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={m.quantity || ""}
                            onChange={(e) => updateMaterial(m.id, "quantity", parseFloat(e.target.value) || 0)}
                            className="w-16 px-1.5 py-1 text-right font-bold text-navy bg-sage/20 border border-navy/10 rounded mr-1"
                          />
                          <span className="text-[10px] text-navy/60 font-semibold">{m.unit}</span>
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={m.rate || ""}
                            onChange={(e) => updateMaterial(m.id, "rate", parseFloat(e.target.value) || 0)}
                            className="w-20 px-1.5 py-1 text-right font-bold text-navy bg-sage/20 border border-navy/10 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={m.wastagePct || ""}
                            onChange={(e) => updateMaterial(m.id, "wastagePct", parseFloat(e.target.value) || 0)}
                            className="w-12 px-1.5 py-1 text-right font-bold text-navy bg-sage/20 border border-navy/10 rounded"
                          />
                        </td>
                        <td className="p-2 text-right font-black text-navy whitespace-nowrap">
                          ₹{(rowCalc?.totalRowCost || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="p-2 text-center">
                          {materials.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMaterialRow(m.id)}
                              className="text-navy/40 hover:text-rose-500"
                              aria-label="Remove material row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* LABOUR, CONSULTANCY & CONTINGENCY */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80">
              Labour, Approvals & Contingency
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor={labourId} className="text-[11px] font-bold text-navy">
                  Labour Contractor Cost (₹)
                </label>
                <input
                  id={labourId}
                  type="number"
                  value={labourCost || ""}
                  onChange={(e) => setLabourCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="350000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={feesId} className="text-[11px] font-bold text-navy">
                  Consultant & Permits (₹)
                </label>
                <input
                  id={feesId}
                  type="number"
                  value={consultantCost + permitCost || ""}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setConsultantCost(val);
                    setPermitCost(0);
                  }}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="55000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={contId} className="text-[11px] font-bold text-navy">
                  Contingency Buffer (%)
                </label>
                <input
                  id={contId}
                  type="number"
                  value={contingencyPct || ""}
                  onChange={(e) => setContingencyPct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* PRICE SENSITIVITY INTELLIGENCE */}
          <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-navy flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-steel" /> Price Sensitivity Simulator
              </span>
              <span className="text-xs font-bold text-steel">+{sensitivityRatePct}% Rate Rise</span>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor={sensId} className="text-xs text-navy/70 whitespace-nowrap">
                Simulate Material Inflation Rate (%):
              </label>
              <input
                id={sensId}
                type="number"
                min="0"
                step="1"
                value={sensitivityRatePct || ""}
                onChange={(e) => setSensitivityRatePct(parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-1.5 text-xs font-bold text-navy bg-white border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              Estimated Material Budget
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ₹{result.totalMaterialBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-cream/90">
                ₹{result.costPerSqFtMaterial.toFixed(2)} / sq ft
              </span>
              <span className="font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-cream/90">
                ₹{result.costPerSqMMaterial.toFixed(2)} / sq m
              </span>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="space-y-2 pt-3 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Raw Procurement Cost</span>
              <span className="font-bold text-white">₹{result.totalRawMaterialCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Site Handling & Cutting Wastage</span>
              <span className="font-bold text-amber-300">₹{result.totalWastageCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Labour Contractor Cost</span>
              <span className="font-bold text-white">₹{result.labourCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Consultant & Permit Fees</span>
              <span className="font-bold text-white">₹{result.otherProjectCosts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            {result.contingencyAmount > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>Contingency Buffer ({contingencyPct}%)</span>
                <span className="font-bold text-[#e89d67]">+₹{result.contingencyAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-cream/15 font-black text-white text-base">
              <span>Total Estimated Project Budget</span>
              <span className="text-emerald-300">
                ₹{result.totalProjectBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-cream/60">
              <span>All-Inclusive Project Rate</span>
              <span>₹{result.costPerSqFtProject.toFixed(2)} / sq ft</span>
            </div>
          </div>

          {/* Price Sensitivity Box */}
          <div className="p-3.5 bg-white/5 rounded-2xl border border-cream/10 space-y-1.5 text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e89d67] block">
              Inflation Sensitivity (+{sensitivityRatePct}%)
            </span>
            <div className="flex justify-between items-center text-xs">
              <span className="text-cream/70">At +{sensitivityRatePct}% Material Rise:</span>
              <strong className="text-white">₹{result.sensitivityTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-cream/60">Additional Material Capital:</span>
              <strong className="text-rose-300">+₹{result.sensitivityIncreaseCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
              aria-label="Share Calculator"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
              aria-label="Reset Calculator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
