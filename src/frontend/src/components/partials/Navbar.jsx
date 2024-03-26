import dtsLogo from '../../assets/default-logo.svg';

function Navbar () {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={dtsLogo} alt="DTS" height="50" width="50"/>
                </a>
                <a className="nav-link py-0 dropdown-toggle d-flex align-items-center" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={dtsLogo} height="50" width="50" className="rounded-circle img-fluid" alt="RH"/>
                </a>
                <div className="dropdown-menu shadow px-2 m-2 row" aria-labelledby="accountDropdown" role="menu" aria-hidden="false">
                    <div className="bg-light rounded mb-2 p-3">
                        <strong className="fs-6">Ricardo Hoffmann</strong>
                        <p className="mb-0">ricardo.hoffmann@dts.de</p>
                    </div>
                    <hr className="dropdown-divider my-2 mx-1" role="separator"/>
                    <a href="/logout" role="menuitem" className="d-flex align-items-center text-decoration-none p-2 px-3 dropdown-item"><i className="me-2 fs-5 bi bi-box-arrow-right"></i>Abmelden</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;