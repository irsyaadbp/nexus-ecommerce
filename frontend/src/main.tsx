import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './main.css'
import router from './router.tsx'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from './components/auth/AuthProvider'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import LogRocket from 'logrocket';
import { ANALYTIC_ENABLE, LOGROCKET_APP_KEY } from './lib/constants';

if (ANALYTIC_ENABLE) {
  LogRocket.init(LOGROCKET_APP_KEY);
}

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
