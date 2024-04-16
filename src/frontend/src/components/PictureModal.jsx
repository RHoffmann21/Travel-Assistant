import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';

export default function PictureModal({show, onHide, onChange}){
  const playerRef = useRef();

  const initializeMedia = async () => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      playerRef.current.srcObject = stream;
    } catch (error) {
      console.error('Fehler beim Zugriff auf die Kamera:', error);
    }
  };

  const capturePicture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    context.drawImage(
      playerRef.current,
      0,
      0,
      canvas.width,
      canvas.height
    );

    playerRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });
    onChange(canvas.toDataURL())
  };


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>  
      <video ref={playerRef} autoPlay />
      <button onClick={initializeMedia}>Kamera starten</button>
      <button onClick={capturePicture}>Foto aufnehmen</button>
      </Modal.Body>
    </Modal>
  );
}