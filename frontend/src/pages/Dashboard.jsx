import { useEffect } from 'react'
import SpendingChart from '../components/SpendingChart.jsx'
import CategoryChart from '../components/CategoryChart.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getFormattedDate } from '../constant.js'

const Dashboard = () => {
    const navigate = useNavigate()
    const { loggedUser } = useSelector(state => state.authentication)
    const { dashboardData } = useSelector(state => state.expense)


    useEffect(() => {
        if (!loggedUser) navigate('/login')
    }, [loggedUser])
    console.log(dashboardData)
    return (
        <div className='w-2/3 mx-2 mt-8'>
            <div className='p-4 w-full'>
                <h1 className='text-2xl font-semibold text-blue-950/80'>{`Hello, ${loggedUser?.name?.split(' ')[0]} ✌🏻`} </h1>
                <p className='text-sm font-semibold text-gray-950/80'>{getFormattedDate()}</p>
            </div>
            <div className='flex gap-2 w-full'>
                {/* Short Details Cards */}
                <div className='bg-gray-100/80 w-1/4 p-2 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'> Monthly Spend</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-red-600'>{`₹ ${dashboardData?.monthly_spend?.toLocaleString() || 0} /-`}</p>
                </div>
                <div className='bg-gray-100/80 w-1/4 p-2 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-amber-600 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Monthly Budget</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-orange-700'>{`₹ ${loggedUser?.monthly_limit?.toLocaleString() } /-`}</p>
                </div>
                <div className='bg-gray-100/80 p-2 w-1/4 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-purple-600 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Today's Spend</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-blue-900'>{`₹ ${dashboardData?.todays_spend?.toLocaleString() || 0} /-`}</p>
                </div>
                <div className='bg-gray-100/80 p-2 w-1/4 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-2 items-center'>
                        <div className="w-1 h-5 bg-green-600 rounded-full"></div>
                        <h1 className='text-lg text-blue-950 font-semibold'>Remaining Balance</h1>
                    </div>
                    <p className='text-2xl p-2 px-3 font-semibold text-red-600'>{`₹ ${(loggedUser?.monthly_limit - dashboardData?.monthly_spend)?.toLocaleString() || 0} /-`}</p>
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
                <div className='w-2/5 bg-gray-100/80 backdrop-filter backdrop-blur rounded-lg shadow-lg'>
                    <div className='flex gap-3 items-center p-2 pt-4'>
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