async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    return server.listen({
      onUnhandledRequest: 'warn',
    });
  } else {
    const { worker } = await import('./browser');
    return worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

export { initMSW };
