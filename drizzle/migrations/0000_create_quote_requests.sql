CREATE TABLE public.quote_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
 store_url text NOT NULL DEFAULT '' CHECK (char_length(store_url) <= 500),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
 language text NOT NULL DEFAULT 'en' CHECK (language IN ('en','fr','de','zh'))
);
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.quote_requests IS 'Private website inquiries. Public access is restricted to validated server-side insertion; no visitor read access.';