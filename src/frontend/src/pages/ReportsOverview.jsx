import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ReportsOverview({type}) {
  const { travelExpenseReportId } = useParams();
  const [ travelExpenseReport, setTravelExpenseReport ] = useState();
  const [ formData, setFormData ] = useState();
  const [ status, setStatus ] = useState();

  useEffect(() => {
    getTravelExpenseReport();
  }, []);

  function sumProps(array, prop) {
    const props = prop.split('.');
    if(props.length === 2){
      return array.reduce((accumulator, currentValue) => accumulator + currentValue[props[0]][props[1]]|| 0, 0);
    }
    return array.reduce((accumulator, currentValue) => accumulator + currentValue[prop] || 0, 0);
  }

  async function getTravelExpenseReport(){
    try {
      const response = await axios.get(`/api/v1/travelExpenseReports/${travelExpenseReportId}`);
      if (response.status === 200) {
        setTravelExpenseReport(response.data);
      } else {
        console.error('Error getting travel expense report');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  const handleTextFieldChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitReview()
  };

  async function submitReview() {
    event.preventDefault();

    const data = {
      comment: formData,
      status
    }
    try {
      await axios.post(`/api/v1/travelExpenseReports/${travelExpenseReportId}/${type}`, data);
      window.location.href = `/travelExpenseReports/${type}`;
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  const monatsNamen = [
		"Januar", "Februar", "März", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  return (
    <>{
      travelExpenseReport &&
      <>
      <h3>{travelExpenseReport.user.userFirstName} {travelExpenseReport.user.userName} {monatsNamen[travelExpenseReport.month]} {travelExpenseReport.year}</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Standort</th>
            <th scope="col">Verpf. pausch.</th>
            <th scope="col">Kürzung</th>
            <th scope="col">Flug</th>
            <th scope="col">Bus- /Bahn</th>
            <th scope="col">Taxi</th>
            <th scope="col">Kilometer-geld</th>
            <th scope="col">Privat Übernachtung</th>
            <th scope="col">Hotel</th>
            <th scope="col">Bewirtung</th>
            <th scope="col">Trink-geld</th>
            <th scope="col">Sonstiges</th>
            <th scope="col">Summe</th> 
          </tr>
        </thead>
        <tbody>
        {travelExpenseReport.dates?.map((date) =>(
          <tr key={date.date}>
            <th>{new Date(date.date).getDate()}.</th>
            <td>{date.destination.countryName}</td>
            <td>{date.allowance || 0}€</td>
            <td>{date.mealDeduction || 0}€</td>
            <td>{date.flight.cost || 0}€</td>
            <td>{date.busTrain.cost || 0}€</td>
            <td>{date.cab.cost || 0}€</td>
            <td>{date.privateCarTransportation.mileageAllowance || 0}€</td>
            <td>{date.privateOvernightCost || 0}€</td>
            <td>{date.hotelCost.cost || 0}€</td>
            <td>{date.catering.cost || 0}€</td>
            <td>{date.tip.cost || 0}€</td>
            <td>{date.other.cost || 0}€</td>
            <td>{date.overallCost || 0}€</td>
          </tr>
        ))}

        </tbody>
        <tfoot>
          <tr>
            <th>Summe</th>
            <td></td>
            <td>{ sumProps(travelExpenseReport.dates, 'allowance') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'mealDeduction') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'flight.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'busTrain.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'cab.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'privateCarTransportation.mileageAllowance') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'privateOvernightCost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'hotelCost.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'catering.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'tip.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'other.cost') }€ </td>
            <td>{ sumProps(travelExpenseReport.dates, 'overallCost') }€ </td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" className="form-control" onChange={handleTextFieldChange} required/>
          <input onClick={() => setStatus(type === 'validate' ? 'verified': 'accepted')} type="radio" className="btn-check" name="status" id={type === 'validate' ? 'verified': 'accepted'} required/>
          <label className="btn btn-primary" htmlFor={type === 'validate' ? 'verified': 'accepted'}><i className="bi bi-check-circle"></i></label>
          <input onClick={() => setStatus('declined')} type="radio" className="btn-check" name="status" id="declined" required/>
          <label className="btn btn-danger" htmlFor="declined"><i className="bi bi-x-circle"></i></label>
          <input onClick={() => setStatus('needsEditing')} type="radio" className="btn-check" name="status" id="needsEditing" required/>
          <label className="btn btn-warning" htmlFor="needsEditing"><i className="bi bi-arrow-return-left"></i></label>
          <button className="btn btn-outline-secondary" type="submit">Senden</button>
        </div>
      </form>
      </>
    }
    </>
  )
}