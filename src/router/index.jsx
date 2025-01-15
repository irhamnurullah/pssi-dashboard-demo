import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout';
import { navList } from '../assets/data/list-nav';
import LoginPage from '@/app/login/page';
import EntryPage from '@/app/entry/page';

export default function Main() {
  return (
    <Router>
      <Layout>
        <Routes>
          {navList.map((item) => (
            <Route key={item.link} path={item.link} element={<item.element />} />
          ))}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<EntryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
