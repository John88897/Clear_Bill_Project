import { useState, useEffect } from 'react';
import al from '../../assets/al.png'
import calendar from '../../assets/calendar.png'
import an from '../../assets/an.png'
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../utils/authFetch';
function Bills() {
    const [bills, setBills] = useState([]); const [filter, setFilter] = useState("All");
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) return;

        authFetch(`${import.meta.env.VITE_API_URL}/api/bills/patient/${user.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Bills:", data);
                setBills(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error(err));
    }, []);

    const filteredBills =
        filter === "All"
            ? bills
            : bills.filter((bill) => bill.status === filter);
    return (
        <>
            <div className='p-4'>

                <div className='flex justify-between'>
                    <a href="./dashboard"><img src={al} className='px-2 py-2 w-10' alt="" /></a>
                    <h1 className="mt-1 mr-[45%] font-semibold">My Bills</h1>
                </div>
                <div className='flex shadow p-1 mb-5 gap-1'>
                    <button
                        onClick={() => setFilter("All")}
                        className={`flex-1 py-2 rounded-lg font-semibold ${filter === 'All'
                            ? "border-2 border-cyan-400 text-cyan-500 "
                            : "border border-gray-300 text-cyan-400"
                            } `}
                    >All
                    </button>
                    <button
                        onClick={() => setFilter("Unpaid")}
                        className={`flex-1 py-2 rounded-lg font-semibold ${filter === 'Unpaid'
                            ? "border-2 border-red-300 text-red-500 "
                            : "border border-gray-300 text-red-500"
                            } `}
                    >Unpaid
                    </button>
                    <button
                        onClick={() => setFilter("Paid")}
                        className={`flex-1 py-2 rounded-lg font-semibold ${filter === 'Paid'
                            ? "border-2 border-green-300 text-green-600 "
                            : "border border-gray-300 text-green-600"
                            } `}
                    >Paid
                    </button>

                </div>
                <div>
                    {filteredBills.map((bill) => (
                        <div key={bill.bill_id} className="border border-slate-300 rounded-lg p-4 mb-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Bill-{String(bill.bill_id).padStart(3, "0")}</p>
                                    <div className='flex flex-row gap-3 '>
                                        <img src={calendar} className='w-4' alt="" />
                                        <p className="text-sm text-gray-500">{bill.bill_date}</p>
                                    </div>
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
                            <hr className='border-gray-300' />
                            <div className='flex justify-between'
                                onClick={() => navigate(`/patient/bills/${bill.bill_id}`)}
                            >
                                <button className='text-cyan-500 font-semibold'>View Details</button>
                                <img src={an} className='w-2 m-2' alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}
export default Bills;