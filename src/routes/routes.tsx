import { Routes, Route } from "react-router-dom";
import { Vacancy } from '../pages/Vacancy';
import { MainContainer } from "../pages/MainContainer.tsx";
import { NotFound } from "../pages/NotFound.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/vacancy/:id" element={<Vacancy />} />
            <Route path="/" element={<MainContainer />} />
            <Route path="/vacancies/moscow" element={<MainContainer />} />
            <Route path="/vacancies/petersburg" element={<MainContainer />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};