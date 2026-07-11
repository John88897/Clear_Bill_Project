import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import al from '../../assets/al.png';
import { authFetch } from "../../utils/authFetch";

function BillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    authFetch(`${import.meta.env.VITE_API_URL}/api/bills/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Bill Detail:", data);
        setBill(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!bill) return <p className="p-4">Loading...</p>;

  const details = bill.BillDetails || [];
  const patientName = bill.Patient?.User?.name || "Unknown";
 

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)}>
          <img src={al} className="w-10 px-2 py-2" alt="back" />
        </button>
        <h1 className="font-semibold mr-[45%] mt-1">Bill Details</h1>
      </div>

      {/* Bill Info Card */}
      <div className="border border-slate-300 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-lg">
            BILL-{String(bill.bill_id).padStart(3, "0")}
          </p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            bill.status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {bill.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-gray-400">Bill Date</p>
            <p className="font-medium">{bill.bill_date}</p>
          </div>
          <div>
            <p className="text-gray-400">Due Date</p>
            <p className="font-medium">{bill.bill_date}</p>
          </div>
          <div>
            <p className="text-gray-400">Patient Name</p>
            <p className="font-medium">{patientName}</p>
          </div>
          <div>
            <p className="text-gray-400">Status</p>
            <p className={`font-medium ${
              bill.status === "Paid" ? "text-green-600" : "text-red-500"
            }`}>
              {bill.status}
            </p>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="border border-slate-300 rounded-xl p-4 mb-4">
        <p className="font-semibold mb-3">Services</p>
        <div className="grid grid-cols-4 text-sm text-gray-400 mb-2">
          <p className="col-span-2">Service</p>
          <p className="text-center">Qty</p>
          <p className="text-right">Total</p>
        </div>
        <hr className="mb-2 border-gray-200" />

        {details.map((item) => (
          <div key={item.detail_id} className="grid grid-cols-4 text-sm py-2">
            <p className="col-span-2">{item.Service?.service_name}</p>
            <p className="text-center">{item.quantity}</p>
            <p className="text-right">${Number(item.subtotal).toFixed(2)}</p>
          </div>
        ))}

        <hr className="my-2 border-gray-200" />
        <div className="flex justify-between font-bold mt-1">
          <p>Total Amount</p>
          <p className="text-red-500">${Number(bill.total_amount).toFixed(2)}</p>
        </div>
      </div>

      {/* Bill Explanation */}
      <div className="border border-slate-300 rounded-xl p-4 mb-4">
        <p className="font-semibold mb-2">Bill Explanation</p>
{details.map((item, index) => (
    <p key={index} className="text-sm text-gray-500">
      {item.Service?.service_name}: {item.Service?.description}
    </p>
  ))}      </div>

      {/* Pay Now Button only show if Unpaid  */}
      {bill.status === "Unpaid" && (
        <button className="w-full bg-cyan-500 text-white py-3 rounded-xl font-semibold text-base">
          Pay Now
        </button>
      )}
    </div>
  );
}

export default BillDetail;