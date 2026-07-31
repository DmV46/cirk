import { FAQ_ITEMS } from "@/widgets/faq/model/faqData";
import { SOCIAL_LINKS } from "@/shared/lib/socialLinks";
import {
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_PHONES,
  SITE_URL,
} from "@/shared/lib/site";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${SITE_URL}/#studio`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}${SITE_OG_IMAGE}`,
    telephone: [...SITE_PHONES],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    areaServed: {
      "@type": "City",
      name: "Московский",
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function getFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
