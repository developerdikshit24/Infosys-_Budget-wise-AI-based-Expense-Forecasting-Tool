import { CirclePlus } from 'lucide-react'
import React, { useState } from 'react'
import BudgetSlider from '../components/BudgetSlider';

const MonthlyBudget = () => {
    const min = 1000;
    const max = 50000;
    const [value, setValue] = useState(10000);
    const percentage = ((value - min) / (max - min)) * 100;
    return (
        <div className='w-[85%] h-full flex justify-center items-center'>
            <div className="bg-gray-100/80 backdrop-filter backdrop-blur rounded-lg w-11/12 shadow-lg p-4">
                <div id='Title' >
                    <div className='flex gap-2 items-center'>
                        <img src="./Monthly Budget.png" className='w-5 pt-1' alt="categories" />
                        <h1 className='text-2xl font-semibold text-blue-900'>Set Monthly Limit</h1>
                    </div>
                    <p className='text-sm font-semibold text-black/70 pl-7'>Plan and Set Your Monthly Limit</p>
                    <div className='p-4'>
                        <div className='overflow-hidden p-4'>
                            
                                <h1 className='text-lg py-2 font-semibold text-blue-950'>Monthly Budget Amount</h1>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                                    ₹
                                </span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={value}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/\D/g, ""); // allow only digits
                                        setValue(v);
                                    }}
                                    placeholder="0"
                                    className="bg-white w-full pl-10 pr-4 py-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-800/70 text-lg font-semibold"
                                />
                            </div>
                            <div className="relative py-4">
                                {/* Value Bubble */}
                                <div
                                    className="absolute -top-2 text-emerald-600 font-semibold text-sm"
                                    style={{
                                        left: `calc(${(value - 1000) / (50000 - 1000) * 100}% - 20px)`
                                    }}
                                >
                                    ₹ {value.toLocaleString("en-IN")}
                                </div>

                                {/* Range Slider */}
                                <input
                                    type="range"
                                    min={min}
                                    max={max}
                                    step={500}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer budget-range transition-all duration-500"
                                    style={{
                                        background: `linear-gradient(to right, #facc15 ${percentage}%, #c7d2fe ${percentage}%)`
                                    }}
                                />

                                {/* Labels */}
                                <div className="flex justify-between text-sm text-slate-500 mt-2">
                                    <span>₹1,000</span>
                                    <span>₹50,000</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyBudget
