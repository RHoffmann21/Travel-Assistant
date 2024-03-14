import './App.css'
import './components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'
import ReportCard from './components/ReportCard';

function TravelReportsOverview({travelReports}) {
  return (
    <div>
      {
        travelReports.map(travelReport => (
          <ReportCard key={travelReport.travelReportId} travelReport={travelReport}></ReportCard>
        ))
      }
      <a href='/addTravelExpense'><i className="bi bi-plus-circle-dotted add-travelExpense-button"></i></a>
    </div>
  )
}

export default TravelReportsOverview;
