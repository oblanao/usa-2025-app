"use client";

import { useState, useEffect } from "react";
import { DollarSign, ArrowRight } from "react-feather";

const CurrencyConverter = () => {
  const [usdAmount, setUsdAmount] = useState<string>("");
  const [ronAmount, setRonAmount] = useState<string>("");
  const exchangeRate = 4.34; // 1 USD = 4.34 RON

  useEffect(() => {
    if (usdAmount === "") {
      setRonAmount("");
      return;
    }

    const usdValue = parseFloat(usdAmount);
    if (!isNaN(usdValue)) {
      const ronValue = usdValue * exchangeRate;
      setRonAmount(ronValue.toFixed(2));
    } else {
      setRonAmount("");
    }
  }, [usdAmount]);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setUsdAmount(value);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-3 rounded-full">
          <DollarSign className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Currency Converter
          </h3>
          <p className="text-sm text-gray-500">
            USD to RON • Rate: 1 USD = 4.34 RON
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* USD Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            US Dollar (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">$</span>
            </div>
            <input
              type="text"
              value={usdAmount}
              onChange={handleUsdChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-200 text-lg font-medium"
            />
          </div>
        </div>

        {/* Conversion Arrow */}
        <div className="flex justify-center">
          <div className="bg-gradient-accent p-2 rounded-full">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* RON Output */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Romanian Leu (RON)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">RON</span>
            </div>
            <div className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-lg font-medium text-gray-800">
              {ronAmount || "0.00"}
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Quick amounts:
          </p>
          <div className="flex flex-wrap gap-2">
            {[10, 25, 50, 100, 200].map((amount) => (
              <button
                key={amount}
                onClick={() => setUsdAmount(amount.toString())}
                className="px-4 py-2 bg-accent/10 text-accent rounded-lg font-medium text-sm hover:bg-accent/20 transition-colors duration-200"
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
