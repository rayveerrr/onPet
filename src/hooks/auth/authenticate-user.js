import { useEffect, useMemo, useState } from "react"
import { auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const useAuthentication = (userType) => {
    
    const [ validUser, setValidUser ] = useState();

    useEffect(() => {

        const email = sessionStorage.getItem('email')
        console.log(email)
        if(!email){
            alert('forbidden access, required to login first.')
            window.location.href = '/login'
        }
        
        
        const fetch = async() => {
            const userCollectionRef = collection(db, "users")
            const data = await getDocs(userCollectionRef)
            console.log('Data: ', data.docs.map((doc) => ({...doc.data(), id: doc.id })))
            const user = data.docs?.map((doc) => ({...doc.data(), id: doc.id })).find(user => user.Email === email)
            setValidUser(user)
            console.log('UserAuthenticate', user)
            if(user?.UserType !== userType){
                alert('forbidden access, invalid userType')
                window.location.href = '/homepage'
            }
        }
        fetch()
    }, [])
    

    return useMemo(() => {
        return validUser
    }, [validUser])
}

export default useAuthentication;