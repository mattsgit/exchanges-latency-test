import { SharedWebsocket } from './shared.ws';

export class HyperliquidWebsocket extends SharedWebsocket {
  constructor() {
    super('wss://api.hyperliquid.xyz/ws');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          method: 'subscribe',
          subscription: {
            type: 'trades',
            coin: 'BTC'
          }
        })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const parsed = JSON.parse(data as string);
        
        // Handle subscription confirmation
        if (parsed.channel === 'subscriptionResponse') {
          return;
        }
        
        // Handle trade data
        if (parsed.channel === 'trades' && Array.isArray(parsed.data)) {
          // Get the most recent trade
          const trades = parsed.data;
          if (trades.length > 0) {
            const latestTrade = trades[trades.length - 1];
            const ts = latestTrade.time;
            
            if (typeof ts === 'number') {
              const diff = Date.now() - ts;
              this.setLatency(diff);
            } else {
              console.warn('HyperliquidWebsocket: timestamp not found', latestTrade);
            }
          }
        }
      } catch (err) {
        console.warn('HyperliquidWebsocket: failed to parse message', err);
      }
    }
  };
} 