export type TeamMember = {
  id: number;
  name: string;
  /** Текст в списке на главной (секция «Наша команда»). */
  description: string;
  /** Подзаголовок на карточке страницы команды. */
  cardRole?: string;
  /** Описание на карточке страницы команды. */
  cardBio?: string;
};

const TRAINER_PLACEHOLDER_COLORS = [
  "00d8d8",
  "ff8800",
  "b400d8",
  "e65c00",
  "00d8d8",
  "ff8800",
  "b400d8",
] as const;

export function formatTeamDescription(description: string): string {
  if (!description) {
    return description;
  }
  return description.charAt(0).toUpperCase() + description.slice(1);
}

export function getTeamCardRole(member: TeamMember): string {
  if (member.cardRole) {
    return formatTeamDescription(member.cardRole);
  }
  return formatTeamDescription(member.description);
}

export function getTeamCardBio(member: TeamMember): string {
  if (member.cardBio) {
    return formatTeamDescription(member.cardBio);
  }
  if (member.cardRole) {
    return "";
  }
  return "";
}

export function getTrainerPlaceholderImage(name: string, index: number): string {
  const color = TRAINER_PLACEHOLDER_COLORS[index % TRAINER_PLACEHOLDER_COLORS.length];
  const label = encodeURIComponent(name.replace(/\s+/g, "+"));
  return `https://placehold.co/400x500/18181b/${color}?text=${label}`;
}

export const teamIntroLines = [
  "Наши тренеры — профессиональные артисты цирка!",
  "Лауреаты и призёры международных и всероссийских конкурсов и фестивалей!",
] as const;

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Владимир Владимирович Самолетов",
    description:
      "артист цирка, жонглёр, лауреат национальной премии «Циркъ», тренер и руководитель Объединённой цирковой студии",
    cardRole: "тренер и руководитель Объединённой цирковой студии",
    cardBio: "артист цирка, жонглёр, лауреат национальной премии «Циркъ»",
  },
  {
    id: 2,
    name: "Валерия Валерьевна Андросова",
    description: "режиссёр-постановщик, балетмейстер",
  },
  {
    id: 3,
    name: "Ирина Юрьевна Талина",
    description: "художественный руководитель курса кафедры «Режиссура цирка» в ГИТИС",
  },
  {
    id: 4,
    name: "Нэля Владимировна Самолетова",
    description: "педагог-хореограф с многолетним стажем",
  },
  {
    id: 5,
    name: "Дмитрий Владимирович Булгаков",
    description: "артист цирка, воздушный гимнаст, тренер по воздушной гимнастике",
    cardRole: "тренер по воздушной гимнастике",
    cardBio: "артист цирка, воздушный гимнаст",
  },
  {
    id: 6,
    name: "Анастасия Николаевна Шемит",
    description: "артист цирка, воздушный гимнаст, тренер по воздушной гимнастике",
    cardRole: "тренер по воздушной гимнастике",
    cardBio: "артист цирка, воздушный гимнаст",
  },
  {
    id: 7,
    name: "Михаил Сергеевич Держицкий",
    description: "артист цирка, воздушный гимнаст, тренер по воздушной гимнастике",
    cardRole: "тренер по воздушной гимнастике",
    cardBio: "артист цирка, воздушный гимнаст",
  },
];
