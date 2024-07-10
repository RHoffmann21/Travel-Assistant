import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReceiptModal({show, onHide, receipt}){
  const [ picture, setPicture] = useState();

  async function retrieveReceipt (receiptId) {
    if (typeof (receiptId) === 'undefined') return;
    try {
      const response = await axios.get(`/api/v1/receipt/${receiptId}`);
      if (response.status === 200) {
        setPicture(btoa(String.fromCharCode(...new Uint8Array(response.data.receipt.data))));
      } else {
        console.error('Error getting receipt');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  useEffect(() => {
    retrieveReceipt(receipt);
  }, [receipt]);

  return (
    <Modal show={show} onHide={onHide} className="modal-dialog-centered">
      <Modal.Body>
        <img src={`data:image/png;base64,${picture}`}/>
      </Modal.Body>
    </Modal>
  );
}