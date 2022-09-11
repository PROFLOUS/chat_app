import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import bn3 from "../images/bn3.jpg";
import bn2 from "../images/bn2.jpg";
import bn1 from "../images/bn1.jpg";
export const arrIconOption = [
  {
    id: "iconOption1",
    name: "Tin nhắn",
    icon: <BiMessageRoundedDetail className="icon" />,
  },
  {
    id: "iconOption2",
    name: "Danh bạ",
    icon: <RiContactsBook2Line className="icon" />,
  },
  {
    id: "iconOption3",
    name: "To-do",
    icon: <AiOutlineCheckSquare className="icon" />,
  },
];

export const silderData = [
  {
    id: "slider01",
    img: bn3,
    title: "tin nhăn tự xóa",
    content: "từ giờ tin nhắn có thể tự xóa theo thời gian nhất định",
  },
  {
    id: "slider02",
    img: bn2,
    title: "trải nhiệm xuyên suốt",
    content: "mọi dữ liệu sẽ được đồng bộ",
  },
  {
    id: "slider03",
    img: bn1,
    title: "Gọi nhóm và làm việc hiệu quả với video zalo call",
    content: "trao đổi công việc mọi lúc mọi nơi",
  },
];
