import { IndianRupee, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../constant';
import MonthSelect from '../components/MonthSelect';
import { deleteExpenseThunk } from '../stores/expense';

const Reports = () => {
  const { recentExenses, transationFilter } = useSelector(state => state.expense);
  const dispatch = useDispatch()
  const handelDelete = (exp_id)=>{
    dispatch(deleteExpenseThunk(exp_id))
    
  }

  return (
    <div className='w-[87%] h-full mt-8 flex relative justify-center items-center'>
      <div className="bg-gray-100/80 flex flex-col gap-y-4 backdrop-filter backdrop-blur rounded-lg w-11/12 shadow-lg p-4">
        {/* Title_Section */}
        <div id='Title_Section'>
          <div id='Title' >
            <div className='flex gap-2 items-center'>
              <img src="./Report.png" className='w-5 pt-1' alt="categories" />
              <h1 className='text-xl font-semibold text-blue-900'>Transaction Report</h1>
            </div>
          </div>
          <div className="flex w-full  items-start justify-end">
            <MonthSelect />
          </div>
        </div>
        <div id='Report_section'>
          <div className='bg-white  backdrop-filter backdrop-blur h-[450px] rounded-lg shadow-lg p-4 overflow-y-scroll no-scrollbar'>
            <div className='overflow-hidden'>
              <table className='w-full border-collapse text-left'>
                <thead className='bg-blue-100/80  '>
                  <tr className="border-b w-full text-blue-900/80 ">
                    <th className="py-3 pl-2">Date</th>
                    <th className="py-3">Category</th>
                    <th className="py-3 text-start pr-2">Amount</th>
                    <th className="py-3 text-start pr-2">Notes</th>
                    <th className="py-3 text-center pr-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transationFilter == "ALL" ? recentExenses?.map((exp, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-blue-50 transition duration-200"
                    >
                      <td className="py-3 text-left pl-2 font-semibold px-0.5">{formatDate(exp?.expense_date)} </td>
                      <td className="py-3 text-left">
                        <div className='flex gap-1'>
                          {exp?.category_name}
                        </div>
                      </td>
                      <td className="py-3 text-left">
                        <div className='flex gap-1'>
                          {<IndianRupee className='w-4' />}
                          {exp?.amount}
                        </div>
                      </td>
                      <td className="py-3 text-left">
                        <div className='flex gap-1'>
                          {exp?.description || "No Notes"}
                        </div>
                      </td>

                      <td className="py-3 text-center flex gap-2 justify-center font-semibold ">
                        <button onClick={() => { handelDelete(exp.id)}} className='px-2 py-0.5 disabled:bg-gray-300 disabled:text-gray-500 rounded-md bg-gray-200 cursor-pointer hover:bg-red-500 hover:text-white text-center'>
                          <div className='flex gap-1'>
                            {<Trash2 className='w-4' />}
                          </div>
                        </button>
                        <button className='px-2 py-0.5 disabled:bg-gray-300 disabled:text-gray-500 rounded-md bg-gray-200 cursor-pointer hover:bg-red-500 hover:text-white text-center'>
                          <div className='flex gap-1'>
                            {<Pencil className='w-4' />}
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))
                    :
                    recentExenses.filter((exp) => new Date(exp?.expense_date).getMonth() === Number(transationFilter))?.map((exp, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-blue-50 transition duration-200"
                    >
                      <td className="py-3 text-left pl-2 font-semibold px-0.5">{formatDate(exp?.expense_date)} </td>
                      <td className="py-3 text-left">
                        <div className='flex gap-1'>
                          {exp?.category_name}
                        </div>
                      </td>
                      <td className="py-3 text-left">
                        <div className='flex gap-1'>
                          {<IndianRupee className='w-4' />}
                          {exp?.amount}
                        </div>
                      </td>
                      <td className="py-3 text-left">
                        <div className='flex gap-1'>
                          {exp?.description || "No Notes"}
                        </div>
                      </td>

                      <td className="py-3 text-center flex gap-2 justify-center font-semibold ">
                        <button className='px-2 py-0.5 disabled:bg-gray-300 disabled:text-gray-500 rounded-md bg-gray-200 cursor-pointer hover:bg-red-500 hover:text-white text-center'>
                          <div className='flex gap-1'>
                            {<Trash2 className='w-4' />}
                          </div>
                        </button>
                        <button className='px-2 py-0.5 disabled:bg-gray-300 disabled:text-gray-500 rounded-md bg-gray-200 cursor-pointer hover:bg-red-500 hover:text-white text-center'>
                          <div className='flex gap-1'>
                            {<Pencil className='w-4' />}
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))
                    
                }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Reports
