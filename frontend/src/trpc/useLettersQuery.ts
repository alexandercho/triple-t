import { trpc } from '@/trpc/TrpcProvider';

export const useLettersQuery = () => trpc.letters.useQuery();
