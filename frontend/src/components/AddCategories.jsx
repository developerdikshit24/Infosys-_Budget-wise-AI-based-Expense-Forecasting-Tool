import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addUserExpenseCategory, ToggleAddExpenseCard } from '../stores/expense'
const AddCategories = () => {

    const [value, setValue] = useState('')
    const { expenseCatgories } = useSelector(state => state.expense)
    const dispatch = useDispatch()
    const handleClick = () => {
        if (!value.trim()) return toast.warn("Input Field Required")
        const isExistAlready = expenseCatgories.some((cat) => cat.category_name.toLowerCase() == value.toLowerCase().trim());
        if (isExistAlready) {
            return toast.error("Category already exist!");
        }
        dispatch(addUserExpenseCategory({ 'category_name': value }))
        
    }

    const handleCrossClick = () => {
        dispatch(ToggleAddExpenseCard())
    }

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ease-in-out duration-300 flex-col bg-blue-50/50 backdrop-filter backdrop-blur rounded-lg shadow-lg flex w-3/4'>
            <div className='flex items-center justify-between pt-5 p px-6' >
                <div className='flex gap-2 items-center'>
                    <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                    <h1 className='text-xl font-semibold text-blue-900'>Add Category</h1>
                </div>
                <button onClick={handleCrossClick} className='cursor-pointer'>
                    <X />
                </button>
            </div>

            <div className='px-4 w-full'>
                {/* Category Input */}
                <div className='overflow-hidden p-4 w-full '>
                    <h1 className='text-lg py-2 font-semibold text-blue-950'>Add Expense Category</h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            placeholder="Enter new Category"
                            className="bg-white w-full pl-10 pr-4 py-3 rounded-xl shadow-md outline-none focus:ring-2 focus:ring-blue-800/70 text-lg font-semibold"
                        />
                    </div>
                </div>
                {/* Submit */}
                <div className='w-full flex justify-end p-4'>
                    <div>
                        <button onClick={handleCrossClick} className='mr-4 px-2 py-0.5 rounded-md font-semibold text-lg bg-blue-100 cursor-pointer hover:bg-blue-200 text-center'>
                            Cancel
                        </button>
                        <button onClick={handleClick} className='px-2 py-0.5 rounded-md font-semibold text-lg bg-blue-800 cursor-pointer hover:bg-blue-900 text-white text-center'>
                            Add
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AddCategories
