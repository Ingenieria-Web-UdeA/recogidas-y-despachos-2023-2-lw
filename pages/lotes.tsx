import { useGetLots } from '@/hooks/useGetLots';

const LotsPage = () => {
  const { lots, isLoading } = useGetLots();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className='p-10 flex flex-col gap-3 items-center'>
      <section>
        <div className='w-full flex justify-center'>
          <h1>Gestión de lotes</h1>
        </div>
      </section>
      <section className='flex justify-center'>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {lots?.map((lot) => {
              return (
                <tr key={lot.id}>
                  <td>{lot.name}</td>
                  <td>{new Date(lot.createdAt).toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LotsPage;
