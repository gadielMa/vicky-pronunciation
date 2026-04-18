-- Seed initial sections and categories so admin panel has options to pick from.
-- Uses ON CONFLICT to stay idempotent (safe to re-run).

INSERT INTO sections (name, slug, description, display_order)
VALUES
  ('Live Argentina', 'adults',   'Content for adults — culture, pronunciation, travel, tango.', 1),
  ('Grow Bilingual', 'families', 'Content for families and kids — stories, games, activities.', 2)
ON CONFLICT (slug) DO NOTHING;

-- Adults categories
INSERT INTO categories (section_id, name, slug, description, display_order)
SELECT s.id, c.name, c.slug, c.description, c.display_order
FROM sections s
CROSS JOIN (VALUES
  ('Pronunciation',  'pronunciation',  'Pronunciation drills and exercises.',           1),
  ('Culture',        'culture',        'Argentine culture, history, and traditions.',   2),
  ('Conversation',   'conversation',   'Real-life conversation practice.',              3),
  ('Travel',         'travel',         'Travel tips and Buenos Aires guides.',          4),
  ('Tango',          'tango',          'Tango music, lyrics, and dance vocabulary.',    5),
  ('Podcasts',       'podcasts',       'Long-form audio content.',                      6)
) AS c(name, slug, description, display_order)
WHERE s.slug = 'adults'
ON CONFLICT (section_id, slug) DO NOTHING;

-- Families categories
INSERT INTO categories (section_id, name, slug, description, display_order)
SELECT s.id, c.name, c.slug, c.description, c.display_order
FROM sections s
CROSS JOIN (VALUES
  ('Stories',        'stories',        'Storytelling videos and books for kids.',       1),
  ('Games',          'games',          'Downloadable games and interactive activities.',2),
  ('Activities',     'activities',     'Guided activities for parents and children.',   3),
  ('Songs',          'songs',          'Songs and music in Spanish.',                   4),
  ('Resources',      'resources',      'Printable resources and PDFs for families.',    5)
) AS c(name, slug, description, display_order)
WHERE s.slug = 'families'
ON CONFLICT (section_id, slug) DO NOTHING;
