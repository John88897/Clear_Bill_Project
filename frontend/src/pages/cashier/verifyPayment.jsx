import { useState, useEffect } from "react";
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
function VerifyPayment() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) { navigate("/"); return; }
        authFetch(`${import.meta.env.VITE_API_URL}/api/cashiers/${user.id}`)
            .then(res => res.json())
            .then(() => fetchBills())
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    const fetchBills = async () => {
        try {
            const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/bills`);
            const data = await res.json();
            console.log("Bills data:", data);
            setBills(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkPaid = async (billId) => {
        try {
            const res = await authFetch(
                `${import.meta.env.VITE_API_URL}/api/bills/${billId}/status`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Paid" }),
                }
            );
            if (res.ok) {
                setBills(prev => prev.map(b => b.bill_id === billId ? { ...b, status: "Paid" } : b));
            } else {
                const data = await res.json();
                alert(data.message || "Failed to update status");
            }
        } catch (err) {
            alert("Network error, please try again.");
        }
    };

    if (loading) return <StaffLayout role="Cashier" navItems={navItems}><p>Loading...</p></StaffLayout>;
    if (error) return <StaffLayout role="Cashier" navItems={navItems}><p className="text-red-500">Error: {error}</p></StaffLayout>;

    return (
        <StaffLayout role="Cashier" navItems={navItems}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Verify Payment</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Bill ID</th>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Patient</th>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Date</th>
                            <th className="text-right px-4 py-3 text-gray-500 font-medium">Total</th>
                            <th className="text-center px-4 py-3 text-gray-500 font-medium">Status</th>
                            <th className="text-center px-4 py-3 text-gray-500 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">
                                    No bills found.
                                </td>
                            </tr>
                        ) : (
                            bills.map(bill => {
                                const isPaid = bill.status === "Paid";
                                return (
                                    <tr key={bill.bill_id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-mono text-gray-600">
                                            #BILL-{String(bill.bill_id).padStart(3, "0")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-800">{bill.Patient?.User?.name || "N/A"}</p>
                                            <p className="text-xs text-gray-400">{bill.Patient?.User?.email}</p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{bill.bill_date}</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-800">
                                            ${Number(bill.total_amount).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                            }`}>
                                                {bill.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {isPaid ? (
                                                <span className="text-gray-400 text-xs bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                                                    Verified ✓
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMarkPaid(bill.bill_id)}
                                                    className="px-3 py-1 rounded-xl text-xs font-medium border border-green-200 text-green-600 bg-green-50 hover:bg-green-100 transition"
                                                >
                                                    Mark as Paid
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </StaffLayout>
    );
}

export default VerifyPayment;