/** Публичная папка: https://disk.yandex.ru/d/AzdvUfp-xDTtCA */
export const YANDEX_GALLERY_PUBLIC_URL = "https://disk.yandex.ru/d/AzdvUfp-xDTtCA";

export type YandexSize = {
  name: string;
  url: string;
};

export type YandexDiskFile = {
  type: string;
  name: string;
  media_type?: string;
  mime_type?: string;
  preview?: string;
  sizes?: YandexSize[];
};

type YandexResourcesResponse = {
  _embedded?: {
    items: YandexDiskFile[];
    total: number;
    limit: number;
    offset: number;
  };
};

export type GalleryPhotoItem = {
  id: string;
  title: string;
  thumbSrc: string;
  fullSrc: string;
};

function pickSizeUrl(sizes: YandexSize[] | undefined, ...preferred: string[]): string {
  if (!sizes?.length) {
    return "";
  }
  for (const name of preferred) {
    const match = sizes.find((size) => size.name === name);
    if (match?.url) {
      return match.url;
    }
  }
  return "";
}

function mapFileToPhoto(file: YandexDiskFile, index: number): GalleryPhotoItem | null {
  if (file.type !== "file" || file.media_type !== "image") {
    return null;
  }

  const thumbSrc =
    pickSizeUrl(file.sizes, "S", "M", "DEFAULT") || file.preview || pickSizeUrl(file.sizes, "L");
  const fullSrc = pickSizeUrl(file.sizes, "ORIGINAL", "XXXL", "XXL", "XL", "L") || thumbSrc;

  if (!thumbSrc || !fullSrc) {
    return null;
  }

  const baseName = file.name.replace(/\.[^.]+$/, "");

  return {
    id: `${baseName}-${index}`,
    title: baseName,
    thumbSrc,
    fullSrc,
  };
}

export async function fetchYandexGalleryPhotos(
  publicUrl: string = YANDEX_GALLERY_PUBLIC_URL,
): Promise<GalleryPhotoItem[]> {
  const photos: GalleryPhotoItem[] = [];
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
      throw new Error(`Не удалось загрузить фото с Яндекс.Диска (${response.status})`);
    }

    const data = (await response.json()) as YandexResourcesResponse;
    const embedded = data._embedded;
    if (!embedded?.items?.length) {
      break;
    }

    embedded.items.forEach((file, itemIndex) => {
      const photo = mapFileToPhoto(file, offset + itemIndex);
      if (photo) {
        photos.push(photo);
      }
    });

    offset += embedded.items.length;
    if (offset >= embedded.total || embedded.items.length < limit) {
      break;
    }
  }

  return photos;
}
