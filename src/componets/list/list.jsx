import "./list.css";
import Chatlist from "./chatlist/chatlist";
import Userinfo from "./userinfo/userinfo";
const list = () => {
  return (
    <div className="list">
      <Userinfo />
      <Chatlist />
    </div>
  );
};
export default list;
