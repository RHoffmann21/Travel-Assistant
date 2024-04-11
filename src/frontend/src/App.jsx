import './App.css';
import './components/ChatBubble.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/';
import { Route, Routes } from 'react-router-dom';

import TravelReportsOverview from './pages/TravelReportsOverview';
import LandingPage from './pages/LandingPage';
import Error404 from './pages/errorPages/404';
import MainFrame from './components/MainFrame';
import Chat from './pages/Chat';
// import { AuthProvider } from './Auth/AuthProvider';

export default function App() {

  return (
    <>
      {/* <AuthProvider> */}
        <MainFrame>
          <Routes>
            {/* view the landingpage */}
            <Route path='/' element={<LandingPage/>}/> 
            {/* view for all created travelExpenseReports of the user */}
            <Route path='travelExpenseReports' element={<TravelReportsOverview/>}/>
            {/* view all created travelExpenseReports who needs verification from the user */}
            <Route path='travelExpenseReports/verify'/>
            {/* view all created travelExpenseReports who needs a check from the user */}
            <Route path='travelExpenseReports/check'/> 
            {/* view one created travelExpenseReport as chat */}
            <Route path='travelExpenseReports/:travelExpenseReportId' element={<Chat/>}/>
            {/* view one created travelExpenseReport to verify */}
            <Route path='travelExpenseReports/:travelExpenseReportId/verify'/> 
            {/* view one created travelExpenseReport to check */}
            <Route path='travelExpenseReports/:travelExpenseReportId/check'/> 
            {/* view error 404 page for undefined routes */}
            <Route path='*' element={<Error404/>}/>  
          </Routes>
        </MainFrame>
      {/* </AuthProvider> */}
    </>
  )
}
