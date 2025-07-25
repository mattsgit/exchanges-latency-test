export const avg = (arr: number[]) =>
  arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

export const percentile = (arr: number[], p: number): number => {
  if (arr.length === 0) return 0;
  
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  
  if (Number.isInteger(index)) {
    return Math.round(sorted[index]);
  } else {
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return Math.round(sorted[lower] * (1 - weight) + sorted[upper] * weight);
  }
};

export const p50 = (arr: number[]) => percentile(arr, 50);
export const p90 = (arr: number[]) => percentile(arr, 90);
export const p95 = (arr: number[]) => percentile(arr, 95);
export const p99 = (arr: number[]) => percentile(arr, 99);
export const max = (arr: number[]) => (arr.length ? Math.max(...arr) : 0); 