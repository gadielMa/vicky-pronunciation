-- ============================================
-- Storage Buckets
-- ============================================

-- Create buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES
  ('videos', 'videos', false, 524288000),           -- 500MB
  ('audio', 'audio', false, 104857600),              -- 100MB
  ('documents', 'documents', false, 52428800),       -- 50MB
  ('downloads', 'downloads', false, 209715200),      -- 200MB
  ('thumbnails', 'thumbnails', true, 5242880),       -- 5MB
  ('public-assets', 'public-assets', true, 10485760) -- 10MB
ON CONFLICT (id) DO NOTHING;

-- Public bucket policies
CREATE POLICY "Public read thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

CREATE POLICY "Public read public-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public-assets');

-- Admin upload policies for all buckets
CREATE POLICY "Admin upload to videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'videos'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin upload to audio"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'audio'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin upload to documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin upload to downloads"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'downloads'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin upload to thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'thumbnails'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin upload to public-assets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'public-assets'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin delete policies
CREATE POLICY "Admin delete from any bucket"
  ON storage.objects FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
