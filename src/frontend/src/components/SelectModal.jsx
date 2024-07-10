import Modal from 'react-bootstrap/Modal';

export default function SelectModal({ show, onHide, onSubmit, type, values }) {
  return (
    <Modal show={show} onHide={onHide} className="w-100">
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <ul className="list-group">
            {
              values?.map((item) => (
                <>
                  <div className="form-check">
                    <input type={type === 'select' ? 'radio' : 'checkbox'} id={item._id + 'input'} name='results' value={item._id} className="form-check-input " />
                    <label htmlFor={item._id + 'input'} id={item._id + 'label'} >{item.countryName}{item.specialLocation && ` - ${item.specialLocation}`}</label>
                  </div>
                </>
              ))
            }
          </ul>
          <button className='btn btn-primary mt-2 form-control' onClick={onHide} type='submit'>OK</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}