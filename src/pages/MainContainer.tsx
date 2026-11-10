import { useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Container, Grid } from '@mantine/core';
import { Filters } from '../components/Filters';
import { JobsList } from '../components/JobsList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCity, setSkills } from '../store/slices/jobsSlice';
import type { RootState, AppDispatch } from '../store/store';

export const MainContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { city, skills, search } = useSelector((state: RootState) => state.jobs);
    const isFirstRender = useRef(true);

    const isCityPage = location.pathname === '/vacancies/moscow' ||
        location.pathname === '/vacancies/petersburg';

    useEffect(() => {
        if (isFirstRender.current) {
            const urlSearch = searchParams.get('search') || '';
            const urlCity = searchParams.get('city') || 'Все города';
            const urlSkillsParam = searchParams.get('skills');

            const urlSkills = urlSkillsParam
                ? decodeURIComponent(urlSkillsParam).split(',').filter(Boolean)
                : [];

            console.log('URL skills param:', urlSkillsParam);
            console.log('Decoded skills:', urlSkills);

            dispatch(setSearch(urlSearch));

            if (!isCityPage) {
                dispatch(setCity(urlCity));
            }

            // Если в URL есть навыки - используем их, иначе оставляем начальные
            if (urlSkills.length > 0) {
                dispatch(setSkills(urlSkills));
            }

            isFirstRender.current = false;
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) return;

        const params = new URLSearchParams();

        if (search) {
            params.set('search', search);
        }

        if (!isCityPage && city && city !== 'Все города') {
            params.set('city', city);
        }

        if (skills.length > 0) {
            params.set('skills', skills.join(','));
        }

        setSearchParams(params, { replace: true });
    }, [search, city, skills, setSearchParams, isCityPage]);

    console.log('Current skills in store:', skills);

    return (
        <Container size="lg" py="xl">
            <Grid>
                <Grid.Col span={4}>
                    <Filters hideCitySelect={isCityPage} />
                </Grid.Col>
                <Grid.Col span={8}>
                    <JobsList />
                </Grid.Col>
            </Grid>
        </Container>
    )
}