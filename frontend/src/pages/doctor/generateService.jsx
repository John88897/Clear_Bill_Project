import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import StaffLayout from "../../../layout/StaffLayout";
import home from '../../assets/hom.png';
import service from '../../assets/service.png';

const navItems = [
        { to: '/doctor/dashboard', icon: home, label: 'Dashboard' },
        { to: '/doctor/input', icon: service, label: 'Input Service' },
    ];
function InputService() {
    const [patientId, setPatientId] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [amountOfService, setAmountOfService] = useState("");
    const [serviceInfo, setServiceInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) return;
        authFetch(`${import.meta.env.VITE_API_URL}/api/doctors/${user.id}`)
            .then(res => { if (!res.ok) throw new Error("Doctor not found"); return res.json(); })
            .then(() => setLoading(false))
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    useEffect(() => {
        if (!serviceId) { setServiceInfo(null); return; }
        async function showService() {
            try {
                const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/services/${serviceId}`);
                if (!res.ok) { setServiceInfo(null); return; }
                const service = await res.json();
                setServiceInfo(service);
            } catch (err) { setError(err.message); }
        }
        showService();
    }, [serviceId]);

    async function handleInputService() {
        if (!patientId || !serviceId || !amountOfService) {
            alert("Please fill in all fields!");
            return;
        }
        const payload = {
            patientId: parseInt(patientId),
            serviceId: parseInt(serviceId),
            quantity: parseInt(amountOfService)
        };
        try {
            const res = await authFetch(
                `${import.meta.env.VITE_API_URL}/api/doctors/${user.id}/input`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            if (!res.ok) {
                const errorText = await res.text();
                let msg = "Failed to save!";
                try { msg = JSON.parse(errorText).error || msg; } catch {}
                throw new Error(msg);
            }
            localStorage.setItem("pending_bill_payload", JSON.stringify(payload));
            alert(`Service sent to cashier! Patient ID: ${patientId}`);
            setPatientId(""); setServiceId(""); setAmountOfService(""); setServiceInfo(null);
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <StaffLayout role="Doctor" navItems={navItems}><p>Loading...</p></StaffLayout>;

    if (error) return (
        <StaffLayout role="Doctor" navItems={navItems}>
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-red-500 font-medium">Error: {error}</p>
                <button
                    onClick={() => { setError(null); navigate("/doctor/dashboard"); }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                    Return to Dashboard
                </button>
            </div>
        </StaffLayout>
    );

    return (
        <StaffLayout role="Doctor" navItems={navItems}>
            <div className="max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Input Patient Service</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Patient ID</label>
                            <input
                                type="text"
                                value={patientId}
                                onChange={e => setPatientId(e.target.value)}
                                placeholder="Enter patient ID"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Service ID</label>
                            <input
                                type="text"
                                value={serviceId}
                                onChange={e => setServiceId(e.target.value)}
                                placeholder="Enter service ID"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                            />
                            {serviceInfo && (
                                <p className="text-xs text-teal-600 mt-1 font-medium">
                                    ✓ {serviceInfo.service_name} — ${serviceInfo.cost}
                                </p>
                            )}
                            {serviceId && !serviceInfo && (
                                <p className="text-xs text-red-400 mt-1">Service not found</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={amountOfService}
                                onChange={e => setAmountOfService(e.target.value)}
                                placeholder="Enter quantity"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                            />
                        </div>

                        {serviceInfo && amountOfService && (
                            <div className="bg-teal-50 rounded-lg p-3 text-sm">
                                <p className="text-teal-700 font-medium">
                                    Subtotal: ${(serviceInfo.cost * parseInt(amountOfService || 0)).toFixed(2)}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={handleInputService}
                                className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition"
                            >
                                Send to Cashier
                            </button>
                            <button
                                onClick={() => navigate("/doctor/dashboard")}
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
export default InputService;
