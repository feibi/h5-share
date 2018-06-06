import House from './pages/house';
const routes = [
  //   {path: '/house', component: () => import('./pages/house')},
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
  }
];
export default routes;
