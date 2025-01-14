import Footer from '../footer';
import NavBar from '../navbar';

export default function Layout({ children }) {
  return (
    <main className="bg-background-pssi">
      <NavBar />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
