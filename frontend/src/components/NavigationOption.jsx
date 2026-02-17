import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Links, useNavigate } from 'react-router'
import { logoutUserThunk } from '../stores/auth';



const NavigationOption = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loggedUser } = useSelector(state => state.authentication)
    
    const handleClick = () => {
        dispatch(logoutUserThunk())
        navigate('/login')
    }
    console.log();
    

    // Menu Items
    const menuItems = [
        { name: "Dashboard", path: "/", icon: './Dashboard.png' },
        { name: "Add Expense", path: "/add-expense", icon: './Add Expense.png' },
        { name: "Categories", path: "/categories", icon: './Categories.png' },
        { name: "Reports", path: "/reports", icon: './Report.png' },
        { name: "Expense Analysis", path: "/analysis", icon: './analytics.png' },
        { name: "Monthly Budget", path: "/monthly-budget", icon: './Monthly Budget.png' },
        { name: "Settings", path: "/setting", icon: './setting.png' },
    ];

    return (
        <div className='w-1/6 h-full'>
            <div className='flex flex-col h-full py-2 w-full'>
                <div className="bg-gray-100/80 backdrop-filter backdrop-blur rounded-lg shadow-lg">
                    <ul className="py-3">
                        {/* Menu Option */}
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}>
                                    <div className="px-4 py-4 text-md font-semibold flex gap-4 items-center text-blue-950/80 hover:bg-white cursor-pointer ease-in-out duration-300">
                                        <img className='w-4' src={item.icon} alt={item.name} />
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}

                        {/* Logout Option */}
                        <li>
                            <button onClick={handleClick} type='button' className='w-full'>
                                <div className="px-4 py-4 text-md flex gap-4 items-center font-semibold text-blue-950/80 hover:bg-red-600 hover:text-white hover:font-bold ease-in-out duration-300 cursor-pointer">
                                    <img className='w-4 h-4' src='./Logout.png' alt='Logout' />
                                    <p>Logout</p>
                                </div>
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
            {/* User Profle */}
            <div className="bg-gray-100/80 p-4 overflow-hidden backdrop-filter backdrop-blur rounded-lg shadow-lg">
                <div className='flex gap-4  items-center'>
                    <img className='w-12 h-12' src="./user.png" alt="user" />
                    <div className="flex flex-col">
                        <h1 className='font-semibold text-md text-blue-950/80'>{loggedUser?.name?.split(' ')[0]} {loggedUser?.name?.split(' ')[loggedUser?.name?.split(' ').length - 1]}</h1>
                        <p className='text-[10px] text-gray-950/80'>{loggedUser?.email}</p>
                        <Link to={'/profile'} className='bg-blue-200/90 shadow-2xl w-fit px-2 cursor-pointer rounded-4xl flex gap-0.5 items-center text-sm py-0.5 mt-1'>
                            <p className='font-semibold text-sm pb-0.5'>profile</p>
                            <img className='w-3' src="./visit.png" alt="Visit Profile" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationOption