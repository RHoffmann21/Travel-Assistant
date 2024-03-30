import ChatBubble from "./ChatBubble";
import { useEffect, useState } from "react";

function ChatBox(props) {

  
// const [nextQuestion, setNextQuestion] = useState(false)
// const [answer, setAnswer] = useState();
// const travelExpenseReport = 0;

// useEffect(() => {
//   function const sendAnswer = async () => {
//     fetch(`http://localhost:5000/api/v1/travelExpenseReport/${travelExpenseReport}/chat`,{
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: 'React POST Request Example' })
//     })
//     .then(response => {
//       setAnswer(response.date); 
//     })
//   }
// }, [answer]);

// useEffect(() => {
//   function const sendAnswer = async () => {
//     fetch(`http://localhost:5000/api/v1/travelExpenseReport/${travelExpenseReport}/chat`,{
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: 'React POST Request Example' })
//     })
//     .then(response => {
//       setNextQuestion(response.date); 
//     })
//   }
// }, [answer]);



function chatInput(type, recieptNeeded) {
	return (
    <>
      { inputGenerator(type, recieptNeeded) }
    </>
	)
}

function getRecieptGenerator(recieptNeeded){
  return recieptNeeded ? <button className="btn btn-outline-secondary" type="button"><i className="bi bi-camera"></i></button> : ''
}

function inputGenerator (type, recieptNeeded) {
	if (type === 'string') {
		return (
			<>
				<div className="input-group">
          { getRecieptGenerator(recieptNeeded) }
          <input type="text" className="form-control"/>
          <button className="btn btn-outline-secondary" type="button">Senden</button>
        </div>
			</>
		)
	}else if (type === 'currency') {
		return (
			<>
				<div className="input-group">
          { getRecieptGenerator(recieptNeeded) }
          <input type="number" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <span className="input-group-text" id="basic-addon2">€</span>
          <button className="btn" type="button">Senden</button>
        </div>

			</>
		) 
	}else if (type === 'km') {
		return (
			<>
				<div className="input-group">
          { getRecieptGenerator(recieptNeeded) }
          <input type="number" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <span className="input-group-text" id="basic-addon2">KM</span>
          <button className="btn" type="button">Senden</button>
        </div>

			</>
		) 
	} else if (type === 'dateSelect') {
		return (
			<>
				{}
			</>
		) 
	} else if (type === 'multiDateSelect'){
    return (
			<>
				{}
			</>
    )
	} else if (type === 'dateTimeSelect'){
    return (
			<>
				{}
			</>
    )
	} else if (type === 'select'){
    return (
			<>
				{}
			</>
    )
	} else if (type === 'none'){
    return (
			<>
				{}
			</>
    )
  } else {
    throw new Error('no recognized type')
  }
}
















  return (
    <div className="chat">
      {props.conversation.map(bubbleInformation => ChatBubble(bubbleInformation))}
      {chatInput('string', false)}
    </div>
  )
}







export default ChatBox;