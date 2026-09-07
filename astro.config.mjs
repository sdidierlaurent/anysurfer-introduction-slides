// @ts-check
import { defineConfig } from 'astro/config';

const [owner = '', repository = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages' && Boolean(owner && repository);
const isUserSite = repository === `${owner}.github.io`;

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? `https://${owner}.github.io` : process.env.SITE_URL || undefined,
	base: isGitHubPages ? (isUserSite ? '/' : `/${repository}`) : process.env.BASE_PATH || '/',
});
