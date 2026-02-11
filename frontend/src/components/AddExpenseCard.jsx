import React from 'react'

const AddExpenseCard = () => {
    return (
        <div className='bg-gray-100/80 w-3/4 backdrop-filter backdrop-blur rounded-md shadow-lg'>
            <h1 className='text-2xl font-semibold w-full px-4 pt-5 text-blue-950'>Add Expense</h1>
            {/* Add Expense */}
            <div className="px-4 py-2">
                <label className="block mb-2 py-1 font-medium">Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                        ₹
                    </span>
                    <input
                        type="text"
                        inputMode='numeric'
                        placeholder="0"
                        className="bg-white w-full pl-10 pr-4 py-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-800/70 text-lg font-semibold"
                    />

                </div>
                {/* Add Category */}
                <label className="block mb-2 mt-1 py-1 font-medium">Category</label>
                <div className="relative group">
                    <span className="absolute z-30 left-3 top-1/2 -translate-y-1/2 opacity-70">
                        <img className="w-6" src="/Categories.png" alt="" />
                    </span>

                    {/* Select */}
                    <select
                        className="appearance-none bg-white  backdrop-blur-md w-full pl-11 pr-12 py-3  rounded-xl shadow-md  outline-none  focus:border-blue-500 focus:ring-2 focus:ring-blue-800/40 text-gray-700 font-semibold transition-all duration-200 group-hover:shadow-lg cursor-pointer"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Category</option>
                        <option value={'Food'}>Food</option>
                        <option value={'Travel'}>Travel</option>
                        <option value={'Shopping'}>Shopping</option>
                        <option value={'Health'}>Health</option>
                        <option value={'Entertainment'}>Entertainment</option>
                        <option value={'Bills'}>Bills</option>
                        <option value={'Education'}>Education</option>
                        <option value={'Others'}>Others</option>
                    </select>

                    {/* Custom Arrow */}
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </div>
                {/* Select Date */}
                <label className="block mb-2 mt-1 py-1 font-medium">Date</label>
                <div className="relative">
                    <input
                        type="date"
                        className="bg-white w-full pl-4 pr-4 py-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-800/70 text-lg font-semibold"
                    />
                </div>
                <label className="block mb-2 mt-1 py-1 font-medium">Add Note (Optional)</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                        <img className='w-5 opacity-70' src="./note.png" alt="add-note" />
                    </span>
                    <input
                        type="text"
                        placeholder="Add your note (optional)"
                        className="bg-white w-full pl-10 pr-4 py-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-800/70 text-lg font-semibold"
                    />
                </div>
                <button className='w-full p-2 mt-4 mb-1 text-lg text-white font-semibold rounded-lg shadow-lg cursor-pointer bg-blue-900 hover:bg-blue-950'>Save Expense</button>
            </div>
        </div>
    )
}

export default AddExpenseCard