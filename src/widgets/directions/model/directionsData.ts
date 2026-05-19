export type DirectionItem = {
  title: string;
};

export const LEFT_DIRECTIONS: DirectionItem[] = [
  { title: "ВОЗДУШНАЯ ГИМНАСТИКА" },
  { title: "ЖОНГЛИРОВАНИЕ" },
  { title: "АКРОБАТИКА" },
  { title: "ТАНЦЫ" },
  { title: "ПАРТЕРНАЯ ГИМНАСТИКА" },
];

export const RIGHT_DIRECTIONS: DirectionItem[] = [
  { title: "ПОСТАНОВКА НОМЕРОВ" },
  { title: "КОНЦЕРТЫ" },
  { title: "КОНКУРСЫ" },
  { title: "ФЕСТИВАЛИ" },
];

/** Все направления для бегущей строки и прочих списков */
export const DIRECTIONS: DirectionItem[] = [
  ...LEFT_DIRECTIONS,
  ...RIGHT_DIRECTIONS,
];
