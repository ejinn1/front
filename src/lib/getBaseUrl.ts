export function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // 브라우저에서는 상대 경로

  return process.env.NODE_ENV === 'production'
    ? 'https://zzikzzik.shop'
    : 'http://localhost:3000';
}
