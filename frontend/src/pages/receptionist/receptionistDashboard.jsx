import { useEffect, useState } from "react";
import hospital from '../../assets/hospital.png'
import RegisterPatient from "./registerPatient";
import LoginPage from "../LoginPage";
import { useNavigate } from "react-router-dom";

function ReceptionistDashboard() {
    const [receptionist, setReceptionist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showRegister, setShowRegister] = useState(false)

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate  = useNavigate();
    useEffect(() => {
        console.log("user id is :", user.id);
        if (!user.id) {
            navigate("/login");
             return;
        }
        setLoading(true);
        fetch(`http://localhost:5000/api/receptionist/${user.id}`)
            .then((res) => {
                return res.json()
            }
            )
            .then((data) => {
                setReceptionist(data);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setError(error.message);
                setLoading(false);
            });
    }, []);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;
    if (showRegister) return <RegisterPatient />;
    return (
        <>
            <div className="flex justify-center min-h-screen pb-[10em]">

                <div className=" flex flex-col justify-center items-center">
                    <div className=" justify-center items-center border-1 border-gray-300 rounded-lg px-[2em] ">
                        <div className=" flex flex-row justify-around   ">
                            <div className="pt-4">
                                <div>
                                    <h1 className="font-bold text-[20px] sm:text-[40px]">Welcome : {receptionist?.name}</h1>
                                </div>
                                <div className="mt-5 p-6">
                                    <div className="text-center bg-blue-[900] border-1 border-gray-300 rounded-lg py-5 text-lg font-semibold mt-[1em] hover:text-indigo-700 hover:bg-[#E5E4E2]   ">
                                        <button onClick={() => setShowRegister(true)}>Click here to create patient </button>
                                    </div>

                                </div>
                            </div>
                            <div className="w-30 mt-[5em] md:w-60 "><img src={hospital} alt="this is hospital logo" /></div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default ReceptionistDashboard;