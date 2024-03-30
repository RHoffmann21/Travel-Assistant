import './App.css';
import './components/ChatBubble.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/';
import { Route, Routes } from 'react-router-dom';

import TravelReportsOverview from './pages/TravelReportsOverview';
import ChatBox from './components/ChatBox';
import LandingPage from './pages/LandingPage';
import Error404 from './pages/errorPages/404';
import MainFrame from './components/MainFrame';
// import { AuthProvider } from './Auth/AuthProvider';

const conversation = [
  {
    side: 'question',
    type: 'text',
    content: 'Wann hast du deine Reise angetreten?'
  }, {
    side: 'answer',
    type: 'text',
    content: '02.01.2024'
  },
  {
    side: 'question',
    type: 'text',
    content: 'Wann hast du deine Reise beendet?'
  },
  {
    side: 'answer',
    type: 'datePicker',
    content: '03.01.2024'
  }
]

const travelReports = [
  {
    year: 2024,
    month: 'Februar',
    status: 'pending',
    travelReportId: 12345
  },
  {
    year: 2024,
    month: 'January',
    status: 'inReview',
    travelReportId: 22222
  },
  {
    year: 2023,
    month: 'Dezember',
    status: 'toBeCorrected',
    travelReportId: 33333
  },
  {
    year: 2023,
    month: 'November',
    status: 'toBeCorrected',
    travelReportId: 44444
  },
  {
    year: 2023,
    month: 'Mai',
    status: 'finished',
    travelReportId: 55555
  },
  {
    year: 2023,
    month: 'März',
    status: 'finished',
    travelReportId: 66666
  }
];

export default function App() {

  return (
    <>
      {/* <AuthProvider> */}
        <MainFrame>
          <Routes>
            {/* view the landingpage */}
            <Route path='/' element={<LandingPage/>}/> 
            {/* view for all created travelExpenseReports of the user */}
            <Route path='travelExpenseReports' element={<TravelReportsOverview travelReports={travelReports}/>}>
              {/* view all created travelExpenseReports of the user */}
              <Route path='create' element={<ChatBox conversation={conversation}/>}/>
              {/* view all created travelExpenseReports who needs verification from the user */}
              <Route path='verify'/>
              {/* view all created travelExpenseReports who needs a check from the user */}
              <Route path='check'/> 
              {/* view one created travelExpenseReport as chat */}
              <Route path=':travelExpenseReportId' element={<ChatBox conversation={conversation}/>}>
                {/* view one created travelExpenseReport to verify */}
                <Route path='verify'/> 
                {/* view one created travelExpenseReport to check */}
                <Route path='check'/> 
              </Route>
            </Route>
            {/* view error 404 page for undefined routes */}
            <Route path='*' element={<Error404/>}/>  
          </Routes>
        </MainFrame>
      {/* </AuthProvider> */}
    </>
  )
}
