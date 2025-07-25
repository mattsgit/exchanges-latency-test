import type { Accessor, Setter } from 'solid-js';
import { createSignal } from 'solid-js';

export class KuCoinCORSWebsocket {
  endpoint: string;
  isDisposed = false;
  intervalId?: NodeJS.Timeout;

  errorCount = 0;
  hasError: Accessor<boolean>;
  setHasError: Setter<boolean>;

  latency: Accessor<number>;
  setLatency: Setter<number>;
  
  constructor() {
    // KuCoin public API endpoint that will trigger CORS error
    this.endpoint = 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=BTC-USDT';

    const [latency, setLatency] = createSignal(0);
    this.latency = latency;
    this.setLatency = setLatency;

    const [hasError, setHasError] = createSignal(false);
    this.hasError = hasError;
    this.setHasError = setHasError;
  }

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

  measureCORSLatency = async () => {
    const start = performance.now();
    
    try {
      // This will fail due to CORS, but we measure the timing
      await fetch(this.endpoint, {
        method: 'GET',
        mode: 'cors' // This will trigger CORS error
      });
      
    } catch (error) {
      // CORS error occurred - measure the time it took
      const end = performance.now();
      const latency = Math.round(end - start);
      
      // Only update latency if we got a CORS error (expected)
      if (error instanceof TypeError && error.message.includes('CORS') || 
          error instanceof TypeError && error.message.includes('fetch')) {
        this.setLatency(latency);
        this.errorCount = 0;
        this.setHasError(false);
      } else {
        // Unexpected error type
        this.errorCount += 1;
        if (this.errorCount >= 3) {
          this.setHasError(true);
        }
      }
    }
  };

  close = () => {
    this.isDisposed = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  };
} 