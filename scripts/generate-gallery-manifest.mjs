/**
 * Сборка: список фото с API Яндекс.Диска + скачивание в public/gallery/images/
 * (ссылки downloader.disk.yandex.ru с сайта не открываются — Referer, срок действия).
 */
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const galleryDir = join(root, "public", "gallery");
const imagesDir = join(galleryDir, "images");
const outFile = join(galleryDir, "photos.json");

const YANDEX_GALLERY_PUBLIC_URL = "https://disk.yandex.ru/d/AzdvUfp-xDTtCA";
const DOWNLOAD_CONCURRENCY = 5;

function pickSizeUrl(sizes, ...preferred) {
  if (!sizes?.length) return "";
  for (const name of preferred) {
    const match = sizes.find((size) => size.name === name);
    if (match?.url) return match.url;
  }
  return "";
}

function mapFileToRemote(file, index) {
  if (file.type !== "file" || file.media_type !== "image") return null;

  const thumbRemote =
    pickSizeUrl(file.sizes, "S", "M", "DEFAULT") || file.preview || pickSizeUrl(file.sizes, "L");
  const fullRemote =
    pickSizeUrl(file.sizes, "XXXL", "XXL", "XL", "L", "M") || thumbRemote;

  if (!thumbRemote || !fullRemote) return null;

  const baseName = file.name.replace(/\.[^.]+$/, "");

  return {
    id: `${baseName}-${index}`,
    title: baseName,
    thumbRemote,
    fullRemote,
  };
}

async function fetchRemotePhotos(publicUrl) {
  const items = [];
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
      const photo = mapFileToRemote(file, offset + itemIndex);
      if (photo) items.push(photo);
    });

    offset += embedded.items.length;
    if (offset >= embedded.total || embedded.items.length < limit) break;
  }

  return items;
}

function safeBaseName(id) {
  return id.replace(/[^a-zA-Z0-9-_]/g, "_");
}

async function downloadFile(url, destPath) {
  const response = await fetch(url, {
    headers: { "User-Agent": "UnitedCircusGalleryBuild/1.0" },
  });
  if (!response.ok) {
    throw new Error(`Скачивание ${destPath} — HTTP ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(destPath, buffer);
}

async function mapPool(items, mapper, concurrency) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

async function localizePhoto(remote) {
  const base = safeBaseName(remote.id);
  const thumbFile = `${base}-thumb.jpg`;
  const fullFile = `${base}.jpg`;

  await downloadFile(remote.thumbRemote, join(imagesDir, thumbFile));
  await downloadFile(remote.fullRemote, join(imagesDir, fullFile));

  return {
    id: remote.id,
    title: remote.title,
    thumbSrc: `/gallery/images/${thumbFile}`,
    fullSrc: `/gallery/images/${fullFile}`,
  };
}

async function main() {
  console.log("Галерея: список файлов с Яндекс.Диска…");
  const remotePhotos = await fetchRemotePhotos(YANDEX_GALLERY_PUBLIC_URL);

  if (!remotePhotos.length) {
    throw new Error("Список фото пуст. Проверьте публичную папку на Яндекс.Диске.");
  }

  if (existsSync(imagesDir)) {
    rmSync(imagesDir, { recursive: true, force: true });
  }
  mkdirSync(imagesDir, { recursive: true });

  console.log(`Галерея: скачивание ${remotePhotos.length} фото (по ${DOWNLOAD_CONCURRENCY} параллельно)…`);
  const photos = await mapPool(remotePhotos, localizePhoto, DOWNLOAD_CONCURRENCY);

  mkdirSync(galleryDir, { recursive: true });
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

  console.log(`Галерея: готово — ${photos.length} фото в public/gallery/images/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
