function request(url: string, onComplete: () => void) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = onComplete;
  xhr.onerror = onComplete; // Also handle CORS/network errors
  xhr.ontimeout = onComplete; // Handle timeouts
  xhr.send();
}

export const pingURL = (url: string): Promise<number> => {
  return new Promise((resolve) => {
    const start = performance.now();
    request(url, () => {
      const delay = Math.round(performance.now() - start);
      resolve(delay);
    });
  });
};
