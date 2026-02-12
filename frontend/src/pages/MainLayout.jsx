import Navbar from '../components/navbar'
import NavigationOption from '../components/NavigationOption'
import { Outlet } from 'react-router'
const MainLayout = () => {
    return (
        <div className='min-h-screen  bg-[linear-gradient(135deg,#e9eefb_0%,#cfd8f3_25%,#b8c7ee_55%,#a9c2ec_100%)]'>
            <div className="relative min-h-screen  overflow-hidden bg-[linear-gradient(135deg,#e9eefb_0%,#cfd8f3_25%,#b8c7ee_55%,#a9c2ec_100%)]">
                <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-white/40 rounded-full blur-[160px]"></div>
                <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-white/30 rounded-full blur-[180px]"></div>
                <Navbar />
                <div className="flex w-full justify-center z-30 relative ">
                    <div className='container px-3 h-full flex justify-between items-center'>
                        <NavigationOption />
                        <Outlet />
                        
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default MainLayout