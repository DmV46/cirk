import type { Metadata } from "next";
import { VideoCard } from "@/shared/ui/video-card/VideoCard";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";

export const metadata: Metadata = {
  title: "Видео выступлений — Цирковая студия",
  description: "Видеозаписи выступлений наших воспитанников",
};

const videos = [
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
  {
    id: 7,
    title: "Воздушное кольцо",
    description: "Дуэт на воздушном кольце, старшая группа",
    thumbnail: "https://placehold.co/640x360/18181b/b400d8?text=Видео+7",
    duration: "4:45",
  },
  {
    id: 8,
    title: "Гимнастические этюды",
    description: "Зарисовки с тренировок по растяжке и пластике",
    thumbnail: "https://placehold.co/640x360/18181b/e65c00?text=Видео+8",
    duration: "6:20",
  },
  {
    id: 9,
    title: "Летний интенсив 2023",
    description: "Как проходят наши летние тренировочные сборы",
    thumbnail: "https://placehold.co/640x360/18181b/00d8d8?text=Видео+9",
    duration: "12:30",
  },
  {
    id: 10,
    title: "Трапеция — соло",
    description: "Выступление Виктории Новиковой, 10 лет",
    thumbnail: "https://placehold.co/640x360/18181b/ff8800?text=Видео+10",
    duration: "3:50",
  },
];

export default function VideosPage() {
  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">
              <CyberText text="ВИДЕО ВЫСТУПЛЕНИЙ" />
            </h1>
            <p className="section-subtitle">
              Посмотрите, чего добиваются наши воспитанники на занятиях
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              marginTop: "4rem",
            }}
          >
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                duration={video.duration}
              />
            ))}
          </div>

          <p className="text-muted text-center" style={{ marginTop: "4rem" }}>
            Ссылки на реальные видео будут добавлены после подключения
            видеохостинга
          </p>
        </div>
      </section>
    </div>
  );
}
