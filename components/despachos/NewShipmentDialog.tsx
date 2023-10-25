import { Dialog } from '@/components/ui/Dialog';
import { Dispatch, SetStateAction, useState, SyntheticEvent } from 'react';
import {
  PrimaryActionButton,
  SecondaryActionButton,
} from '@/components/ui/Buttons';
import axios from 'axios';
import { API_SERVICES } from '@/service';
import { mutate } from 'swr';
import { useDateFilters } from '@/atoms/DateFiltersAtom';
import { toast } from 'react-toastify';

interface NewShipmentDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewShipmentDialog = ({ open, setOpen }: NewShipmentDialogProps) => {
  const { dateFilters } = useDateFilters();
  const [formData, setFormData] = useState({
    shipmentDate: '',
    shippedBunches: '',
    deliveredWeight: '',
  });
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.request({
        method: 'POST',
        url: API_SERVICES.shipments,
        data: {
          ...formData,
        },
      });

      await mutate(
        `${API_SERVICES.shipments}??year=${dateFilters.year}&month=${
          dateFilters.month + 1
        }`
      );

      toast.success('Despacho creado exitosamente');
      setOpen(false);
    } catch {
      toast.error('Error al crear despacho');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title='Nuevo despacho'>
      <div>
        <form className='flex flex-col gap-3' onSubmit={submitForm}>
          <label htmlFor='shipmentDate'>
            <span>Fecha del despacho</span>
            <input
              name='shipmentDate'
              required
              type='date'
              value={formData.shipmentDate}
              onChange={(e) => {
                setFormData({ ...formData, shipmentDate: e.target.value });
              }}
            />
          </label>
          <label htmlFor='shippedBunches'>
            <span>Cantidad de racimos despachados</span>
            <input
              name='shippedBunches'
              required
              type='number'
              placeholder='0'
              value={formData.shippedBunches}
              onChange={(e) => {
                setFormData({ ...formData, shippedBunches: e.target.value });
              }}
            />
          </label>
          <label htmlFor='deliveredWeight'>
            <span>Kilos entregados en planta</span>
            <input
              name='deliveredWeight'
              required
              type='number'
              placeholder='0'
              value={formData.deliveredWeight}
              onChange={(e) => {
                setFormData({ ...formData, deliveredWeight: e.target.value });
              }}
            />
          </label>
          <div className='flex gap-3'>
            <PrimaryActionButton
              text='Crear despacho'
              loading={loading}
              type='submit'
              onClick={() => {}}
            />
            <SecondaryActionButton
              text='Cancelar'
              onClick={() => setOpen(false)}
              loading={loading}
              type='button'
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export { NewShipmentDialog };
