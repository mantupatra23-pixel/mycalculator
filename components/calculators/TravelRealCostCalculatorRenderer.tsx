"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, Plane, Hotel, Utensils, ShieldAlert, CheckCircle2 } from "lucide-react";
import { calculateTravelRealCost } from "@/lib/calculatorEngines";

export function TravelRealCostCalculatorRenderer() {
  const [travelers, setTravelers] = useState<number>(2);
  const [days, setDays] = useState<number>(5);
  const [nights, setNights] = useState<number>(4);
  const [flightTrainTotal, setFlightTrainTotal] = useState<number>(14000);
  const [localTransportPerDay, setLocalTransportPerDay] = useState<number>(1000);
  const [airportTransfers, setAirportTransfers] = useState<number>(1200);
  const [fuelTollParking, setFuelTollParking] = useState<number>(800);
  const [hotelPerNight, setHotelPerNight] = useState<number>(3000);
  const [rooms, setRooms] = useState<number>(1);
  const [foodPerPersonPerDay, setFoodPerPersonPerDay] = useState<number>(800);
  const [snacksPerDay, setSnacksPerDay] = useState<number>(400);
  const [sightseeingTickets, setSightseeingTickets] = useState<number>(2500);
  const [activitiesTotal, setActivitiesTotal] = useState<number>(3500);
  const [shoppingBudget, setShoppingBudget] = useState<number>(4000);
  const [insuranceTotal, setInsuranceTotal] = useState<number>(600);
  const [visaPermits, setVisaPermits] = useState<number>(0);
  const [bookingFees, setBookingFees] = useState<number>(400);
  const [emergencyBudget, setEmergencyBudget] = useState<number>(1000);
  const [contingencyPct, setContingencyPct] = useState<number>(5);
  const [plannedBudget, setPlannedBudget] = useState<number>(60000);
  const [copied, setCopied] = useState(false);

  const travelersId = useId();
  const daysId = useId();
  const nightsId = useId();
  const flightId = useId();
  const localTrId = useId();
  const transferId = useId();
  const tollId = useId();
  const hotelId = useId();
  const roomsId = useId();
  const foodId = useId();
  const snacksId = useId();
  const sightId = useId();
  const actId = useId();
  const shopId = useId();
  const insId = useId();
  const visaId = useId();
  const feeId = useId();
  const emergId = useId();
  const contId = useId();
  const budgetId = useId();

  const handleReset = () => {
    setTravelers(2);
    setDays(5);
    setNights(4);
    setFlightTrainTotal(14000);
    setLocalTransportPerDay(1000);
    setAirportTransfers(1200);
    setFuelTollParking(800);
    setHotelPerNight(3000);
    setRooms(1);
    setFoodPerPersonPerDay(800);
    setSnacksPerDay(400);
    setSightseeingTickets(2500);
    setActivitiesTotal(3500);
    setShoppingBudget(4000);
    setInsuranceTotal(600);
    setVisaPermits(0);
    setBookingFees(400);
    setEmergencyBudget(1000);
    setContingencyPct(5);
    setPlannedBudget(60000);
  };

  const result = calculateTravelRealCost({
    travelers,
    days,
    nights,
    flightTrainTotal,
    localTransportPerDay,
    airportTransfers,
    fuelTollParking,
    hotelPerNight,
    rooms,
    foodPerPersonPerDay,
    snacksPerDay,
    sightseeingTickets,
    activitiesTotal,
    shoppingBudget,
    insuranceTotal,
    visaPermits,
    bookingFees,
    emergencyBudget,
    contingencyPct,
    plannedBudget,
  });

  const handleCopy = () => {
    const text = `Travel Real Cost Summary:\n"Trip ka actual total kharcha kitna hoga?"\n\nTotal Real Trip Cost: ₹${result.totalRealCost.toFixed(2)}\nPer Person: ₹${result.costPerPerson.toFixed(2)} (${travelers} Travelers)\nPer Day: ₹${result.costPerDay.toFixed(2)} (${days} Days)\n\nBreakdown:\n- Transport: ₹${result.transportTotal.toFixed(2)}\n- Accommodation (${nights} Nights): ₹${result.accommodationTotal.toFixed(2)}\n- Food & Snacks: ₹${result.foodTotal.toFixed(2)}\n- Activities & Sightseeing: ₹${result.activitiesTotal.toFixed(2)}\n- Shopping: ₹${result.shoppingTotal.toFixed(2)}\n- Hidden Fees & Contingency: ₹${result.hiddenCostTotal.toFixed(2)}\n${plannedBudget > 0 ? `Budget Variance: ${result.budgetVariance >= 0 ? `Under Budget by ₹${result.budgetVariance.toFixed(2)}` : `Over Budget by ₹${Math.abs(result.budgetVariance).toFixed(2)}`}\n` : ""}Calculated on https://www.mycalculator.xyz/calculators/travel-real-cost-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Travel Real Cost Calculator",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* Supporting Phrase Bar */}
      <div className="bg-sage/40 border border-navy/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-white rounded-xl text-steel shadow-2xs">
            <Plane className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-black text-navy block">
              &ldquo;Trip ka actual total kharcha kitna hoga?&rdquo;
            </span>
            <span className="text-[11px] text-navy/70">
              True all-inclusive travel estimator with local cabs, daily food, tickets, and hidden contingency buffers.
            </span>
          </div>
        </div>
        {plannedBudget > 0 && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black ${
              result.budgetStatus === "under"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : result.budgetStatus === "near"
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-rose-100 text-rose-800 border border-rose-300"
            }`}
          >
            {result.budgetStatus === "under" ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5" />
            )}
            {result.budgetStatus === "under"
              ? `Under Budget (₹${result.budgetVariance.toLocaleString(undefined, { maximumFractionDigits: 0 })} left)`
              : result.budgetStatus === "near"
              ? "Near Budget Limit"
              : `Over Budget by ₹${Math.abs(result.budgetVariance).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-6">
          {/* TRIP DETAILS */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              Trip Duration & Party
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor={travelersId} className="text-xs font-bold text-navy">
                  Travelers
                </label>
                <input
                  id={travelersId}
                  type="number"
                  min="1"
                  value={travelers || ""}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="2"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={daysId} className="text-xs font-bold text-navy">
                  Total Days
                </label>
                <input
                  id={daysId}
                  type="number"
                  min="1"
                  value={days || ""}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="5"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={nightsId} className="text-xs font-bold text-navy">
                  Nights Stayed
                </label>
                <input
                  id={nightsId}
                  type="number"
                  min="0"
                  value={nights || ""}
                  onChange={(e) => setNights(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="4"
                />
              </div>
            </div>
          </div>

          {/* TRANSPORT */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-steel" /> Transit & Local Travel
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor={flightId} className="text-[11px] font-bold text-navy">
                  Flights / Train / Bus Total (₹)
                </label>
                <input
                  id={flightId}
                  type="number"
                  min="0"
                  value={flightTrainTotal || ""}
                  onChange={(e) => setFlightTrainTotal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="14000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={localTrId} className="text-[11px] font-bold text-navy">
                  Local Cabs / Metro per Day (₹)
                </label>
                <input
                  id={localTrId}
                  type="number"
                  min="0"
                  value={localTransportPerDay || ""}
                  onChange={(e) => setLocalTransportPerDay(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={transferId} className="text-[11px] font-bold text-navy">
                  Airport/Station Transfers (₹)
                </label>
                <input
                  id={transferId}
                  type="number"
                  min="0"
                  value={airportTransfers || ""}
                  onChange={(e) => setAirportTransfers(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1200"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={tollId} className="text-[11px] font-bold text-navy">
                  Fuel / Toll / Parking (₹)
                </label>
                <input
                  id={tollId}
                  type="number"
                  min="0"
                  value={fuelTollParking || ""}
                  onChange={(e) => setFuelTollParking(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="800"
                />
              </div>
            </div>
          </div>

          {/* STAY & FOOD */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-steel" /> Lodging & Dining
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor={hotelId} className="text-[11px] font-bold text-navy">
                  Hotel Rate per Night / Room (₹)
                </label>
                <input
                  id={hotelId}
                  type="number"
                  min="0"
                  value={hotelPerNight || ""}
                  onChange={(e) => setHotelPerNight(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="3000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={roomsId} className="text-[11px] font-bold text-navy">
                  Rooms Booked
                </label>
                <input
                  id={roomsId}
                  type="number"
                  min="1"
                  value={rooms || ""}
                  onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={foodId} className="text-[11px] font-bold text-navy">
                  Food per Person / Day (₹)
                </label>
                <input
                  id={foodId}
                  type="number"
                  min="0"
                  value={foodPerPersonPerDay || ""}
                  onChange={(e) => setFoodPerPersonPerDay(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={snacksId} className="text-[11px] font-bold text-navy">
                  Snacks & Drinks / Day Total (₹)
                </label>
                <input
                  id={snacksId}
                  type="number"
                  min="0"
                  value={snacksPerDay || ""}
                  onChange={(e) => setSnacksPerDay(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="400"
                />
              </div>
            </div>
          </div>

          {/* ACTIVITIES, HIDDEN FEES & CONTINGENCY */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-steel" /> Activities & Hidden Outlays
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor={sightId} className="text-[11px] font-bold text-navy">
                  Entry Tickets Total (₹)
                </label>
                <input
                  id={sightId}
                  type="number"
                  value={sightseeingTickets || ""}
                  onChange={(e) => setSightseeingTickets(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="2500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={actId} className="text-[11px] font-bold text-navy">
                  Activities / Tours (₹)
                </label>
                <input
                  id={actId}
                  type="number"
                  value={activitiesTotal || ""}
                  onChange={(e) => setActivitiesTotal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="3500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={shopId} className="text-[11px] font-bold text-navy">
                  Shopping Budget (₹)
                </label>
                <input
                  id={shopId}
                  type="number"
                  value={shoppingBudget || ""}
                  onChange={(e) => setShoppingBudget(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="4000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={insId} className="text-[11px] font-bold text-navy">
                  Insurance / Permits (₹)
                </label>
                <input
                  id={insId}
                  type="number"
                  value={insuranceTotal + visaPermits || ""}
                  onChange={(e) => setInsuranceTotal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="600"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={feeId} className="text-[11px] font-bold text-navy">
                  Booking & Conv Fees (₹)
                </label>
                <input
                  id={feeId}
                  type="number"
                  value={bookingFees || ""}
                  onChange={(e) => setBookingFees(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="400"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={emergId} className="text-[11px] font-bold text-navy">
                  Emergency Buffer (₹)
                </label>
                <input
                  id={emergId}
                  type="number"
                  value={emergencyBudget || ""}
                  onChange={(e) => setEmergencyBudget(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label htmlFor={contId} className="text-[11px] font-bold text-navy">
                  Contingency Buffer (%)
                </label>
                <input
                  id={contId}
                  type="number"
                  step="1"
                  min="0"
                  value={contingencyPct || ""}
                  onChange={(e) => setContingencyPct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="5"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={budgetId} className="text-[11px] font-bold text-navy">
                  Optional Planned Budget (₹)
                </label>
                <input
                  id={budgetId}
                  type="number"
                  min="0"
                  value={plannedBudget || ""}
                  onChange={(e) => setPlannedBudget(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="60000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              Total Real Trip Cost
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ₹{result.totalRealCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-cream/90">
                Per Person: ₹{result.costPerPerson.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-cream/90">
                Per Day: ₹{result.costPerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="space-y-2 pt-3 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Transport & Transfers</span>
              <span className="font-bold text-white">₹{result.transportTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Stay ({nights} Nights, {rooms} Room)</span>
              <span className="font-bold text-white">₹{result.accommodationTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Food, Drinks & Snacks</span>
              <span className="font-bold text-white">₹{result.foodTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Sightseeing & Activities</span>
              <span className="font-bold text-white">₹{result.activitiesTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Shopping Budget</span>
              <span className="font-bold text-white">₹{result.shoppingTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Insurance, Fees & Emergency Buffer</span>
              <span className="font-bold text-white">₹{result.hiddenFeesTotal.toFixed(2)}</span>
            </div>
            {result.contingencyAmount > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>Contingency Buffer ({contingencyPct}%)</span>
                <span className="font-bold text-[#e89d67]">+₹{result.contingencyAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-cream/15 font-black text-white text-base">
              <span>All-Inclusive Cost</span>
              <span className="text-emerald-300">
                ₹{result.totalRealCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Insights Box */}
          <div className="p-3.5 bg-white/5 rounded-2xl border border-cream/10 space-y-1.5 text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e89d67] block">
              Budget Intelligence Insights
            </span>
            <p className="text-[11px] text-cream/80 leading-relaxed">
              Lodging accounts for <strong>{result.stayPctOfTotal.toFixed(1)}%</strong> of your total budget. Estimated hidden fees and contingency add <strong>₹{result.hiddenCostTotal.toFixed(0)}</strong> to your visible plan.
            </p>
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
