import {NavLink, useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import home from '../src/assets/hom.png';
import service from '../src/assets/service.png';
import user from '../src/assets/user.png';
import report from '../src/assets/report.png'; 
import logout from '../src/assets/logout.png'; 
function AdminLayout({children}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const navItems = [
        {to: '/admin/dashboard', label: 'Dashboard', icon: home},
        {to: '/admin/users', label: 'Users', icon: user},
        {to: '/admin/services', label: 'Services', icon: service},
        {to: '/admin/reports', label: 'Reports', icon: report},
    ];

   return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-52 bg-white border-r border-gray-200 flex flex-col p-4 fixed h-full">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-[#40C2FD] w-12 h-12 flex items-center justify-center rounded-lg">
                        <img src={logo} className="w-8 h-8 object-contain" alt="" />
                    </div>
                    <h1 className="font-bold text-[#00668A] text-lg">ClearBill Care</h1>
                </div>

                {/* Nav Items */}
                <nav className="flex flex-col gap-1 flex-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                ${isActive
                                    ? 'bg-[#EBF8FF] text-[#00668A] border-l-4 border-[#40C2FD]'
                                    : 'text-gray-500 hover:bg-gray-100'}`
                            }
                        >
<img src={item.icon} className="w-5 h-5" alt="" />                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 mt-4"
                >
                    <span><img className='w-6' src={logout} alt="" /></span>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="ml-52 flex-1 bg-gray-50 p-6">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;

