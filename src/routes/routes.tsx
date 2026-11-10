import { Routes, Route, Navigate } from "react-router-dom";
import { Vacancy } from '../pages/Vacancy';
import { MainContainer } from "../pages/MainContainer.tsx";
import { NotFound } from "../pages/NotFound.tsx";
import { Layout } from "../components/Layout";
import { About } from "../pages/About";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/vacancies" replace />} />
                <Route path="vacancies" element={<MainContainer />} />
                <Route path="vacancies/moscow" element={<MainContainer />} />
                <Route path="vacancies/petersburg" element={<MainContainer />} />
                <Route path="vacancy/:id" element={<Vacancy />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
};