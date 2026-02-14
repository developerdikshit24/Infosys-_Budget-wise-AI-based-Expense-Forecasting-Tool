import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import SpendingChart from '../components/SpendingChart.jsx'
import CategoryChart from '../components/CategoryChart.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Dashboard = () => {
    const navigate = useNavigate()
    const { loggedUser } = useSelector(state => state.authentication)

    useEffect(() => {
        if(!loggedUser) navigate('/login')
    }, [loggedUser])
    
    return (
        <div className='w-2/3 mx-2'>
            <div className='p-4 w-full'>
                <h1 className='text-2xl font-semibold text-blue-950/80'>{`Hello, ${loggedUser?.name?.split(' ')[0]} ✌🏻`} </h1>
                <p className='text-sm font-semibold text-gray-950/80'>Monday, February 12, 2026</p>
            </div>
            <div className='flex gap-2 w-full'>
                {/* Short Details Cards */}
                <div className='bg-gray-100/80 w-1/4 p-2 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Total Spend</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-green-700'>₹ 21,300 /-</p>
                    <p className='px-2 text-sm text-black/80 font-semibold'><span className='font-semibold text-amber-600'>12%</span> more than last month </p>
                </div>
                <div className='bg-gray-100/80 w-1/4 p-2 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-amber-600 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Monthly Budget</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-orange-700'>{`₹ ${loggedUser?.monthly_limit} /-`}</p>
                    <p className='px-2 text-sm text-black/80 font-semibold'><span className='font-semibold text-amber-600'>12%</span> more than last month </p>
                </div>
                <div className='bg-gray-100/80 p-2 w-1/4 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-purple-600 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Today's Spend</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-blue-900'>₹ 21,300 /-</p>
                    <p className='px-2 text-sm text-black/80 font-semibold'><span className='font-semibold text-green-600'>12%</span> less than last month </p>
                </div>
                <div className='bg-gray-100/80 p-2 w-1/4 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-green-600 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Remaining Balance</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-red-600'>₹ 21,300 /-</p>
                    <p className='px-2 text-sm text-black/80 font-semibold'><span className='font-semibold text-red-500'>15%</span> more from last month </p>
                </div>
            </div>
            <div className='flex w-full gap-2 my-2'>
                {/* Visual Overview Section */}
                <div className='w-3/5 bg-gray-100/80 backdrop-filter backdrop-blur rounded-lg shadow-lg p-4'>
                    <div className='flex gap-3 items-center py-2'>
                        <div className="w-1 h-6 bg-violet-800 rounded-full"></div>
                        <h2 className="font-semibold text-lg">Monthly Spending</h2>
                    </div>
                    <SpendingChart />
                </div>
                <div className='w-2/5 bg-gray-100/80 backdrop-filter backdrop-blur rounded-lg shadow-lg p-4'>
                    <div className='flex gap-3 items-center p-2'>
                        <div className="w-1 h-6 bg-fuchsia-600 rounded-full "></div>
                        <h2 className="font-semibold text-lg">Expense By Category</h2>
                    </div>
                    <CategoryChart />
                </div>
            </div>
        </div>

    )
}

export default Dashboard