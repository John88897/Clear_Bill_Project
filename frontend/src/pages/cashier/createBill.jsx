import { useEffect } from "react";
import { useState } from "react";
import CashierDashboard from "./cashierDashboard";
import { useLocation, useNavigate } from "react-router-dom"; // Swapped 'data' for 'useLocation'
import { authFetch } from "../../utils/authFetch";

function CreateBill() {
  const [billDetails, setBillDetails] = useState({
    bill_id: "",
    detail_id: "",
    patient_id: "",
    bill_date: "",
    subtotal: "",
    total: "",
    quantity: "",
    service_id: "",
    status: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboard, setShowDashboard] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId, serviceId, quantity } = location.state || {};

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
      return;
    }
    const savedPayload = JSON.parse(localStorage.getItem("pending_bill_payload"));

    if (!savedPayload) {
      setError("No pending treatments found from the doctor's session.");
      setLoading(false);
      return;
    }

    authFetch(`http://localhost:5000/api/cashiers/${user.id}`)
      .then((res) => res.json())
      .then(() => {
        getReciepInfo(savedPayload);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  async function getReciepInfo(savedPayload) {
    try {
      const result = await authFetch(
        `http://localhost:5000/api/cashiers/${user.id}/recieve`,
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

      const data = await result.json();

      if (!result.ok) {
        setError(data.error || "Failed to process final invoice calculation.");
        setLoading(false);
        return;
      }

      if (data) {
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
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) {
    return (
      <h1 className=" items-center m-[20%]">
        <p className="">Error: {error}</p>
        <div className="text-center border border-gray-700 rounded-md text-white bg-orange-500 hover:bg-orange-600 text-md py-3 hover:border-gray-500 mt-5">
          <button
            type="button"
            onClick={() => {
              setShowDashboard(true);
              setError(null);
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </h1>
    );
  }
  if (dashboard) return <CashierDashboard />;

  return (
    <>
      <h3 className="flex justify-center text-3xl mt-[3.5em] font-bold ">
        Bill Receipt
      </h3>
      <div className="flex ">
        <div className="mt-[4.5em] ml-[25%] grid justify-center py-10 w-1/3 border border-[#00668A] rounded-lg p-6 space-y-2">
          <p className="font-bold text-lg text-slate-700">Bill ID: {billDetails.bill_id}</p>
          <p>Patient ID: {billDetails.patient_id}</p>
          <p>Bill Date: {billDetails.bill_date}</p>
          <p>Service ID: {billDetails.service_id}</p>
          <p>Quantity: {billDetails.quantity}</p>
          <hr className="my-2 border-slate-300" />
          <p>Subtotal: ${billDetails.subtotal}</p>
          <p className="font-semibold text-emerald-600 text-xl">Total: ${billDetails.total}</p>
        </div>

        <div className="mt-[6.5em] ml-[4em] text-center">
          <div className="border border-gray-700 rounded-md m-4 px-2 text-white bg-orange-500 hover:bg-orange-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={() => setShowDashboard(true)}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBill;