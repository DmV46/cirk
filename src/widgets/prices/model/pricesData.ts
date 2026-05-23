export type PricePlan = {
  id: string;
  name: string;
  amount: string;
  highlight?: boolean;
  bookingLabel: string;
};

export type PriceGroupInfo = {
  id: "main" | "prep";
  title: string;
  plans: PricePlan[];
};

export const priceGroups: PriceGroupInfo[] = [
  {
    id: "main",
    title: "Основная группа",
    plans: [
      {
        id: "main-8",
        name: "8 ЗАНЯТИЙ В МЕСЯЦ",
        amount: "11 000 ₽",
        bookingLabel: "Основная группа — 8 занятий в месяц",
      },
      {
        id: "main-10",
        name: "10 ЗАНЯТИЙ В МЕСЯЦ",
        amount: "12 400 ₽",
        bookingLabel: "Основная группа — 10 занятий в месяц",
      },
      {
        id: "main-12",
        name: "12 ЗАНЯТИЙ В МЕСЯЦ",
        amount: "13 650 ₽",
        bookingLabel: "Основная группа — 12 занятий в месяц",
      },
    ],
  },
  {
    id: "prep",
    title: "Подготовительная группа",
    plans: [
      {
        id: "prep-8",
        name: "8 ЗАНЯТИЙ В МЕСЯЦ",
        amount: "8 000 ₽",
        highlight: true,
        bookingLabel: "Подготовительная группа — 8 занятий в месяц",
      },
    ],
  },
];

export const allPricePlans = priceGroups.flatMap((group) => group.plans);
