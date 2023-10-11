import { UsersTableActions } from '@/components/usuarios/UsersTableActions';
import { API_SERVICES, fetcher } from '@/service';
import { UsersQuery } from '@/types';
import Image from 'next/image';
import useSWR from 'swr';

const UsersPage = () => {
  const { data, isLoading, error } = useSWR<UsersQuery>(
    API_SERVICES.users,
    fetcher
  );

  if (isLoading) return <div>Cargando...</div>;

  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <div className='w-full flex flex-col items-center p-10 gap-4'>
      <section>
        <h1>Gestión de usuarios</h1>
      </section>
      <section>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Image
                      className='rounded-full'
                      src={user?.image ?? '/media/default-user.jpg'}
                      height={30}
                      width={30}
                      alt='user image'
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <UsersTableActions user={user} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UsersPage;
