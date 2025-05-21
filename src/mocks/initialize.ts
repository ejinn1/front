export async function enableMocking() {
  if (typeof window === 'undefined') return;

  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') return;

  const { worker } = await import('./browser');

  await worker.start();
}
