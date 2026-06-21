import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://greubekiqewlxbfxvdnb.supabase.co';
const supabaseAnonKey = 'sb_publishable_WmfZi9Nw32fFXEfsYQpQ5w_9PjXiDft';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
