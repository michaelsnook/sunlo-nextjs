import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://hepudeougzlgnuqvybrj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcHVkZW91Z3psZ251cXZ5YnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyMjUxNDUsImV4cCI6MTk4NzgwMTE0NX0.S-d_AqcE9PVzGny-zedgrdjIBecrgQ5VrLyquSV1P4k'
)

export default supabase
