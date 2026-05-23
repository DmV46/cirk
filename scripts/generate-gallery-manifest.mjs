/**
 * Сборка: загружает список фото с API Яндекс.Диска (без CORS) и пишет public/gallery/photos.json
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "gallery");
const outFile = join(outDir, "photos.json");

const YANDEX_GALLERY_PUBLIC_URL = "https://disk.yandex.ru/d/AzdvUfp-xDTtCA";

function pickSizeUrl(sizes, ...preferred) {
  if (!sizes?.length) return "";
  for (const name of preferred) {
    const match = sizes.find((size) => size.name === name);
    if (match?.url) return match.url;
  }
  return "";
}

function mapFileToPhoto(file, index) {
  if (file.type !== "file" || file.media_type !== "image") return null;

  const thumbSrc =
    pickSizeUrl(file.sizes, "S", "M", "DEFAULT") || file.preview || pickSizeUrl(file.sizes, "L");
  const fullSrc = pickSizeUrl(file.sizes, "ORIGINAL", "XXXL", "XXL", "XL", "L") || thumbSrc;

  if (!thumbSrc || !fullSrc) return null;

  const baseName = file.name.replace(/\.[^.]+$/, "");

  return {
    id: `${baseName}-${index}`,
    title: baseName,
    thumbSrc,
    fullSrc,
  };
}

async function fetchYandexGalleryPhotos(publicUrl) {
  const photos = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const apiUrl = new URL("https://cloud-api.yandex.net/v1/disk/public/resources");
    apiUrl.searchParams.set("public_key", publicUrl);
    apiUrl.searchParams.set("limit", String(limit));
    apiUrl.searchParams.set("offset", String(offset));
    apiUrl.searchParams.set("preview_size", "XL");

    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error(`Yandex Disk API ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    const embedded = data._embedded;
    if (!embedded?.items?.length) break;

    embedded.items.forEach((file, itemIndex) => {
      const photo = mapFileToPhoto(file, offset + itemIndex);
      if (photo) photos.push(photo);
    });

    offset += embedded.items.length;
    if (offset >= embedded.total || embedded.items.length < limit) break;
  }

  return photos;
}

async function main() {
  console.log("Галерея: загрузка фото с Яндекс.Диска…");
  const photos = await fetchYandexGalleryPhotos(YANDEX_GALLERY_PUBLIC_URL);

  if (!photos.length) {
    throw new Error("Список фото пуст. Проверьте публичную папку на Яндекс.Диске.");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    outFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        count: photos.length,
        photos,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Галерея: сохранено ${photos.length} фото → public/gallery/photos.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
