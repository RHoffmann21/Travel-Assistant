function ChatBubble({ side, content }) {
	console.log('content',content);
	return (
		<div className={side === 'question' ? 'question messages' : 'answer messages'} >
			<div className="message last">
				{content}
			</div>
		</div>
	)
}

export default ChatBubble;