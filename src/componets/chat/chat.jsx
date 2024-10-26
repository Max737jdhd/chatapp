import "./chat.css";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import EmojiPicker from "emoji-picker-react";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore(); // Assuming user is available in chat store
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]); // Scroll to bottom when new messages arrive

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleCImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handelSend = async () => {
    if (text === "") return; // Check if text is empty

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      // Update chat with new message
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      /////////////////

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (i) => {
        const userChatsRef = doc(db, "userchats", i);
        const userChatSnapshot = await getDoc(userChatsRef);

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            i === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updateAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
      ////////////////////////

      // // Update user chats for both sender and receiver
      // const userChatsRefSender = doc(db, "userchats", id);
      // const userChatSnapshotSender = await getDoc(userChatsRefSender);

      // if (userChatSnapshotSender.exists()) {
      //   const userChatsDataSender = userChatSnapshotSender.data();
      //   const chatIndexSender = userChatsDataSender.chats.findIndex(
      //     (c) => c.chatId === chatId
      //   );

      //   if (chatIndexSender !== -1) {
      //     userChatsDataSender.chats[chatIndexSender].lastMessage = text;
      //     userChatsDataSender.chats[chatIndexSender].isSeen = false; // Sender's view
      //     userChatsDataSender.chats[chatIndexSender].updatedAt = new Date();
      //   }
      // }

      // // Update receiver's chat
      // const userChatsRefReceiver = doc(db, "userchats", user.id);
      // const userChatSnapshotReceiver = await getDoc(userChatsRefReceiver);

      // if (userChatSnapshotReceiver.exists()) {
      //   const userChatsDataReceiver = userChatSnapshotReceiver.data();
      //   const chatIndexReceiver = userChatsDataReceiver.chats.findIndex(
      //     (c) => c.chatId === chatId
      //   );

      //   if (chatIndexReceiver !== -1) {
      //     userChatsDataReceiver.chats[chatIndexReceiver].lastMessage = text;
      //     userChatsDataReceiver.chats[chatIndexReceiver].isSeen = true; // Receiver's view
      //     userChatsDataReceiver.chats[chatIndexReceiver].updatedAt = new Date();

      //     await updateDoc(userChatsRefReceiver, {
      //       chats: userChatsDataReceiver.chats,
      //     });
      //   }
      // }

      // Clear text input after sending
      setText("");
    } catch (err) {
      console.log(err);
    }

    setImg({
      file: null,
      url: "",
    });

    setText("");
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span> {/* Display user's name */}
            <p>{"..."}</p>
          </div>
        </div>
        {/* <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div> */}
      </div>
      <div className="center">
        {chat?.message?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message own" : "message"
            }
            key={message.createdAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}

        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <label htmlFor="file">
            <img src="./camera.png" alt="" />
          </label>
          {/* <img src="./mic.png" alt="" /> */}
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot Send a message"
              : "type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button
          className="sendbutton"
          onClick={handelSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
