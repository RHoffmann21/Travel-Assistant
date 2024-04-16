import { Link } from 'react-router-dom';

export default function Error403() {
	return (
    <>
      <h1 className='align-items-center d-inline-flex display-4 justify-content-center'>
          403
      </h1>
      <h2>Kein Zugriff auf diese Seite!</h2>
      <p>Zurück zur <Link to='/' replace="true" >Hauptseite</Link></p>
    </>
	);
}
