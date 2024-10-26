import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

// export const useUserStore = create((set) => ({
//   currentUser: null,
//   isLoading: true,
//   fetchUserInfo: async (uid) => {
//     if (!uid) return set({ currentUser: null, isLoading: false });
//     try {
//       const docRef = doc(db, "users", uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         set({ currentUser: docSnap.data(), isLoading: false });
//       } else {
//         set({ currentUser: null, isLoading: false });
//       }
//     } catch (err) {
//       console.log(err);
//       return set({ currentUser: null, isLoading: false });
//     }
//   },
// }));

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  iscurrentUserBlocked: false,
  isReceiverBlocked: false,
  isLoading: true,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if current user is blocked
    if (user.blocked.includes(currentUser.id)) {
      // Change 'include' to 'includes'
      return set({
        chatId,
        user: null,
        iscurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if receiver is blocked
    else if (currentUser.blocked.includes(user.id)) {
      // Change 'include' to 'includes'
      return set({
        chatId,
        user: user,
        iscurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        iscurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  }, 
  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
