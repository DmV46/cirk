import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { MediaGallery } from "./MediaGallery";
import styles from "./GalleryPage.module.css";

export function GalleryPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.pageInner}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <CyberText text="ФОТО И ВИДЕО" />
          </h1>
          <p className={styles.subtitle}>
            Снимки с занятий, репетиций и выступлений наших воспитанников
          </p>
        </header>

        <div className={styles.gallerySection}>
          <MediaGallery />
        </div>
      </div>
    </section>
  );
}
