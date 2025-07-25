import { For, createEffect, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

import { avg, p95, p99, max } from '~/utils/percentile.utils';

// Import the shared exchange instances
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

const SLIDING_WINDOW_SIZE = 1000; // Keep last 1000 samples

interface AggregatedExchange {
  name: string;
  latencies: number[];
  link: string;
}

const [aggregatedData, setAggregatedData] = createStore<AggregatedExchange[]>([
  { name: 'Bybit', latencies: [], link: 'https://partner.bybit.com/b/safecex' },
  { name: 'Binance', latencies: [], link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0' },
  { name: 'OKX', latencies: [], link: 'https://www.okx.com/join/SAFECEX' },
  { name: 'Woo X', latencies: [], link: 'https://x.woo.org/en/trade?ref=safecex' },
  { name: 'KuCoin', latencies: [], link: 'https://www.kucoin.com/ucenter/signup?rcode=rMSUDAG' },
]);

// Function to aggregate latency data from all exchange instances
const aggregateLatencyData = () => {
  // Collect all current latency values
  const bybitLatencies = [
    bybitSpot.latency(),
    bybitFutures.latency(), 
    bybitFuturesv3.latency(),
    bybitSpotv3.latency(),
    bybitSpotv1.latency()
  ].filter(l => l > 0);

  const binanceLatencies = [
    binanceSpot.latency(),
    binanceFutures.latency()
  ].filter(l => l > 0);

  const okxLatencies = [
    okxSpot.latency(),
    okxFutures.latency()
  ].filter(l => l > 0);

  const wooxLatencies = [
    wooxSpot.latency(),
    wooxFutures.latency()
  ].filter(l => l > 0);

  const kucoinLatencies = [
    kucoin.latency()
  ].filter(l => l > 0);

  // Update aggregated data with sliding window
  const updateExchangeData = (index: number, newLatencies: number[]) => {
    if (newLatencies.length > 0) {
      const avgLatency = Math.round(newLatencies.reduce((a, b) => a + b, 0) / newLatencies.length);
      const currentLatencies = [...aggregatedData[index].latencies, avgLatency];
      const slidingWindow = currentLatencies.length > SLIDING_WINDOW_SIZE 
        ? currentLatencies.slice(-SLIDING_WINDOW_SIZE)
        : currentLatencies;
      
      setAggregatedData(index, 'latencies', slidingWindow);
    }
  };

  updateExchangeData(0, bybitLatencies);    // Bybit
  updateExchangeData(1, binanceLatencies);  // Binance  
  updateExchangeData(2, okxLatencies);      // OKX
  updateExchangeData(3, wooxLatencies);     // Woo X
  updateExchangeData(4, kucoinLatencies);   // KuCoin
};

const PingTable = () => {
  // Set up reactive effect to aggregate data when exchange latencies change
  createEffect(() => {
    const interval = setInterval(() => {
      aggregateLatencyData();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  });

  return (
    <table class="table table-auto w-full max-w-[700px] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20">
      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th class="text-left uppercase text-gray-700 dark:text-gray-300 py-1 px-3">Exchange</th>
          <th class="text-right uppercase text-gray-700 dark:text-gray-300 py-1 px-3">Latency Percentiles<br/><span class="text-xs normal-case text-gray-500 dark:text-gray-400">Last {SLIDING_WINDOW_SIZE} samples</span></th>
        </tr>
      </thead>
      <tbody class="text-sm md:text-base">
        <For each={aggregatedData}>
          {(exchange) => (
            <tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-1 px-3">
                <a
                  href={exchange.link}
                  class="border-b border-dotted border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exchange.name}
                </a>
              </td>
              <td class="text-right font-mono text-xs md:text-sm py-1 px-3">
                {exchange.latencies.length > 0 ? (
                  <>
                    <div class="leading-tight text-gray-900 dark:text-gray-100">
                      <div>Avg: {avg(exchange.latencies)}ms | P95: {p95(exchange.latencies)}ms</div>
                      <div>P99: {p99(exchange.latencies)}ms | Max: {max(exchange.latencies)}ms</div>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      ({exchange.latencies.length} samples)
                    </div>
                  </>
                ) : (
                  <span class="text-gray-400 dark:text-gray-500">Collecting data...</span>
                )}
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default PingTable;
