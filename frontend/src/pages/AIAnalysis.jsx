import React from 'react'
import { useSelector } from 'react-redux';
import CategoryPercentGraph from '../components/CategoryPercentGraph';
import {  SendHorizonal } from 'lucide-react'
const AIAnalysis = () => {
    const { aiAnalysisData, isFetching } = useSelector(state => state.expense);

    
    return (
        <div className='w-[87%] h-full flex gap-4 relative justify-center items-center'>
            {/* Analysis Layout */}
            <div className='w-2/3 bg-gray-100/50 backdrop-filter backdrop-blur flex flex-col gap-y-2 rounded-lg shadow-lg p-4'>
                <div className='w-full flex gap-4 items-center'>
                    <div className='bg-gray-100/90 w-1/2 rounded-md p-4'>
                        <h1 className='text-lg font-semibold text-red-700'> <span className='text-xl'>⚠️</span> High Risk Warning</h1>
                        <p className='px-2 py-1 text-md w-full font-semibold text-red-950'>{aiAnalysisData?.warnings ? aiAnalysisData?.warnings[0] : 'No Warning!'}</p>
                        <p className='px-2 text-sm w-full font-sans text-black/50'>{aiAnalysisData?.actions ? aiAnalysisData?.actions[0] : 'All action are performing well!'}</p>
                    </div>
                    <div className='bg-gray-100/90 h-fit w-1/2 rounded-md p-4'>
                        <h1 className='text-lg font-semibold text-blue-900'> <span className='text-xl'>💡</span> Suggested Action</h1>
                        {aiAnalysisData?.actions?.slice(1,).map((ac, index) => (
                            <p key={index} className='text-sm w-full font-sans px-4 py-1 text-black/50'>{ac}</p>
                        ))}
                        <p className='text-sm w-full font-sans px-4 text-black/50'>Reduce expense to cover <span className='font-semibold text-red-700'>{aiAnalysisData?.increase_percent}%</span> for next month</p>
                    </div>
                </div>
                <div className='bg-gray-100/90 w-full rounded-md p-4 flex'>
                    <CategoryPercentGraph />
                </div>
            </div>
            {/* Forcaste Layout */}
            <div className='w-1/4 flex flex-col gap-y-2'>
                <div className='bg-gray-100/80 w-full rounded-md p-4'>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <div className="w-1 h-5 bg-red-700 rounded-full"></div>
                            <h1 className='text-lg text-blue-950 font-semibold'> Next month prediction</h1>
                        </div>
                        <h1 className='text-2xl pt-3 text-green-800/80 font-bold'>{`₹ ${aiAnalysisData?.predicted_monthly_expense?.toLocaleString()} /-`}</h1>
                        <p className='text-sm w-full pt-1 font-semibold font-sans px-4 text-black/50'><span className='font-bold bg-red-600/20 px-1 pr-0 mr-1 py-0.5 rounded-md text-red-700'>{aiAnalysisData?.increase_percent}% </span> Increase</p>
                    </div>
                    <div className='mt-4'>
                        <h1 className='text-md py-2 pt-2 text-blue-950 font-semibold'> Suggestions</h1>
                        {
                            aiAnalysisData?.suggestions?.length > 0 ? (
                                aiAnalysisData.suggestions.map((sugg, index) => (
                                    <p
                                        key={index}
                                        className="text-sm w-full flex gap-2 font-sans py-1 font-semibold text-cyan-900"
                                    >
                                        <SendHorizonal />
                                        {sugg}
                                    </p>
                                ))
                            ) : (
                                "All Activity perform perfectly!"
                            )
                        }

                    </div>
                    <div className='mt-4'>
                        <h1 className='text-md py-2 pt-2 text-blue-950 font-semibold'> Predicted Next Month Budget</h1>
                        <h1 className='text-2xl text-orange-600/80 pl-2 font-bold'>{`₹ ${aiAnalysisData?.predicted_balance?.toLocaleString()} /-`}</h1>
                        <p className='text-sm w-full pt-1 font-semibold font-sans px-4 text-black/50'>Set your next month budget</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AIAnalysis
