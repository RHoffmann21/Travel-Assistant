import '../App.css'
import '../components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'
import ReportCard from '../components/ReportCard';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Calendar } from "react-multi-date-picker";
import { Navigate } from 'react-router-dom';

export default function TravelReportsOverview() {
  const [travelExpenseReports, setTravelExpenseReports] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [travelExpenseReportId, setTravelExpenseReportId] = useState();

  useEffect(() => {
    axios.get(`/api/v1/travelExpenseReports`)
      .then((res) => {
        setTravelExpenseReports(res.data);
      })
  }, []);

  const handleShow = () => setShowCreateModal(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/travelExpenseReports/create', formData);
      if (response.status === 200) {
        setTravelExpenseReportId(response.data._id);
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      month: date.month.index,
      year: date.year
    });
  };


  const props = {
    format: 'MMMM YYYY',
    className: 'rmdp-mobile',
    highlightToday: false,
    onlyMonthPicker: true,
    hideMonth: true,
    onChange: handleDateChange
  }


  return (
    <>
      <Modal show={showCreateModal} centered>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Calendar {...props} />
            <button type="submit">Erstellen</button>
          </form>
        </Modal.Body>
      </Modal>
      {
        travelExpenseReports?.length && console.log(JSON.stringify(travelExpenseReports))
      }
      { travelExpenseReports?.length &&
        travelExpenseReports.map(travelExpenseReport => (
          <ReportCard key={travelExpenseReport._id} travelExpenseReport={travelExpenseReport}></ReportCard>
        ))
      }
      { typeof (travelExpenseReportId) !== 'undefined' && (<Navigate to={travelExpenseReportId} />) }
      <i onClick={handleShow} className="bi bi-plus-circle-dotted add-travelExpense-button"></i>
    </>
  )
}
