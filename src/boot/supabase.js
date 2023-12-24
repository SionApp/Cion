// /src/boot/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SION_APP_URL;
const supabaseKey = process.env.SION_APP_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
