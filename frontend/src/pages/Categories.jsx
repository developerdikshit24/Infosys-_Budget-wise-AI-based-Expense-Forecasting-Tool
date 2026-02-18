import React, { useState } from 'react'
import { Trash2, Pencil, IndianRupee, CirclePlus } from 'lucide-react'
import { useSelector } from 'react-redux';
import AddCategories from '../components/AddCategories';

const Categories = () => {
    const { categoryExpenseTotal } = useSelector(state => state.expense)
    // TODO: Replace with store for global access 
    const [isActive, setIsActive] = useState(false)
    return (
        <div className='w-[87%] h-full flex relative justify-center items-center'>
            <div className="bg-gray-100/80 backdrop-filter backdrop-blur rounded-lg w-11/12 shadow-lg p-4">
                {/* Title & Add Categories Button */}
                <div>
                    <div id='Title' >
                        <div className='flex gap-2 items-center'>
                            <img src="./Categories.png" className='w-5 pt-1' alt="categories" />
                            <h1 className='text-2xl font-semibold text-blue-900'>Categories</h1>
                        </div>
                        <p className='text-sm font-semibold text-black/70 pl-7'>Manage and edit your expense categories</p>
                    </div>
                    <div className='w-full flex items-center justify-end p-3 '>

                        <button onClick={() => { setIsActive(!isActive) }} className='bg-blue-800 p-2 text-white hover:bg-blue-900 ease-in-out duration-200 rounded-lg font-semibold'>
                            <div className='flex gap-1 items-center'>
                                {<CirclePlus className='w-4' />}
                                <h1>Add Expense</h1>
                            </div>
                        </button>
                    </div>
                </div>
                {/* All Categories with spending Amount  */}
                <div className='flex gap-3 items-center'>
                    <div className="w-1 h-6 bg-fuchsia-600 rounded-full "></div>
                    <h1 className='text-lg py-4 font-semibold text-blue-950'>All Categories</h1>
                </div>
                <div className='bg-white  backdrop-filter backdrop-blur h-[350px] rounded-lg shadow-lg p-4 overflow-y-scroll no-scrollbar'>
                    <div className='rounded-xl overflow-hidden'>
                        <table className='w-full border-collapse text-left'>
                            <thead className='bg-blue-200/80 rounded-xl '>
                                <tr className="border-b w-full text-blue-900/80 rounded-2xl ">
                                    <th className="py-3 pl-2">Category</th>
                                    <th className="py-3">Total Expense</th>
                                    <th className="py-3 text-center pr-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryExpenseTotal?.map((exp, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-blue-50 transition duration-200"
                                    >
                                        <td className="py-3 text-left pl-2 font-semibold px-0.5"> {index + 1}{". "} {exp?.category}</td>
                                        <td className="py-3 text-left">
                                            <div className='flex gap-1'>
                                                {<IndianRupee className='w-4' />}
                                                {exp?.total}
                                            </div>
                                        </td>
                                        <td className="py-3 text-center font-semibold ">
                                            <button className='mr-4 px-2 py-0.5 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-200 text-center'>
                                                <div className='flex gap-1'>
                                                    {<Pencil className='w-4' />}
                                                    <h1>Edit</h1>
                                                </div>
                                            </button>
                                            <button className='px-2 py-0.5 rounded-md bg-gray-200 cursor-pointer hover:bg-red-500 hover:text-white text-center'>
                                                <div className='flex gap-1'>
                                                    {<Trash2 className='w-4' />}
                                                    <h1>Delete</h1>
                                                </div>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           { isActive && <AddCategories />}
        </div>

    )
}

export default Categories