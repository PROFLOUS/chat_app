import "./ChatFeedStyle.scss";
import ChatHeader from "./ChatHeader";
import NewMessageForm from "./NewMessageForm";
import Message from "./Message";
import Avatar from "@mui/material/Avatar";
import "./MessageStyle.scss";
import TimeLine from "./TimeLine";
const ChatFeed = () => {
  return (
    <div className="chat_feed">
      <ChatHeader />
      <div className="message_content">
        <div className="card_title">
          <div className="title_top">
            <Avatar
              className="avatar"
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <div className="topContent">
              <p>Peter Nguyen</p>
              <p>Hãy bắt đầu cùng nhau chia sẻ những...</p>
            </div>
          </div>
          <div className="title_image"></div>
        </div>
        <TimeLine />
        <Message />
        <Message me />

        <Message type="image" />
        <Message />
        <Message me />
        <Message me />
        <Message me />
        <Message me />
        <Message />
        <TimeLine />
        <Message />
        <Message me />
        <Message me />
      </div>
      <NewMessageForm />
    </div>
  );
};
export default ChatFeed;
