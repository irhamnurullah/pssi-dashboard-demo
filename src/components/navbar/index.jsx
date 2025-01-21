import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navList } from '@/assets/data/list-nav';
import { cn } from '@/lib/utils.js';
import sessions from '../../../utils/sessions';

export default function NavBar({ bgColor, selectedTextColor, secondaryTextColor }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessions.clearSession();
    navigate('/login');
  };

  return (
    <header className="flex items-center  px-24 py-5   top-0 z-50 ">
      <div className="justify-self-start z-50">
        <img className="w-[150px] h-auto" src="/pssi_logo_navbar.svg" alt="logo" />
      </div>
      <div className="flex justify-end w-full">
        <nav className="relative ">
          {/* nav item */}

          {bgColor === '#7E0000' ? (
            <>
              <img className="z-10 left-0 absolute h-full" src="./navbar-red.svg" alt="" />
              <img className="z-10 right-0 absolute h-full" src="./navbar-red.svg" alt="" />
            </>
          ) : bgColor === '#FFFFFF' ? (
            <>
              <img className="z-10 left-0 absolute h-full" src="./navbar-white.svg" alt="" />
              <img className="z-10 right-0 absolute h-full" src="./navbar-white.svg" alt="" />
            </>
          ) : (
            <></>
          )}

          <ul className="flex relative z-20 items-center justify-end space-x-2 py-2 px-4">
            {navList.map((item) => (
              <Link key={item.link} to={item.link}>
                <li
                  className={cn(
                    'px-4 py-1.5 rounded-full  text-sm font-light text-center  hover:text-white duration-100',
                    location.pathname.includes(item.link) && ` font-bold`
                  )}
                  style={{ color: location.pathname.includes(item.link) ? selectedTextColor : secondaryTextColor }}
                >
                  {item.label}
                </li>
              </Link>
            ))}
            <small className="px-6 border-l border-slate-600 cursor-pointer text-slate-700 my-auto" style={{}} onClick={handleLogout}>
              Logout
            </small>
          </ul>
        </nav>
      </div>
    </header>
  );
}
