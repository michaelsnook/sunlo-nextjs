import { createClient } from '@supabase/supabase-js'
import { Database } from 'types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

const supabase = createClient<Database>(supabaseUrl, publicKey)

export default supabase
