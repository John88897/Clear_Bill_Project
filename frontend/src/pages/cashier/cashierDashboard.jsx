import { useEffect, useState } from "react";
import hospital from '../../assets/hospital.png'
import CreateBill from "./createBill";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import StaffLayout from "../../../layout/StaffLayout";
import bill from "../../assets/bills.png";
import home from "../../assets/hom.png";
import verify from "../../assets/verify.png";
    const navItems = [
        { to: '/cashier/dashboard', icon: home, label: 'Dashboard' },
        { to: '/cashier/create', icon: bill, label: 'Create Bill' },
        { to: '/cashier/verifyPayment', icon: verify, label: 'Verify Payment' },
    ];
function CashierDashboard() {
    const [cashier, setCashier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    useEffect(() => {
        console.log("user id is :", user.id);
        if (!user.id) {
            navigate("/login");
            return;
        }
        authFetch(`${import.meta.env.VITE_API_URL}/api/cashiers/${user.id}`)
            .then((res) => {
                return res.json()
            }
            )
            .then((data) => {
                setCashier(data);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setError(error.message);
                setLoading(false);
            });
    }, []);
 

    if (loading) return <StaffLayout role="Cashier" navItems={navItems}><p>Loading...</p></StaffLayout>;
    if (error) return <StaffLayout role="Cashier" navItems={navItems}><p className="text-red-500">Error: {error}</p></StaffLayout>;

    return (
        <>
            <StaffLayout role="Cashier" navItems={navItems}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {user.name}</h1>

            <div className="grid grid-cols-1 gap-4 max-w-md">
                <div
                    onClick={() => navigate('/cashier/create')}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all hover:border-orange-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">🧾</div>
                        <div>
                            <p className="font-semibold text-gray-800">Get Bill for Patient</p>
                            <p className="text-sm text-gray-400">Generate bill from doctor's service input</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/cashier/verifyPayment')}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all hover:border-green-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">✅</div>
                        <div>
                            <p className="font-semibold text-gray-800">Verify Payment Status</p>
                            <p className="text-sm text-gray-400">Mark bills as Paid</p>
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
        </>
    )
}
export default CashierDashboard;