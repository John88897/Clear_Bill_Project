import { useEffect, useState } from "react";
import hospital from '../../assets/hospital.png'
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import StaffLayout from "../../../layout/StaffLayout";
import home from '../../assets/hom.png';
import add from '../../assets/add.png'

 const navItems = [
        { to: '/receptionist/dashboard', icon: home, label: 'Dashboard' },
        { to: '/receptionist/register', icon: add, label: 'Register Patient' },
    ];
function ReceptionistDashboard() {
    const [receptionist, setReceptionist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate  = useNavigate();
    useEffect(() => {
        console.log("user id is :", user.id);
        if (!user.id) {
             return;
        }
        authFetch(`${import.meta.env.VITE_API_URL}/api/receptionists/${user.id}`)
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
     
     if (loading) return <StaffLayout role="Receptionist" navItems={navItems}><p>Loading...</p></StaffLayout>;
    if (error) return <StaffLayout role="Receptionist" navItems={navItems}><p className="text-red-500">Error: {error}</p></StaffLayout>;

    return (
        <>
           <StaffLayout role="Receptionist" navItems={navItems}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {user.name}</h1>

            <div className="grid grid-cols-1 gap-4 max-w-md">
                <div
                    onClick={() => navigate('/receptionist/register')}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all hover:border-purple-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl"><img className="w-8" src={add} alt="" /></div>
                        <div>
                            <p className="font-semibold text-gray-800">Register New Patient</p>
                            <p className="text-sm text-gray-400">Create a new patient account</p>
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
        </>
    )
}
export default ReceptionistDashboard;