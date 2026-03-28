import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecentExpenseThunk } from '../stores/expense';

const PredictionLayout = () => {
    const dispatch = useDispatch()
    const { loggedUser } = useSelector(state => state.authentication)

    const { aiAnalysisData, dashboardData } = useSelector(state => state.expense);

    useEffect(() => {
        if (loggedUser) {
            dispatch(getRecentExpenseThunk({ userId: loggedUser?.id }))
        }
    }, [loggedUser])
    const savingRatio = ((loggedUser?.income - dashboardData?.monthly_spend) / loggedUser?.income) * 100
    return (
        <div className='w-1/5 mt-1 '>
            <div className='w-full flex flex-col gap-y-3'>
                <div className='bg-gray-100/90 backdrop-filter backdrop-blur rounded-lg shadow-lg p-4'>
                    <div className='p-1'>
                        <h1 className='text-lg text-blue-950 font-semibold'>AI Forcast</h1>
                        <p className='text-xs'> Predicted next month expense will be approximately </p>
                        <h1 className='text-2xl py-2 text-green-800/80 font-bold'>{`₹ ${aiAnalysisData?.predicted_monthly_expense?.toLocaleString()} /-`}</h1>
                    </div>

                    <div className='flex flex-col gap-y-3'>
                        <div className='bg-white/60 shadow-md rounded-lg p-3'>
                            <h1 className='text-sm font-semibold text-red-600'>WARNING</h1>
                            {aiAnalysisData?.warnings ? <p className='text-xs text-black/70 font-semibold'>{aiAnalysisData?.warnings[0]}</p> : ''}
                        </div>
                        <div className='bg-white/80 shadow-md rounded-lg p-3'>
                            <h1 className='text-sm font-semibold text-orange-400'>Suggestion</h1>
                            {aiAnalysisData.suggestions ? <p className='text-xs text-black/70 font-semibold'>{`${aiAnalysisData?.suggestions[0]}`}</p> : ''}
                        </div>
                    </div>
                </div>
                <div className='bg-gray-100/90 backdrop-filter backdrop-blur rounded-lg shadow-lg p-2'>
                    <div className='flex flex-col gap-y-4 p-2'>
                        <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-md px-4 w-full pb-3 p-4">
                            <div className='flex gap-2 items-center'>
                                <div className="w-1 h-5 bg-green-600 rounded-full"></div>
                                <h1 className='text-md text-blue-950 font-semibold'>Monthly Income</h1>
                            </div>
                            <p className='text-xl px-3 font-semibold text-green-700 '>{`₹ ${(loggedUser?.income)?.toLocaleString() || 0} /-`}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow-md px-4 w-full pb-3 p-4">
                            <div className='flex gap-2 items-center'>
                                <div className="w-1 h-5 bg-cyan-600 rounded-full"></div>
                                <h1 className='text-md text-blue-950 font-semibold'>Saving Ratio</h1>
                            </div>
                            <p className='text-xl px-3 font-semibold text-cyan-600 '>{`${savingRatio?.toLocaleString() || 0}%`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PredictionLayout