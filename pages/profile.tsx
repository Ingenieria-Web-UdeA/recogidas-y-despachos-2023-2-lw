import { PrivateRoute } from '@/components/PrivateRoute';

const ProfilePageWrapper = () => {
  return (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  );
};

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default ProfilePageWrapper;
