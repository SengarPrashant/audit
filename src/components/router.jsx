import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './main-layout';

export const IndexPage = lazy(() => import('./../pages/home'));
export const BillingPage = lazy(() => import('./../pages/billing'));

export default function Router() {
    const routes = useRoutes([
        {
            
            element: (<MainLayout>
                <Suspense fallback={<h3 style={{ padding: 30 }}>Please wait...</h3>}>
                    <Outlet />
                </Suspense>
            </MainLayout>),
            children:[
                { index:true, path:"home", element: <IndexPage /> },
                { index:true, path:"billing", element: <BillingPage /> },
            ]
        }
    ]);
    return routes;
}