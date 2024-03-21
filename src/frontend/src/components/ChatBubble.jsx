function ChatBubble({ side, type, content }) {
	return (
		<div className={side === 'question' ? 'question messages' : 'answer messages'} >
			<div className="message last">
				{type === 'text' ? answerGenerator(type, content) : answerGenerator(type, content)}
			</div>
		</div>
	)
}

function answerGenerator (type, content) {
	if (type === 'text') {
		return (
			<>
				{content}
			</>
		)
	} else if (type === 'datePicker') {
		return (
			<>
				{content}
			</>
		) 
	}
}

export default ChatBubble;