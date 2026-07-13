import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import logout from '../src/assets/logout.png';

function StaffLayout({ children, role, navItems = [] }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    // Role-specific accent colors (matches admin's #40C2FD style)
    const roleStyles = {
        Receptionist: { bg: '#7C3AED', light: '#EDE9FE', border: '#7C3AED', text: '#5B21B6' },
        Doctor:       { bg: '#0D9488', light: '#CCFBF1', border: '#0D9488', text: '#0F766E' },
        Cashier:      { bg: '#C2410C', light: '#FEE2E2', border: '#C2410C', text: '#9A3412' },
    };

    const style = roleStyles[role] || { bg: '#40C2FD', light: '#EBF8FF', border: '#40C2FD', text: '#00668A' };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-52 bg-white border-r border-gray-200 flex flex-col p-4 fixed h-full">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg" style={{ backgroundColor: style.bg }}>
                        <img src={logo} className="w-8 h-8 object-contain" alt="" />
                    </div>
                    <h1 className="font-bold text-[#00668A] text-lg">ClearBill Care</h1>
                </div>

                {/* Role + User badge */}
                <div className="flex items-center gap-2 mb-6 px-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: style.bg }}>
                        {user.name?.charAt(0) || "?"}
                    </div>
                    <div>
                        <p className="text-xs font-semibold truncate text-gray-700">{user.name}</p>
                        <p className="text-xs font-medium" style={{ color: style.text }}>{role}</p>
                    </div>
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
                                    ? 'border-l-4 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-100'}`
                            }
                            style={({ isActive }) => isActive ? {
                                backgroundColor: style.light,
                                color: style.text,
                                borderLeftColor: style.border,
                            } : {}}
                        >
                            <img src={item.icon} className="w-5 h-5" alt="" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 mt-4"
                >
                    <img className="w-6" src={logout} alt="" />
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

export default StaffLayout;