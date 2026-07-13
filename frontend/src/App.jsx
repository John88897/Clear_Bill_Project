import RootLayout from '../layout/RootLayout.jsx';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/patient/Dashboard.jsx';
import Bills from './pages/patient/Bills.jsx';
import PaymentHistory from './pages/patient/PaymentHistory.jsx';
import Profile from './pages/patient/Profile.jsx'
import BillDetail from './pages/patient/BillDetail.jsx';
import RegisterPatient from './pages/receptionist/registerPatient.jsx';
import ReceptionistDashboard from './pages/receptionist/receptionistDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import DoctorDashboard from './pages/doctor/doctorDashboard.jsx';
import InputService from './pages/doctor/generateService.jsx';
import CashierDashboard from './pages/cashier/cashierDashboard.jsx';
import CreateBill from './pages/cashier/createBill.jsx';
import AdminReports from './pages/admin/AdminReports';
import VerifyPayment from './pages/cashier/verifyPayment.jsx';
import './App.css'
import './index.css'

function App() {
  return (
    <>
      {/* Route */}
      <Routes>
        {/* public route */}
        <Route path='/' element={<LoginPage />} />

        {/* patient route */}
        <Route element={<RootLayout />}>
          <Route path='/patient/dashboard' element={<Dashboard />} />
          <Route path='/patient/bills' element={<Bills />} />
          <Route path='/patient/paymentHistory' element={<PaymentHistory />} />
          <Route path='/patient/profile' element={<Profile />} />
          <Route path='/patient/bills/:id' element={<BillDetail />} />
        </Route>

        {/* receptionist route*/}
        
          <Route path='/receptionist/dashboard' element={<ReceptionistDashboard />}></Route>
          <Route path='/receptionist/register' element={<RegisterPatient />}></Route>
        {/* Doctor route*/}
        
          <Route path='/doctor/dashboard' element={<DoctorDashboard />}></Route>
          <Route path='/doctor/input' element={< InputService/>}></Route>

         {/* cashier route*/}
        
          <Route path='/cashier/dashboard' element={<CashierDashboard />}></Route>
          <Route path='/cashier/create' element={<CreateBill/>}></Route>
          <Route path='/cashier/verifyPayment' element={<VerifyPayment/>}></Route>

        {/* admin route */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/reports' element={<AdminReports />} />
      </Routes>
    </>
  )
}
export default App
