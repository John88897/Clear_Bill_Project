import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png';
import logout from '../src/assets/logout.png'; 

function StaffLayout({children, role, navItem}) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    const roleColor = {
        Receptionist: "#7C3AED",
        Doctor: "#0D9488",
        Cashier: "#C2410C", 
    };

    const color = roleColor[role] || "#065A82";

    return(
        <div>
            {/* sidebar */}
            <div>
                {/* logo */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: color }}>
                        <img src={logo} className="w-5 h-5 object-contain" alt="" />
                    </div>
                    <h1 className="font-bold text-[#00668A] text-sm">ClearBill Care</h1>
                </div>
                {/* role badge */}
                <div className="mb-6 px-3 py-2 rounded-lg text-white text-xs font-semibold text-center" style={{ backgroundColor: color }}>
                    {role}
                </div>
                {/* User name */}
                <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: color }}>
                        {user.name?.charAt(0) || "?"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate">{user.name}</span>
                </div>
                {/* Nav Items */}
                <nav className="flex flex-col gap-1 flex-1">
                    {navItem.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                ${isActive
                                    ? 'text-white'
                                    : 'text-gray-500 hover:bg-gray-100'}`
                            }
                            style={({ isActive }) => isActive ? { backgroundColor: color } : {}}
                        >
                            <span>{item.icon}</span>
                            {item.label}
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
            <div className="ml-52 flex-1 bg-gray-50 min-h-screen p-6">
                {children}
            </div>
        </div>
    );
}

export default StaffLayout;