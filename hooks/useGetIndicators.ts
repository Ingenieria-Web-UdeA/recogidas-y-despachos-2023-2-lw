import { API_SERVICES, fetcher } from '@/service';
import { IndicatorsQuery } from '@/types';
import useSWR from 'swr';

const useGetIndicators = () => {
  const { data, isLoading, error } = useSWR<IndicatorsQuery>(
    API_SERVICES.indicators,
    fetcher
  );

  return {
    indicators: data?.indicadores,
    isLoading,
    error,
  };
};

export { useGetIndicators };
