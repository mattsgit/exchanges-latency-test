import { createSignal } from 'solid-js';

// Baseline latency measurements
const [baselineLatency, setBaselineLatency] = createSignal(0);
const [systemLoad, setSystemLoad] = createSignal(0);

// Measure baseline to a very fast, reliable endpoint
const measureBaseline = async (): Promise<number> => {
  const measurements: number[] = [];
  let fetchSucceeded = 0;
  let fetchFailed = 0;
  
  // Test multiple times for accuracy
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    let usedFallback = false;
    
    try {
      // Use a very fast, reliable endpoint (Cloudflare DNS)
      await fetch('https://1.1.1.1/cdn-cgi/trace', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      fetchSucceeded++;
    } catch {
      // If that fails, use a data URL (measures pure browser overhead)
      await new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      });
      fetchFailed++;
      usedFallback = true;
    }
    
    const end = performance.now();
    const latency = end - start;
    measurements.push(latency);
    
    console.log(`Baseline measurement ${i + 1}: ${latency.toFixed(1)}ms (${usedFallback ? 'fallback' : 'fetch'})`);
    
    // Small delay between measurements
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Baseline summary: ${fetchSucceeded} fetch succeeded, ${fetchFailed} failed`);
  
  // Return median to avoid outliers
  measurements.sort((a, b) => a - b);
  return measurements[Math.floor(measurements.length / 2)];
};

// Measure JavaScript execution overhead
const measureSystemLoad = (): number => {
  const start = performance.now();
  
  // Do some computational work to measure JS performance
  let dummy = 0;
  for (let i = 0; i < 100000; i++) {
    dummy += Math.random();
  }
  
  const end = performance.now();
  return end - start;
};

// Initialize baseline measurements
const initializeBaseline = async () => {
  try {
    const baseline = await measureBaseline();
    const load = measureSystemLoad();
    
    setBaselineLatency(baseline);
    setSystemLoad(load);
    
    console.log(`Baseline latency: ${baseline.toFixed(1)}ms, System load: ${load.toFixed(1)}ms`);
    console.log(`Page origin: ${window.location.origin}, Protocol: ${window.location.protocol}`);
  } catch (error) {
    console.warn('Could not measure baseline latency:', error);
    setBaselineLatency(0);
    setSystemLoad(0);
  }
};

// Compensate a raw latency measurement
export const compensateLatency = (rawLatency: number): number => {
  const baseline = baselineLatency();
  const load = systemLoad();
  
  // Subtract baseline network latency and add some system load compensation
  const compensated = Math.max(0, rawLatency - (baseline * 0.5) - (load * 0.1));
  
  return Math.round(compensated);
};

// Get current baseline info (reactive signals)
export const getBaselineInfo = () => ({
  baseline: baselineLatency,
  systemLoad: systemLoad,
});

// Re-measure baseline (call this periodically)
export const updateBaseline = initializeBaseline;

// Initialize on module load
if (typeof window !== 'undefined') {
  initializeBaseline();
  
  // Re-measure baseline every 60 seconds
  setInterval(initializeBaseline, 60000);
} 