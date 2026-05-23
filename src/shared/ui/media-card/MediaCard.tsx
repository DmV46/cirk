import styles from "./MediaCard.module.css";

type MediaCardProps = {
  type: "photo" | "video";
  title: string;
  description: string;
  src: string;
  duration?: string;
};

export function MediaCard({ type, title, description, src, duration }: MediaCardProps) {
  const isVideo = type === "video";

  return (
    <article className={styles.card}>
      <div className={styles.thumbWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} className={styles.thumbnail} loading="lazy" />

        <div className={`${styles.overlay} ${!isVideo ? styles.overlayPhoto : ""}`}>
          {isVideo ? (
            <>
              <div className={styles.playButton}>
                <span className={styles.playIcon}>▶</span>
              </div>
              {duration ? <span className={styles.duration}>{duration}</span> : null}
            </>
          ) : (
            <span className={styles.mediaBadge}>Фото</span>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
