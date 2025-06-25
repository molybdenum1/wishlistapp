import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { IWishlistGroup } from "../../data/types";

export const addWishlist = async (wishlist: IWishlistGroup) => {
  try {
    await addDoc(collection(db, "lists"), {
      name: wishlist.name,
      // items: wishlist.items,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((docRef) => {
      console.log("Wishlist added with ID: ", docRef.id);
    });
  } catch (error) {
    console.error("Error adding wishlist: ", error);
  }
};

export const getWishlists = async (userId: string) => {
  try {
    console.log("Fetching wishlists for user:", userId);
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "lists")
    );
    console.log("Wishlists fetched successfully:", querySnapshot.docs.length);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting wishlists: ", error);
    return [];
  }
};
