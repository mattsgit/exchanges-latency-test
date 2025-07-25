import { Show } from 'solid-js';
import { getBaselineInfo } from '~/utils/baseline-latency';

const BaselineInfo = () => {
  const { baseline, systemLoad } = getBaselineInfo();

  return (
    <Show when={baseline() > 0 || systemLoad() > 0}>
      <div class="text-center mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 inline-block">
          <span class="font-mono">
            Baseline: {baseline().toFixed(1)}ms | System: {systemLoad().toFixed(1)}ms | 
            <span class="text-green-600 dark:text-green-400"> Compensation Applied ✓</span>
          </span>
        </div>
      </div>
    </Show>
  );
};

export default BaselineInfo; 