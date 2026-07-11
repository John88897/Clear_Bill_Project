import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import al from '../../assets/al.png';
import calendar from '../../assets/calendar.png';
import { authFetch } from "../../utils/authFetch";

function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) return;

        authFetch(`${import.meta.env.VITE_API_URL}/api/payments/patient/${user.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Payments:", data);
                setPayments(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => navigate(-1)}>
                    <img src={al} className="w-10 px-2 py-2" alt="back" />
                </button>
                <h1 className="font-semibold mr-[30%]">Payment History</h1>
            </div>

            {/* Payment List */}
            <div>
                {payments.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10">No payment history found.</p>
                ) : (
                    payments.map((payment) => (
                        <div key={payment.payment_id} className="border border-slate-300 rounded-xl p-4 mb-3">
                            {/* Top Row */}
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-bold">
                                    PAY-{String(payment.payment_id).padStart(3, "0")}
                                </p>
                                <div className="flex items-center gap-1">
                                    <img src={calendar} className="w-4" alt="" />
                                    <p className="text-sm text-gray-500">
                                        {new Date(payment.payment_date).toLocaleDateString("en-US", {
                                            year: "numeric", month: "short", day: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-gray-200 mb-3" />
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Bill ID</p>
                                    <p className="font-semibold">
                                        BILL-{String(payment.bill_id).padStart(3, "0")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Amount</p>
                                    <p className="font-semibold">${Number(payment.amount).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Method</p>
                                    <p className="font-semibold">{payment.payment_method}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Status</p>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        Paid
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PaymentHistory;