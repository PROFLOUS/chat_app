import "./ChatHeaderStyle.scss";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";

const ChatHeader = () => {
  return (
    <div className="chat_header">
      <div className="chat_header-info">
        <Avatar
          className="avt"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <div className="info_text">
          <span className="info_name">phan dinh phuong</span>
          <span className="info_hour">truy cập 1 giờ trước</span>
        </div>
      </div>

      <div className="block_icon">
        <span className="icon" title="Cuộc gọi video">
          <BsCameraVideo />
        </span>
        <span className="icon" title="Thông tin hội thoại">
          <BsLayoutSidebarReverse />
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
