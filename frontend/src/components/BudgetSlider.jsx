import { useState } from "react";

export default function BudgetSlider() {
    const min = 5000;
    const max = 50000;

    const [value, setValue] = useState(21300);

    // percentage calculation
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">

            {/* Slider */}
            <input
                type="range"
                min={min}
                max={max}
                step={500}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer budget-range"
                style={{
                    background: `linear-gradient(to right, #facc15 ${percentage}%, #c7d2fe ${percentage}%)`
                }}
            />

            {/* Labels */}
            <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>₹5,000</span>
                <span>₹50,000</span>
            </div>

        </div>
    );
}
