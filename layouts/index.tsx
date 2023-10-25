import { Navbar } from '@/components/ui/Navbar';
import { useSession } from 'next-auth/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <main className='flex flex-col'>
        <Navbar />
        {children}
      </main>
    );
  }

  return <main className='flex flex-col'>{children}</main>;
};

export { Layout };
