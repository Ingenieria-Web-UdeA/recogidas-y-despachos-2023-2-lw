import { API_SERVICES, fetcher } from '@/service';
import Image from 'next/image';
import useSWR from 'swr';

const UsersPage = () => {
  const { data, isLoading, error } = useSWR(API_SERVICES.users, fetcher);

  if (isLoading) return <div>Cargando...</div>;

  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <main className='flex flex-col items-center p-10 gap-5'>
      <section>
        <h1>Gestión de usuarios</h1>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Correo electrónico</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Image
                      className='rounded-full'
                      src={user.image}
                      height={30}
                      width={30}
                      alt='user image'
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default UsersPage;
