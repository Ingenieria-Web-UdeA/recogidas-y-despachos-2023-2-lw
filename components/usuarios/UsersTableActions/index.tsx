import { Tooltip } from '@/components/ui/Tooltip';
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md';
import { DeleteUserDialog } from '@/components/usuarios/DeleteUserDialog';
import { useState } from 'react';
import { User } from '@/types';

interface UsersTableActionsProps {
  user: User;
}

const UsersTableActions = ({ user }: UsersTableActionsProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <div className='text-2xl flex gap-3'>
      <Tooltip message='Actualizar el usuario'>
        <button type='button' className='hover:text-yellow-700'>
          <MdOutlineModeEditOutline />
        </button>
      </Tooltip>
      <Tooltip message='Eliminar el usuario'>
        <button
          onClick={() => {
            setOpenDeleteDialog(true);
          }}
          type='button'
          className='hover:text-red-700'
        >
          <MdDeleteOutline />
        </button>
      </Tooltip>
      <DeleteUserDialog
        user={user}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
    </div>
  );
};

export { UsersTableActions };
