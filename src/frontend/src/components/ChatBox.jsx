import ChatBubble from './ChatBubble';
import { useState } from 'react';
import DatePickerModal from './DatePickerModal';
import SelectModal from './SelectModal';
import PictureModal from './PictureModal';
import EditModal from './EditModal';
import ReceiptModal from './ReceiptModal';

function ChatBox({ chat, setChat, nextQuestion, values, minDate, maxDate }) {
	const [showDatePickerModal, setShowDatePickerModal] = useState(false);
	const [showSelectModal, setShowSelectModal] = useState(false);
	const [formData, setFormData] = useState();
	const [showPictureModal, setShowPictureModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [target, setTarget] = useState();
	const [showReceiptModal, setShowReceiptModal] = useState(false);
	const [receipt, setReceipt] = useState();

	const splittedQuestionId = nextQuestion.questionId.split('.');
	const type = splittedQuestionId[2];

	const handleDatePickerChange = (date) => {

		const newFormData = {
			question: nextQuestion
		};
		if (date.length === 0) {
			newFormData.answer = {
				value: [],
				content: ''
			}
		} else if (date.length) {
			const dates = [];
			let content = ''
			date.forEach((selectedDate) => {
				dates.push(selectedDate.toDate());
				content = `${content} ${content && ', '}${selectedDate.toDate()}`

			})
			newFormData.answer = {
				value: dates,
				content: content
			}
		} else {
			newFormData.answer = {
				value: date.toDate(),
				content: date.format("DD.MM hh:mm")
			}
		}
		setFormData(newFormData);
	};

	const handleEdit = (event) => {
		setTarget(event.target)
		event.target && handleEditShow()
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
							<button className="btn" type="submit">Senden</button>
						</div>
					</form>
				</>
			)
		} else if (type === 'boolean') {
			return (
				<>
					<form onSubmit={handleAnswer}>
						<div className="input-group row">
							<div className="col-4 p-0">
								<input onClick={handleTrueBooleanChange} type="radio" className="btn-check w-100" name="boolean" id="true" required />
								<label className="btn btn-secondary w-100" htmlFor="true">Ja</label>
							</div>
							<div className="col-4 p-0">
								<input onClick={handleFalseBooleanChange} type="radio" className="btn-check w-100" name="boolean" id="false" required />
								<label className="btn btn-secondary w-100" htmlFor="false">Nein</label>
							</div>
							<div className="col-2">
							<button className="btn col-2 w-100" type="submit">Senden</button>
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
			<div className="chat">
				{
					chat?.map(interaction => (
						<>
							<ChatBubble side={'question'} content={interaction.question.content} key={`${interaction.question.questionId}${interaction.answer.content}`} isLast={true} />
							<ChatBubble side={'answer'} content={interaction.answer.content.toString()} key={`${interaction.answer.content}${interaction.question.questionId}`} isLast={interaction.answer.receipt ? false : true} onClick={interaction.question.editable ? handleEdit : ''} />
							{interaction.answer.receipt && <ChatBubble side={'answer'} content={<i className="bi bi-file-earmark-image"></i>} key={interaction.answer.receipt._id} isLast={true} onClick={() => handleViewReceipt(interaction.answer.receipt.receipt)} />}
						</>
					))
				}
				{
					nextQuestion && <ChatBubble side={'question'} content={nextQuestion.content} />
				}
			</div>
			{inputGenerator(type, values)}
			<DatePickerModal show={showDatePickerModal} onHide={handleDatePickerClose} onChange={handleDatePickerChange} type={type} minDate={minDate} maxDate={maxDate} />
			<SelectModal show={showSelectModal} onHide={handleSelectClose} onSubmit={handleSelectOnSubmit} type={type} values={values} />
			<PictureModal show={showPictureModal} onHide={handlePictureClose} onChange={handleCapturedPicture} />
			<EditModal show={showEditModal} onHide={handleEditClose} target={target} />
			<ReceiptModal show={showReceiptModal} onHide={handleReceiptClose} receipt={receipt} />
		</>
	)
}

export default ChatBox;
