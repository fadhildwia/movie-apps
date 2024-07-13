import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import StoreProvider from './store/StoreProvider.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>,
)
