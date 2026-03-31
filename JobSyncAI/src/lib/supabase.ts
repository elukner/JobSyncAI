//The Database Handshake File
//file to connect to database
import {createClient} from '@supabase/supabase-js'

// Grab the secret keys from your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Create the connection and export it so AuthContext can use it
export const supabase = createClient(supabaseUrl, supabaseAnonKey)



