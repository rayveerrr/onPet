import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

const docCollection = collection(db, "Product");

const parseDoc = (data) => {
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getProducts = async () => {
  const data = await getDocs(docCollection);
  return parseDoc(data);
};

export const deleteProductById = (id: string) => {
  return deleteDoc(doc(db, "Product", id));
};

export const updateProductById = (id: String, recentProductData) => {
  return setDoc(doc(db, "Product", cartItem.id), { ...recentProductData });
};
