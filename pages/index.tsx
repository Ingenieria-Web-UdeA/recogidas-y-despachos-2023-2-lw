import { NavigationCard } from '@/components/NavigationCard';

const Home = () => {
  return (
    <main className='flex flex-col w-full h-screen items-center justify-center gap-4'>
      <h1>Sistema de recogidas y despachos</h1>
      <div className='flex gap-4'>
        <NavigationCard
          title='Usuarios'
          description='Gestionar los usuarios de la plataforma'
          href='/usuarios'
        />
        <NavigationCard
          title='Lotes'
          description='Crear, actualizar o eliminar lotes'
          href='/lotes'
        />
      </div>
    </main>
  );
};

export default Home;
