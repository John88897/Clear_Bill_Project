import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log("Response:", data);
console.log("Status:", response.status);

            if (response.ok) {

    localStorage.setItem('user', JSON.stringify(data.user));

    alert('Login Successful!');

    if (data.user.role === "Patient") {
        navigate("/patient/dashboard");
    }
    else if (data.user.role === "Receptionist") {
        navigate("/receptionist/dashboard");
    }
    else if (data.user.role === "Cashier") {
        navigate("/cashier/dashboard");
    }
    else if (data.user.role === "Admin") {
        navigate("/admin/dashboard");
    }

} else {
    alert(data.message);
}
        } catch (error) {
            console.error(error);
            alert('Server Error');
        }
    };
    return (
        <>
            <div className=' min-h-screen flex flex-col items-center justify-center'>
                <div className='items-center flex flex-col gap-2'>
                    <div className='bg-[#40C2FD] w-12 h-12 flex flex-col rounded-lg items-center justify-center'>
                        <img src={logo} className='  object-contain' alt="" />
                    </div>
                    <h1 className='font-bold text-[#00668A]'>ClearBill Care</h1>
                </div>
                <div className=' border-1 shadow-gray-500 shadow-sm w-[70%] gap-4 border-gray-300 rounded-lg flex flex-col p-6 mt-4 items-center'>
                    <div className='text-center'>
                        <h1 className='font-semibold text-[24px]'>Welcome to ClearBill Care</h1>
                        <h2 className='text-[#45464D] font-normal text-[16px]'>Your supportive hospital billing partner.</h2>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <h2 className='text-[14px]'>EMAIL ADDRESS</h2>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-[#C6C6CD] border p-2 rounded"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[14px] '>PASSWORD</h2>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-[#C6C6CD] border p-2 rounded"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button onClick={handleLogin} className='hover:bg-[#0C92C1] cursor-pointer text-[#00668A] font-semibold text-[20px] bg-[#40C2FD] rounded-lg h-[50px]'>Sign In</button>
                        <hr className='border-gray-400'/>
                    </div>

                </div>
                <div className='text-center bottom-0 lelf-0 mt-10'>
                    <p className='text-[#76777D] text-[16px]'>© 2026 ClearBill Care. All healthcare financial data is
                        processed securely.</p>
                </div>
            </div>
        </>
    );
}
export default LoginPage;
