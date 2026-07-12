import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hospital from "../../assets/hospital.png";
// import LoginPage from "../LoginPage";
import { authFetch } from "../../utils/authFetch";
import StaffLayout from "../../../layout/StaffLayout";
import home from '../../assets/hom.png';
import service from '../../assets/service.png';


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
    authFetch(`${import.meta.env.VITE_API_URL}/api/doctors/${user.id}`)
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
  const navItems = [
        { to: '/doctor/dashboard', icon: home, label: 'Dashboard' },
        { to: '/doctor/input', icon: service, label: 'Input Service' },
    ];

    if (loading) return <StaffLayout role="Doctor" navItems={navItems}><p>Loading...</p></StaffLayout>;
    if (error) return <StaffLayout role="Doctor" navItems={navItems}><p className="text-red-500">Error: {error}</p></StaffLayout>;

  return (
    <>
      <StaffLayout role="Doctor" navItems={navItems}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome, Dr. {user.name}</h1>

            <div className="grid grid-cols-1 gap-4 max-w-md">
                <div
                    onClick={() => navigate('/doctor/input')}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all hover:border-teal-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">💊</div>
                        <div>
                            <p className="font-semibold text-gray-800">Input Patient Service</p>
                            <p className="text-sm text-gray-400">Add services to patient bill</p>
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
    </>
  );
}
export default DoctorDashboard;
