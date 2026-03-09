import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let repo = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
  // Не применяем basePath, если это пользовательский сайт (<username>.github.io)
  if (!repoName.endsWith('.github.io')) {
    repo = `/${repoName}`;
  }
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo,
  images: {
    unoptimized: true, // Необходимо для работы next/image при статическом экспорте
  },
};

export default nextConfig;
