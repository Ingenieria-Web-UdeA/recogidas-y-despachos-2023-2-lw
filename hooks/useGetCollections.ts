import { API_SERVICES, fetcher } from '@/service';
import { CollectionsQuery } from '@/types';
import useSWR from 'swr';

const useGetCollections = () => {
  const { data, isLoading, error } = useSWR<CollectionsQuery>(
    API_SERVICES.collections,
    fetcher
  );

  return {
    collections: data?.collections,
    isLoading,
    error,
  };
};

export { useGetCollections };
