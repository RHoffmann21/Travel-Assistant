import ChatBubble from './ChatBubble';
import { useState, useEffect } from 'react';
import DatePickerModal from './DatePickerModal';
import SelectModal from './SelectModal';
import PictureModal from './PictureModal';
import EditModal from './EditModal';
import ReceiptModal from './ReceiptModal';

function ChatBox({ chat, setChat, nextQuestion, values, travelExpenseReport }) {
	const [showDatePickerModal, setShowDatePickerModal] = useState(false);
	const [showSelectModal, setShowSelectModal] = useState(false);
	const [formData, setFormData] = useState();
	const [showPictureModal, setShowPictureModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [target, setTarget] = useState();
	const [showReceiptModal, setShowReceiptModal] = useState(false);
	const [receipt, setReceipt] = useState();
	const [editType, setEditType] = useState();

	const splittedQuestionId = nextQuestion.questionId.split('.');
	const type = splittedQuestionId[2];

	function scrollToBottomOfChat () {
		const chat = document.getElementById("chat");
		chat.children[chat.children.length - 1].scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottomOfChat();
  }, [chat]);

	const handleDatePickerChange = (date) => {
		const newFormData = {
			question: nextQuestion
		};
		newFormData.answer = {
			value: [],
			content: ''
		}
		if (date) {
			
			date = !date.length ? [date] : date;
			date.forEach((selectedDate) => {
				newFormData.answer.value.push(selectedDate.toDate());
				if (nextQuestion.followingAnswerType === 'dateSelect') {
					newFormData.answer.content = selectedDate.format("DD.MM");
				} else if (nextQuestion.followingAnswerType === 'multiDateSelect') {
					newFormData.answer.content = (newFormData.answer.content) ? newFormData.answer.content.concat(', ', selectedDate.format("DD.MM")) : selectedDate.format("DD.MM");
				} else if(nextQuestion.followingAnswerType === 'dateTimeSelect'){
					newFormData.answer.content = selectedDate.format("DD.MM HH:mm");
				}
			});
		} 
		setFormData(newFormData);
	};

	const handleEdit = (event) => {
		const id = event.target.getAttribute("data-id");
		const type = chat[id].question.followingAnswerType;
		setTarget(id);
		setEditType(type);
		handleEditShow();
	};

	const handleTextFieldChange = (event) => {
		setFormData({
			answer: {
				value: event.target.value,
				content: event.target.value
			},
			question: nextQuestion
		});
	};

	const handleCurrencyFieldChange = (event) => {
		setFormData({
			answer: {
				value: event.target.value,
				content: `${event.target.value}€`,
				receipt: formData?.answer?.receipt && formData.answer.receipt
			},
			question: nextQuestion
		});
	};

	const handleKmFieldChange = (event) => {
		setFormData({
			answer: {
				value: event.target.value,
				content: `${event.target.value}km`
			},
			question: nextQuestion
		});
	};

	function handleViewReceipt(receipt) {
		setReceipt(receipt);
		handleReceiptShow();
	}

	const handleReceiptShow = () => setShowReceiptModal(true);
	const handleReceiptClose = () => setShowReceiptModal(false);

	const handleEditShow = () => setShowEditModal(true);
	const handleEditClose = () => setShowEditModal(false);

	const handlePictureShow = () => setShowPictureModal(true);
	const handlePictureClose = () => setShowPictureModal(false);

	const handleDatePickerShow = () => setShowDatePickerModal(true);
	const handleDatePickerClose = () => setShowDatePickerModal(false);

	const handleSelectShow = () => setShowSelectModal(true);
	const handleSelectClose = () => setShowSelectModal(false);
	const handleSelectOnSubmit = (event) => {
		event.preventDefault();
		let content = '';
		const results = [];
		for (const result of event.target.results) {
			if (result.checked) {
				content = `${content} ${content && ', '} ${result.labels[0].firstChild.wholeText}`;
				results.push(result.value);
			}
		}
		setFormData({
			answer: {
				value: results,
				content: content
			},
			question: nextQuestion
		});
	};

	const handleAnswer = async (event) => {
		event.preventDefault();
		setChat([...chat, formData]);
		setFormData();
	};

	const handleBoolean = (boolean) => {
		setFormData({
			answer: {
				value: boolean,
				content: boolean ? 'Ja' : 'Nein'
			},
			question: nextQuestion
		});
	}

	function handleCapturedPicture(dataUrl) {
		if (typeof (dataUrl) !== 'undefined') {
			setFormData({
				answer: {
					value: formData?.answer?.value,
					content: formData?.answer?.content,
					receipt: dataUrl
				},
				question: formData?.question,
			});
		}
	}

	const handleChatEdit = (event) =>  {
		event.preventDefault();
		const value = event.target[0].value;

		const answer = {
			value,
			receipt: chat[target].answer.receipt,
			content: value
		}
		if (chat[target].answer.content.endsWith('km')){
			answer.content = value.concat('km');
		} else if (chat[target].answer.content.endsWith('€')){
			answer.content = value.concat('€');
		}
		const updatedChat = [...chat];
		updatedChat[target].answer = answer;
		setChat(updatedChat);
		setShowEditModal(false);
	}

	const handleTrueBooleanChange = () => handleBoolean(true);
	const handleFalseBooleanChange = () => handleBoolean(false);

	function inputGenerator(type) {
		if (type === 'string') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<input type="text" className="form-control" onChange={handleTextFieldChange} required />
							<button className="btn btn-outline-secondary" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'currency') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<button onClick={handlePictureShow} className="btn btn-outline-secondary" type="button"><i className="bi bi-camera"></i></button>
							<input type="number" step=".01" onChange={handleCurrencyFieldChange} inputMode="numeric" className="form-control" required />
							<span className="input-group-text" id="basic-addon2">€</span>
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'km') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<input type="number" onChange={handleKmFieldChange} className="form-control" required />
							<span className="input-group-text" id="basic-addon2">KM</span>
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'dateSelect') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<button onClick={handleDatePickerShow} className="btn" type="button"><i className="bi bi-calendar-event"></i></button>
							<input type="text" className="form-control" value={typeof (formData) !== 'undefined' ? formData.answer.content.toString() : ''} disabled={true} required />
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'multiDateSelect') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<button onClick={handleDatePickerShow} className="btn" type="button"><i className="bi bi-calendar-event"></i></button>
							<input type="text" className="form-control" value={typeof (formData) !== 'undefined' ? formData.answer.content.toString() : ''} disabled={true} required />
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'dateTimeSelect') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<button onClick={handleDatePickerShow} className="btn" type="button"><i className="bi bi-calendar-event"></i></button>
							<input type="text" className="form-control" value={typeof (formData) !== 'undefined' ? formData.answer.content.toString() : ''} disabled={true} required />
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'multiSelect' || type === 'select') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<button onClick={handleSelectShow} className="btn" type="button"><i className="bi bi-list-check"></i></button>
							<input type="text" className="form-control" value={typeof (formData) !== 'undefined' ? formData.answer.content.toString() : ''} disabled={true} required />
							<button className="btn btn-light" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'boolean') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="row input-group">
							<div className="col-6">
								<button onClick={handleTrueBooleanChange} type="submit" className="btn btn-success w-100 mx-4">Ja</button>
							</div>
							<div className="col-6">
								<button onClick={handleFalseBooleanChange} type="submit" className="btn btn-danger w-100">Nein</button>
							</div>
						</div>
					</form>
				</>
			)
		} else if (type === 'none') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group">
							<input type="number" className="form-control" />
							<span className="input-group-text" id="basic-addon2">KM</span>
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else {
			throw new Error('no recognized type')
		}
	}
	return (
		<>
			<div id="chat" className="chat" style={{overflowY:"auto", height:"75vh"}}>
				{
					chat?.map((interaction, index) => (
						<>
							<ChatBubble side={'question'} content={interaction?.question?.content} key={`${index}-question`}/>
							<ChatBubble side={'answer'} content={interaction?.answer?.content.toString()} key={`${index}-answer`} bubbleId={index} isLast={interaction?.answer?.receipt || !interaction?.question?.followingAnswerType === 'currency'  ? false : true} onClick={interaction?.question?.editable ? handleEdit : undefined} />
							{interaction.answer.receipt && <ChatBubble side={'answer'} content={<i className="bi bi-file-earmark-image"></i>} key={`${index}-receipt`} isLast={true} onClick={() => handleViewReceipt(interaction.answer.receipt)} />}
						</>
					))
				}
				{
					nextQuestion && <ChatBubble side={'question'} content={nextQuestion.content} key={'newQuestion'} />
				}
			</div>
			{inputGenerator(type, values)}
			<DatePickerModal show={showDatePickerModal} onHide={handleDatePickerClose} onChange={handleDatePickerChange} type={type} travelExpenseReport={travelExpenseReport} />
			<SelectModal show={showSelectModal} onHide={handleSelectClose} onSubmit={handleSelectOnSubmit} type={type} values={values} />
			<PictureModal show={showPictureModal} onHide={handlePictureClose} onChange={handleCapturedPicture} />
			<EditModal show={showEditModal} onHide={handleEditClose} onSubmit={handleChatEdit} type={editType}/>
			<ReceiptModal show={showReceiptModal} onHide={handleReceiptClose} receipt={receipt} />
		</>
	)
}

export default ChatBox;
