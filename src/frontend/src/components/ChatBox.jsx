import ChatBubble from "./ChatBubble";

function ChatBox(props) {
  return (
    <div className="main row">
      <div className="col-12">
        <div className="chat">
          {props.conversation.map(bubbleInformation => ChatBubble(bubbleInformation))}
        </div>
      </div>
    </div>
  )
}

export default ChatBox;