import { For, Show, createMemo, onCleanup, onMount } from 'solid-js';

import {
  bybitSpot,
  bybitFutures,
  bybitFuturesv3,
  bybitSpotv3,
  bybitSpotv1,
  binanceSpot,
  binanceFutures,
  okxSpot,
  okxFutures,
  wooxSpot,
  wooxFutures,
  kucoin
} from '~/exchanges/shared-instances';

const LatencyTable = () => {
  onMount(() => {
    bybitSpot.connect();
    bybitFutures.connect();
    bybitFuturesv3.connect();
    bybitSpotv3.connect();
    bybitSpotv1.connect();
    binanceSpot.connect();
    binanceFutures.connect();
    okxSpot.connect();
    okxFutures.connect();
    wooxSpot.connect();
    wooxFutures.connect();
    kucoin.connect();
  });

  onCleanup(() => {
    bybitSpot.close();
    bybitFutures.close();
    bybitFuturesv3.close();
    bybitSpotv3.close();
    bybitSpotv1.close();
    binanceSpot.close();
    binanceFutures.close();
    okxSpot.close();
    okxFutures.close();
    wooxSpot.close();
    wooxFutures.close();
    kucoin.close();
  });

  const showWarning = createMemo(
    () =>
      bybitSpot.hasError() ||
      bybitFutures.hasError() ||
      bybitFuturesv3.hasError() ||
      bybitSpotv3.hasError() ||
      bybitSpotv1.hasError() ||
      binanceSpot.hasError() ||
      binanceFutures.hasError() ||
      okxSpot.hasError() ||
      okxFutures.hasError() ||
      wooxSpot.hasError() ||
      wooxFutures.hasError() ||
      kucoin.hasError()
  );

  const exchanges = [
    {
      name: 'Bybit Futures v5',
      stream: 'tickers.BTCUSDT',
      latency: bybitFutures.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Futures v3',
      stream: 'tickers.BTCUSDT',
      latency: bybitFuturesv3.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Spot v5',
      stream: 'tickers.BTCUSDT',
      latency: bybitSpot.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Spot v3',
      stream: 'tickers.BTCUSDT',
      latency: bybitSpotv3.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Spot v1',
      stream: 'tickers.BTCUSDT',
      latency: bybitSpotv1.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'OKX Spot',
      stream: 'tickers.BTC-USDT',
      latency: okxSpot.latency,
      link: 'https://www.okx.com/join/SAFECEX',
    },
    {
      name: 'OKX Futures',
      stream: 'tickers.BTC-USDT-SWAP',
      latency: okxFutures.latency,
      link: 'https://www.okx.com/join/SAFECEX',
    },
    {
      name: 'Binance Spot',
      stream: 'BTCUSDT@trade',
      latency: binanceSpot.latency,
      link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
    },
    {
      name: 'Binance USD-M Futures',
      stream: 'BTCUSDT@trade',
      latency: binanceFutures.latency,
      link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
    },
    {
      name: 'Woo X Spot',
      stream: 'SPOT_BTC_USDT@ticker',
      latency: wooxSpot.latency,
      link: 'https://x.woo.org/en/trade?ref=safecex',
    },
    {
      name: 'Woo X Futures',
      stream: 'PERP_BTC_USDT@ticker',
      latency: wooxFutures.latency,
      link: 'https://x.woo.org/en/trade?ref=safecex',
    },
    {
      name: 'KuCoin',
      stream: 'CORS error timing',
      latency: kucoin.latency,
      link: 'https://www.kucoin.com/ucenter/signup?rcode=rMSUDAG',
    },
  ];

  return (
    <>
      <Show when={showWarning()}>
        <div class="text-center text-orange-500 dark:text-orange-400 text-sm mb-2">
          Connection issues detected. Results may be inaccurate.
        </div>
      </Show>
      <table class="table table-auto w-full max-w-[700px] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20">
      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th class="text-left uppercase text-gray-700 dark:text-gray-300 py-1 px-3">Exchange</th>
          <th class="text-left uppercase hidden md:table-cell text-gray-700 dark:text-gray-300 py-1 px-3">Stream</th>
          <th class="text-right uppercase text-gray-700 dark:text-gray-300 py-1 px-3">Latency</th>
        </tr>
      </thead>
      <tbody>
        <For each={exchanges}>
          {(exchange) => (
            <tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="text-left py-1 px-3">
                <a
                  href={exchange.link}
                  class="border-b border-dotted border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  {exchange.name}
                </a>
              </td>
              <td class="text-left font-mono text-xs hidden md:table-cell py-1 px-3 text-gray-600 dark:text-gray-400">
                {exchange.stream}
              </td>
              <td class="text-right font-mono py-1 px-3 text-gray-900 dark:text-gray-100">{exchange.latency() || 0}ms</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
    </>
  );
};

export default LatencyTable;
