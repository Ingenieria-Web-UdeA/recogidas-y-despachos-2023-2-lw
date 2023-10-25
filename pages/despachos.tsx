import { PrivateRoute } from '@/components/PrivateRoute';
import { IndicatorCard } from '@/components/despachos/IndicatorCard';
import { NewShipmentDialog } from '@/components/despachos/NewShipmentDialog';
import { DateFilters } from '@/components/recogidas/DateFilters';
import { Tooltip } from '@/components/ui/Tooltip';
import { useGetShipments } from '@/hooks/useGetShipments';
import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const ShipmentsPage = () => {
  const [openNewShipmentDialog, setOpenNewShipmentDialog] = useState(false);
  const { shipments, isLoading } = useGetShipments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalWeight = shipments?.reduce((acc, shipment) => {
    return acc + shipment.deliveredWeight;
  }, 0);

  const totalBunches = shipments?.reduce((acc, shipment) => {
    return acc + shipment.shippedBunches;
  }, 0);

  const averageBunchWeight = (totalWeight ?? 0) / (totalBunches ?? 1);

  return (
    <PrivateRoute>
      <div className='flex flex-col items-center p-10 gap-3'>
        <section>
          <div className='flex items-center gap-3'>
            <h1>Gestión de despachos</h1>
            <Tooltip message='Crear nuevo despacho'>
              <button
                type='button'
                onClick={() => setOpenNewShipmentDialog(true)}
                className='flex text-2xl mt-2 text-indigo-700 hover:scale-110'
              >
                <AiOutlinePlusCircle />
              </button>
            </Tooltip>
          </div>
        </section>
        <section>
          <DateFilters />
        </section>
        <section>
          <div className='flex gap-3'>
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th>Despacho</th>
                  <th>Fecha</th>
                  <th>Racimos despachados</th>
                  <th>Peso por racimo</th>
                  <th>Kilos entregados en planta</th>
                </tr>
              </thead>
              <tbody>
                {shipments?.map((shipment, index) => {
                  return (
                    <tr key={shipment.id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(
                          shipment.shipmentDate
                            .toString()
                            .replace('T00:00:00.000Z', '')
                        ).toDateString()}
                      </td>
                      <td>{shipment.shippedBunches}</td>
                      <td>{shipment.bunchWeight.toFixed(2)}</td>
                      <td>{shipment.deliveredWeight}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='flex flex-col gap-4'>
              <IndicatorCard
                title='Total de racimos recogidos'
                value={totalBunches ?? 0}
              />
              <IndicatorCard
                title='Peso promedio por racimo'
                value={`${averageBunchWeight.toFixed(2)} kg`}
              />
              <IndicatorCard
                title='Total de kilos entregados'
                value={totalWeight ?? 0}
              />
            </div>
          </div>
        </section>
        <NewShipmentDialog
          open={openNewShipmentDialog}
          setOpen={setOpenNewShipmentDialog}
        />
      </div>
    </PrivateRoute>
  );
};

export default ShipmentsPage;
