function ChatBubble({ side, content, isLast, onClick=undefined }) {
	return (
		<div className={side === 'question' ? 'question messages' : 'answer messages'} onClick={onClick ? onClick : undefined}>
			<div className={isLast ? 'message last' : 'message'}>
				{content}
			</div>
		</div>
	)
}

export default ChatBubble;