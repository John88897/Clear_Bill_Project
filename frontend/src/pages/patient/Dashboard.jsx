import { useEffect, useState } from "react";
import hospital from '../../assets/hospital.png'
import rec from '../../assets/rec.png'
import wallet from '../../assets/wallet.png'
import verify from '../../assets/verify.png'
import { authFetch } from "../../utils/authFetch";
function Dashboard() {
    const [patient, setPatient] = useState();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
        if (!user.id) return;
        authFetch(`${import.meta.env.VITE_API_URL}/api/patient/dashboard/${user.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("API DATA:", data);
                setPatient(data);
            });
    }, []);
    return (
        <>
        <div className="pb-20">

            <div className=" flex flex-col justify-center items-center">
                <div className=" justify-center items-center w-[95%]  border-1 border-gray-300 rounded-lg px-6 mt-6">
                    <div className=" flex flex-row justify-around   ">
                        <div className="pt-4">
                            <div>
                                <h1 className="font-bold text-[20px] sm:text-[40px]">Hello, {patient?.name}</h1>
                            </div>
                            <div className="mb-3">
                                <p className="text-[12px] sm:text-[16px]">Welcome to ClearBill Care </p>
                                <p className="text-[12px] sm:text-[16px]">Your supportive hospital billing partner.</p>
                            </div>
                        </div>
                        <div className="w-30 mt-2 sm:w-60"><img src={hospital} alt="" /></div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-center items-center">
                <div className="grid grid-cols-1  sm:grid-cols-3 w-[95%] gap-3 ">
                    {/* Total Bills */}
                    <div className="text-center border border-gray-300 py-3 rounded-lg">
                        <div className="flex items-center justify-center gap-2">
                            <img src={rec} alt="" className="w-6 h-6" />
                            <h3 className="text-xs font-semibold text-slate-500">
                                Total Bills
                            </h3>
                        </div>

                        <div className="mt-2">
                            <div className="font-bold text-2xl">
                                {patient?.totalBills || 0}
                            </div>
                            <h3 className="text-xs text-slate-500">
                                Bills
                            </h3>
                        </div>
                    </div>

                    {/* Unpaid Amount */}
                    <div className="text-center border border-gray-300 py-3 rounded-lg">
                        <div className="flex items-center justify-center gap-2">
                            <img src={wallet} alt="" className="w-6 h-6" />
                            <h3 className="text-xs font-semibold text-slate-500">
                                Unpaid Amount
                            </h3>
                        </div>

                        <div className="mt-2">
                            <div className="font-bold text-red-500 text-2xl">
                                ${patient?.unpaidAmount || 0}
                            </div>

                            <h3 className="text-xs text-red-500">
                                {patient?.unpaidBills || 0} Unpaid
                            </h3>
                        </div>
                    </div>

                    {/* Paid Bills */}
                    <div className="text-center border border-gray-300 py-3 rounded-lg">
                        <div className="flex items-center justify-center gap-2">
                            <img src={verify} alt="" className="w-6 h-6" />
                            <h3 className="text-xs font-semibold text-slate-500">
                                Paid Bills
                            </h3>
                        </div>

                        <div className="mt-2">
                            <div className="font-bold text-2xl">
                                {patient?.paidBills || 0}
                            </div>
                            <h3 className="text-xs text-slate-500">
                                Bills
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <div>
                    <div className="  font-semibold flex  justify-around">
                        <h1>Recent Bills</h1>
                        <a href='./bills' className="text-[#00668A] ">View All</a>
                    </div>
                    <div>
                        <div className="flex justify-center items-center">
                            <div className="mt-6 border w-[95%] border-gray-300 rounded-lg p-4">


                                <div>
                                    {patient?.bills?.map((bill) => (
                                        <div key={bill.bill_id} className="border border-slate-300 rounded-lg p-4 mb-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">Bill #{bill.bill_id}</p>
                                                    <p className="text-sm text-gray-500">{bill.bill_date}</p>
                                                </div>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${bill.status === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {bill.status}
                                                </span>
                                            </div>

                                            <div className="mt-2">
                                                <p className="font-bold text-lg">${bill.total_amount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard;