import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospital from "../../assets/hospital.png";
// import LoginPage from "../LoginPage";
import { authFetch } from "../../utils/authFetch";
function DoctorDashboard() {
  const [userDoctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id) {
      return;
    }
    authFetch(`http://localhost:5000/api/doctors/${user.id}`)
      .then((res) => {
        return res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to load doctor');

        }
      })
      .then((data) => {
        setDoctor(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      {" "}
      <div className="flex justify-center min-h-screen pb-[10em]">
        <div className=" flex flex-col justify-center items-center">
          <div className=" justify-center items-center border border-gray-300 rounded-lg px-[2em] ">
            <div className=" flex flex-row justify-around   ">
              <div className="pt-4">
                <div>
                  <h1 className="font-bold text-[20px] sm:text-[40px]">
                    Welcome Doctor: {userDoctor?.name}
                  </h1>
                </div>
                <div className="mt-5 p-6">
                  <div className="text-center bg-blue-[900] border border-gray-300 rounded-lg py-5 text-lg font-semibold mt-[1em] hover:text-indigo-700 hover:bg-[#E5E4E2]   ">
                    <button
                      onClick={() =>
                        navigate(`/doctor/input`)
                      }
                    >
                      Click here to input service
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-30 mt-[5em] md:w-60 ">
                <img src={hospital} alt="this is hospital logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoctorDashboard;
