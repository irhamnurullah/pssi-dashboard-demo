import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navList } from '@/assets/data/list-nav';
import { cn } from '@/lib/utils.js';

export default function NavBar({bgColor, selectedTextColor, secondaryTextColor}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="flex items-center  px-24 py-5 sticky  top-0 z-50 ">
      <div className="justify-self-start">
        <img src="/pssi-logo.svg" alt="logo" />
      </div>
      <div className="flex justify-end w-full">
        
        <nav className='relative ' >
          {/* nav item */}
         
          {
            bgColor === '#7E0000' ? 
            <>
              <img className='z-10 left-0 absolute h-full' src="./navbar-red.svg" alt="" />
              <img className='z-10 right-0 absolute h-full' src="./navbar-red.svg" alt="" />
            </>
            : bgColor === '#FFFFFF' ? 
            <>
              <img className='z-10 left-0 absolute h-full' src="./navbar-white.svg" alt="" />
              <img className='z-10 right-0 absolute h-full' src="./navbar-white.svg" alt="" />
            </>
            :
            <></>
          }
          

          <ul className="flex relative z-20 items-center justify-end space-x-2 py-2 px-4">
            {navList.map((item) => (
              <Link  key={item.link} to={item.link}>
                <li
                  className={cn(
                    'px-4 py-1.5 rounded-full  text-sm font-light text-center  hover:text-white duration-100',
                    // location.pathname.includes(item.link) ? ` hover:text-white font-semibold` : 'text-slate-300'
                  )}
                  style={{color: location.pathname.includes(item.link) ? selectedTextColor : secondaryTextColor}}
                >
                  {item.label}
                </li>
              </Link>
            ))}
              <Link  >
                <li className='px-4 py-1.5 text-sm text-slate-300 hover:text-white text-center' >
                  Logout
                </li>
              </Link>
          </ul>

        </nav>
      </div>

      
    </header>
  );
}
