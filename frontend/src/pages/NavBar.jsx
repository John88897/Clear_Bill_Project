import bill from '../assets/bill.png'
import payment from '../assets/payment.png'
import Header from './Header'
import dash from '../assets/dash.png'
import pf from '../assets/p.png'
import { NavLink } from 'react-router-dom'

function NavBar() {
    const navItems = [
        { to: '/patient/dashboard', icon: dash, label: 'Dashboard' },
        { to: '/patient/bills', icon: bill, label: 'Bill' },
        { to: '/patient/paymentHistory', icon: payment, label: 'Payment' },
        { to: '/patient/profile', icon: pf, label: 'Profile' },
    ];
    return (
        <>
            <Header />
            <div className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200'
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <ul className='flex flex-row items-center justify-around py-2'>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink to={item.to}>
                                {({ isActive }) => (
                                    <div className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-all
            ${isActive ? 'bg-[#40C2FD]' : ''}`}>
                                        <img src={item.icon}
                                            className='w-5 h-5'
                                            alt="" />
                                        <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NavBar