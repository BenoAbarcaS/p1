const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBasePath(path: string) {
  return `${basePath}/${path.replace(/^\/+/, '')}`;
}