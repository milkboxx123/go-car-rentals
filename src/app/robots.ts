import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system", "/admin", "/account", "/checkout"],
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
