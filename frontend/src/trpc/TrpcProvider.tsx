import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import { useState, type ReactNode } from 'react';
import { httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@/trpc/types';

export const trpc = createTRPCReact<AppRouter>();

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL is not configured');
}

export function TrpcProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${apiUrl}/trpc`,
          methodOverride: 'GET',
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
