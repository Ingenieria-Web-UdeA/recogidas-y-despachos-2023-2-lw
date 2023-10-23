import { Collection } from '@prisma/client';
import { useState } from 'react';
import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
import { Tooltip } from '@/components/ui/Tooltip';
import axios from 'axios';
import { API_SERVICES } from '@/service';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/ui/Spinner';
import { mutate } from 'swr';
import { useDateFilters } from '@/atoms/DateFiltersAtom';

interface CollectionCellProps {
  collection: Collection;
}

const CollectionCell = ({ collection }: CollectionCellProps) => {
  const { dateFilters } = useDateFilters();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newBunches, setNewBunches] = useState(collection.bunches);

  const updateCollection = async () => {
    setLoading(true);

    try {
      await axios.request({
        method: 'PUT',
        url: `${API_SERVICES.collections}/${collection.id}`,
        data: { bunches: newBunches },
      });
      await mutate(
        `${API_SERVICES.collections}?year=${dateFilters.year}&month=${
          dateFilters.month + 1
        }`
      );
      toast.success('Recogida actualizada correctamente');
    } catch (error) {
      toast.error('Error actualizando la recogida');
    }

    setLoading(false);

    setEdit(false);
  };

  if (loading) return <Spinner />;

  return (
    <div className='min-w-[100px]'>
      {edit ? (
        <div className='flex gap-2'>
          <input
            className='w-12'
            placeholder={collection.bunches.toString()}
            value={newBunches}
            onChange={(e) => setNewBunches(parseInt(e.target.value))}
          />
          <div className='flex items-center gap-1 mt-2'>
            <Tooltip message='Actualizar recogida'>
              <button
                onClick={updateCollection}
                className='text-xl text-green-500 hover:text-green-800'
              >
                <MdOutlineCheckCircle />
              </button>
            </Tooltip>
            <Tooltip message='Cancelar'>
              <button
                onClick={() => setEdit(false)}
                className='text-xl text-red-500 hover:text-red-800'
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
        </div>
      ) : (
        <button onClick={() => setEdit(true)}>
          <span>{collection.bunches}</span>
        </button>
      )}
    </div>
  );
};

export { CollectionCell };
