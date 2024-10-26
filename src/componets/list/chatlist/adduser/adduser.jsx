// import "./adduser.css";
// import { db } from "../../../../lib/firebase";
// import {
//   collection,
//   doc,
//   setDoc,
//   getDocs,
//   query,
//   serverTimestamp,
//   where,
//   onSnapshot,
//   arrayUnion,
//   updateDoc,
// } from "firebase/firestore";
// import { useState } from "react";
// import { getAuth } from "firebase/auth";
// import { useUserStore } from "../../../../lib/userStore";

// // const Adduser = () => {
// //   const [user, setUser] = useState(null);
// //   const hadleSearch = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData(e.target);
// //     const username = formData.get("username");

// //     try {
// //       const userRef = collection(db, "users");
// //       const q = query(userRef, where("username", "==", username));

// //       const querySnapShot = await getDocs(q);
// //       if (!querySnapShot.empty) {
// //         setUser(querySnapShot.docs[0].data());
// //       }
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const handleAdd = async () => {
// //         const chatRef = collection(db, "chats");
// //         const userChatsRef = collection(db, "userchats");
// //         try {
// //           const newChatRef = doc(chatRef);

// //           await setDoc(newChatRef, {
// //             createdAt: serverTimestamp(),
// //             messages: [],
// //           });

// //           console.log(newChatRef);
// //         } catch (err) {
// //           console.log(err);
// //         }
// //       };

// //   return (
// //     <div className="adduser">
// //       <form onSubmit={hadleSearch}>
// //         <input type="text" placeholder="Username" name="username" />
// //         <button>Search</button>
// //       </form>
// //       {user && (
// //         <div className="user">
// //           <div className="detail">
// //             <img src={user.avatar || "./avatar.png"} alt="" />
// //             <span>{user.username}</span>
// //           </div>
// //           <button onClick={handleAdd}>Add User</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Adduser;

// const Adduser = () => {
//   const [user, setUser] = useState(null);
//   const auth = getAuth();

//   const { currentUser } = useUserStore();

//   const hadleSearch = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const username = formData.get("username");

//     if (!auth.currentUser) {
//       console.log("User is not authenticated");
//       return; // Prevent search if user is not authenticated
//     }

//     try {
//       const userRef = collection(db, "users");
//       const q = query(userRef, where("username", "==", username));

//       const querySnapShot = await getDocs(q);
//       if (!querySnapShot.empty) {
//         setUser(querySnapShot.docs[0].data());
//       } else {
//         console.log("No user found");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const handleAdd = async () => {
//   //   const chatRef = collection(db, "chats");
//   //   const userChatsRef = collection(db, "userchats");
//   //   try {
//   //     const newChatRef = doc(chatRef);

//   //     await setDoc(newChatRef, {
//   //       createdAt: serverTimestamp(),
//   //       messages: [],
//   //     });
//   //     await updateDoc(doc(userChatsRef, user.id), {
//   //       chats: arrayUnion({
//   //         chatId: newChatRef.id,
//   //         lastMessage: "",
//   //         receiverId: currentUser.id,
//   //         updatedAt: Date.now(),
//   //       }),
//   //     });

//   //     await updateDoc(doc(userChatsRef, currentUser.id), {
//   //       chats: arrayUnion({
//   //         chatId: newChatRef.id,
//   //         lastMessage: "",
//   //         receiverId: user.id,
//   //         updatedAt: Date.now(),
//   //       }),
//   //     });
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };

//   const handleAdd = async () => {
//     if (!user) {
//       console.log("No user selected");
//       return; // Prevent adding if no user is selected
//     }

//     if (!currentUser) {
//       console.log("Current user is not defined");
//       return; // Prevent adding if current user is not defined
//     }

//     const chatRef = collection(db, "chats");
//     const userChatsRef = collection(db, "userchats");

//     try {
//       const newChatRef = doc(chatRef);

//       await setDoc(newChatRef, {
//         createdAt: serverTimestamp(),
//         messages: [],
//       });

//       await updateDoc(doc(userChatsRef, user.id), {
//         chats: arrayUnion({
//           chatId: newChatRef.id,
//           lastMessage: "",
//           receiverId: currentUser.id,
//           updatedAt: Date.now(),
//         }),
//       });

//       await updateDoc(doc(userChatsRef, currentUser.id), {
//         chats: arrayUnion({
//           chatId: newChatRef.id,
//           lastMessage: "",
//           receiverId: user.id,
//           updatedAt: Date.now(),
//         }),
//       });
//     } catch (err) {
//       console.log("Error adding chat:", err);
//     }
//   };

//   return (
//     <div className="adduser">
//       <form onSubmit={hadleSearch}>
//         <input type="text" placeholder="Username" name="username" />
//         <button>Search</button>
//       </form>
//       {user && (
//         <div className="user">
//           <div className="detail">
//             <img src={user.avatar || "./avatar.png"} alt="" />
//             <span>{user.username}</span>
//           </div>
//           <button onClick={handleAdd}>Add User</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Adduser;

//new code

import "./adduser.css";
import { db } from "../../../../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  serverTimestamp,
  where,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useUserStore } from "../../../../lib/userStore";

const Adduser = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    if (!auth.currentUser) {
      console.log("User is not authenticated");
      return; // Prevent search if user is not authenticated
    }

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdd = async () => {
  //   if (!user) {
  //     console.log("No user selected");
  //     return; // Prevent adding if no user is selected
  //   }

  //   if (!currentUser) {
  //     console.log("Current user is not defined");
  //     return; // Prevent adding if current user is not defined
  //   }

  //   const chatRef = collection(db, "chats");
  //   const userChatsRef = collection(db, "userchats");

  //   try {
  //     const newChatRef = doc(chatRef); // Generate a new chat document

  //     // Create a new chat document with a timestamp and an empty message array
  //     await setDoc(newChatRef, {
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });

  //     // Check if user document exists, if not create one and initialize chats array
  //     const userDocRef = doc(userChatsRef, user.id);
  //     const userDocSnap = await getDoc(userDocRef);

  //     if (!userDocSnap.exists() || !userDocSnap.data().chats) {
  //       await setDoc(
  //         userDocRef,
  //         {
  //           chats: [],
  //         },
  //         { merge: true }
  //       );
  //     }

  //     // Add chat entry for the other user
  //     await updateDoc(userDocRef, {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: currentUser.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });

  //     // Check if currentUser document exists, if not create one and initialize chats array
  //     const currentUserDocRef = doc(userChatsRef, currentUser.id);
  //     const currentUserDocSnap = await getDoc(currentUserDocRef);

  //     if (!currentUserDocSnap.exists() || !currentUserDocSnap.data().chats) {
  //       await setDoc(
  //         currentUserDocRef,
  //         {
  //           chats: [],
  //         },
  //         { merge: true }
  //       );
  //     }

  //     // Add chat entry for the current user
  //     await updateDoc(currentUserDocRef, {
  //       chats: arrayUnion({
  //         chatId: newChatRef.id,
  //         lastMessage: "",
  //         receiverId: user.id,
  //         updatedAt: Date.now(),
  //       }),
  //     });

  //     console.log("Chat added successfully");
  //   } catch (err) {
  //     console.log("Error adding chat:", err);
  //   }
  // };

  //add user with restrictions

  const handleAdd = async () => {
    if (!user) {
      console.log("No user selected");
      return; // Prevent adding if no user is selected
    }

    if (!currentUser) {
      console.log("Current user is not defined");
      return; // Prevent adding if current user is not defined
    }

    const userChatsRef = collection(db, "userchats");
    const currentUserDocRef = doc(userChatsRef, currentUser.id);
    const currentUserDocSnap = await getDoc(currentUserDocRef);

    // Check if current user's document exists and has chats
    if (currentUserDocSnap.exists() && currentUserDocSnap.data().chats) {
      const existingChats = currentUserDocSnap.data().chats;

      // Check if the user is already in the current user's chat list
      const isUserAlreadyAdded = existingChats.some(
        (chat) => chat.receiverId === user.id
      );

      if (isUserAlreadyAdded) {
        alert(user.username + "  already in Your Friends List");
        return; // Prevent adding if the user is already in the chat list
      }
    }

    const chatRef = collection(db, "chats");

    try {
      const newChatRef = doc(chatRef); // Generate a new chat document

      // Create a new chat document with a timestamp and an empty message array
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Add chat entry for the other user
      await updateDoc(currentUserDocRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      // Add chat entry for the selected user
      const userDocRef = doc(userChatsRef, user.id);
      await updateDoc(userDocRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      console.log("Chat added successfully");
    } catch (err) {
      console.log("Error adding chat:", err);
    }
  };

  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>
            {/* {isUserAlreadyAdded ? "" : "Add User"} */}
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default Adduser;
