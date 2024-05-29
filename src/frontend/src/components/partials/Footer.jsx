function Footer () {
  return ( 
      <footer className="footer px-5 py-2 mt-auto container-fluid text-center">
          <p className="small mb-0 text-muted d-inline-block">
              <span className="">© <span>{(new Date()).getFullYear()}</span> <a href="https://www.dts.de/de/impressum">DTS Systeme GmbH</a></span>

              <a href="https://www.dts.de/de/agb" className="d-none text-nowrap d-inline-block mx-2" target="_blank" rel="noopener noreferrer">Allgemeine Geschäftsbedingungen</a>
              <a href="https://www.dts.de/de/datenschutz" className="text-nowrap d-inline-block mx-2" target="_blank" rel="noopener noreferrer">Datenschutz</a>
              <a href="https://www.dts.de/de/datenschutzhinweise" className="text-nowrap d-inline-block mx-2" target="_blank" rel="noopener noreferrer">Datenschutzhinweise</a>
              <span className="mx-2">Version 0.9</span>
          </p>
      </footer>
  )
}

export default Footer;
