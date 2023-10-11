import { Dialog } from '@/components/ui/Dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { API_SERVICES } from '@/service';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { User } from '@/types';

interface DeleteUserDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const DeleteUserDialog = ({ open, setOpen, user }: DeleteUserDialogProps) => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    setLoading(true);
    try {
      await axios.request({
        method: 'DELETE',
        url: `${API_SERVICES.users}/${user.id}`,
      });
      await mutate(API_SERVICES.users);
      toast.success('Usuario eliminado correctamente');
    } catch (error) {
      toast.error('Error eliminando el usuario');
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog
      title='Eliminar el usuario'
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center'>
          <span>Esta acción no se puede revertir.</span>
          <span>¿Está seguro de querer eliminar el usuario?</span>
        </div>
        <div className='flex gap-3'>
          <button
            disabled={loading}
            type='button'
            onClick={deleteUser}
            className='primary'
          >
            {loading ? <Spinner /> : <span>Continuar</span>}
          </button>
          <button
            disabled={loading}
            type='button'
            onClick={() => {
              setOpen(false);
            }}
            className='secondary'
          >
            Cancelar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export { DeleteUserDialog };
