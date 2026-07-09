import { useEffect } from "react";
import { useState } from "react";
import CashierDashboard from "./cashierDashboard";
import InputService from "../doctor/generateService";
import { Navigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

function CreateBill() {
  // const [service, setService] = useState("");
  // const [total, setTotal] = useState(false);
  const [status, setStatus] = useState("");
  const [patient_id, setPatientId] = useState("");
  const now = new Date();
  const localTime = now.toLocaleTimeString();
  const localDate = now.toLocaleDateString();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboard, setShowDashboard] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    console.log("user id is :", user.id);
    if (!user.id) {
      Navigate("/login");
      return;
    }
    authFetch(`http://localhost:5000/api/cashiers/${user.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  // Sokha Cashier	cashier@clearbill.com	$2b$10$cashier123 this is cashier
  async function getTotal() {}
  async function HandleCreateBill() {
    try {
      const newBill = await authFetch(
        `http://localhost:5000/api/cashiers/${user.id}/generateBill`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            service_id: serviceId,
            quantity: 1,
            patient_id,
            bill_date: now.toISOString().split("T")[0],
            total_amount: getTotal,
            status,
          }),
        },
      );
      const data = await newBill.json();

      if (!newBill.ok) {
        setError(data.error);
        window.alert("Already exisiting bill!");
        return;
      }
      setShowDashboard(true);

      console.log("Status:", newBill.status);
      console.log("Response:", data);
      // console.log(data)
      console.log("Submitting:", {
        user_id: user.id,
        patient_id,
        bill_date: now.toISOString().split("T")[0],
        status,
      });
    } catch (error) {
      console.log("There is an error inside createBill" + error.message);
      console.log(error.message);
      setError(error.message);
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
              (setShowDashboard(true), setError(null));
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </h1>
    );
  }
  if (dashboard) return <CashierDashboard />;
  // if (service) return <setService />;

  return (
    <>
      <h3 className="flex justify-center text-3xl mt-[3.5em] font-bold ">
        Create Patient
      </h3>

      <div className="flex ">
        <div className="mt-[4.5em] ml-[25%] grid justify-center py-10 w-1/3 border border-[#00668A] rounded-lg">
          <div className="flex flex-rows gap-[1em]  ">
            <div className="grid pr-[1em]">
              <label>
                Services Used: <InputService />
              </label>
              <label>Status: </label>
              <label>Patient_id: </label>
              <label>Total: </label>
              {/* <label>Address: </label> */}
            </div>

            <div className="grid gap-4">
              <input
                className=" border border-[#00668A] rounded-sm px-2"
                type="password"
                onChange={(e) => setStatus(e.target.value)}
              ></input>
              <input
                className=" border border-[#00668A] rounded-sm px-2 "
                type="tel"
                onChange={(e) => setPatientId(e.target.value)}
              ></input>
            </div>
          </div>
        </div>

        <div className="mt-[6.5em] ml-[4em] text-center">
          <div className="border border-gray-700 rounded-md m-4 text-white bg-blue-500 hover:bg-blue-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={HandleCreateBill}>
              Generate Bill
            </button>
          </div>
          <div className="border border-gray-700 rounded-md m-4 text-white bg-blue-500 hover:bg-blue-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={getTotal}>
              Generate Bill
            </button>
          </div>
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
// }
export default CreateBill;
