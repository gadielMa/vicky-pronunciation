export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Section = {
  id: string;
  name: string;
  slug: "adults" | "families";
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
};

export type Category = {
  id: string;
  section_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
};

export type ContentType =
  | "video"
  | "audio"
  | "pdf"
  | "event_replay"
  | "downloadable_game"
  | "guided_activity"
  | "storytelling_video";

export type ContentItem = {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string | null;
  content_type: ContentType;
  file_url: string | null;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  file_size_bytes: number | null;
  is_free: boolean;
  is_published: boolean;
  display_order: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  created_by: string | null;
};

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

export type Subscription = {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  status: SubscriptionStatus;
  plan_name: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
};

// Joined types for queries
export type ContentItemWithCategory = ContentItem & {
  categories: Category & {
    sections: Section;
  };
};
