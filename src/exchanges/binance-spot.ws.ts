import { SharedWebsocket } from './shared.ws';

export class BinanceSpotWebsocket extends SharedWebsocket {
  constructor() {
    // use the official Binance secure websocket endpoint
    // explicitly specify port 9443 to avoid connection errors
    super('wss://stream.binance.com:9443/ws');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['btcusdt@trade'],
          id: 1,
        })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const parsed = JSON.parse(data as string);
        const ts = parsed.E ?? parsed?.data?.E;

        if (typeof ts === 'number') {
          const diff = Date.now() - Number(ts);
          this.setLatency(diff);
        } else {
          console.warn('BinanceSpotWebsocket: timestamp not found', parsed);
        }
      } catch (err) {
        console.warn('BinanceSpotWebsocket: failed to parse message', err);
      }
    }
  };
}
