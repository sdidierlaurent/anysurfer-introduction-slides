// @ts-check
import { defineConfig } from 'astro/config';

const [owner = '', repository = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && Boolean(owner && repository);
const isUserSite = repository === `${owner}.github.io`;

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? `https://${owner}.github.io` : undefined,
	base: isGitHubPages && !isUserSite ? `/${repository}` : '/',
});
