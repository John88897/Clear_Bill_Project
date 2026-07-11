import { useState } from "react";
import AdminLayout from "../../../layout/AdminLayout";
import { authFetch } from "../../utils/authFetch";
import { useEffect } from "react";
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts';
import users from '../../assets/users.png'
import pf from '../../assets/user.png'
import bill from '../../assets/bills.png'
import mb from '../../assets/mb.png'

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        authFetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error(err));
    }, []);
    
    if (!stats) return <div>Loading...</div>;

    const pieData = [
        {name: 'Paid', value: stats.paidBills},
        {name: 'Unpaid', value: stats.unpaidBills},
    ];

    const COLORS =  ['#40C2FD', '#FF4D4D'];

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="flex items-center gap-2">
                    <div><img className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center" src={pf} alt="" /></div>
<span className="font-medium text-sm">{user.name}</span>                </div>
            </div>

            {/* status card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white  rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center  gap-3">
                        <img className="w-8" src={users} alt="" />
                        <div>
                            <p className="text-sm text-gray-400">Total Patients</p>
                            <p className="text-exl font-bold">{stats.totalPatients}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <img className="w-8" src={bill} alt="" />
                        <div>
                            <p className="text-sm text-gray-400">Total Bills</p>
                            <p className="text-exl font-bold">{stats.totalBills}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <img className="w-12" src={mb} alt="" />
                        <div>
                            <p className="text-sm text-gray-400">Total Revenue</p>
                            <p className="text-exl font-bold text-green-600">
                                ${Number(stats.totalRevenue).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <img className="w-8" src={users} alt="" />
                        <div>
                            <p className="text-sm text-gray-400">Total Users</p>
                            <p className="text-exl font-bold">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* bottom section */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                {/* revenue overview */}
                <div className=" bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h2 className="font-semibold mb-4">Revenue Overview</h2>
                    <PieChart width={300} height={200}>
                        <Pie 
                        data={pieData}
                        cx={150}
                        cy={100}
                        innerRadius={0}
                        outerRadius={90}
                        dataKey="value"
                        >
                            {pieData.map((entry, index)=>(
                                <Cell key={index}fill={COLORS[index]}/>
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={3}/>
                        <Tooltip/>
                    </PieChart>
                </div>

                {/* quick status */}
                <div className="mt-12 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h2 className="font-semibold mb-4">Bill Summary</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-sm text-gray-600">Paid Bills</span>
                            <span className="font-bold text-green-600">{stats.paidBills}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span className="text-sm text-gray-600">Unpaid Bills</span>
                            <span className="font-bold text-red-500">{stats.unpaidBills}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                            <span className="text-sm text-gray-600">Total Revenue</span>
                            <span className="font-bold text-cyan-600">${Number(stats.totalRevenue).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    )
}
export default AdminDashboard;