import '../App.css'
import '../components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'
import ReportCard from '../components/ReportCard';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Calendar } from "react-multi-date-picker";
import { Navigate } from 'react-router-dom';

export default function TravelReportsOverview({travelReports}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [redirectUrl, setRedirectUrl] = useState();

  // const handleClose = () => setShowCreateModal(false);
  const handleShow = () => setShowCreateModal(true);
  // const handleSubbmit

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/travelExpenseReports/create', formData);
      if (response.status === 200) {
        setRedirectUrl(`http://localhost:5000/api/v1/travelExpenseReports/${response.data._id}`);
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
        travelReports.map(travelReport => (
          <ReportCard key={travelReport.travelReportId} travelReport={travelReport}></ReportCard>
        ))
      }
      { typeof (redirectUrl) !== 'undefined' && (<Navigate to="/" />) }
      <i onClick={handleShow} className="bi bi-plus-circle-dotted add-travelExpense-button"></i>
    </>
  )
}
