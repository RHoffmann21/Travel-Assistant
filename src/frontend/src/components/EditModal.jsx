import Modal from 'react-bootstrap/Modal';

export default function SelectModal({show, onHide, onSubmit, type}){
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <input className='form-control' type={type==='string' ? 'text' : 'number'}></input>
          <button className='form-control btn' type='submit'>OK</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}