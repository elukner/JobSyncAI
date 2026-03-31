import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../lib/supabase' // Connection to supabase

//The Auth State Manager
//file for your visual login form

//this is what user data will go in the bucket
type AuthContextType = {
    session: any
    signUp: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>
    signIn: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>
    // Add this line! No email or password needed.
    signOut: () => Promise<{ success: boolean; error?: any }>
}
//this is the bucket for the user data
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<any>(null)

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            console.error("Error with signing up:", error)
            return { success: false, error }
        }
        return { success: true, data }


    }

    useEffect(() => {
        //Check the bucket immediately
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            setSession(initialSession)
        })

        //Start listening 
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    /**
     * TODO
     * @param email 
     * @param password 
     */
    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                console.error("Error with signIn:", error)
                return { success: false, error: error.message }
            }
            console.log("sign-in success:", data)
            return { success: true, data }

        } catch (error) {
            console.error("Error:", error)
            return { success: false, error: "An unexpected error occurred" }
        }
    }

    /**
     * TODO 
     * @param email 
     * @param password 
     * @returns 
     */
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error signing out:", error)
            return { success: false, error: error.message }
        }
        return { success: true }
    }

    return (
        <AuthContext.Provider value={{ session, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("UserAuth must be used inside an AuthContextProvider")
    }
    return context
}