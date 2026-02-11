import React from 'react'

const TopToolTip = () => {
  return (
      <div className="absolute z-50 left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">

          <div className="bg-blue-200 text-black font-bold text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
              {value}
          </div>

          <div className="w-3 h-3 bg-blue-200 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>

      </div>
  )
}

export default TopToolTip