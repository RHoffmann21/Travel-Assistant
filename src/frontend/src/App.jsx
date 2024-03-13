import './App.css'
import './components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import ChatBox from './components/ChatBox';

const conversation = [
  {
    side: 'question',
    type: 'text',
    content: 'Wann hast du deine Reise angetreten?'
  }, {
    side: 'answer',
    type: 'text',
    content: '02.01.2024'
  },
  {
    side: 'question',
    type: 'text',
    content: 'Wann hast du deine Reise beendet?'
  },
  {
    side: 'answer',
    type: 'datePicker',
    content: '03.01.2024'
  }
]

function App() {

  return (
    <>
      <Navbar />
      <ChatBox conversation={conversation}></ChatBox>
      <Footer />
    </>
  )
}

export default App
