import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const cnamePath = path.join(process.cwd(), "CNAME");
const customDomain =
  existsSync(cnamePath) ? readFileSync(cnamePath, "utf8").trim() : "";

let repo = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
  // Для custom domain basePath не нужен: сайт открывается от корня домена.
  if (!customDomain && !repoName.endsWith('.github.io')) {
    repo = `/${repoName}`;
  }
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
  images: {
    unoptimized: true, // Необходимо для работы next/image при статическом экспорте
  },
};

export default nextConfig;
