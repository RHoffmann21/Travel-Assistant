import Modal from 'react-bootstrap/Modal';

export default function SelectModal({show, onHide, onSubmit, target}){
  return (
    <Modal show={show} onHide={onHide} className="modal-dialog modal-dialog-centered" scrollable>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {target}
          <button className='form-check-input' type='submit'>OK</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}