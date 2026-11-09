import { useEffect } from 'react';
import { useSearchParams, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Grid, Tabs } from '@mantine/core';
import { Filters } from '../components/Filters';
import { JobsList } from '../components/JobsList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCity, addSkill, removeSkill } from '../store/slices/jobsSlice';
import type { RootState, AppDispatch } from '../store/store';
import classes from './VacanciesTabs.module.css';

const cityMap: Record<string, string> = {
    moscow: 'Москва',
    petersburg: 'Санкт-Петербург',
};

export const VacanciesTabs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();
    const { city: cityParam } = useParams<{ city: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { city, skills, search } = useSelector((state: RootState) => state.jobs);

    // Определяем текущий город из URL
    const currentCityKey = cityParam === 'petersburg' ? 'petersburg' : 'moscow';
    const currentCityName = cityMap[currentCityKey];

    useEffect(() => {
        // Устанавливаем город из URL в store
        if (currentCityName !== city) {
            dispatch(setCity(currentCityName));
        }
    }, [currentCityName, city, dispatch]);

    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        const urlSkills = searchParams.get('skills')?.split(',') || [];

        if (urlSearch !== search) {
            dispatch(setSearch(urlSearch));
        }

        // Очищаем текущие навыки и добавляем из URL
        urlSkills.forEach(skill => {
            if (skill && !skills.includes(skill)) {
                dispatch(addSkill(skill));
            }
        });
    }, [searchParams, dispatch]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (search) {
            params.set('search', search);
        }
        if (skills.length > 0) {
            params.set('skills', skills.join(','));
        }

        setSearchParams(params);
    }, [search, skills, setSearchParams]);

    const handleTabChange = (value: string | null) => {
        // Сохраняем текущие search params
        const currentParams = new URLSearchParams(searchParams);

        if (value === 'moscow') {
            navigate(`/vacancies/moscow?${currentParams.toString()}`);
        } else if (value === 'petersburg') {
            navigate(`/vacancies/petersburg?${currentParams.toString()}`);
        }
    };

    return (
        <>
            <div className={classes.headerSection}>
                <Container size="lg">
                    <Group justify="space-between" align="flex-start" mb="md">
                        <div>
                            <h2 className={classes.title}>Список вакансий</h2>
                            <p className={classes.subtitle}>
                                по профессии Frontend-разработчик
                            </p>
                        </div>
                        <Group>
                            <input
                                placeholder="Должность или название компании"
                                className={classes.searchInput}
                                value={search}
                                onChange={(e) => dispatch(setSearch(e.target.value))}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // Поиск уже обрабатывается через setSearch
                                    }
                                }}
                            />
                            <button className={classes.searchButton}>
                                Найти
                            </button>
                        </Group>
                    </Group>

                    <Tabs
                        value={currentCityKey}
                        onChange={handleTabChange}
                        className={classes.tabs}
                    >
                        <Tabs.List>
                            <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                            <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Container>
            </div>

            <Container size="lg" py="xl">
                <Grid>
                    <Grid.Col span={4}>
                        <Filters hideCitySelect={true} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <JobsList />
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
};