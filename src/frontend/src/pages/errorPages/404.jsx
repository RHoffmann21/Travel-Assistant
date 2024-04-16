import { Link } from 'react-router-dom';

export default function Error404() {
	return (
    <>
      <h1 className='align-items-center d-inline-flex display-4 justify-content-center'>
          404
      </h1>
      <h2>Seite nicht gefunden!</h2>
      <p>Zurück zur <Link to='/' replace="true" >Hauptseite</Link></p>
    </>
	);
}
