// import "./detail.css";
// import { auth, db } from "../../lib/firebase";
// import { useChatStore } from "../../lib/chatStore";
// import { useUserStore } from "../../lib/userStore";
// import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
// const detail = () => {
//   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
//     useChatStore();
//   const { currentUser } = useUserStore();
//   const handleBlock = async () => {
//     if (!user) return;

//     const userDocRef = doc(db, "users", currentUser.id);

//     try {
//       await updateDoc(userDocRef, {
//         blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//       });
//       changeBlock();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="detail">
//       <div className="user">
//         <img src={user?.avatar || "./avatar.png"} alt="" />
//         <h2>{user?.username}</h2>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, et.
//         </p>
//       </div>
//       <div className="info">
//         <div className="option">
//           <div className="title">
//             <span>Chat Settings</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Privacy & help</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Shared Photos</span>
//             <img src="./arrowDown.png" alt="" />
//           </div>
//           <div className="photos">
//             <div className="photoItem">
//               <div className="photodetail">
//                 <img src="./img.png" alt="" />
//                 <span>photo_2024_2.png</span>
//               </div>
//               <img src="./download.png" alt="" className="icon" />
//             </div>
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Shared Files</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <button onClick={handleBlock}>
//           {isCurrentUserBlocked
//             ? "You are Blocked"
//             : isReceiverBlocked
//             ? "User Blocked"
//             : "Block User"}
//         </button>
//         <button className="logout" onClick={() => auth.signOut()}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };
// export default detail;

//new code

import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  // State to manage dropdown visibility
  const [showChatSettings, setShowChatSettings] = useState(false);
  const [showPrivacyHelp, setShowPrivacyHelp] = useState(false);
  const [showSharedPhotos, setShowSharedPhotos] = useState(false);
  const [showSharedFiles, setShowSharedFiles] = useState(false);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
      </div>
      <div className="info">
        {/* Chat Settings Dropdown */}
        <div
          className="option"
          onClick={() => setShowChatSettings((prev) => !prev)}
        >
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          {showChatSettings && (
            <div className="dropdown-content">
              {/* Add chat settings features here */}
              <p>Notification Settings</p>
              <p>Mute Notifications</p>
              <p>Clear Chat History</p>
            </div>
          )}
        </div>

        {/* Privacy & Help Dropdown */}
        <div
          className="option"
          onClick={() => setShowPrivacyHelp((prev) => !prev)}
        >
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          {showPrivacyHelp && (
            <div className="dropdown-content">
              {/* Add privacy and help features here */}
              <p>Privacy Policy</p>
              <p>Report a Problem</p>
              <p>Help Center</p>
            </div>
          )}
        </div>

        {/* Shared Photos Dropdown */}
        <div
          className="option"
          onClick={() => setShowSharedPhotos((prev) => !prev)}
        >
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          {showSharedPhotos && (
            <div className="photos">
              {/* Add shared photos display here */}
              {/* Example photo item */}
              {[...Array(5)].map((_, index) => (
                <div key={index} className="photoItem">
                  <div className="photodetail">
                    <img
                      src={`./img_${index + 1}.png`}
                      alt={`photo_${index + 1}`}
                    />
                    <span>photo_{index + 1}.png</span>
                  </div>
                  <img src="./download.png" alt="" className="icon" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shared Files Dropdown */}
        <div
          className="option"
          onClick={() => setShowSharedFiles((prev) => !prev)}
        >
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          {showSharedFiles && (
            <div className="files">
              {/* Add shared files display here */}
              {[...Array(3)].map((_, index) => (
                <div key={index} className="fileItem">
                  <span>file_{index + 1}.pdf</span>
                  <img src="./download.png" alt="" className="icon" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Block User Button */}
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>

        {/* Logout Button */}
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
