import Navbar from './partials/Navbar';
import Footer from './partials/Footer';

export default function MainFrame (props) {
  return (
    <>
      <Navbar/>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-11 col-md-10">
          {props.children}
        </div>
      </div>
      <Footer/>
    </>
  )
}
