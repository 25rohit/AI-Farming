declare module 'npm:hono';
declare module 'npm:hono/cors';
declare module 'npm:hono/logger';
declare module 'jsr:@supabase/supabase-js@2.49.8';
declare module 'jsr:@supabase/supabase-js@*';

declare const Deno: any;

// Generic fallback for npm: specifiers used in Deno/npm interop
declare module 'npm:*' {
  const v: any;
  export = v;
}

export {};
