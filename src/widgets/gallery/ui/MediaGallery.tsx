"use client";

import { useEffect, useMemo, useState } from "react";
import { EmblaGallery, type EmblaGallerySlide } from "@/shared/ui/embla-gallery/EmblaGallery";
import {
  fetchYandexGalleryPhotos,
  type GalleryPhotoItem,
  YANDEX_GALLERY_PUBLIC_URL,
} from "@/shared/lib/yandexDiskGallery";
import { GALLERY_VIDEOS_ENABLED, galleryVideos } from "../model/galleryData";
import { PhotoLightbox } from "./PhotoLightbox";
import styles from "./MediaGallery.module.css";

function mapPhotosToSlides(photos: GalleryPhotoItem[]): EmblaGallerySlide[] {
  return photos.map((photo) => ({
    id: photo.id,
    image: photo.fullSrc,
    thumbImage: photo.thumbSrc,
    title: photo.title,
  }));
}

function mapVideosToSlides(): EmblaGallerySlide[] {
  return galleryVideos.map((video) => ({
    id: `video-${video.id}`,
    image: video.thumbnail,
    title: video.title,
  }));
}

export function MediaGallery() {
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photoSlides = useMemo(() => mapPhotosToSlides(photos), [photos]);
  const videoSlides = useMemo(() => (GALLERY_VIDEOS_ENABLED ? mapVideosToSlides() : []), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const loadedPhotos = await fetchYandexGalleryPhotos(YANDEX_GALLERY_PUBLIC_URL);
        if (!cancelled) {
          setPhotos(loadedPhotos);
          const hasVideos = GALLERY_VIDEOS_ENABLED && galleryVideos.length > 0;
          const total = loadedPhotos.length + (hasVideos ? galleryVideos.length : 0);
          setError(total ? null : "Пока нет фото для показа.");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Не удалось загрузить галерею. Попробуйте обновить страницу.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.stateWrap}>
        <div className={styles.skeletonCarousel} aria-hidden />
        {GALLERY_VIDEOS_ENABLED ? <div className={styles.skeletonCarousel} aria-hidden /> : null}
        <p className={styles.stateText}>Загружаем фото…</p>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.gallery}>
      <section className={styles.block} aria-labelledby="gallery-photos-title">
        <h2 id="gallery-photos-title" className={styles.blockTitle}>
          Фото
        </h2>
        <EmblaGallery
          slides={photoSlides}
          variant="photo"
          neon
          ariaLabel="Карусель фотографий студии"
          onSlideClick={(index) => setLightboxIndex(index)}
        />
      </section>

      {GALLERY_VIDEOS_ENABLED && videoSlides.length > 0 ? (
        <section className={styles.block} aria-labelledby="gallery-videos-title">
          <h2 id="gallery-videos-title" className={styles.blockTitle}>
            Видео
          </h2>
          <EmblaGallery slides={videoSlides} variant="video" ariaLabel="Карусель видео студии" />
        </section>
      ) : null}

      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  );
}
