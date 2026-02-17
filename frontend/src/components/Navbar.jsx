import NavDropDown from './NavDropDown.jsx'
import BottomToolTip from './BottomToolTip.jsx'
import { Link } from 'react-router'
const Navbar = () => {
    return (
        <div className='w-full h-20 bg-amer-500 flex items-center z-50 sticky top-0 justify-center'>
            <div className="flex container px-3 justify-between items-center">
                {/* Logo */}
                <div className="flex gap-2 relative group">
                    <h1 className="text-4xl text-blue-800 font-bold">Budget<span className='text-blue-950'>Wise</span></h1>

                    <img className=" bottom-0 right-0 w-20 h-12 z-40 " src="./wallet.png" alt="logo_image" />
                    <BottomToolTip value={'Logo'} />
                </div>
                {/* User Options */}
                <div className=' flex gap-8 items-center'>

                    <div className="relative group inline-block">

                        {/* Button */}
                        <Link to={'./add-expense'} className="p-1">
                            <img
                                src="./Add Expense.png"
                                className="w-10"
                                alt="Add Expense"
                            />
                        </Link>

                        {/* Tooltip*/}
                        <BottomToolTip value={'Add Expense'} />

                    </div>

                    <NavDropDown />
                </div>
            </div>
        </div>
    )
}

export default Navbar