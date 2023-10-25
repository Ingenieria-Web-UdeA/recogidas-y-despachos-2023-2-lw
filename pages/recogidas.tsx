import { PrivateRoute } from '@/components/PrivateRoute';
import { CollectionCell } from '@/components/recogidas/CollectionCell';
import { DateFilters } from '@/components/recogidas/DateFilters';
import { useGetCollections } from '@/hooks/useGetCollections';
import { useGetLots } from '@/hooks/useGetLots';
import _ from 'lodash';

const CollectionsPage = () => {
  const { lots } = useGetLots();
  const { collections, isLoading } = useGetCollections();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const groupedCollections = _.groupBy(collections, 'collectionDate');

  return (
    <PrivateRoute>
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
                <th>Fecha</th>
                {lots?.map((lot) => {
                  return <th key={lot.id}>{lot.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedCollections).map((collectionDate) => {
                return (
                  <tr key={collectionDate}>
                    <td>{collectionDate.replace('T00:00:00.000Z', '')}</td>
                    {groupedCollections[collectionDate].map((collection) => {
                      return (
                        <td key={collection.id}>
                          <CollectionCell collection={collection} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </PrivateRoute>
  );
};

export default CollectionsPage;
