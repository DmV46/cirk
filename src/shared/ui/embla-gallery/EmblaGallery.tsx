"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./EmblaGallery.module.css";

export type EmblaGallerySlide = {
  id: string;
  image: string;
  thumbImage?: string;
  title: string;
  description?: string;
  duration?: string;
};

function IconFullscreen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type EmblaGalleryProps = {
  slides: EmblaGallerySlide[];
  variant: "photo" | "video";
  ariaLabel: string;
  onSlideClick?: (index: number) => void;
  /** Неоновая обводка слайдов и миниатюр (CSS, без плагинов Embla) */
  neon?: boolean;
};

export function EmblaGallery({ slides, variant, ariaLabel, onSlideClick, neon = false }: EmblaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pointerDownRef = useRef(false);
  const didScrollRef = useRef(false);

  const [mainViewportRef, mainEmblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [thumbsViewportRef, thumbsEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const mainViewportNodeRef = useRef<HTMLDivElement | null>(null);

  const setMainViewportNode = useCallback(
    (node: HTMLDivElement | null) => {
      mainViewportNodeRef.current = node;
      mainViewportRef(node);
    },
    [mainViewportRef],
  );

  const isVideo = variant === "video";
  const isPhotoGallery = !isVideo && Boolean(onSlideClick);
  const slideCount = slides.length;

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainEmblaApi) {
        return;
      }
      mainEmblaApi.scrollTo(index);
    },
    [mainEmblaApi],
  );

  const onSelect = useCallback(() => {
    if (!mainEmblaApi || !thumbsEmblaApi) {
      return;
    }

    const index = mainEmblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbsEmblaApi.scrollTo(index);
  }, [mainEmblaApi, thumbsEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) {
      return;
    }

    onSelect();
    mainEmblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      mainEmblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [mainEmblaApi, onSelect]);

  useEffect(() => {
    if (!mainEmblaApi || !thumbsEmblaApi || slideCount === 0) {
      return;
    }

    mainEmblaApi.reInit();
    thumbsEmblaApi.reInit();

    const index = mainEmblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbsEmblaApi.scrollTo(index);
  }, [slideCount, mainEmblaApi, thumbsEmblaApi]);

  useEffect(() => {
    const node = mainViewportNodeRef.current;
    if (!node) {
      return;
    }

    const syncSlideSize = () => {
      const width = node.clientWidth;
      if (width <= 0) {
        return;
      }
      node.style.setProperty("--slide-size", `${width}px`);
      mainEmblaApi?.reInit();
      thumbsEmblaApi?.reInit();
    };

    syncSlideSize();

    const observer = new ResizeObserver(syncSlideSize);
    observer.observe(node);
    window.addEventListener("orientationchange", syncSlideSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", syncSlideSize);
    };
  }, [mainEmblaApi, thumbsEmblaApi, slideCount]);

  useEffect(() => {
    if (!mainEmblaApi || !onSlideClick || isVideo) {
      return;
    }

    const onPointerDown = () => {
      pointerDownRef.current = true;
      didScrollRef.current = false;
    };

    const onScroll = () => {
      if (pointerDownRef.current) {
        didScrollRef.current = true;
      }
    };

    const onPointerUp = () => {
      const wasDrag = didScrollRef.current;
      pointerDownRef.current = false;
      didScrollRef.current = false;

      if (!wasDrag) {
        onSlideClick(mainEmblaApi.selectedScrollSnap());
      }
    };

    mainEmblaApi.on("pointerDown", onPointerDown).on("scroll", onScroll).on("pointerUp", onPointerUp);

    return () => {
      mainEmblaApi.off("pointerDown", onPointerDown).off("scroll", onScroll).off("pointerUp", onPointerUp);
    };
  }, [mainEmblaApi, onSlideClick, isVideo]);

  if (!slides.length) {
    return null;
  }

  return (
    <div className={`${styles.root} ${neon ? styles.rootNeon : ""}`}>
      <section className={styles.embla} aria-label={ariaLabel} aria-roledescription="carousel">
        <div className={styles.emblaViewport} ref={setMainViewportNode}>
          <div className={styles.emblaContainer}>
            {slides.map((slide, index) => (
              <div className={styles.emblaSlide} key={slide.id}>
                <div
                  className={`${styles.emblaSlideInner} ${
                    isPhotoGallery ? styles.emblaSlideInnerPhoto : styles.emblaSlideInnerVideo
                  } ${isPhotoGallery ? styles.emblaSlideInnerClickable : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.emblaSlideImg}
                    src={slide.image}
                    alt={slide.title}
                    sizes="(max-width: 640px) 100vw, 72rem"
                    draggable={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {isPhotoGallery ? (
                    <span className={`${styles.emblaAction} ${styles.emblaActionFullscreen}`} aria-hidden>
                      <IconFullscreen />
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {slides.length > 1 ? (
        <section className={styles.emblaThumbs} aria-label="Миниатюры">
          <div className={styles.emblaThumbsViewport} ref={thumbsViewportRef}>
            <div className={styles.emblaThumbsContainer}>
              {slides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.id}
                  onClick={() => onThumbClick(index)}
                  className={`${styles.emblaThumbsSlide} ${
                    index === selectedIndex ? styles.emblaThumbsSlideSelected : ""
                  }`}
                  aria-label={`Миниатюра ${index + 1}`}
                  aria-current={index === selectedIndex}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.emblaThumbsSlideImg}
                    src={slide.thumbImage ?? slide.image}
                    alt=""
                    draggable={false}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
