import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

function VerifyPayment() {
  const [cashier, setCashier] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
      return;
    }

    authFetch(`${import.meta.env.VITE_API_URL}/api/cashiers/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCashier(data);
        return fetchBills();
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  }, []);

  const fetchBills = async () => {
    try {
      const res = await authFetch("http://localhost:5000/api/bills");
      const data = await res.json();
      if (res.ok) {
        setBills(Array.isArray(data) ? data : [data]);
      } else {
        setError(data.message || "Failed to fetch bills");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (billId, currentStatus) => {
    if (currentStatus === "Paid") return;

    try {
      const res = await authFetch(`http://localhost:5000/api/bills/${billId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Paid" }),
      });

      if (res.ok) {
        setBills((prevBills) =>
          prevBills.map((bill) =>
            bill.bill_id === billId ? { ...bill, status: "Paid" } : bill
          )
        );
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Network error, please try again.");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading panel...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-medium">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 my-10">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-800">Payment Verification</h1>
        <p className="text-slate-500 mt-1">Logged in as Cashier: {cashier?.User?.name || user.id}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Bill Date</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-center">Status Badge</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No pending bills found.
                  </td>
                </tr>
              ) : (
                bills.map((bill) => {
                  const patientName = bill.Patient?.User?.name || "N/A";
                  const isPaid = bill.status === "Paid";

                  return (
                    <tr key={bill.bill_id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-slate-600">
                        #BILL-{String(bill.bill_id).padStart(3, "0")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{patientName}</div>
                        <div className="text-xs text-slate-400">{bill.Patient?.User?.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{bill.bill_date}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-700">
                        ${Number(bill.total_amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                            isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isPaid ? "bg-green-500" : "bg-amber-500"}`}></span>
                          {bill.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isPaid ? (
                          <span className="inline-flex items-center text-gray-400 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                            Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(bill.bill_id, bill.status)}
                            className="px-4 py-1.5 rounded-xl font-medium text-xs border border-green-200 text-green-600 bg-green-50/50 hover:bg-green-100 transition-all"
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
      </div>
    </div>
  );
}

export default VerifyPayment;