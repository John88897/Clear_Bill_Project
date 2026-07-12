import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import StaffLayout from "../../../layout/StaffLayout";
import home from '../../assets/hom.png';
import add from '../../assets/addU.png'

const navItems = [
          { to: '/receptionist/dashboard', icon: home, label: 'Dashboard' },
          { to: '/receptionist/register', icon: add, label: 'Register Patient' },
      ];

function RegisterPatient() {
    const [name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) {
            setError("You must be logged in to access this page.");
            setLoading(false);
            return;
        }
        authFetch(`${import.meta.env.VITE_API_URL}/api/receptionists/${user.id}`)
            .then(res => res.json())
            .then(() => setLoading(false))
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    async function handleCreatePatient() {
        try {
            const res = await authFetch(
                `${import.meta.env.VITE_API_URL}/api/receptionists/${user.id}/create`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id: user.id, gender, address, name, email, password }),
                }
            );
            const data = await res.json();
            if (res.ok) {
                alert("Patient registered successfully!");
                setFullName(""); setEmail(""); setPassword("");
                setGender(""); setAddress("");
                navigate("/receptionist/dashboard");
            } else {
                alert(data.error || "Already existing patient!");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <StaffLayout role="Receptionist" navItems={navItems}><p>Loading...</p></StaffLayout>;

    if (error) return (
        <StaffLayout role="Receptionist" navItems={navItems}>
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-red-500 font-medium">Error: {error}</p>
                <button
                    onClick={() => { setError(null); navigate("/receptionist/dashboard"); }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                    Return to Dashboard
                </button>
            </div>
        </StaffLayout>
    );

    return (
        <StaffLayout role="Receptionist" navItems={navItems}>
            <div className="max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Register New Patient</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="Enter patient name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter email"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Set password"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Gender</label>
                            <select
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder="Enter address"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                            />
                        </div>

                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={handleCreatePatient}
                                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                            >
                                Register Patient
                            </button>
                            <button
                                onClick={() => navigate("/receptionist/dashboard")}
                                className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </StaffLayout>
    );
}
// }
export default RegisterPatient;
