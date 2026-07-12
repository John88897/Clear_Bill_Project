import { useEffect } from "react";
import { useState } from "react";
import CashierDashboard from "./cashierDashboard";
import { useLocation, useNavigate } from "react-router-dom"; // Swapped 'data' for 'useLocation'
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
function CreateBill() {
    const [billDetails, setBillDetails] = useState({
        bill_id: "", patient_id: "", bill_date: "",
        subtotal: "", total: "", quantity: "", service_id: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) { navigate("/"); return; }
        const savedPayload = JSON.parse(localStorage.getItem("pending_bill_payload"));
        if (!savedPayload) {
            setError("No pending treatments found from the doctor's session.");
            setLoading(false);
            return;
        }
        authFetch(`${import.meta.env.VITE_API_URL}/api/cashiers/${user.id}`)
            .then(res => res.json())
            .then(() => getReceiptInfo(savedPayload))
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    async function getReceiptInfo(savedPayload) {
        try {
            const res = await authFetch(
                `${import.meta.env.VITE_API_URL}/api/cashiers/${user.id}/recieve`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        patientId: savedPayload.patientId,
                        serviceId: savedPayload.serviceId,
                        quantity: savedPayload.quantity
                    })
                }
            );
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Failed to process invoice."); setLoading(false); return; }
            setBillDetails({
                bill_id: data.bill?.bill_id || "N/A",
                patient_id: data.bill?.patient_id || "N/A",
                bill_date: data.bill?.bill_date || new Date().toLocaleDateString(),
                subtotal: data.detail?.subtotal || "0.00",
                total: data.bill?.total_amount || "0.00",
                quantity: data.detail?.quantity || "0",
                service_id: data.detail?.service_id || "N/A"
            });
            localStorage.removeItem("pending_bill_payload");
            setLoading(false);
        } catch (err) { setError(err.message); setLoading(false); }
    }

    if (loading) return <StaffLayout role="Cashier" navItems={navItems}><p>Loading...</p></StaffLayout>;

    if (error) return (
        <StaffLayout role="Cashier" navItems={navItems}>
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-red-500 font-medium">Error: {error}</p>
                <button
                    onClick={() => navigate("/cashier/dashboard")}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                    Return to Dashboard
                </button>
            </div>
        </StaffLayout>
    );

    return (
        <StaffLayout role="Cashier" navItems={navItems}>
            <div className="max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Bill Receipt</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-lg text-gray-800">
                            BILL-{String(billDetails.bill_id).padStart(3, "0")}
                        </p>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Unpaid
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Patient ID</span>
                            <span className="font-medium text-gray-800">{billDetails.patient_id}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Bill Date</span>
                            <span className="font-medium text-gray-800">{billDetails.bill_date}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Service ID</span>
                            <span className="font-medium text-gray-800">{billDetails.service_id}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Quantity</span>
                            <span className="font-medium text-gray-800">{billDetails.quantity}</span>
                        </div>
                        <hr className="border-gray-100 my-1"/>
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-800">${billDetails.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-800">Total Amount</span>
                            <span className="font-bold text-xl text-green-600">${billDetails.total}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                        <button
                            onClick={() => navigate('/cashier/verifyPayment')}
                            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                        >
                            Pay Now
                        </button>
                        <button
                            onClick={() => navigate("/cashier/dashboard")}
                            className="w-full border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                        >
                            Pay Later
                        </button>
                    </div>
                </div>
            </div>
        </StaffLayout>
    );
}
export default CreateBill;