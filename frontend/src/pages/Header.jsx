import noti from '../assets/noti.png'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <>
            <div className='flex items-center justify-between px-4 py-2'>
                <div className='flex flex-row gap-2'>
                    <img src={logo} className='w-6 h-6' alt="" />
                    <h1 className='font-bold text-[#00668A]'>ClearBill Care</h1>
                </div>
                <div className='flex items-center gap-3'>
                    <img src={noti} alt="" />
                    <button
                        onClick={handleLogout}
                        className='text-sm text-red-500 font-medium border border-red-300 px-3 py-1 rounded-lg'
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className='border-t border-gray-200'></div>
        </>
    )
}

export default Header