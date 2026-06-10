import logo from '../assets/logo.png';

function LoginPage() {
    return (
        <>
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <div className='items-center flex flex-col gap-2'>
                    <div className='bg-[#40C2FD] w-12 h-12 flex flex-col rounded-lg items-center justify-center'>
                        <img src={logo} className='  object-contain' alt="" />
                    </div>
                    <h1 className='font-bold text-[#00668A]'>ClearBill Care</h1>
                </div>
                <div className=' border-1 w-[70%] gap-4 border-gray-300 flex flex-col p-6 mt-4 items-center'>
                    <div className='text-center'>
                        <h1 className='font-semibold text-[24px]'>Welcome to ClearBill Care</h1>
                        <h2 className='text-[#45464D] font-normal text-[16px]'>Your supportive hospital billing partner.</h2>
                    </div>
                    <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <h2 className='text-[14px]'>EMAIL ADDRESS</h2>
                        <input type="email" name='emial' className='border-[#C6C6CD] border-1'
                        placeholder='Enter your emial'/>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-[14px]'>PASSWORD</h2>
                        <input type="email" name='emial' className='border-[#C6C6CD] text-[16px] border-1'
                        placeholder='Enter your password'/>
                    </div>
                    <button className='text-[#00668A] font-semibold text-[20px] bg-[#40C2FD] rounded-lg h-[50px]'>Sign In</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LoginPage;
