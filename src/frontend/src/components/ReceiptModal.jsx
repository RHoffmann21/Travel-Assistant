import Modal from 'react-bootstrap/Modal';

export default function ReceiptModal({show, onHide, receipt}){
const base64String = btoa(String.fromCharCode(...new Uint8Array(receipt?.data)));
  return (
    <Modal show={show} onHide={onHide} className="modal-dialog modal-dialog-centered">
      <Modal.Body>
      <img src={`data:image/png;base64,${base64String}`}/>
      </Modal.Body>
    </Modal>
  );
}