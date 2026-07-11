import { useState } from "react";
import AdminLayout from "../../../layout/AdminLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { authFetch } from "../../utils/authFetch";

function AdminRevenue() {
    const [startDate, setStartDate] = useState("2026-01-01");
    const [endDate, setEndDate] = useState("2026-12-31");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const res = await authFetch(
                `${import.meta.env.VITE_API_URL}/api/admin/reports?startDate=${startDate}&endDate=${endDate}`
            );
            const data = await res.json();
            setReport({
    totalRevenue: data.totalRevenue || 0,
    totalPayments: data.totalPayments || 0,
    chartData: data.chartData || [],
    payments: data.payments || []
});

        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <AdminLayout>
            <div className="flex justify-btween items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Revenue Report</h1>
            </div>

            {/* date filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">Form</label>
                    <input type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">To</label>
                    <input type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <button
                    onClick={fetchReport}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    Filter
                </button>
            </div>

            {loading && <p className="text-center text-gray-400">Loading...</p>}

            {report && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-600">
                                ${Number(report.totalRevenue).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-400 mb-1">Total Payments</p>
                            <p className="text-2xl font-bold text-cyan-600">{report.totalPayments}<p/>                        </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-400 mb-1">Avg per Payment</p>
                            <p className="text-2xl font-bold text-purple-600">
                                ${report.totalPayments > 0
                                    ? (report.totalRevenue / report.totalPayments).toFixed(2)
                                    : "0.00"}
                            </p>
                        </div>
                    </div>

                    {/* line chart */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                        <h2 className="font-semibold mb-4">Revenue Over Time</h2>
                        {report.chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={report.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#40C2FD"
                                        strokeWidth={2}
                                        dot={{ fill: "#40C2FD", r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-400 py-10">No data for selected range</p>
                        )}
                    </div>
                    {/* Payments Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-semibold">Payment Details</h2>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Pay ID</th>
                                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Bill ID</th>
                                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Patient</th>
                                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Amount</th>
                                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Method</th>
                                    <th className="text-left px-4 py-3 text-gray-500 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.payments.map((p) => (
                                    <tr key={p.payment_id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-500">
                                            PAY-{String(p.payment_id).padStart(3, "0")}
                                        </td>
                                        <td className="px-4 py-3">
                                            BILL-{String(p.bill_id).padStart(3, "0")}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {p.Bill?.Patient?.User?.name || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-green-600">
                                            ${Number(p.amount).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3">{p.payment_method}</td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(p.payment_date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {report.payments.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                                            No payments found for this date range
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </AdminLayout>
    )
}

export default AdminRevenue;