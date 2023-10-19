export const api = {
  get: async(endpoint: string): Promise<any> => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => {
      controller.abort();
    }, 2000);
    return await fetch(`${endpoint}`, {
      signal,
      cache: 'no-store',
    }).then(async(res) => {
      clearTimeout(timer);
      return await res.json();
    });
  },
  post: async(endpoint: string, data: Record<string, any>): Promise<any> => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => {
      controller.abort();
    }, 2000);
    return await fetch(`${endpoint}`, {
      signal,
      cache: 'no-store',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async(res) => {
      clearTimeout(timer);
      return await res.json();
    });
  },
}
