async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    return server.listen();
  } else {
    const { worker } = await import('./browser');
    return worker.start();
  }
}

export { initMSW };
