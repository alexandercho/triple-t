import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@/trpc/types';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL is not configured');
}

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${apiUrl}/trpc`,
      methodOverride: 'GET',
    }),
  ],
});
