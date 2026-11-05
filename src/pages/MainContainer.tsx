import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid } from '@mantine/core';
import { Filters } from '../components/Filters';
import { JobsList } from '../components/JobsList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCity, addSkill, removeSkill } from '../store/slices/jobsSlice';
import type { RootState, AppDispatch } from '../store/store';

export const MainContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();
    const { city, skills, search } = useSelector((state: RootState) => state.jobs);

    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        const urlCity = searchParams.get('city') || 'Все города';
        const urlSkills = searchParams.get('skills')?.split(',') || [];

        if (urlSearch !== search) {
            dispatch(setSearch(urlSearch));
        }
        if (urlCity !== city) {
            dispatch(setCity(urlCity));
        }

        urlSkills.forEach(skill => {
            if (skill && !skills.includes(skill)) {
                dispatch(addSkill(skill));
            }
        });

        skills.forEach(skill => {
            if (skill && !urlSkills.includes(skill)) {
                dispatch(removeSkill(skill));
            }
        });
    }, [searchParams, dispatch]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (search) {
            params.set('search', search);
        }
        if (city && city !== 'Все города') {
            params.set('city', city);
        }
        if (skills.length > 0) {
            params.set('skills', skills.join(','));
        }

        setSearchParams(params);
    }, [search, city, skills, setSearchParams]);

    return (
        <Container size="lg" py="xl">
            <Grid>
                <Grid.Col span={4}>
                    <Filters />
                </Grid.Col>
                <Grid.Col span={8}>
                    <JobsList />
                </Grid.Col>
            </Grid>
        </Container>
    )
}