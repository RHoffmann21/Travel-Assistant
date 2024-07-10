import Navbar from './partials/Navbar';
import Footer from './partials/Footer';

export default function MainFrame (props) {
  return (
    <>
      <Navbar/>
      <div className="row justify-content-center">
        <div>
          {props.children}
        </div>
      </div>
      <Footer/>
    </>
  )
}
