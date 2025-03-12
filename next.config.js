/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
});

const withNextIntl = createNextIntlPlugin();

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

function parseURL(rawUrl) {
  const url = new URL(process.env.NODE_ENV !== "test" ? rawUrl : "https://www.mock.com/");

  if (!url) throw new Error("No URL specified in next.config.images.remotePatterns");

  return {
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    port: url.port,
  };
}
 

const nextConfig = {
  /*
  i18n: {
    locales: ['en-US', 'ko'],
    defaultLocale: 'ko',
  }, */

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    remotePatterns: [parseURL(process.env.NEXT_PUBLIC_SUPABASE_URL)],

    /** vercel에 과금해야해서 supabase image loader 사용 */
    loader: "custom",
    loaderFile: "./src/shared/libs/supabase/supabaseLoader.ts",

    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [550, 768],
  },

  reactStrictMode: false,

  async headers() {
    return [
      {
        source: "/(.*)",

        // nginx 쓰면 기본적으로 제공해주긴 함
        headers: [
          /*
            This header helps prevent cross-site scripting (XSS),
            clickjacking and other code injection attacks.
            Content Security Policy (CSP) can specify allowed origins for content including scripts, stylesheets,
            images, fonts, objects, media (audio, video), iframes, and more
          */

          /*
          {
            key: 'Content-Security-Policy',
            value: CSP.replace(/\n/g, '')
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          */

          /*
             it provide protection for older web browsers that don't support CSP.
          */
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          /*
            This header indicates whether
            the site should be allowed to be displayed within an iframe.
            This header has been superseded by CSP's
            frame-ancestors option, which has better support in modern browsers
          */
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          /*
            This is an extended header proposed by Microsoft,
            which restricts the interpretation to beyond the MIME types
            sent by the web server as a defense against cross-site scripting.
          */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          /*
            refererer 정책
            When using HTTPS, the full address is retained if the websites are the same,
            and only the domain address is retained if they are different.
            For websites using HTTP, the address is not retained.
          */
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

const config = withPWA(withBundleAnalyzer(withNextIntl(nextConfig)));

module.exports = withSentryConfig(config, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "chungheon-yi",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
