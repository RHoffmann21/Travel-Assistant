// import Emoji from 'bootstrap-icons/icons/emoji-expressionless.svg';
import { Link } from 'react-router-dom';

export default function Error404() {
	return (
    <>
      <h1 className='align-items-center d-inline-flex display-4 justify-content-center'>
          4
          <span /*className='visually-hidden'*/>0</span>
          {/* <div aria-hidden='true' className='d-inline-flex flex-column position-relative mx-2'> */}
            {/* <Emoji focusable='false' aria-hidden /> */}
          {/* </div> */}
          4
      </h1>
      <h2>Seite nicht gefunden!</h2>
      <p>Zurück zur <Link to='/' replace="true" >Hauptseite</Link></p>
    </>
	);
}
