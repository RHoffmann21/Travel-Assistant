import ChatBubble from "./ChatBubble";
import { useEffect, useState } from "react";
import axios from 'axios';

function ChatBox({chat, setChat, nextQuestion, setNextQuestion}) {

	const handleAnswer = async (event) => {
    event.preventDefault();
		// setChat(event.)

    // try {
    //   const response = await axios.post('/api/v1/travelExpenseReports/create', formData);
    //   if (response.status === 200) {
    //     setTravelExpenseReportId(response.data._id);
    //   } else {
    //     console.error('Error submitting form data');
    //   }
    // } catch (error) {
    //   console.error('Network error:', error);
    // }
  };

	function chatInput(questionId) {
		return (
			<>
				{ inputGenerator(questionId) }
			</>
		)
	}

function inputGenerator (questionId) {
	const [ bubbleType, answerAttribute, type ] = questionId.split('.');

	if (type === 'string') {
		return (
			<>
				<div className="input-group">
          <input type="text" className="form-control"/>
          <button className="btn btn-outline-secondary" type="button">Senden</button>
        </div>
			</>
		)
	}else if (type === 'currency') {
		return (
			<>
				<form onSubmit={handleAnswer}>
					<div className="input-group">
						<button className="btn btn-outline-secondary" type="button"><i className="bi bi-camera"></i></button>
						<input type="number" step=".01" inputMode="numeric" className="form-control" aria-describedby="basic-addon2"/>
						<span className="input-group-text" id="basic-addon2">€</span>
						<button className="btn" type="subbmit">Senden</button>
					</div>
				</form>
			</>
		) 
	}else if (type === 'km') {
		return (
			<>
				<div className="input-group">
          <input type="number" className="form-control" aria-describedby="basic-addon2"/>
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
	}else if (type === 'boolean'){
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
      {/* {
				typeof (chat) !== 'undefined' && chat?.map(interaction => {
					ChatBubble('question', interaction.question.content);
					ChatBubble('answer', interaction.answer);
				})
			} */}
			{
				nextQuestion && console.log('nextQuestion.content',nextQuestion)
			}
			{
				nextQuestion && <ChatBubble side={'question'} content={nextQuestion.content} />
			}
      { chatInput(nextQuestion.questionId) }
    </div>
  )
}

export default ChatBox;
