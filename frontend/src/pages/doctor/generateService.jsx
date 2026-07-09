import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

function InputService() {
  const [patientId, setPatientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [serviceInfo, setServiceInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);
  useEffect(() => {
    
    console.log("user id is: " + user.id);
    if (!user.id) {
      return;
    }
    authFetch(`http://localhost:5000/api/doctors/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Doctor not found");
        return res.json();
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  if (!serviceId) {
    return;
  }

  async function showService() {
    try {
      const res = await authFetch(`http://localhost:5000/api/services/${serviceId}`);
      if (!res.ok) {
        setServiceInfo(null);
        return;
      }
      const service = await res.json();
      setServiceInfo(service);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  showService();
}, [serviceId]);
  async function handleInputService() {
    try {
      const result = await authFetch(
        `http://localhost:5000/api/doctors/${user.id}/input`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientId: parseInt(patientId),
            serviceId: parseInt(serviceId),
            quantity: 1
          }),
        },
      );
      const data = await result.json();
      if (!result.ok) {
        console.log("Response" + data);
        setError(data.error);
        return;
      }

      alert("successfully inserted service" + JSON.stringify(data));
      navigate("/doctor/dashboard");
    } catch (error) {
      console.log("There is an error in generateService" + error.message);
      setError(error.message);
    }
  }
  async function addOnService(){
    try {
      
    } catch (error) {
      
    }
  }

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return (
      <h1 className=" items-center m-[20%]">
        <p className="">Error: {error}</p>
        <div className="text-center border border-gray-700 rounded-md text-white bg-orange-500 hover:bg-orange-600 text-md py-3 hover:border-gray-500 mt-5">
          <button
            type="button"
            onClick={() => {
              {
                setError(null);
                navigate("/doctor/dashboard");
              }
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </h1>
    );
  }
  return (
    <>
      <h3 className="flex justify-center text-3xl mt-[3.5em] font-bold ">
        Provided Service
      </h3>

      <div className="flex ">
        <div className="mt-[4.5em] ml-[25%] grid justify-center py-10 w-1/3 border border-[#00668A] rounded-lg">
          <div className="flex flex-rows gap-[1em]  ">
            <div className="grid pr-[1em]">
              <label>Patient ID: </label>
              <label>Service_ID: </label>
            </div>

            <div className="grid gap-4">
              <input
                className=" border border-[#00668A] rounded-sm px-2 "
                type="text"
                onChange={(e) => setPatientId(e.target.value)}
              ></input>
              <input
                className=" border border-[#00668A] rounded-sm px-2 "
                type="text"
                onChange={(e) => setServiceId(e.target.value)}
              ></input>
              <div className="text-sm ">
                Description of Serivce_ID number {serviceId}:{" "}
                {serviceInfo ? serviceInfo.service_name : "Service with this ID does not exist!!"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[6.5em] ml-[4em] text-center">
            <div className="border border-gray-700 rounded-md m-4 text-white bg-blue-500 hover:bg-blue-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={addOnService}>
              Add on service
            </button>
          </div>
          <div className="border border-gray-700 rounded-md m-4 text-white bg-blue-500 hover:bg-blue-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={handleInputService}>
              Send to Cashier
            </button>
          </div>
          <div className="border border-gray-700 rounded-md m-4 px-2 text-white bg-orange-500 hover:bg-orange-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={() => navigate("/doctor/dashboard")}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default InputService;
