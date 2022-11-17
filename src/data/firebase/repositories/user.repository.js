import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase-config"

const userCollection = collection(db, "users")

export const updateUserInfoByID = (id, data) => {
    console.log(data)
    return setDoc(doc(db, "users", id), data)
}