import { DateFilters } from '@/components/recogidas/DateFilters';
import { useGetCollections } from '@/hooks/useGetCollections';

const CollectionsPage = () => {
  const { isLoading } = useGetCollections();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 gap-3'>
      <section>
        <div>
          <h1>Gestión de Recogidas</h1>
        </div>
      </section>
      <section>
        <DateFilters />
      </section>
      <section>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Racimos</th>
              <th>Lote</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    </div>
  );
};

export default CollectionsPage;
