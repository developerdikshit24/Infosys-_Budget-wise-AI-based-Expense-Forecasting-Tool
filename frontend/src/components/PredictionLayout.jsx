import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { getRecentExpenseThunk } from '../stores/expense';
import { formatDate } from '../constant';

const PredictionLayout = () => {
    const dispatch = useDispatch()
    const { loggedUser } = useSelector(state => state.authentication)
    
    const { recentExenses } = useSelector(state=> state.expense)
    const expenses = [
        { date: "12-01", title: "Zomato", category: "Food", amount: 601 },
        { date: "13-01", title: "Uber", category: "Travel", amount: 260 },
        { date: "14-01", title: "Amazon", category: "Shopping", amount: 360 },
        { date: "16-01", title: "Restaurant", category: "Food", amount: 1000 },
    ];
    useEffect(() => {
        if (loggedUser) {
            dispatch(getRecentExpenseThunk({ userId: loggedUser?.id }))
        }
    },[loggedUser])

    return (
        <div className='w-1/5 mt-1 '>
            <div className='w-full flex flex-col gap-y-3'>
                <div className='bg-gray-100/90 backdrop-filter backdrop-blur rounded-lg shadow-lg p-4'>
                    <div className='p-1'>
                        <h1 className='text-lg text-blue-950 font-semibold'>AI Forcast</h1>
                        <p className='text-xs'> Predicted budget Last Month is higher</p>
                        <h1 className='text-2xl py-2 text-green-800/80 font-bold'>₹ 21,300 /-</h1>
                    </div>

                    <div className='flex flex-col gap-y-3'>
                        <div className='bg-white/60 shadow-md rounded-lg p-3'>
                            <h1 className='text-sm font-semibold text-red-600'>URGENCY</h1>
                            <p className='text-xs text-black/70 font-semibold'>High overspending in Food category <span className='text-green-700'>₹ 1,000</span></p>
                        </div>
                        <div className='bg-white/80 shadow-md rounded-lg p-3'>
                            <h1 className='text-sm font-semibold text-blue-950/90'>Suggestion</h1>
                            <p className='text-xs text-black/70 font-semibold'>Reduce dining by <span className='text-amber-600'>15%</span></p>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-100/90 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex flex-col p-2'>
                        <div className='font-semibold text-blue-950/80 text-lg py-2 pl-1'>Recent Trancations</div>
                        <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-md px-4 w-full pb-3">

                            <table className="w-full text-left border-collapse">

                                {/* Header */}
                                <thead>
                                    <tr className="border-b text-blue-900 text-xs">
                                        <th className="py-3 pr-2">Date</th>
                                        <th className="py-3 pr-2">Category</th>
                                        <th className="py-3 text-right">Amount</th>
                                    </tr>
                                </thead>

                                {/* Body */}
                                <tbody>
                                    {recentExenses.map((exp, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-blue-50 transition duration-200"
                                        >
                                            <td className="py-3 text-[10px] px-0.5 text-blue-950/80 font-semibold" >{formatDate(exp.expense_date)}</td>
                                            <td className="py-3 text-xs">{exp?.category_name}</td>
                                            <td className="py-3 text-xs text-right font-bold text-red-600">
                                                ₹{exp.amount.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <Link className=' bg-blue-200/80 w-fit mt-2 ml-1 text-sm px-2 rounded-full pb-1 font-semibold cursor-pointer text-blue-950/90 hover:bg-blue-300/50 ' to={"/report"}>see more</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PredictionLayout