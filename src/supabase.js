import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfulmktdtpiccecodrbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdWxta3RkdHBpY2NlY29kcmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2Nzk1NTksImV4cCI6MjA2MzI1NTU1OX0.6NHY5vPgQvk43eI7F8qpb9KWzKOmzlc3DfW6x3WxCbE'; // Debe ser la clave pública (anon key)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);