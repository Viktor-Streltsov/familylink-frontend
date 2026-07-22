import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AppRouter } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000, // 1 минута по умолчанию
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: 'Nunito, system-ui, sans-serif',
          },
        }}
      />
    </QueryClientProvider>
  )
}
