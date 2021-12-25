import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://efxtdmrwlbrsjamsierr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODQyNDI1NCwiZXhwIjoxOTU0MDAwMjU0fQ.4TQRBE2SAkKT9HMCDUCj-WaGqzlEXZG4ZLsj130YRaY'
)

export default supabase
