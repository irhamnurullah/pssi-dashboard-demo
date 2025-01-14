import { useLocation } from 'react-router-dom';
import Footer from '../footer';
import NavBar from '../navbar';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <main className="bg-background-pssi">
      {location.pathname !== '/login' && <NavBar />}
      <div>{children}</div>
      {location.pathname !== '/login' && <Footer />}
    </main>
  );
}
