import "./NewMessageForm.scss";
import { MdInsertEmoticon } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { GrImage } from "react-icons/gr";

const NewMessageForm = () => {
  return (
    <div className="new_message">
      <form>
        <input type="text" placeholder="Nhập @, để nhắn tới Phan Đình Phương" />
        <span style={{ color: "#333", fontSize: "20px" }} title="Gửi hình ảnh">
          <GrImage />
        </span>
        <span style={{ color: "#333" }} title="Biểu cảm">
          <MdInsertEmoticon />
        </span>
        <span title="Gửi nhanh cảm xúc">
          <FcLike />
        </span>
      </form>
    </div>
  );
};

export default NewMessageForm;
