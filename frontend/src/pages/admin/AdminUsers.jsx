import { useState, useEffect } from "react";
import AdminLayout from "../../../layout/AdminLayout";
import { authFetch } from "../../utils/authFetch";

function AdminUsers() {
    const [userList, setUserList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', role: '' })
    useEffect(() => {
        authFetch('http://localhost:5000/api/admin/users')
            .then(res => res.json())
            .then(data => setUserList(data.users || data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        await authFetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, { method: 'DELETE' });
        setUserList(userList.filter(u => u.user_id !== id));
    };

    const handleCreate = async () => {
        if (!form.name || !form.email || !form.password) {
            alert("Please fill all fields");
            return;
        }
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();

        if (res.ok) {
            setUserList([...userList, data]);
            setForm({ name: '', email: '', password: '', role: '' });
            setShowForm(false);
            alert(`successfully created ${name}`)
        } else {
            alert(data.message);
        }
    };

    const roleColor = (role) => {
        switch (role) {
            case 'Cashier': return 'bg-green-100 text-green-700';
            case 'Receptionist': return 'bg-orange-100 text-orange-700';
            case 'Doctor': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">User</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    + Add User
                </button>
            </div>

            {/* add form */}
            {showForm && (
                <div className="bg-white rounded-xl p-4 shadow-sm border-gray-100 mb-4">
                    <h2 className="font-semibold mb-3">New User</h2>
                    <div className="grid grid-cols-4 gap-3">
                        <input type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                        <input type="text"
                            placeholder="Email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                        <input type="text"
                            placeholder="password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                        <select
                            value={form.role}
                            onChange={e => setForm({ ...form, role: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="" disabled>Select role</option>
                            <option value="Cashier">Cashier</option>
                            <option value="Receptionist">Receptionist</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={handleCreate}
                            className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="border border-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">ID</th>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Role</th>
                            <th className="text-left px-4 py-3 text-gray-500 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.user_id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-500">#{user.user_id}</td>
                                <td className="px-4 py-3 font-medium">{user.name}</td>
                                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleDelete(user.user_id)}
                                        className="text-red-500 hover:text-red-700 font-medium
                                    text-xs border border-red-200 px-2 py-1 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default AdminUsers;