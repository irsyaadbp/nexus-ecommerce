import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './main.css'
import router from './router.tsx'
import { Toaster } from '@/components/ui/sonner'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import LogRocket from 'logrocket';
import { getVisitorId } from './hooks/useVisitor';
import { LOGROCKET_APP_KEY } from './lib/constants';

LogRocket.init(LOGROCKET_APP_KEY);
LogRocket.identify(getVisitorId());

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
