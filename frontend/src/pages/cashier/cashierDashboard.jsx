import { useEffect, useState } from "react";
import hospital from '../../assets/hospital.png'
import CreateBill from "./createBill";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

function CashierDashboard() {
    const [cashier, setCashier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    useEffect(() => {
        console.log("user id is :", user.id);
        if (!user.id) {
            navigate("/login");
            return;
        }
        authFetch(`http://localhost:5000/api/cashiers/${user.id}`)
            .then((res) => {
                return res.json()
            }
            )
            .then((data) => {
                setCashier(data);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setError(error.message);
                setLoading(false);
            });
    }, []);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;
    return (
        <>
            <div className="flex justify-center min-h-screen pb-[10em]">

                <div className=" flex flex-col justify-center items-center">
                    <div className=" justify-center items-center border border-gray-300 rounded-lg px-[2em] ">
                        <div className=" flex flex-row justify-around   ">
                            <div className="pt-4">
                                <div>
                                    <h1 className="font-bold text-[20px] sm:text-[40px]">Welcome : {cashier?.name}</h1>
                                </div>

                                    <div className="mt-5 p-6">
                                        <div className="text-center bg-blue-[900] border border-gray-300 rounded-lg py-5 text-lg font-semibold mt-[1em] hover:text-indigo-700 hover:bg-[#E5E4E2]   ">
                                            <button onClick={() => navigate('/cashier/create')}>Get bill for patient</button>
                                        </div>

                                    </div>
                                    <div className="p-6">
                                        <div className="text-center bg-blue-[900] border border-gray-300 rounded-lg py-5 text-lg font-semibold hover:text-indigo-700 hover:bg-[#E5E4E2]   ">
                                            <button onClick={() => navigate('/cashier/verifyPayment')}>Set payment status</button>
                                        </div>

                                    </div>

                            </div>
                            <div className="w-30 mt-[7em] md:w-60 "><img src={hospital} alt="this is hospital logo" /></div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default CashierDashboard;