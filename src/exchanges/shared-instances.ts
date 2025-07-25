import { BinanceFuturesWebsocket } from './binance-futures.ws';
import { BinanceSpotWebsocket } from './binance-spot.ws';
import { BybitFuturesWebsocket } from './bybit-futures.ws';
import { BybitSpotWebsocket } from './bybit-spot.ws';
import { HyperliquidWebsocket } from './hyperliquid.ws';
import { KuCoinCORSWebsocket } from './kucoin-cors';
import { OKXFuturesWebsocket } from './okx-futures.ws';
import { OKXSpotWebsocket } from './okx-spot.ws';
import { WooXFuturesWebsocket } from './woo-x-futures.ws';
import { WooXSpotWebsocket } from './woo-x-spot.ws';

// Shared exchange instances used across components
export const binanceSpot = new BinanceSpotWebsocket();
export const binanceFutures = new BinanceFuturesWebsocket();
export const bybitSpot = new BybitSpotWebsocket();
export const bybitFutures = new BybitFuturesWebsocket();
export const hyperliquid = new HyperliquidWebsocket();
export const kucoin = new KuCoinCORSWebsocket();
export const okxSpot = new OKXSpotWebsocket();
export const okxFutures = new OKXFuturesWebsocket();
export const wooxSpot = new WooXSpotWebsocket();
export const wooxFutures = new WooXFuturesWebsocket(); 