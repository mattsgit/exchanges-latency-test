import type { Accessor, Setter } from 'solid-js';
import { createSignal } from 'solid-js';
import { compensateLatency } from '~/utils/baseline-latency';

export class KuCoinCORSWebsocket {
  endpoint: string;
  isDisposed = false;
  intervalId?: NodeJS.Timeout;

  errorCount = 0;
  hasError: Accessor<boolean>;
  setHasError: Setter<boolean>;

  latency: Accessor<number>;
  private setLatencyRaw: Setter<number>;
  
  constructor() {
    // KuCoin public API endpoint that will trigger CORS error
    this.endpoint = 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=BTC-USDT';

    const [latency, setLatency] = createSignal(0);
    this.latency = latency;
    this.setLatencyRaw = setLatency;

    const [hasError, setHasError] = createSignal(false);
    this.hasError = hasError;
    this.setHasError = setHasError;
  }

  // Public method to set latency with baseline compensation
  setLatency = (rawLatency: number) => {
    const compensatedLatency = compensateLatency(rawLatency);
    this.setLatencyRaw(compensatedLatency);
  };

  connect = () => {
    this.isDisposed = false;
    this.errorCount = 0;
    this.setHasError(false);
    
    // Start measuring CORS error timing immediately
    this.measureCORSLatency();
    
    // Continue measuring every 1 second
    this.intervalId = setInterval(() => {
      if (!this.isDisposed) {
        this.measureCORSLatency();
      }
    }, 1000);
  };

  measureCORSLatency = () => {
    const start = performance.now();
    
    // Use Image element which typically generates less console noise for CORS errors
    const img = new Image();
    
    const handleComplete = () => {
      const end = performance.now();
      const latency = Math.round(end - start);
      this.setLatency(latency);
      this.errorCount = 0;
      this.setHasError(false);
      
      // Clean up
      img.onload = null;
      img.onerror = null;
    };
    
    // Set up event handlers
    img.onload = handleComplete;
    img.onerror = handleComplete;
    
    // Trigger the request with a cache-busting parameter
    img.src = `${this.endpoint}&_t=${Date.now()}`;
  };

  close = () => {
    this.isDisposed = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  };
} 