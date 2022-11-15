import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

const docCollection = collection(db, "Product");

const parseDocs = (data) => {
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const parseDoc = (data) => {
  return {
    ...data.data(),
    id: data.id
  }
};

export const getProducts = async () => {
  const data = await getDocs(docCollection);
  return parseDocs(data);
};

// export const deleteProductById = (id: ) => {
//   return deleteDoc(doc(db, "Product", id));
// };

// export const updateProductById = (id: , recentProductData) => {
//   return setDoc(doc(db, "Product", cartItem.id), { ...recentProductData });
// };
