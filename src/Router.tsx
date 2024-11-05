import { RouteObject,
    createBrowserRouter,
 } from "react-router-dom";

 import Root from './Root';

 const routes: Array<RouteObject> = [
    {
        id: 'root',
        path: '/',
        element: <Root/>,
        children: [
            {
                id: 'home',
                path: '',
                lazy: () => import('./apps/Main/pages/Home')
                  .then(module => ({ Component: module.default, })),
            },
            {
                id: 'newTask',
                path: 'newTask',
                lazy: () => import('./apps/Main/pages/NewTask')
                  .then(module => ({ Component: module.default, })),
            },
            {
                id: 'newPass',
                path: 'changePassword/:id',
                lazy: () => import('./apps/Main/pages/changePass')
                  .then(module => ({ Component: module.default, })),
            },
            {
                id: 'editInfo',
                path: 'editUser/:id',
                lazy: () => import('./apps/Main/pages/EditUser')
                  .then(module => ({ Component: module.default, })),
            },
            {
                id: 'editTask',
                path: 'updateTask/:id',
                lazy: () => import('./apps/Main/pages/EditTask')
                  .then(module => ({ Component: module.default, })),
            },
            {
                id: 'editPhoto',
                path: 'changePhoto/:id',
                lazy: () => import('./apps/Main/pages/changePhoto')
                  .then(module => ({ Component: module.default, })),
            },
        ]
    },
    {
        id: 'login',
        path: 'login',
        lazy: () => import('./apps/Auth/pages/Login')
        .then(module => ({ Component: module.default})),
    },
    {
        id: 'signup',
        path: 'signup',
        lazy: () => import('./apps/Auth/pages/Signup')
        .then(module => ({ Component: module.default})),
    },
    {
        id: 'forgotPassword',
        path: 'passwordMenu',
        lazy: () => import('./apps/Auth/pages/Pass')
        .then(module => ({ Component: module.default})),
    },
    {
        id: 'resetPassword',
        path: 'reset-password',
        lazy: () => import('./apps/Auth/pages/resetPass')
        .then(module => ({ Component: module.default})),
    },
 ];

 const router = createBrowserRouter(routes);

 export default router;