import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRoutes } from '../hooks/useRoutes'

const AppRouter = () => {

    const { routes, defaultRoute } = useRoutes();

    return (
        <Routes>
            {routes.map(route => 
                <Route 
                    key={`${route.modifier}_${route.path}`}
                    path={route.path}
                    element={<route.component />}
                />    
            )}
            <Route 
                path="/*"
                element={<Navigate to={defaultRoute.path} replace={false} />}
            />
        </Routes>
    )
}

export default AppRouter