import { PrimaryActionButton } from '@/components/ui/Buttons';
import { NavigationCard } from '@/components/ui/NavigationCard';
import { useSession, signIn } from 'next-auth/react';

const Home = () => {
  const { status } = useSession();

  return (
    <main className='flex flex-col w-full h-screen items-center justify-center gap-4'>
      <h1>Sistema de recogidas y despachos</h1>
      {status === 'authenticated' ? (
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
      ) : (
        <div>
          <PrimaryActionButton
            loading={status === 'loading'}
            text='Iniciar sesión'
            onClick={() => {
              signIn('auth0');
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
