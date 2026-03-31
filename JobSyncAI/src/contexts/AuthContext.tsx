import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../lib/supabase' // Connection to supabase

//The Auth State Manager
//file for your visual login form

//this is what user data will go in the bucket
type AuthContextType={
    session: any
    signUp: (email:string,passowrd:string)=>void
    signIn: (email:string,passowrd:string)=>void
}

//this is the bucket for the user data
const AuthContext=createContext<AuthContextType|undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState(undefined)

    const signUp = async (email: string, password: string) => {
        // You'll put the supabase.auth.signUp() magic he shows in the video here!
    }

    const signIn = async (email: string, password: string) => {
        // You'll put the supabase.auth.signInWithPassword() magic here!
    }
}
