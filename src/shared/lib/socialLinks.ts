export type SocialLinkId = "vk" | "instagram" | "telegram" | "max";

export type SocialLink = {
  id: SocialLinkId;
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "vk",
    label: "ВКонтакте",
    href: "https://vk.ru/united_circus_studio",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/united_circus_studio",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/united_circus_studio",
  },
  {
    id: "max",
    label: "MAX",
    href: "https://max.ru/join/0z4BknLUdd_u2y49vCQd3IMrVM3gTzZQeSHCuqcylsI",
  },
];
