import '../App.css'
import '../components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'
import ReportCard from '../components/ReportCard';
import { Link } from 'react-router-dom';

function TravelReportsOverview({travelReports}) {

  fetch('/api/v1/settings', {
    method: "GET",
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  return (
    <div>
      {
        travelReports.map(travelReport => (
          <ReportCard key={travelReport.travelReportId} travelReport={travelReport}></ReportCard>
        ))
      }
      <Link to='create'><i className="bi bi-plus-circle-dotted add-travelExpense-button"></i></Link>
    </div>
  )
}

export default TravelReportsOverview;
