import { Calendar } from 'react-multi-date-picker';
import Modal from 'react-bootstrap/Modal';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';

export default function DatePickerModal({show, onHide, onChange, type, minDate, maxDate}){

  function createCalender(type, minDate, maxDate){
    const props = {
      format: 'DD.MM.YYYY',
      className: 'rmdp-mobile',
      highlightToday: false,
      minDate,
      maxDate,
      onChange
    }
    if (type === 'multiDateSelect') {
      props.multiple = true;
      props.dateSeparator=", "
    }
    else if (type === 'dateTimeSelect'){
      props.format = 'DD.MM.YYYY HH:mm'
      props.plugins = [<TimePicker hideSeconds key="timePickerId" position="bottom"/>];
    }

    return (
      <Calendar {...props} required/>
    )
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <div className="d-flex justify-content-center">
        {createCalender(type, minDate, maxDate)}
        </div>
      </Modal.Body>
    </Modal>
  );
}