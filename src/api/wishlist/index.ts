import { collection, addDoc, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import type { IWishlistGroup, IWishlistItem } from "../../data/types";

export const addWishlist = async (wishlist: IWishlistGroup, userId: string) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "lists"), {
      name: wishlist.name,
      items: wishlist.items,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Wishlist added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding wishlist: ", error);
    throw error;
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

export const getWishlistById = async (userId: string, wishlistId: string) => {
  try {
    const docRef = doc(db, "users", userId, "lists", wishlistId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as IWishlistGroup;
    } else {
      throw new Error("Wishlist not found");
    }
  } catch (error) {
    console.error("Error getting wishlist by ID: ", error);
    throw error;
  }
};

export const addItemToWishlist = async (
  userId: string,
  wishlistId: string,
  item: IWishlistItem
) => {
  try {
    const wishlistRef = doc(db, "users", userId, "lists", wishlistId);
    await updateDoc(wishlistRef, {
      items: arrayUnion(item),
      updatedAt: new Date(),
    });
    console.log("Item added to wishlist:", wishlistId);
    return true;
  } catch (error) {
    console.error("Error adding item to wishlist: ", error);
    throw error;
  }
};
