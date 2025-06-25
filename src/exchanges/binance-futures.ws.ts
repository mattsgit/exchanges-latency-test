import { SharedWebsocket } from './shared.ws';

export class BinanceFuturesWebsocket extends SharedWebsocket {
  constructor() {
    super('wss://fstream.binance.com/ws');
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
          console.warn('BinanceFuturesWebsocket: timestamp not found', parsed);
        }
      } catch (err) {
        console.warn('BinanceFuturesWebsocket: failed to parse message', err);
      }
    }
  };
}
