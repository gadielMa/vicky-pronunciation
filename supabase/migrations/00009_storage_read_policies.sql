-- Allow SELECT on private buckets so `createSignedUrl` works for:
--   - Admins (any bucket, any time)
--   - Subscribers with an active subscription (gated content)
--
-- Without this, createSignedUrl silently returns null for authenticated
-- users and the UI renders the storage path as a relative href, causing
-- downloads to hit Next.js and return a 404 HTML page.

-- ---------- Admin read (all private buckets) ----------
DROP POLICY IF EXISTS "Admins read all storage" ON storage.objects;
CREATE POLICY "Admins read all storage"
  ON storage.objects FOR SELECT
  USING (public.is_admin());

-- ---------- Subscriber read (gated by active subscription) ----------
DROP POLICY IF EXISTS "Subscribers read videos" ON storage.objects;
CREATE POLICY "Subscribers read videos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'videos'
    AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Subscribers read audio" ON storage.objects;
CREATE POLICY "Subscribers read audio"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'audio'
    AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Subscribers read documents" ON storage.objects;
CREATE POLICY "Subscribers read documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

DROP POLICY IF EXISTS "Subscribers read downloads" ON storage.objects;
CREATE POLICY "Subscribers read downloads"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'downloads'
    AND EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );
