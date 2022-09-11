import * as React from "react";
import Avatar from "@mui/material/Avatar";
import avt from "../../images/av.jpg";
import "./UserSearchCardStyle.scss";
import "./ChatCardStyle.scss";
const UserSearchCard = ({ u }) => {
  //delete user out the history search
  const handleCancel = () => {};

  //click -> chat
  const handleChat = () => {};
  return (
    <div className="card_chat">
      <div
        className="card_group"
        style={{ alignItems: "normal" }}
        onClick={() => handleChat()}
      >
        {u?.avatar ? (
          <Avatar className="avatar" src={u?.avatar} alt={u?.first_name} />
        ) : (
          <Avatar
            className="avatar"
            style={{ textTransform: "capitalize" }}
            src={u?.avatar}
          >
            {u?.last_name[0]}
          </Avatar>
        )}

        <div className="card_name" style={{ marginLeft: "0" }}>
          <p style={{ textTransform: "capitalize" }}>
            {u?.last_name + " " + u?.first_name}
          </p>
        </div>
      </div>
      <div className="cancel_icon" onClick={() => handleCancel()}>
        x
      </div>
    </div>
  );
};

export default UserSearchCard;
