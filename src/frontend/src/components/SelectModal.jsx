import Modal from 'react-bootstrap/Modal';

export default function SelectModal({show, onHide, onSubmit, type, values}){
console.log('values', values);
  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {
            values?.map((item) => (
              <>
                <input type={ type === 'select' ? 'radio' : 'checkbox' } id={item._id + 'input'} name='results' value={item._id} />
                <label htmlFor={item._id + 'input'} id={item._id + 'label'} >{item.countryName}{item.specialLocation && `-${item.specialLocation}`}</label>
              </>
            ))
          }
          <button className='form-check-input' type='submit'>OK</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}