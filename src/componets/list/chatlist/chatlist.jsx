// import { useEffect, useState } from "react";
// import "./chatlist.css";
// import Adduser from "./adduser/adduser";
// import { useUserStore } from "../../../lib/userStore";
// import { db } from "../../../lib/firebase";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import { useChatStore } from "../../../lib/chatStore";
// import chat from "../../chat/chat";

// // const chatlist = () => {

// //   const [chats, setChats] = useState([]);

// //   const [addmode, setaddmode] = useState(false);

// //   const { currentUser } = useUserStore();
// //   useEffect(() => {
// //     const unSub = onSnapshot(
// //       doc(db, "userchats", currentUser.id),
// //       async (res) => {
// //         const items = res.data().chats;

// //         const promises = items.map(async (item) => {
// //           const userDocRef = doc(db, "users", item.receiverId);
// //           const userDocSnap = await getDoc(userDocRef);

// //           const user = userDocRef.data();

// //           return { ...item, user };
// //         });
// //         const chatData = await Promise.all(promises);
// //         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
// //       }
// //     );
// //     return () => {
// //       unSub();
// //     };
// //   }, [currentUser.id]);

// //   return (
// //     <div className="chatlist">
// //       <div className="search">
// //         <div className="searchbar">
// //           <img src="./search.png" alt="" />
// //           <input type="text" placeholder="search" />
// //         </div>
// //         <img
// //           src={addmode ? "./minus.png" : "./plus.png"}
// //           alt=""
// //           className="add"
// //           onClick={() => setaddmode((prev) => !prev)}
// //         />
// //       </div>
// //       {chats.map((chat) => (
// //         <div className="item">
// //           <img src="./avatar.png" alt="" />
// //           <div className="texts">
// //             <span>john deo</span>
// //             <p>{chat.lastMessage}</p>
// //           </div>
// //         </div>
// //       ))}

// //       {addmode && <Adduser />}
// //     </div>
// //   );
// // };

// // export default chatlist;

// const chatlist = () => {
//   const [chats, setChats] = useState([]);
//   const [addmode, setaddmode] = useState(false);
//   const { currentUser } = useUserStore();
//   const { chatId, changeChat } = useChatStore();

//   useEffect(() => {
//     const unSub = onSnapshot(
//       doc(db, "userchats", currentUser.id),
//       async (res) => {
//         const items = res.data().chats;
//         console.log(data); // Check what data contains
//         const promises = items.map(async (item) => {
//           const userDocRef = doc(db, "users", item.receiverId);
//           const userDocSnap = await getDoc(userDocRef); // Fetch the document snapshot

//           // Ensure that the document exists before accessing data
//           if (userDocSnap.exists()) {
//             const user = userDocSnap.data(); // Access data from the snapshot
//             return { ...item, user };
//           } else {
//             console.log("No such user document!");
//             return { ...item, user: null }; // Handle case where user does not exist
//           }
//         });

//         const chatData = await Promise.all(promises);
//         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       }
//     );

//     return () => {
//       unSub();
//     };
//   }, [currentUser.id]);

//   const handleSelect = async (chat) => {
//     const userChats = chats.map((item) => {
//       const { user, ...rest } = item;
//       return rest;
//     });

//     const chatIndex = usrChats.findIndex((item) => item.chatId === chat.chatid);

//     userChats[chatIndex].isSeen = true;

//     const userChatsRef = doc(db, "userchats", currentUser.id);

//     try {
//       await updateDoc(userChatsRef, {
//         chats: userChats,
//       });
//       changeChat(chat.chatId, chat.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="chatlist">
//       <div className="search">
//         <div className="searchbar">
//           <img src="./search.png" alt="" />
//           <input type="text" placeholder="search" />
//         </div>
//         <img
//           src={addmode ? "./minus.png" : "./plus.png"}
//           alt=""
//           className="add"
//           onClick={() => setaddmode((prev) => !prev)}
//         />
//       </div>
//       {chats.map((chat) => (
//         <div
//           className="item"
//           key={chat.chatId}
//           onClick={() => handleSelect(chat)}
//           style={{ backgroundcolor: chat?.isSeen ? "transparent" : "#5183fe" }}
//         >
//           <img src={chat.user.avatar || "./avatar.png"} alt="" />
//           <div className="texts">
//             <span>{chat.user ? chat.user.username : "Unknown User"}</span>
//             <p>{chat.lastMessage}</p>
//           </div>
//         </div>
//       ))}

//       {addmode && <Adduser />}
//     </div>
//   );
// };

// export default chatlist;

// new code

// import { useEffect, useState } from "react";
// import "./chatlist.css";
// import Adduser from "./adduser/adduser";
// import { useUserStore } from "../../../lib/userStore";
// import { db } from "../../../lib/firebase";
// import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
// import { useChatStore } from "../../../lib/chatStore";

// const ChatList = () => {
//   const [chats, setChats] = useState([]);
//   const [addMode, setAddMode] = useState(false);
//   const [input, setInput] = useState("");

//   const { currentUser } = useUserStore();
//   const { chatId, changeChat } = useChatStore();

//   useEffect(() => {
//     const unSub = onSnapshot(
//       doc(db, "userchats", currentUser.id),
//       async (res) => {
//         const items = res.data().chats;

//         const promises = items.map(async (item) => {
//           const userDocRef = doc(db, "users", item.receiverId);
//           const userDocSnap = await getDoc(userDocRef);

//           // Ensure that the user document exists before accessing data
//           if (userDocSnap.exists()) {
//             const user = userDocSnap.data();
//             return { ...item, user };
//           } else {
//             console.log("No such user document!");
//             return { ...item, user: null }; // Handle case where user does not exist
//           }
//         });

//         const chatData = await Promise.all(promises);
//         setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
//       }
//     );

//     return () => {
//       unSub();
//     };
//   }, [currentUser.id]);

//   const handleSelect = async (chat) => {
//     // Create a copy of chats with the rest of the object except user data
//     const userChats = chats.map((item) => {
//       const { user, ...rest } = item;
//       return rest;
//     });

//     // Find the chatIndex where the chatId matches
//     const chatIndex = userChats.findIndex(
//       (item) => item.chatId === chat.chatId
//     );

//     // Mark the selected chat as seen
//     if (chatIndex !== -1) {
//       userChats[chatIndex].isSeen = true;

//       const userChatsRef = doc(db, "userchats", currentUser.id);

//       try {
//         // Update the user chats in Firestore
//         await updateDoc(userChatsRef, {
//           chats: userChats,
//         });

//         // Change the active chat
//         changeChat(chat.chatId, chat.user);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   const filterChats = chats.filter((c) =>
//     c.user.username.toLowerCase().includes(input.toLocaleLowerCase())
//   );

//   return (
//     <div className="chatlist">
//       <div className="search">
//         <div className="searchbar">
//           <img src="./search.png" alt="" />
//           <input
//             type="text"
//             placeholder="search"
//             onChange={(e) => setInput(e.target.value)}
//           />
//         </div>
//         <img
//           src={addMode ? "./minus.png" : "./plus.png"}
//           alt=""
//           className="add"
//           onClick={() => setAddMode((prev) => !prev)}
//         />
//       </div>

//       {filterChats.map((chat) => (
//         <div
//           className="item"
//           key={chat.chatId}
//           onClick={() => handleSelect(chat)}
//           style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
//         >
//           <img
//             src={
//               chat.user.blocked.includes(currentUser.id)
//                 ? "./avatar.png"
//                 : chat.user.avatar || "./avatar.png"
//             }
//             alt=""
//           />
//           <div className="texts">
//             <span>
//               {chat.user.blocked.includes(currentUser.id)
//                 ? "user"
//                 : chat.user.username}
//               <div className="remove">
//                 {/* {*onClick={handleRemove} */}
//                 <img src="./minus.png" alt="" className="add" />
//               </div>
//             </span>
//             <p>{chat.lastMessage}</p>
//           </div>
//         </div>
//       ))}

//       {addMode && <Adduser />}
//     </div>
//   );
// };

// export default ChatList;

// remove user

import { useEffect, useState } from "react";
import "./chatlist.css";
import Adduser from "./adduser/adduser";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const user = userDocSnap.data();
            return { ...item, user };
          } else {
            console.log("No such user document!");
            return { ...item, user: null };
          }
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    // Create a copy of chats with the rest of the object except user data
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    // Find the chatIndex where the chatId matches
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    // Mark the selected chat as seen
    if (chatIndex !== -1) {
      userChats[chatIndex].isSeen = true;

      const userChatsRef = doc(db, "userchats", currentUser.id);

      try {
        await updateDoc(userChatsRef, {
          chats: userChats,
        });

        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // New function to handle removing a user from the chat list
  const handleRemoveUser = async (chatId) => {
    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: chats.filter((chat) => chat.chatId !== chatId), // Remove the selected chat
      });

      console.log("User removed successfully");
    } catch (err) {
      console.log("Error removing user:", err);
    }
  };

  const filterChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLocaleLowerCase())
  );

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchbar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {filterChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "user"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
          {/* Add remove button */}

          {/* <div
            className="remove"
            onMouseOver={
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveUser(chat.chatId);
                }}
                className="remove"
              >
                Remove
              </button>
            }
          ></div> */}
        </div>
      ))}

      {addMode && <Adduser />}
    </div>
  );
};

export default ChatList;
