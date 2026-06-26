import { useEffect, useState } from "react";
import hospital from '../../assets/hospital.png'
import rec from '../../assets/rec.png'
import wallet from '../../assets/wallet.png'
import verify from '../../assets/verify.png'
function Dashboard() {
    const [patient, setPatient] = useState();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
        if (!user.id) return;
        fetch(`http://localhost:5000/api/patient/dashboard/${user.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("API DATA:", data);
                setPatient(data);
            });
    }, []);
    return (
        <>
            <div className=" flex flex-col justify-center items-center">
                <div className="justify-center items-center w-[95%]  border-1 border-gray-300 rounded-lg px-6 mt-6">
                    <div className=" flex flex-row justify-around   ">
                        <div>
                            <div>
                                <h1 className="font-bold text-[20px]">Hello, {patient?.name}</h1>
                            </div>
                            <div>
                                <p className="text-[12px]">Welcome to ClearBill Care </p>
                                <p className="text-[12px]">Your supportive hospital billing partner.</p>
                            </div>
                        </div>
                        <div className="w-30"><img src={hospital} alt="" /></div>
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
                    <div className="flex  justify-around">
                        <h1>Recent Bills</h1>
                        <a href='./bills'>View All</a>
                    </div>
                    <div>
                        <div>
                            <div className="mt-6 border border-gray-300 rounded-lg p-4">
                                <h2 className="font-semibold mb-3">
                                    Latest Bill
                                </h2>

                                {patient?.latestBill ? (
                                    <>
                                        <p>
                                            Bill ID: {patient.latestBill.bill_id}
                                        </p>

                                        <p>
                                            Date: {patient.latestBill.bill_date}
                                        </p>

                                        <p>
                                            Amount: ${patient.latestBill.total_amount}
                                        </p>

                                        <p>
                                            Status: {patient.latestBill.status}
                                        </p>
                                    </>
                                ) : (
                                    <p>No bills found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}

        </>
    )
}
export default Dashboard;