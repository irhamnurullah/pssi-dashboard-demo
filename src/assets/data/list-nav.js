import Coach from '../../app/coach';
import Competition from '../../app/competition';
import DashboardPage from '../../app/dashboard';
import NatioanalTeams from '../../app/national-team';
import Player from '../../app/player';
import Referee from '../../app/referee';

export const navList = [
  {
    link: '/dashboard',
    label: 'Dashboard',
    element: DashboardPage,
  },
  {
    link: '/referee',
    label: 'Referee',
    element: Referee,
  },
  {
    link: '/coach',
    label: 'Coach',
    element: Coach,
  },
  {
    link: '/player',
    label: 'Player',
    element: Player,
  },
  {
    link: '/competition',
    label: 'Competition',
    element: Competition,
  },
  {
    link: '/national-team',
    label: 'National Team',
    element: NatioanalTeams,
  },
];
