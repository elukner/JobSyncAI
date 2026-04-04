import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../lib/supabase' // Connection to supabase
import { toast } from "sonner";

type AuthContextType = {
    session: any
    user: any
    loading: boolean
    signUp: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>
    signIn: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>
    signOut: () => Promise<{ success: boolean; error?: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Authentication context provider component that manages user authentication state and operations.
 * 
 * Provides authentication functionality including sign up, sign in, and sign out capabilities.
 * Automatically initializes the session on mount and listens for authentication state changes.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped by the auth context provider
 * 
 * @returns {JSX.Element} The AuthContext provider wrapping children components with authentication state
 * 
 */
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<any>(null)
    const [loading, setLoading] = useState(true)



    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            if (error.message === "User already registered") {
                toast.error("Account already exists!", {
                    description: "Try logging in or using a different email.",
                })
            }

            console.error("Error with signing up:", error)
            return { success: false, error }
        }
        return { success: true, data }


    }

    useEffect(() => {
        //Check the bucket immediately
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            setSession(initialSession)
            setLoading(false)
        })

        //Start listening 
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

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

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error signing out:", error)
            return { success: false, error: error.message }
        }
        return { success: true }
    }

    return (
        <AuthContext.Provider value={{ loading, session, user: session?.user ?? null, signUp, signIn, signOut }}>
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