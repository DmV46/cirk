import type { Metadata } from "next";
import { GalleryPage } from "@/widgets/gallery/ui/GalleryPage";

export const metadata: Metadata = {
  title: "Фото и видео",
  description:
    "Фотографии и видео выступлений воспитанников объединённой цирковой студии в г. Московский: воздушная гимнастика, акробатика, концерты и фестивали.",
  alternates: {
    canonical: "/videos",
  },
};

export default function VideosPage() {
  return <GalleryPage />;
}
