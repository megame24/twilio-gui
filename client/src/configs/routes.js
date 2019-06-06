import { Route } from 'react-router-dom';
import NewContactMsg from '../views/NewContactMsg';
import OldContactMsg from '../views/OldContactMsg';
import UpdateContact from '../views/UpdateContact';
import Auth from '../views/Auth';
import routes from '../components/routes';

const { GuestRoute, UserRoute } = routes;

export default [
  {
    type: UserRoute,
    path: '/',
    component: NewContactMsg,
    exact: true,
  },
  {
    type: UserRoute,
    path: '/contacts/:id',
    component: OldContactMsg,
    exact: true,
  },
  {
    type: UserRoute,
    path: '/contacts/:id/update',
    component: UpdateContact,
    exact: true,
  },
  {
    type: GuestRoute,
    path: '/auth',
    component: Auth,
    exact: true,
  },
  {
    type: Route,
    path: '*',
    component: NewContactMsg,
    exact: true,
  },
];
