import { Link, useLocation } from 'react-router-dom';
import { navList } from '@/assets/data/list-nav';
import { cn } from '@/lib/utils.js';

export default function NavBar() {
  const location = useLocation();

  return (
    <header className="flex items-center border px-10 py-5 sticky top-0 z-50 bg-background-pssi">
      <div className="justify-self-start">
        <img src="/pssi-logo.svg" alt="logo" />
      </div>
      <nav className="flex-1">
        {/* nav item */}

        <ul className="flex items-center justify-center space-x-2">
          {navList.map((item) => (
            <Link key={item.link} to={item.link}>
              <li
                className={cn(
                  'px-4 py-1.5 rounded-full  text-sm font-light text-center hover:bg-primary-pssi/60 hover:text-white duration-100',
                  location.pathname.includes(item.link) ? 'bg-primary-pssi text-white hover:bg-primary-pssi font-semibold' : 'text-neutral-900'
                )}
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
