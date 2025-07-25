import LatencyTable from '~/components/latency-table.component';
import PingTable from '~/components/ping-table.component';
import TimeSyncCheck from '~/components/time-sync-check.component';

const Home = () => {
  return (
    <main class="max-w-[920px] mx-auto text-gray-700 dark:text-gray-300 p-4">
      <div class="text-center my-10">
                <img 
          src="/gte-logo_ora.webp"
          alt="GTE Logo" 
          class="mx-auto mb-1 h-40 md:h-48 w-auto logo-shadow"
        />
         <h1 class="text-3xl md:text-4xl font-black text-orange-500 dark:text-orange-400 uppercase tracking-wider text-shadow" style="font-family: 'Orbitron', monospace;">
           EXCHANGE LATENCY TESTER
         </h1>
      </div>
      <TimeSyncCheck />
      <LatencyTable />
      <div class="h-12" />
      <PingTable />
    </main>
  );
};

export default Home;
