import { DateFilters } from '@/components/recogidas/DateFilters';
import { useGetShipments } from '@/hooks/useGetShipments';

const ShipmentsPage = () => {
  const { shipments, isLoading } = useGetShipments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 gap-3'>
      <section>
        <div>
          <h1>Gestión de Despachos</h1>
        </div>
      </section>
      <section>
        <DateFilters />
      </section>
      <section>
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
          <tbody></tbody>
        </table>
      </section>
    </div>
  );
};

export default ShipmentsPage;
