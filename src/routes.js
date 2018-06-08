import House from './pages/house';
import NoFind from './pages/404';
const routes = [
  {
    path: '/house/:id',
    component: () => import('./pages/house/detail')
  },
  {
    path: '/house',
    component: House
  },
  {
    path: '/example',
    component: () => import('./pages/example')
  },
  {
    path: '*',
    component: NoFind
  }
];
export default routes;
