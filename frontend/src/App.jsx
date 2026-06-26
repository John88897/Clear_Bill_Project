import RootLayout from '../layout/RootLayout.jsx';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/patient/Dashboard.jsx';
import Bills from './pages/patient/Bills.jsx';
import PaymentHistory from './pages/patient/PaymentHistory.jsx';
import Profile from './pages/patient/Profile.jsx'
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
        <Route element={<RootLayout/>}>
          <Route path='/patient/dashboard' element={<Dashboard />} />
          <Route path='/patient/bills' element={<Bills />} />
          <Route path='/patient/paymentHistory' element={<PaymentHistory />} />
          <Route path='/patient/profile' element={<Profile />} />
        </Route>

        
      </Routes>
    </>
  )
}

export default App
