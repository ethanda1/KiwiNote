import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
