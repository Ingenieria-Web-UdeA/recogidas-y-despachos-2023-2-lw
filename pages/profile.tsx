import { PrivateRoute } from '@/components/PrivateRoute';

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <div>
        <h1>Profile</h1>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
