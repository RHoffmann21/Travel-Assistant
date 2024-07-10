import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import util from '../utils/util';
import ReceiptModal from '../components/ReceiptModal';

export default function ReportsOverview({type}) {
  const { travelExpenseReportId } = useParams();
  const [ travelExpenseReport, setTravelExpenseReport ] = useState();
  const [ formData, setFormData ] = useState();
  const [ status, setStatus ] = useState();
  const [showReceiptModal, setShowReceiptModal] = useState(false);
	const [receipt, setReceipt] = useState();

  useEffect(() => {
    getTravelExpenseReport();
  }, []);

  function handleViewReceipt(receipt) {
		setReceipt(receipt);
		handleReceiptShow();
	}

	const handleReceiptShow = () => setShowReceiptModal(true);
	const handleReceiptClose = () => setShowReceiptModal(false);

  function sumProps(array, prop) {
    const props = prop.split('.');
    let sum = 0;
    if(props.length === 2){
      return Math.round(array.reduce((accumulator, currentValue) =>  accumulator + currentValue[props[0]][props[1]], sum) * 100) / 100;
    } else if(props.length === 1) {
      return Math.round(array.reduce((accumulator, currentValue) => accumulator + currentValue[prop], sum) * 100) / 100;
    }
  }

  async function getTravelExpenseReport(){
    try {
      const response = await axios.get(`/api/v1/travelExpenseReports/${travelExpenseReportId}`);
      if (response.status === 200) {
        response.data.dates.sort((a, b) => new Date(a.date) - new Date(b.date));
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
    // event.preventDefault();

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

  return (
    <>{
      travelExpenseReport &&
      <>
      <h3>{travelExpenseReport.user.userFirstName} {travelExpenseReport.user.userName} {util.getMonth(travelExpenseReport.month)} {travelExpenseReport.year}</h3>
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
            <th scope="col">KM-geld</th>
            <th scope="col">P. Über- nachtung</th>
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
            <td>{date?.destination.countryName}{date?.destination.specialLocation && ` - ${date?.destination.specialLocation}`}</td>
            <td>{date?.allowance}€</td>
            <td>{date?.mealDeduction}€</td>
            <td onClick={(date?.flight?.receipt) ? () => handleViewReceipt(date?.flight?.receipt) : undefined}>{date?.flight?.cost}€</td>
            <td onClick={(date?.busTrain?.receipt) ? () => handleViewReceipt(date?.busTrain?.receipt) : undefined}>{date?.busTrain?.cost}€</td>
            <td onClick={(date?.cab?.receipt) ? () => handleViewReceipt(date?.cab?.receipt) : undefined}>{date?.cab?.cost}€</td>
            <td>{date?.privateCarTransportation?.mileageAllowance}€</td>
            <td>{date?.privateOvernightCost}€</td>
            <td onClick={(date?.hotelCost?.receipt) ? () => handleViewReceipt(date?.hotelCost?.receipt) : undefined}>{date?.hotelCost?.cost}€</td>
            <td onClick={(date?.catering?.receipt) ? () => handleViewReceipt(date?.catering?.receipt) : undefined}>{date?.catering?.cost}€</td>
            <td onClick={(date?.tip?.receipt) ? () => handleViewReceipt(date?.tip?.receipt) : undefined}>{date?.tip?.cost}€</td>
            <td onClick={(date?.other?.receipt) ? () => handleViewReceipt(date?.other?.receipt) : undefined}>{date?.other?.cost}€</td>
            <td>{date?.overallCost}€</td>
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
      <ReceiptModal show={showReceiptModal} onHide={handleReceiptClose} receipt={receipt} />
      </>
    }
    </>
  )
}