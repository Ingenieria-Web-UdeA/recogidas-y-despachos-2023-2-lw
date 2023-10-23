import { useDateFilters } from '@/atoms/DateFiltersAtom';
import { API_SERVICES, fetcher } from '@/service';
import { CollectionsQuery } from '@/types';
import useSWR from 'swr';

const useGetCollections = () => {
  const { dateFilters } = useDateFilters();

  const { data, isLoading, error } = useSWR<CollectionsQuery>(
    `${API_SERVICES.collections}?year=${dateFilters.year}&month=${
      dateFilters.month + 1
    }`,
    fetcher
  );

  return {
    collections: data?.collections,
    isLoading,
    error,
  };
};

export { useGetCollections };
