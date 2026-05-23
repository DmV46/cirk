/** Включить блок «Видео» на странице галереи, когда будут реальные ролики */
export const GALLERY_VIDEOS_ENABLED = false;

export type GalleryVideo = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
};

export const galleryVideos: GalleryVideo[] = [
  {
    id: 1,
    title: "Воздушная гимнастика — весна 2024",
    description: "Выступление на городском фестивале, старшая группа",
    thumbnail: "https://placehold.co/640x360/18181b/00d8d8?text=Видео+1",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Акробатическая группа",
    description: "Сольный номер воспитанников студии, средняя группа",
    thumbnail: "https://placehold.co/640x360/18181b/ff8800?text=Видео+2",
    duration: "4:20",
  },
  {
    id: 3,
    title: "Открытый урок для родителей",
    description: "Демонстрация навыков начинающих групп (дети 4-6 лет)",
    thumbnail: "https://placehold.co/640x360/18181b/b400d8?text=Видео+3",
    duration: "15:00",
  },
  {
    id: 4,
    title: "Номер на полотнах",
    description: "Выступление Анны Смирновой, 12 лет",
    thumbnail: "https://placehold.co/640x360/18181b/e65c00?text=Видео+4",
    duration: "2:30",
  },
  {
    id: 5,
    title: "Жонглирование и баланс",
    description: "Групповой номер с мячами и булавами",
    thumbnail: "https://placehold.co/640x360/18181b/00d8d8?text=Видео+5",
    duration: "5:15",
  },
  {
    id: 6,
    title: "Эквилибр на тростях",
    description: "Выступление Максима Иванова на отчетном концерте",
    thumbnail: "https://placehold.co/640x360/18181b/ff8800?text=Видео+6",
    duration: "3:10",
  },
];
