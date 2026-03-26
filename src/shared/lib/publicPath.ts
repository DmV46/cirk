/**
 * Путь к статике из `public/` с учётом `basePath` (статический экспорт на GitHub Pages: /имя-репо/...).
 */
export function publicPath(assetPath: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  if (!base) return normalized;
  return `${base.replace(/\/$/, "")}${normalized}`;
}
