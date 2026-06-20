import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Provide a custom fetch to prevent network crash errors when using the placeholder URL
const customFetch = (url: RequestInfo | URL, options?: RequestInit) => {
    if (typeof url === 'string' && url.includes('placeholder.supabase.co')) {
        // Return an empty array with 200 OK so that queries like .select() succeed with no data
        return Promise.resolve(new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    }
    return fetch(url, options);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        fetch: customFetch
    }
});
