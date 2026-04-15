-- ============================================
-- Row Level Security Policies
-- ============================================

-- PROFILES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- SECTIONS (public read)
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sections are public"
  ON sections FOR SELECT
  USING (true);

-- CATEGORIES (public read, admin write)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are public"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Admins manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- CONTENT ITEMS
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published content visible to authenticated users"
  ON content_items FOR SELECT
  USING (is_published = true AND auth.role() = 'authenticated');

CREATE POLICY "Free content visible to everyone"
  ON content_items FOR SELECT
  USING (is_published = true AND is_free = true);

CREATE POLICY "Admins full access to content"
  ON content_items FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- CONTENT TAGS
ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags readable by authenticated users"
  ON content_tags FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage tags"
  ON content_tags FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- SUBSCRIPTIONS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
