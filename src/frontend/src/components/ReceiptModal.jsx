import Modal from 'react-bootstrap/Modal';

export default function ReceiptModal({show, onHide, receipt}){
console.log('values', receipt);
const base64String = btoa(String.fromCharCode(...new Uint8Array(receipt)));
console.log('base64String', base64String);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
      <img src={`data:image/png;base64,${base64String}`}/>
      </Modal.Body>
    </Modal>
  );
}