import { useDateFilters } from '@/atoms/DateFiltersAtom';
import { API_SERVICES, fetcher } from '@/service';
import { ShipmentsQuery } from '@/types';
import useSWR from 'swr';

const useGetShipments = () => {
  const { dateFilters } = useDateFilters();

  const { data, isLoading, error } = useSWR<ShipmentsQuery>(
    `${API_SERVICES.shipments}?year=${dateFilters.year}&month=${
      dateFilters.month + 1
    }`,
    fetcher
  );

  return { shipments: data?.shipments, isLoading, error };
};

export { useGetShipments };
