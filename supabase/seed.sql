-- ============================================
-- Seed: Sections and Categories
-- ============================================

-- Sections
INSERT INTO sections (name, slug, description, display_order) VALUES
  ('Live Argentina', 'adults', 'Culture, podcasts, conversation, travel, tango & pronunciation for adults learning Argentine Spanish.', 1),
  ('Grow Bilingual', 'families', 'Fun, engaging content for bilingual families. Activities, stories and resources for kids and parents.', 2)
ON CONFLICT (slug) DO NOTHING;

-- Adults categories
INSERT INTO categories (section_id, name, slug, description, display_order) VALUES
  ((SELECT id FROM sections WHERE slug = 'adults'), 'Pronunciation', 'pronunciation', 'Master the sounds of Argentine Spanish', 1),
  ((SELECT id FROM sections WHERE slug = 'adults'), 'Culture & Lifestyle', 'culture', 'Discover Argentine culture, customs and daily life', 2),
  ((SELECT id FROM sections WHERE slug = 'adults'), 'Podcasts & Audio', 'podcasts', 'Listen and learn with audio content', 3),
  ((SELECT id FROM sections WHERE slug = 'adults'), 'Conversation', 'conversation', 'Practice real-world conversation skills', 4),
  ((SELECT id FROM sections WHERE slug = 'adults'), 'Travel to Buenos Aires', 'travel', 'Plan your trip and navigate BA like a local', 5),
  ((SELECT id FROM sections WHERE slug = 'adults'), 'Tango & Experiences', 'tango', 'Tango culture, music and unique Argentine experiences', 6)
ON CONFLICT (section_id, slug) DO NOTHING;

-- Families categories
INSERT INTO categories (section_id, name, slug, description, display_order) VALUES
  ((SELECT id FROM sections WHERE slug = 'families'), 'Kids 3-5', 'kids-3-5', 'Playful Spanish for little ones', 1),
  ((SELECT id FROM sections WHERE slug = 'families'), 'Kids 6-10', 'kids-6-10', 'Fun learning for school-age kids', 2),
  ((SELECT id FROM sections WHERE slug = 'families'), 'Parent + Child', 'parent-child', 'Activities to do together as a family', 3),
  ((SELECT id FROM sections WHERE slug = 'families'), 'Games & Activities', 'games-activities', 'Interactive games and downloadable activities', 4),
  ((SELECT id FROM sections WHERE slug = 'families'), 'Stories', 'stories', 'Storytelling in Spanish — learn about mate, empanadas and more', 5),
  ((SELECT id FROM sections WHERE slug = 'families'), 'Nanny Resources', 'nanny-resources', 'Materials for Spanish-speaking caregivers', 6)
ON CONFLICT (section_id, slug) DO NOTHING;
