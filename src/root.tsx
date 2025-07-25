// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';
import DarkModeToggle from './components/dark-mode-toggle.component';

const Root = () => {
  return (
    <Html lang="en">
      <Head>
        <Title>Exchange Latency Tester - Test Your Trading Speed Today</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta
          name="description"
          content="Improve your trading experience with our exchange latency tester. Check your trading speed and optimize your trades with our powerful tool. Boost your trading profits now!"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href={`${import.meta.env.BASE_URL}favicon.ico?v=2`} />
        <link rel="shortcut icon" type="image/x-icon" href={`${import.meta.env.BASE_URL}favicon.ico?v=2`} />
      </Head>
      <Body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <DarkModeToggle />
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
};

export default Root;
