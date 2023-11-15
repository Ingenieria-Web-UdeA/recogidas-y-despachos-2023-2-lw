import { API_SERVICES, fetcher } from '@/service';
import { ProfileQuery } from '@/types';
import useSWR from 'swr';

const useGetUserProfile = () => {
  const { data, isLoading, error } = useSWR<ProfileQuery>(
    API_SERVICES.profile,
    fetcher
  );

  return {
    profile: data?.userProfile,
    isLoading,
    error,
  };
};

export { useGetUserProfile };
