import { supabaseProjectId } from "@/shared/libs/supabase/projectId";

export const THIRD_PARTY_CONNECT_SRC_LIST = [
  "https://www.google-analytics.com",
  "vercel.live",
  "vercel.com",
  "https://o4506497206779904.ingest.sentry.io",
  "https://storage.googleapis.com",
  "cdn.jsdelivr.net",
  `${supabaseProjectId}.supabase.co`,
  "https://tfhub.dev",
  "https://www.kaggle.com",
  "https://api.dictionaryapi.dev",
];

export const THIRD_PARTY_IMAGE_SRC_LIST = [
  "vercel.live",
  "vercel.com",
  `${supabaseProjectId}.supabase.co`,
  "https://lh3.googleusercontent.com",
  "https://k.kakaocdn.net",
  "https://avatars.githubusercontent.com",
];
