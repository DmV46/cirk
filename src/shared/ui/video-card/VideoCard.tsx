import styles from "./VideoCard.module.css";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
}

export function VideoCard({ title, description, thumbnail, duration }: VideoCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.thumbWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbnail} alt={title} className={styles.thumbnail} />
        
        <div className={styles.overlay}>
          <div className={styles.playButton}>
            <span className={styles.playIcon}>▶</span>
          </div>
          <span className={styles.duration}>{duration}</span>
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
