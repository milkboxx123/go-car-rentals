import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalized}`;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = siteConfig.defaultOgImage,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : absoluteUrl(ogImage);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.brandName,
      type: "website",
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}
