import {createContext, useState, useContext, useEffect} from 'react'
import {auth,db} from '../firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
import { setDoc,doc } from 'firebase/firestore'

const AuthContext=createContext()

export function AuthContextProvider({children}){
    const [user,Setuser]=useState({})

    function signUp(email,password){
        createUserWithEmailAndPassword(auth,email,password)
        setDoc(doc(db,'users',email),{
            savedShows: []
        })
    }

    function logOut(){
        return signOut(auth)
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            Setuser(currentUser)
        })
        return ()=>{
            unsubscribe()
        }
    })

    return (
        <AuthContext.Provider value={{signUp,logIn,logOut,user}}>
           {children}
        </AuthContext.Provider>

    )
}

export function UserAuth(){
    return useContext(AuthContext)
}