import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'animate.css';
import { Toaster } from 'sonner';
import routes from './routes';
import Proloader from './components/Proloader';

function App() {
  const router = createBrowserRouter(routes, {
    future: {
      // Enable the new data APIs
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  });

  return (
    <Suspense fallback={<Proloader />}>
      <Toaster richColors position='bottom-left' />
      <RouterProvider 
        router={router} 
        fallbackElement={<Proloader />}
      />
    </Suspense>
  );
}

export default App;
