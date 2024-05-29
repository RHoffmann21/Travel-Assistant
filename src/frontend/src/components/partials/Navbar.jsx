import dtsLogo from '../../../public/default-logo.svg';
import { Link } from 'react-router-dom';
import AuthProvider from '../../auth/AuthProvider';
import { useContext } from 'react';

function Navbar() {
  const { auth: { user } } = useContext(AuthProvider);
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={dtsLogo} alt="DTS" height="50" width="50" />
        </a>
        {user && <Link to={'/travelExpenseReports'}>Erstellen</Link>}
        {(user && user.isSupervisor) && <Link to={'/travelExpenseReports/validate'}>Validieren</Link>}
        {(user && user.isAuditor) && <Link to={'/travelExpenseReports/audit'}>Prüfen</Link>}
        {!user && <a href="/api/auth/login">Login</a> }
        {
          user && 
          <>
            <a className="nav-link py-0 dropdown-toggle d-flex align-items-center" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src={user.picture && user.picture} height="50" width="50" className="rounded-circle img-fluid" alt={user.userFirstName[0].concat(user.userName[0])} />
            </a>
            <div className="dropdown-menu shadow px-2 m-2 row" aria-labelledby="accountDropdown" role="menu" aria-hidden="false">
              <div className="bg-light rounded mb-2 p-3">
                <strong className="fs-6">
                  {user.userFirstName} {user.userName}
                </strong>
                <p className="mb-0">{user.userEmail}</p>
              </div>
              <hr className="dropdown-divider my-2 mx-1" role="separator" />
              <a href="/api/auth/logout" role="menuitem" className="d-flex align-items-center text-decoration-none p-2 px-3 dropdown-item"><i className="me-2 fs-5 bi bi-box-arrow-right"></i>Abmelden</a>
            </div>
          </>
        }

      </div>
    </nav>
  )
}

export default Navbar;