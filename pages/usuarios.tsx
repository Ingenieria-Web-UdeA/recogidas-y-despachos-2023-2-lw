import { PrivateRoute } from '@/components/PrivateRoute';
import { Tooltip } from '@/components/ui/Tooltip';
import { NewUserDialog } from '@/components/usuarios/NewUserDialog';
import { UsersTableActions } from '@/components/usuarios/UsersTableActions';
import { useGetRoles } from '@/hooks/useGetRoles';
import { API_SERVICES, fetcher } from '@/service';
import { UsersQuery } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import useSWR from 'swr';

const UsersPage = () => {
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const { roles } = useGetRoles();
  const { data, isLoading, error } = useSWR<UsersQuery>(
    API_SERVICES.users,
    fetcher
  );

  if (isLoading) return <div>Cargando...</div>;

  if (error) return <div>Ha ocurrido un error</div>;

  return (
    <PrivateRoute>
      <div className='w-full flex flex-col items-center p-10 gap-4'>
        <section>
          <div className='flex items-center gap-3'>
            <h1>Gestión de usuarios</h1>
            <Tooltip message='Crear nuevo usuario'>
              <button
                type='button'
                onClick={() => setOpenNewUserDialog(true)}
                className='flex text-2xl mt-2 text-indigo-700 hover:scale-110'
              >
                <AiOutlinePlusCircle />
              </button>
            </Tooltip>
          </div>
        </section>
        <section>
          <table cellSpacing='0'>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
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
                      {roles?.find((r) => r.id === user.roleId)?.name ?? ''}
                    </td>
                    <td>
                      <UsersTableActions user={user} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <NewUserDialog
          open={openNewUserDialog}
          setOpen={setOpenNewUserDialog}
        />
      </div>
    </PrivateRoute>
  );
};

export default UsersPage;
