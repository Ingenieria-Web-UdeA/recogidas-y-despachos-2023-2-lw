import { Navbar } from '@/components/ui/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='flex flex-col'>
      <Navbar />
      {children}
    </main>
  );
};

export { Layout };
