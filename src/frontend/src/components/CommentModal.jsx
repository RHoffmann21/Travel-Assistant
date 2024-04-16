import Modal from 'react-bootstrap/Modal';

export default function CommentModal({show, onHide, comment}){
  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Body>
        <Modal.Title>
          Kommentar
        </Modal.Title>
        Zu dieser Reisekostenabrechnung wurde folgendes kommentiert:
        <p>{comment}</p>
      </Modal.Body>
    </Modal>
  );
}