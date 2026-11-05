import { Routes, Route } from "react-router-dom";
import { Vacancy } from '../pages/Vacancy';
import {MainContainer} from "../pages/MainContainer.tsx";

export const AppRoutes = () => {
    const navigationRouter = [
        {path: "/vacancy/:id", element: <Vacancy />},
        {path: "/", element: <MainContainer />},
    ]

    return (
        <Routes>
            { navigationRouter.map((route) => (
                <Route key={route.path} path={route.path} element={ route.element } />
            ))}
        </Routes>
    )
};