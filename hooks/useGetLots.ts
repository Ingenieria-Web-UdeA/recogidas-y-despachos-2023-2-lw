import { API_SERVICES, fetcher } from '@/service';
import { LotsQuery } from '@/types';
import useSWR from 'swr';

const useGetLots = () => {
  const { data, isLoading, error } = useSWR<LotsQuery>(
    API_SERVICES.lots,
    fetcher
  );

  return {
    lots: data?.lots,
    isLoading,
    error,
  };
};

export { useGetLots };
