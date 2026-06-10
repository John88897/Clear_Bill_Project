import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Bills from './pages/Bills.jsx';
import PaymentHistory from './pages/PaymentHistory.jsx';
import Support from './pages/Support.jsx';
import './App.css'
import './index.css'

function App() {
  return (
    <>
       {/* Route */}
       
       <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboad' element={<Dashboard/>}/>
        <Route path='/bills' element={<Bills/>}/>
        <Route path='/paymentHistory' element={<PaymentHistory/>}/>
        <Route path='/support' element={<Support/>}/>
       </Routes>
    </>
  )
}

export default App
