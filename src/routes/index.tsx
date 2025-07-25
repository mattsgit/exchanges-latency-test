import LatencyTable from '~/components/latency-table.component';
import PingTable from '~/components/ping-table.component';
import TimeSyncCheck from '~/components/time-sync-check.component';

const Home = () => {
  return (
    <main class="max-w-[920px] mx-auto text-gray-700 dark:text-gray-300 p-4">
      <h1 class="text-center max-6-xs text-6xl text-sky-700 dark:text-sky-400 font-thin uppercase my-16">
        EXCHANGES LATENCY TESTER
      </h1>
      <TimeSyncCheck />
      <LatencyTable />
      <div class="h-12" />
      <PingTable />
    </main>
  );
};

export default Home;
