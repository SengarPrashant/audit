import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './main-layout';

export const IndexPage = lazy(() => import('./../pages/home'));
export const BillingPage = lazy(() => import('./../pages/billing'));
export const ClientConfig = lazy(() => import('./../pages/client-config'));
export const MasterPage = lazy(() => import('./../pages/master'));

export default function Router() {
    const routes = useRoutes([
        {
            //client-configuration
            element: (<MainLayout>
                <Suspense fallback={<h3 style={{ padding: 30 }}>Please wait...</h3>}>
                    <Outlet />
                </Suspense>
            </MainLayout>),
            children:[
                { element: <IndexPage />, index: true },
                { index:true, path:"home", element: <IndexPage /> },
                { path:"*", element: <MasterPage /> },
                // { index:true, path:"home", element: <IndexPage /> },
                // { path:"*", element: <MasterPage /> },
                // { path:"billing", element: <BillingPage /> },
                // { path:"client-configuration", element: <ClientConfig /> }
            ]
        }
    ]);
    return routes;
}