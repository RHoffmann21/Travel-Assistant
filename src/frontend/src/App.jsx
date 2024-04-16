import './App.css';
import './components/ChatBubble.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/';
import { Route, Routes } from 'react-router-dom';

import TravelReportsOverview from './pages/TravelReportsOverview';
import ReleasedTravelExpenseReports from './pages/ReleasedTravelExpenseReports';
import LandingPage from './pages/LandingPage';
import Error404 from './pages/errorPages/404';
import Error403 from './pages/errorPages/403';
import MainFrame from './components/MainFrame';
import Chat from './pages/Chat';
import ReportsOverview from './pages/ReportsOverview'
import { AuthProvider } from './auth/AuthProvider';

export default function App() {

  return (
    <>
      <AuthProvider>
        <MainFrame>
          <Routes>
            {/* view the landingpage */}
            <Route path='/' element={<LandingPage/>}/> 
            {/* view for all created travelExpenseReports of the user */}
            <Route path='travelExpenseReports' element={<TravelReportsOverview/>}/>
            {/* view all created travelExpenseReports who needs validate from the user */}
            <Route path='travelExpenseReports/validate' element={<ReleasedTravelExpenseReports type={'validate'}/>}/>
            {/* view all created travelExpenseReports who needs a auditing from the user */}
            <Route path='travelExpenseReports/audit' element={<ReleasedTravelExpenseReports type={'audit'}/>}/> 
            {/* view one created travelExpenseReport to verify */}
            <Route path='travelExpenseReports/:travelExpenseReportId/validate' element={<ReportsOverview type={'validate'}/>}/> 
            {/* view one created travelExpenseReport to check */}
            <Route path='travelExpenseReports/:travelExpenseReportId/audit' element={<ReportsOverview type={'audit'}/>}/> 
            {/* view one created travelExpenseReport as chat */}
            <Route path='travelExpenseReports/:travelExpenseReportId' element={<Chat/>}/>
            {/* view error 403 page */}
            <Route path='403' element={<Error403/>}/>
            {/* view error 404 page for undefined routes */}
            <Route path='*' element={<Error404/>}/>  
            {/* '/auth-failure' */}
          </Routes>
        </MainFrame>
      </AuthProvider>
    </>
  )
}
