import type { Metadata } from "next";
import { GalleryPage } from "@/widgets/gallery/ui/GalleryPage";

export const metadata: Metadata = {
  title: "Фото и видео — Цирковая студия",
  description: "Фотографии и видеозаписи выступлений воспитанников студии",
};

export default function VideosPage() {
  return <GalleryPage />;
}
