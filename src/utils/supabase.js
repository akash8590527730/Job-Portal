import { createClient } from '@supabase/supabase-js';

// ✅ Export these two for external usage
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Keep this function to initialize a Supabase client with a token
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
  return supabase;
};

export default supabaseClient;
