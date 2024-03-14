import './App.css'
import './components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import TravelReportsOverview from './TravelReportsOverview';

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

function App() {

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-11 col-md-10">
          <Navbar />
           <TravelReportsOverview travelReports={travelReports}/>
            {/* <ReportCard travelReport={travelReports}></ReportCard> */}
            {/* <ChatBox conversation={conversation}></ChatBox> */}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
