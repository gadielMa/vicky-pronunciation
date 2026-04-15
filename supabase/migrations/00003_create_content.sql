-- Content type enum
CREATE TYPE content_type AS ENUM (
  'video',
  'audio',
  'pdf',
  'event_replay',
  'downloadable_game',
  'guided_activity',
  'storytelling_video'
);

-- Content items: the core content table
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  content_type content_type NOT NULL,

  -- File references (Supabase Storage paths)
  file_url TEXT,
  thumbnail_url TEXT,

  -- Metadata
  duration_seconds INT,
  file_size_bytes BIGINT,

  -- Access control
  is_free BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,

  -- Ordering and display
  display_order INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,

  created_by UUID REFERENCES profiles(id),

  UNIQUE(category_id, slug)
);

CREATE INDEX idx_content_category ON content_items(category_id);
CREATE INDEX idx_content_published ON content_items(is_published, published_at DESC);
CREATE INDEX idx_content_type ON content_items(content_type);
CREATE INDEX idx_content_featured ON content_items(featured) WHERE featured = true;

-- Tags for cross-category discovery
CREATE TABLE content_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  UNIQUE(content_id, tag)
);

CREATE INDEX idx_tags_content ON content_tags(content_id);
CREATE INDEX idx_tags_tag ON content_tags(tag);

-- Auto-update updated_at
CREATE TRIGGER content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
