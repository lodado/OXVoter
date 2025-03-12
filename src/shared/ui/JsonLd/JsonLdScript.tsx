import React from "react";

const webUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const defaultImage = "/Logo.svg";
 
interface Metadata {
  title: string;
  description: string;
  author?: string;
  url: string;
  date: string;
  isAccessibleForFree?: boolean;
}

// 기본 메타 데이터 (필요에 따라 실제 데이터로 교체)
const defaultMetadata: Metadata = {
  title: "Simmey Face Matching",
  description: "Use a face-matching AI to see how much you resemble your mom and dad!",
  url: webUrl!,
  date: new Date().toISOString(),
  isAccessibleForFree: true,
};

/**
 * customMeta가 있을 경우 해당 값으로 덮어쓰고,
 * 그렇지 않으면 기본값을 사용하여 JSON‑LD 데이터를 생성합니다.
 */
export const generateJsonLd = (customMeta: Metadata = defaultMetadata) => {
  const metadata = { ...defaultMetadata, ...customMeta };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    applicationCategory: "EntertainmentApplication", // 엔터테인먼트 카테고리 지정
    name: metadata.title,
    description: metadata.description,
    author: {
      "@type": "Person",
      name: metadata.author ?? "lodado",
    },
    keywords: "face matching, ai, fun, family",
    url: webUrl + metadata.url,
    datePublished: metadata.date,
    isAccessibleForFree: metadata.isAccessibleForFree,

    publisher: {
      "@type": "Organization",
      name: "lodado",
      logo: {
        "@type": "ImageObject",
        url: `${webUrl}${defaultImage}`,
      },
    },

    operatingSystem: "ALL", // 모든 운영체제 지원
    browserRequirements: "A modern browser with JavaScript enabled", // JavaScript가 활성화된 최신 브라우저 지원
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
  };

  return structuredData;
};

/**
 * JSON‑LD 데이터를 <script> 태그를 통해 head 또는 body에 삽입하는 컴포넌트
 */
interface JsonLdProps {
  customMeta?: Metadata;
}

export const JsonLdScript = ({ customMeta }: JsonLdProps) => {
  const jsonLdData = generateJsonLd(customMeta ?? defaultMetadata);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />;
};
