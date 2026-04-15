export const APP_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export const API_BASE_URL = '/api/v1';

export function withBasePath(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${APP_BASE_PATH}${normalizedPath}`;
}
