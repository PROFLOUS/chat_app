import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { AiOutlineLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import avt from "../../images/av.jpg";
const Message = ({ me, type }) => {
  return (
    <div
      className="message"
      style={me ? { flexDirection: "row-reverse" } : null}
    >
      <Avatar
        className="avatar"
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
      />
      {type === "image" ? (
        <div className="messImg">
          <img src={avt} alt="image" />
        </div>
      ) : (
        <div className="message_text">
          <p className="textMess">
             buổi chiều tràn đầy năng lượng nhé ❤️
          </p>
          <p className="timeMess">13:33</p>
          <div className="icon_list">
            {/* <div className="icons_react">
            <span>
              {" "}
              <AiOutlineLike />
            </span>
            <span>
              <FcLike />
            </span>
          </div> */}
            <span className="icon_react">
              <AiOutlineLike />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
