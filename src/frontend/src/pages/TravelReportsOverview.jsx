import ReportCard from '../components/ReportCard';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Calendar } from "react-multi-date-picker";
import { Navigate } from 'react-router-dom';
import AuthProvider from '../auth/AuthProvider';
import { Card } from 'react-bootstrap';

export default function TravelReportsOverview() {
  const [travelExpenseReports, setTravelExpenseReports] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [travelExpenseReportId, setTravelExpenseReportId] = useState();

  const { auth: { user } } = useContext(AuthProvider);
  
  useEffect(() => {
    axios.get(`/api/v1/travelExpenseReports`)
      .then((res) => {
        setTravelExpenseReports(res.data);
      })
  }, []);

  const handleShow = () => setShowCreateModal(true);
  const handleClose = () => setShowCreateModal(false);

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
      year: date.year,
      user
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
      <Modal show={showCreateModal} onHide={handleClose}>
        <Modal.Body>
        <div className="container d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="justify-center">
            <Calendar {...props} />
            <div className="container d-flex align-items-center justify-content-center">
            <button className="btn btn-primary mt-2" type="submit">Erstellen</button>
            </div>
          </form>
          </div>
        </Modal.Body>
      </Modal>
      {
        travelExpenseReports?.map(travelExpenseReport => (
          <ReportCard key={travelExpenseReport._id} travelExpenseReport={travelExpenseReport}></ReportCard>
        ))
      }
      {!travelExpenseReports || !travelExpenseReports?.length &&
      <Card className="mx-3">
        <Card.Body>
          <Card.Title className="my-1">
            Keine Reisekostenabrechnung gefunden! 
          </Card.Title>
        </Card.Body>
      </Card>
      }
      { typeof (travelExpenseReportId) !== 'undefined' && (<Navigate to={travelExpenseReportId} />) }
      <i onClick={handleShow} className="bi bi-plus-circle-dotted add-travelExpense-button"></i>
    </>
  )
}
