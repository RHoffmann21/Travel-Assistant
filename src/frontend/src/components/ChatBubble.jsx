function ChatBubble({ side, content, isLast=true, onClick=undefined, bubbleId}) {
	return (
		<div className={side === 'question' ? 'question messages' : 'answer messages'}>
			<div className={isLast ? 'message last' : 'message'} onClick={onClick} data-id={bubbleId && bubbleId}>
				{content}
			</div>
		</div>
	)
}

export default ChatBubble;