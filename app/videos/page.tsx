import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Видео выступлений — Цирковая студия",
  description: "Видеозаписи выступлений наших воспитанников",
};

const videos = [
  {
    id: 1,
    title: "Воздушная гимнастика — весна 2024",
    description: "Выступление на городском фестивале",
    thumbnail: "https://placehold.co/640x360/fffbeb/92400e?text=Видео+1",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Акробатическая группа",
    description: "Сольный номер воспитанников студии",
    thumbnail: "https://placehold.co/640x360/fffbeb/92400e?text=Видео+2",
    duration: "4:20",
  },
  {
    id: 3,
    title: "Открытый урок для родителей",
    description: "Демонстрация навыков начинающих групп",
    thumbnail: "https://placehold.co/640x360/fffbeb/92400e?text=Видео+3",
    duration: "15:00",
  },
];

export default function VideosPage() {
  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Видео выступлений</h1>
            <p className="section-subtitle">
              Посмотрите, чего добиваются наши воспитанники на занятиях
            </p>
          </div>

          <div className="card-grid">
            {videos.map((video) => (
              <article key={video.id} className="video-card">
                <div className="video-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                  />
                  <span className="video-duration">{video.duration}</span>
                  <div className="video-play">
                    <span className="video-play-icon">▶</span>
                  </div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-desc">{video.description}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="text-muted text-center" style={{ marginTop: "3rem" }}>
            Ссылки на реальные видео будут добавлены после подключения
            видеохостинга
          </p>
        </div>
      </section>
    </div>
  );
}
