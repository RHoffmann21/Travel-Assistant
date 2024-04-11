import { Calendar } from "react-multi-date-picker";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import axios from 'axios';
import { useStatem, useEffect } from 'react';


export default function DatePickerModal({show, onHide, type, isMulti, minDate, maxDate}){
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    try {
      if (type === 'month'){
        response = await axios.post('loclhost:5000/api/v1/travelExpenseReports/create', formData);
      } else {
        response = await axios.post('loclhost:5000/api/v1/travelExpenseReports/create', formData);
      }

      if (response.status === 200) {
        setSubmitted(response.body.id);
      } else {
        console.error('Error creating travel expense report');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function createCalender(type, isMulti, minDate, maxDate){
    //type: single, range, month oder dateTime
    const props = {
      format: 'DD.MM.YYYY',
      className: 'rmdp-mobile',
      highlightToday: false,
      multiple: isMulti,
      minDate,
      maxDate
    }
    if (type === 'month'){
      props.onlyMonthPicker = true;
      props.format = 'MMMM YYYY';
      props.hideMonth = true;
    }
    else if (type === 'range') {
      props.range = true;
      props.rangeHover = true;
    }
    else if (type === 'dateTime'){
      props.format = 'DD.MM.YYYY HH:mm'
      props.plugins = [<TimePicker position='bottom' />];
    }

    return (
      <Calendar {...props} />
    )
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        {createCalender(type, isMulti, minDate, maxDate)}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}