export const isProductionEnvironment = process.env.NODE_ENV === 'production';

export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

// Auth is disabled when DISABLE_AUTH is explicitly set to 'true'
// This flag should only be used in development environments
export const isAuthDisabled = process.env.DISABLE_AUTH === 'true';

// Database persistence is disabled when DISABLE_PERSISTENCE is explicitly set to 'true'
// This allows testing without setting up Supabase/PostgreSQL database
export const isPersistenceDisabled = process.env.DISABLE_PERSISTENCE === 'true';

// Base metadata used throughout the application
export const BASE_SITE_URL = 'https://chat.pipedream.com';
export const BASE_TITLE = 'Pipedream Chat';
export const BASE_DESCRIPTION = 'Use Pipedream Chat to talk directly with 2700+ APIs and supercharge your productivity';

export const BASE_METADATA = {
  metadataBase: new URL(BASE_SITE_URL),
  title: BASE_TITLE,
  description: BASE_DESCRIPTION,
  openGraph: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    url: BASE_SITE_URL,
    siteName: BASE_TITLE,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Pipedream Chat',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    creator: '@pipedream',
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
        alt: 'Pipedream Chat',
      }
    ],
  },
};
