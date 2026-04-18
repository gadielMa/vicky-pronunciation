-- Fix infinite recursion in RLS policies that check admin role.
-- The pattern `EXISTS (SELECT FROM profiles ...)` inside a policy on profiles
-- triggers the same policy again, leading to infinite recursion.
-- Solution: wrap the admin check in a SECURITY DEFINER function which
-- bypasses RLS.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- ---------- profiles ----------
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

-- ---------- categories ----------
DROP POLICY IF EXISTS "Admins manage categories" ON categories;
CREATE POLICY "Admins manage categories"
  ON categories FOR ALL
  USING (public.is_admin());

-- ---------- content_items ----------
DROP POLICY IF EXISTS "Admins full access to content" ON content_items;
CREATE POLICY "Admins full access to content"
  ON content_items FOR ALL
  USING (public.is_admin());

-- ---------- content_tags ----------
DROP POLICY IF EXISTS "Admins manage tags" ON content_tags;
CREATE POLICY "Admins manage tags"
  ON content_tags FOR ALL
  USING (public.is_admin());

-- ---------- subscriptions ----------
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON subscriptions;
CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions FOR SELECT
  USING (public.is_admin());

-- ---------- storage.objects ----------
DROP POLICY IF EXISTS "Admin upload to videos" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload to audio" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload to documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload to downloads" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload to thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload to public-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete from any bucket" ON storage.objects;

CREATE POLICY "Admin upload to videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'videos' AND public.is_admin());

CREATE POLICY "Admin upload to audio"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'audio' AND public.is_admin());

CREATE POLICY "Admin upload to documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND public.is_admin());

CREATE POLICY "Admin upload to downloads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'downloads' AND public.is_admin());

CREATE POLICY "Admin upload to thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'thumbnails' AND public.is_admin());

CREATE POLICY "Admin upload to public-assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'public-assets' AND public.is_admin());

CREATE POLICY "Admin delete from any bucket"
  ON storage.objects FOR DELETE
  USING (public.is_admin());

-- Admin update on storage (for overwrite scenarios)
DROP POLICY IF EXISTS "Admin update storage objects" ON storage.objects;
CREATE POLICY "Admin update storage objects"
  ON storage.objects FOR UPDATE
  USING (public.is_admin());
