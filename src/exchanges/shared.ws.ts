import type { Accessor, Setter } from 'solid-js';
import { createSignal } from 'solid-js';

export class SharedWebsocket {
  ws?: WebSocket;
  endpoint: string;
  isDisposed = false;

  errorCount = 0;
  hasError: Accessor<boolean>;
  setHasError: Setter<boolean>;

  latency: Accessor<number>;
  setLatency: Setter<number>;
  
  constructor(endpoint: string) {
    this.endpoint = endpoint;

    const [latency, setLatency] = createSignal(0);
    this.latency = latency;
    this.setLatency = setLatency;

    const [hasError, setHasError] = createSignal(false);
    this.hasError = hasError;
    this.setHasError = setHasError;
  }


  connect = () => {
    this.ws = new WebSocket(this.endpoint);
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('error', this.onError);
  };

  onOpen = () => {
    this.errorCount = 0;
    this.setHasError(false);
  };
  onMessage = (_event: MessageEvent) => {};

  onError = (event: Event) => {
    console.error(`[WebSocket error] ${this.endpoint}`, event);
    this.errorCount += 1;
    if (this.errorCount >= 3) {
      this.setHasError(true);
    }
  };

  onClose = () => {
    this?.ws?.removeEventListener?.('open', this.onOpen);
    this?.ws?.removeEventListener?.('message', this.onMessage);
    this?.ws?.removeEventListener?.('close', this.onClose);
    this?.ws?.removeEventListener?.('error', this.onError);
    this.ws = undefined;

    if (!this.isDisposed) {
      setTimeout(() => this.connect(), 1000);
    }
  };

  close = () => {
    this.isDisposed = true;
    this.ws?.close?.();
  };
}
