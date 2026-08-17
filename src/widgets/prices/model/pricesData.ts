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
  duration: string;
  plans: PricePlan[];
};

export const priceGroups: PriceGroupInfo[] = [
  {
    id: "main",
    title: "Основная группа",
    duration: "по 2 часа",
    plans: [
      {
        id: "main-8",
        name: "8 ЗАНЯТИЙ В\u00A0МЕСЯЦ",
        amount: "11 800 ₽",
        bookingLabel: "Основная группа — 8 занятий в\u00A0месяц, по 2 часа",
      },
      {
        id: "main-10",
        name: "10 ЗАНЯТИЙ В\u00A0МЕСЯЦ",
        amount: "13 400 ₽",
        bookingLabel: "Основная группа — 10 занятий в\u00A0месяц, по 2 часа",
      },
      {
        id: "main-12",
        name: "12 ЗАНЯТИЙ В\u00A0МЕСЯЦ",
        amount: "14 750 ₽",
        bookingLabel: "Основная группа — 12 занятий в\u00A0месяц, по 2 часа",
      },
    ],
  },
  {
    id: "prep",
    title: "Подготовительная группа",
    duration: "по 1 часу",
    plans: [
      {
        id: "prep-8",
        name: "8 ЗАНЯТИЙ В\u00A0МЕСЯЦ",
        amount: "8 800 ₽",
        highlight: true,
        bookingLabel: "Подготовительная группа — 8 занятий в\u00A0месяц, по 1 часу",
      },
    ],
  },
];

export const allPricePlans = priceGroups.flatMap((group) => group.plans);
