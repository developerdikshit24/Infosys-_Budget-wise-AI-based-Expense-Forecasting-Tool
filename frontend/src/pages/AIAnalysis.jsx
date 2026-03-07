import React from 'react'

const AIAnalysis = () => {
    return (
        <div className='w-[87%] h-full flex gap-4 relative justify-center items-center'>
            {/* Analysis Layout */}
            <div className='w-2/3 bg-gray-100/50 backdrop-filter backdrop-blur flex flex-col gap-y-2 rounded-lg shadow-lg p-4'>
                <div className='w-full flex gap-4'>
                    <div className='bg-gray-100/90 w-1/2 rounded-md p-4 flex'>
                        <h1 className='text-lg font-semibold text-red-700'> <span className='text-xl'>⚠️</span> High Risk Warning</h1>
                    </div>
                    <div className='bg-gray-100/90 w-1/2 rounded-md p-2 flex'>d</div>
                </div>
                <div className='bg-gray-100/90 w-full rounded-md p-2 flex'> dds</div>
            </div>
            {/* Forcaste Layout */}
            <div className='w-1/4 flex flex-col gap-y-2'>   
                <div className='bg-gray-100/80 w-full rounded-md p-2 flex'>s</div>
                <div className='bg-gray-100/80 w-full rounded-md p-2 flex'>s</div>
            </div>
        </div>
    )
}

export default AIAnalysis
