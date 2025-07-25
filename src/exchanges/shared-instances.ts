import { BinanceFuturesWebsocket } from './binance-futures.ws';
import { BinanceSpotWebsocket } from './binance-spot.ws';
import { BybitFuturesv3Websocket } from './bybit-futures-v3.ws';
import { BybitFuturesWebsocket } from './bybit-futures.ws';
import { BybitSpotv1Websocket } from './bybit-spot-v1.ws';
import { BybitSpotv3Websocket } from './bybit-spot-v3.ws';
import { BybitSpotWebsocket } from './bybit-spot.ws';
import { OKXFuturesWebsocket } from './okx-futures.ws';
import { OKXSpotWebsocket } from './okx-spot.ws';
import { WooXFuturesWebsocket } from './woo-x-futures.ws';
import { WooXSpotWebsocket } from './woo-x-spot.ws';
import { KuCoinCORSWebsocket } from './kucoin-cors';

// Shared exchange instances used across components
export const bybitSpot = new BybitSpotWebsocket();
export const bybitFutures = new BybitFuturesWebsocket();
export const bybitFuturesv3 = new BybitFuturesv3Websocket();
export const bybitSpotv3 = new BybitSpotv3Websocket();
export const bybitSpotv1 = new BybitSpotv1Websocket();
export const binanceSpot = new BinanceSpotWebsocket();
export const binanceFutures = new BinanceFuturesWebsocket();
export const okxSpot = new OKXSpotWebsocket();
export const okxFutures = new OKXFuturesWebsocket();
export const wooxSpot = new WooXSpotWebsocket();
export const wooxFutures = new WooXFuturesWebsocket();
export const kucoin = new KuCoinCORSWebsocket(); 