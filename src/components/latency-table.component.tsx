import { For, Show, createMemo, onCleanup, onMount } from 'solid-js';

import {
  binanceSpot,
  binanceFutures,
  bybitSpot,
  bybitFutures,
  hyperliquid,
  kucoin,
  okxSpot,
  okxFutures,
  wooxSpot,
  wooxFutures
} from '~/exchanges/shared-instances';

const LatencyTable = () => {
  onMount(() => {
    binanceSpot.connect();
    binanceFutures.connect();
    bybitFutures.connect();
    bybitSpot.connect();
    hyperliquid.connect();
    kucoin.connect();
    okxFutures.connect();
    okxSpot.connect();
    wooxFutures.connect();
    wooxSpot.connect();
  });

  onCleanup(() => {
    binanceSpot.close();
    binanceFutures.close();
    bybitFutures.close();
    bybitSpot.close();
    hyperliquid.close();
    kucoin.close();
    okxFutures.close();
    okxSpot.close();
    wooxFutures.close();
    wooxSpot.close();
  });

  const showWarning = createMemo(
    () =>
      binanceSpot.hasError() ||
      binanceFutures.hasError() ||
      bybitFutures.hasError() ||
      bybitSpot.hasError() ||
      hyperliquid.hasError() ||
      kucoin.hasError() ||
      okxFutures.hasError() ||
      okxSpot.hasError() ||
      wooxFutures.hasError() ||
      wooxSpot.hasError()
  );

  const exchanges = [
    {
      name: 'Binance Spot',
      stream: 'BTCUSDT@trade',
      latency: binanceSpot.latency,
      link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
    },
    {
      name: 'Binance Futures',
      stream: 'BTCUSDT@trade',
      latency: binanceFutures.latency,
      link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
    },
    {
      name: 'Bybit Futures',
      stream: 'tickers.BTCUSDT',
      latency: bybitFutures.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },

    {
      name: 'Bybit Spot',
      stream: 'tickers.BTCUSDT',
      latency: bybitSpot.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Hyperliquid',
      stream: 'trades.BTC',
      latency: hyperliquid.latency,
      link: 'https://hyperliquid.xyz/',
    },
    {
      name: 'KuCoin',
      stream: 'CORS error timing',
      latency: kucoin.latency,
      link: 'https://www.kucoin.com/ucenter/signup?rcode=rMSUDAG',
    },
    {
      name: 'OKX Futures',
      stream: 'tickers.BTC-USDT-SWAP',
      latency: okxFutures.latency,
      link: 'https://www.okx.com/join/SAFECEX',
    },
    {
      name: 'OKX Spot',
      stream: 'tickers.BTC-USDT',
      latency: okxSpot.latency,
      link: 'https://www.okx.com/join/SAFECEX',
    },
    {
      name: 'Woo X Futures',
      stream: 'PERP_BTC_USDT@ticker',
      latency: wooxFutures.latency,
      link: 'https://x.woo.org/en/trade?ref=safecex',
    },
    {
      name: 'Woo X Spot',
      stream: 'SPOT_BTC_USDT@ticker',
      latency: wooxSpot.latency,
      link: 'https://x.woo.org/en/trade?ref=safecex',
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
